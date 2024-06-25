+++
title = 'The Diamond Kata Revisited'
slug = 'the-diamond-kata-revisited'
date = 2024-06-25T13:34:35+02:00
tags = [
    "TDD",
]
+++

A few years ago, Seb Rose [published an article about the Diamond Kata](https://claysnow.co.uk/recycling-tests-in-tdd/ "Recycling tests in TDD &#8211; Claysnow"). The problem statement is simple, but solving it with TDD is not straightforward.

Problem: write a function that receives a positive integer and returns a string in the shape of a diamond. For example: `diamond(3)` should return

      A
     B B
    C   C
     B B
      A

The interesting bit for TDD enthusiasts is that, while it's easy to get started returning hard-coded responses, **there's no easy way to evolve the hardcoded values into general code**.

Seb wrote that the best you can do is to start with tests for an approximate solution, and iterate both tests and code towards solving the full problem. His blog post led to a number of interesting responses:

 * Alistair Cockburn said that this problem could be [better solved by more mathematically-oriented thinking upfront](https://web.archive.org/web/20170621004437/http://alistair.cockburn.us/Thinking+before+programming "Alistair.Cockburn.us | Thinking before programming") about how many spaces should be generated where
 * Emily Bache said that ["recycling tests" is a valid way to iterate](https://coding-is-like-cooking.info/2015/04/iterative-incremental-tdd-diamond-kata/ "Coding Is Like Cooking  &raquo; Blog Archive   &raquo; Iterative and Incremental TDD with the Diamond Kata") towards a difficult problem
 * Other solutions came from [Ron Jeffries](https://ronjeffries.com/articles/tdd-diamond/ "TDD on the Diamond Problem"), [George Dinwiddie](https://blog.gdinwiddie.com/2014/11/30/another-approach-to-the-diamond-kata/ "Another Approach to the Diamond Kata &#8211; George Dinwiddie&#039;s blog"), [Jon Jagger](https://jonjagger.blogspot.com/2012/06/sliming-and-refactoring-and-deliberate.html "less code, more software: sliming and refactoring and deliberate duplication"), again [Ron Jeffries](https://ronjeffries.com/articles/more-diamond/ "https://ronjeffries.com/articles/more-diamond/")
 
The challenge with this kata is "what is the sequence of tests that will incrementally lead to a solution?"  

<div align="center"> *&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*<br>*
</div>

Interestingly, it seems none of the above published solutions use a compositional approach; they all try to arrive at a "single algorithm" that will solve the problem, in spite of so many authors proposing that good programming is compositional.

* *Favor object composition over inheritance* – [Gamma, Helm, Johnson, Vlissides, 1995](https://books.google.it/books/about/Design_Patterns.html?id=6oHuKQe3TjQC&amp;redir_esc=y "Design Patterns: Elements of Reusable Object-Oriented Software - Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides - Google Libri")
* *When you can extend a system solely by adding new objects without modifying any existing objects, then you have a system that is flexible and cheap to maintain* – [Kent Beck, 1997](https://books.google.it/books/about/Smalltalk_Best_Practice_Patterns.html?id=QLNGnVIuIuMC&amp;redir_esc=y "Smalltalk Best Practice Patterns - Kent Beck - Google Libri")
* *Objects should be composable* – [David West, 2004](https://bartoszmilewski.com/2014/10/28/category-theory-for-programmers-the-preface/ "Category Theory for Programmers: The Preface |   Bartosz Milewski&#039;s Programming Cafe")
* *Composition is the essence of programming* – [Bartosz Milewski, 2014](https://bartoszmilewski.com/2014/10/28/category-theory-for-programmers-the-preface/ "Category Theory for Programmers: The Preface |   Bartosz Milewski&#039;s Programming Cafe") (I'm not claiming to have read his book!)
* *Compositionality* -- [Steve Freeman, Nat Pryce, 2015](https://youtu.be/6Bia81dI-JE?si=Qwd2IIthEgyjgQ5h&amp;t=2219 "Building on SOLID foundations - Steve Freeman &amp; Nat Pryce - YouTube") 

This problem really looks like a compositional one if you think of it: the diamond

        A
       B B
      C   C
     D     D
      C   C
       B B
        A

Looks like a composition of four "lines".  What if we started with test-driving a single diagonal "line"?  It's not too hard to test-drive a function that passes these tests:

    diag(1) == "A"
    diag(2) == ".A
                B."
    diag(3) == "..A
                .B.
                C.."

The output of the function is a string that can be thought of as 2-dimensional image, composed of successive lines.

The diagonal is a quarter of the diamond.  Now all we need is operations for manipulating images. Flipping an image orizontally:

    flipHor("ABC") == "CBA"
    flipHor(diag(3)) == "A..
                         .B.
                         ..C"
    
and vertically:

    flipVert("AA
              BB") == "BB
                       AA"
    
Joining two images horizontally:

    composeHor("ABC", "CBA") == "ABCBA"
    composeHor(diag(3), flipHor(diag(3))) == "..A..
                                              .B.B.
                                              C...C"

and vertically

    composeVert("AA
                 BB
                 CC", "CC
                       BB
                       AA") == "AA
                                BB
                                CC
                                BB
                                AA"

With these tools, composing a diamond becomes very easy:

    String diamond(int size) {
        var d = diag(size);
        var upper = composeHor(d, flipHor(d));
        var lower = flipVert(upper);
        return composeVert(upper, lower);
    }


<div align="center"> *&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*<br>*
</div>

I always thought that TDD, or rather, good design, ought to lead not simply to a solution, but to **a toolkit that makes expressing the solution easy**.  Decomposing this problem into a composition of "images" seems natural to me; it does not require a lot of mathematical thinking, except perhaps a little bit in the `diag` function about the correct amount of dots surrounding the letter. We could say that this solution is *incremental* rather than *iterative*: instead of refining a single algorithm towards the solution, we compose many simple algorithms together, so that the solution becomes easy.

All we needed is a single primitive operation `diag`, and four composition operators: `flipHor`, `flipVert` `composeHor` and `composeVert`.

As an added bonus, generating different and possibly more complicated images becomes easy: for instance, `ecs(4)`, that returns the image

    D     D
     C   C
      B B
       A
      B B
     C   C
    D     D

can be defined as 

    String ecs(int size) {
        var d = diag(size);
        var upper = composeHor(flipVert(d), flipHor(flipVert(d)));
        var lower = flipVert(upper);
        return composeVert(upper, lower);
    }

*Want to leave a comment? [Please do so on Linkedin](https://www.linkedin.com/feed/update/urn:li:share:7211360180381351938/ "Matteo Vaccari on LinkedIn: The Diamond Kata Revisited")!*
