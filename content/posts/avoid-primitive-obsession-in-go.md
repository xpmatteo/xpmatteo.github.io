+++
title = 'Avoid Primitive Obsession in Go'
date = 2024-02-24T16:52:19+01:00
draft = true
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

