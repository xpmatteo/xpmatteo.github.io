+++
title = 'Avoid Primitive Obsession in Go'
date = "2024-02-24"
slug = "avoid-primitive-obsession-in-go"
tags = [
    "go",
    "software-design",
    "DDD",
]
+++

*Primitive Obsession* is a code smell.  Consider this code:

```go
type User struct {
  FirstName string
  LastName  string
  Email     string
}
```

We're using the type `string` everywhere.  If we wanted a function to create a new user, its signature 
would be obtuse:

```go
func NewUser(first, last, email string) User { ... }
```

It's easy to get confused and swap first and last name, or worse. The smell is called "primitive obsession" because we tend 
to use primitive types such as strings or integers for everything.  

Luckily, in Go it's easy to define custom types that behave like a primitive, but are considered distinct by the compiler: 

```go
type FirstName string
type LastName string
type EmailAddress string

type User struct {
  First FirstName 
  Last  LastName  
  Email EmailAddress
}

func NewUser(
  first FirstName,
  last LastName,
  email EmailAddress,
) User {
  ...
}
```

Now it's much more difficult to swap first and last name, or pass a name in place of an email address.  This code does not compile:

```go
func main() {
  first := FirstName("Jane")
  last := LastName("Doe")
  email := EmailAddress("jane@example.com")

  NewUser(last, first, email) // type error!
}
```

And it's much more expressive: if you are looking to express the *model* of the domain in your code, as suggested by DDD, this is the way to go.

<div align="center">
  *&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*<br>*
</div>

But wait, there's more!  Does it make sense for an email address to be one million characters long?  Or to be empty?  Or to consist entirely of whitespace?  Probably not, yet our `EmailAddress` type allows it.  We should do something about it; we should limit the minimum and maximum length of a `EmailAddress`, and probably also restrict which characters it may contain.  As a minimum, an `EmailAddress` must necessarily contain an `@` sign.

Why go to this trouble?  On the one hand, is to prevent other parts of our system to break; on the other hand, it's also a matter of security.  If we're building our data from input coming from the outside world, we should prevent attackers from trying to cram an attack vector inside an `EmailAddress`; this is a great learning I got from the [Secure By Design](https://www.manning.com/books/secure-by-design "Secure by Design") book.  **Make sure every data field is validated for length and content.**

The first step is to write a function that will create a new `EmailAddress` only if the input string passes some basic checks.  

```go
// thanks https://stackoverflow.com/a/201447/164802
var validEmailAddress = regexp.MustCompile("^\\S+@\\S+.\\S+$")

func NewEmailAddress(s string) (EmailAddress, error) {
  const maxLength = 320 // RFC 5321 and RFC 5322
  const minLength = 5 
  if len(s) < minLength || len(s) > maxLength {
    return nil, errors.New("invalid EmailAddress length")
  }
  if !validEmailAddress.MatchString(s) {
    return nil, errors.New("invalid EmailAddress")
  }
  return EmailAddress(s), nil
}
```
The first thing we do is validate the input string length; this check is fast and cheap.  If this passes, we validate the input string against a regexp.  This regexp is simplistic, but it does its job.  

Why two separate checks?  Couldn't we check for length in the regexp?  We could, but it would be riskier; matching a regexp against a possibly very long string (remember, this input string could be crafted by an attacker to be 100K characters long) is certainly computionally more expensive than just checking for length beforehand.  And we, or a future maintainer, could bungle the regexp, as regexps can be tricky.  A length check is cheap and very hard to get wrong.

Now we have a function that will only create an `EmailAddress` if the input string is valid, but nothing is preventing other parts of our program to create an `EmailAddress` directly with `EmailAddress(str)`.  We want to make sure that the only way to create an `EmailAddress`, outside of this package, is the `NewEmailAddress` function.

The way to go is to change the definition of type `EmailAddress` to be an interface, and define a non-exported type `emailAddress` to represent an email address concretely.

```go
// An EmailAddress is something that can be represented
// as a string
type EmailAddress interface {
  String() string
}

// The actual implementation of an email address is a 
// wrapper type around string
type emailAddress string

// Make emailAddress implement the EmailAddress interface
func (e emailAddress) String() string {
  return string(e)
}

func NewEmailAddress(s string) (EmailAddress, error) {
  // ...
  // we build a non-exported, lowercase emailAdress
  return emailAddress(s), nil
}
```

Now we're good, aren't we? We are not leaking any information about how the `EmailAddress` is implemented internally. Unfortunately, the interface `EmailAddress` can be implemented by anything that has a `String() string` method... which defeats our initial idea that an `EmailAddress` can be created only through our exported `NewEmailAddress` function.  

The trick is to extend the `EmailAddress` interface in a way that can not be implemented by any other type defined elsewhere.

```go
type EmailAddress interface {
  String() string
  // Ensure not anyone anywhere can create an EmailAddress
  implementsEmailAddress()
}

// Make emailAddress implement EmailAddress
func (e emailAddress) implementsEmailAddress() {
}
```

Now the `EmailAddress` interface contains an unexported method `implementsEmailAddress` that cannot be defined outside our package.  This method does not do anything, except ensuring that only our package can define an `EmailAddress`.  Thanks Brett Slatkin [for this tip](https://www.onebigfluke.com/2014/04/gos-power-is-in-emergent-behavior.html "One Big Fluke
            &rsaquo;
            Go's power is in emergent behavior")!

<div align="center">
  *&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*<br>*
</div>

In summary:

 * Make your code more expressive
   * Avoid using strings and integers directly.  Wrap them with domain-specific small types.
 * Make your code more safe and secure   
   * Ensure these types can only be created through a validating function
   * If the underlying type is a string, check for length first; then check for valid structure and characters.

See [a complete working example](https://github.com/xpmatteo/todomvc-golang/blob/main/todo/itemId.go) from my TodoMVC example code.

*Want to leave a comment? Please [do so on LinkedIn!](https://www.linkedin.com/posts/matteovaccari_avoid-primitive-obsession-in-go-activity-7167561918105206786-W1N3?utm_source=share&amp;utm_medium=member_desktop "Matteo Vaccari on LinkedIn: Avoid Primitive Obsession in Go")*
