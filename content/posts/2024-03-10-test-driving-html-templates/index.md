+++
title = 'Test-Driving HTML Templates in Go'
slug = 'test-driving-html-templates-in-go'
date = 2024-03-10T18:38:55+01:00
tags = [
    "Go",
    "Webapp",
    "TDD",
]
draft = true
+++

Why test-drive HTML templates?  After all, the most reliable way to check that a template works is by rendering it to HTML and opening it in a browser, right?

There's some truth in this; unit tests cannot prove that a template looks the way we expect, and testing them by hand is necessary.  And if we make a mistake in the logic of a template, **usually** the template breaks immediately, so it's difficult not to notice the error.

On the other hand:

* Relying on manual tests only is risky; what if we make a change that breaks a template, and we don't test it because we did not think it would impact the template?  We would get a runtime error! 
* Templates often contain logic.  There usually are if-then-else's, and when iterating over an array of items, we usually want to present something different when there are no items to display. Testing both cases, for all of these bits of logic, becomes unsustainable very quickly
* There are errors that are not visible in the browser.  Browsers are extremely tolerant of inconsistencies in HTML, relying on heuristics to fix our broken HTML, but then we might get different results in different browsers.  It's good to check that the HTML structures we are building in our templates correspond to what we think.

It turns out that test-driving HTML templates is easy; let's see how to do it in Go.  I will be using the [TodoMVC template](https://github.com/tastejs/todomvc-app-template "GitHub - tastejs/todomvc-app-template: Template used for creating TodoMVC apps"), which is a sample application that is used to showcase JavaScript frameworks.

<div align="center"> *&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*<br>*
</div>


The number one thing I want to check is that the HTML we produce is basically sound. I don't mean to check that HTML is valid according to the W3C; not because I think it is not valuable, but because I think it's better to start with much simpler and fast checks.  For instance, I want my tests to break if the template generates something like

```html
<div>foo</p>
```

Let's see how to do it in stages: we start with the following test that tries to compile the template. 

```go
func Test_wellFormedHtml(t *testing.T) {
  templ := template.Must(template.ParseFiles("index.gotmpl"))
  _ = templ
}
```
If we run this test, it will fail, complaining that the `index.gotmpl` does not exist. So we create it, containing the above broken HTML.  Now the test should pass.

Then we create a *model* for the template to use.  I have one from my previous work on TodoMVC, so I will use it here.

```go
func Test_wellFormedHtml(t *testing.T) {
  templ := template.Must(template.ParseFiles("index.gotmpl"))
  model := todo.NewList()
  _ = templ
  _ = model
}
```
Then we render the template, saving the results in a bytes buffer.
```go
func Test_wellFormedHtml(t *testing.T) {
  templ := template.Must(template.ParseFiles("index.gotmpl"))
  model := todo.NewList()
  var buf bytes.Buffer
  err := templ.Execute(&buf, model)
  if err != nil {
    panic(err)
  }
}
```
At this point, we want to *parse* the HTML and we expect to see an error, because in our broken HTML there is a `div` element that is closed by a `p` element.  There is an HTML parser in the Go standard library, 
```go
func Test_wellFormedHtml(t *testing.T) {
  // as above
  _, err = html.Parse(bytes.NewReader(buf.Bytes()))
  if err != nil {
    t.Errorf("Broken HTML: %s", err)
  }  
}
```
but it is too lenient: if we run it on our broken HTML, we don't get an error. Luckily, the standard library also has an XML parser that can be configured to parse HTML (thanks to [this Stackoverflow answer](https://stackoverflow.com/a/52410528/164802 "HTML Validation with Golang - Stack Overflow"))
```go
func Test_wellFormedHtml(t *testing.T) {
  templ := template.Must(template.ParseFiles("index.gotmpl"))
  model := todo.NewList()
  
  // render the template into a buffer
  var buf bytes.Buffer
  err := templ.Execute(&buf, model)
  if err != nil {
    panic(err)
  }

  // check that the template can be parsed as (lenient) XML
  decoder := xml.NewDecoder(bytes.NewReader(buf.Bytes()))
  decoder.Strict = false
  decoder.AutoClose = xml.HTMLAutoClose
  decoder.Entity = xml.HTMLEntity
  for {
    _, err := decoder.Token()
    switch err {
    case io.EOF:
      return // We're done, it's valid!
    case nil:
      // do nothing
    default:
      t.Fatalf("Error parsing html: %s", err)
    }
  }
}
```
This code configures the HTML parser to have the right level of leniency for HTML, and then parses the HTML token by token.  Indeed, we see the error message we wanted:
```text
--- FAIL: Test_wellFormedHtml (0.00s)
    index_template_test.go:61: Error parsing html: XML syntax error on line 4: unexpected end element </p>
```
Success! Now if we copy over [the contents of the TodoMVC template](https://github.com/tastejs/todomvc-app-template/blob/main/index.html "Template • TodoMVC") to our `index.gotmpl` file, the test passes.

The test, however, is very verbose; we extract two helper functions, in order to make the intention of the test clearer, and we get

```go
func Test_wellFormedHtml(t *testing.T) {
  templ := template.Must(template.ParseFiles("index.gotmpl"))
  model := todo.NewList()
  
  buf := renderTemplate(templ, model)
  
  assertWellFormedHTML(t, buf)
}
```

<div align="center"> *&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*<br>*
</div>

The next step is to prove that when I pass a non-empty todo list, the items are rendered correcly in the template.  The TodoMVC template I downloaded currently returns two pre-populated elements (slightly simplified here):
```html
...
<ul class="todo-list">
  <!-- These are here just to show the structure of the list items -->
  <!-- List items should get the class `completed` when marked as completed -->
  <li class="completed">
    <div class="view">
      <input class="toggle" type="checkbox" checked>
      <label>Taste JavaScript</label>
      <button class="destroy"></button>
    </div>
  </li>
  <li>
    <div class="view">
      <input class="toggle" type="checkbox">
      <label>Buy a unicorn</label>
      <button class="destroy"></button>
    </div>
  </li>
</ul>
...
```

We'd like our test to look like this:

```go
func Test_todoItemsAreShown(t *testing.T) {
  templ := template.Must(template.ParseFiles("index.gotmpl"))
  model := todo.NewList()
  model.Add("Foo")
  model.Add("Bar")

  buf := renderTemplate(templ, model)

  // assert there are two <li> elements inside the <ul class="todo-list"> 
  // assert the first <li> text is "Foo"
  // assert the second <li> text is "Bar"
}
```


*Want to leave a comment? Please do so on Linkedin!*
