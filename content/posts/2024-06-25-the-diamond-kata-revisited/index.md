+++

title = 'The Diamond Kata Revisited'
slug = 'the-diamond-kata-revisited'
date = 2024-06-25T13:34:35+02:00
tags = [
    "TDD",
]
draft = true
+++

A few years ago, Seb Rose published an article about the Diamond Kata. The problem statement is simple, but solving it with TDD is not straightforward.

Problem: write a function that receives a positive integer and returns a string in the shape of a diamond. For example: diamond(3) should return

      A
     B B
    C   C
     B B
      A

The interesting bit for TDD enthusiasts is that while it's easy to get started returning hard-coded responses, there's no easy way to evolve the hardcoded values into general code.

Seb wrote that the best you can do is to start with tests for an approximate solution, and iterate both tests and code towards solving the full problem. This blog post led to a number of interesting responses:

 * Alistair Cockburn says that this problem could be [better solved by more mathematically-oriented thinking upfront](https://web.archive.org/web/20170621004437/http://alistair.cockburn.us/Thinking+before+programming "Alistair.Cockburn.us | Thinking before programming") about how many spaces should be generated where
 * Emily Bache says that ["recycling tests" is a valid way to iterate](https://coding-is-like-cooking.info/2015/04/iterative-incremental-tdd-diamond-kata/ "Coding Is Like Cooking  &raquo; Blog Archive   &raquo; Iterative and Incremental TDD with the Diamond Kata") towards a difficult problem
 * Other solutions from [Ron Jeffries](https://ronjeffries.com/articles/tdd-diamond/ "TDD on the Diamond Problem"), [George Dinwiddie](https://blog.gdinwiddie.com/2014/11/30/another-approach-to-the-diamond-kata/ "Another Approach to the Diamond Kata &#8211; George Dinwiddie&#039;s blog"), [Jon Jagger](https://jonjagger.blogspot.com/2012/06/sliming-and-refactoring-and-deliberate.html "less code, more software: sliming and refactoring and deliberate duplication"), again [Ron Jeffries](https://ronjeffries.com/articles/more-diamond/ "https://ronjeffries.com/articles/more-diamond/")
 
The challenge with this kata is "what is the sequence of tests that will incrementally lead to a solution?"  

<div align="center"> *&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*<br>*
</div>

Interestingly, it seems none of the published solutions above use a compositional approach; they all try to arrive at a "single algorithm" that will solve the problem, in spite of so many authors proposing that good programming is compositional.

This problem really looks like a compositional one if you think of it: the diamond

        A
       B B
      C   C
     D     D
      C   C
       B B
        A

Looks like a composition of four "lines".  What if we started with test-driving a single diagonal "line"?  It's not too hard to test-drive a function that passes these tests

    diag(1) == "A\n"
    diag(2) == ".A\nB.\n"
    diag(3) == "..A\n.B.\nC.."

The output of the function is a string that can be thought of as 2-dimensional image, composed of successive lines, e.g. `diag(3)` is

    ..A
    .B.
    C..
    
(Using dots instead of blanks as they are easier to visualize.)

This diagonal is a quarter of the diamond.  Now all you need is operations for manipulating images. Flipping an image orizontally:

    flipHor("ABC\n") == "CBA\n"
    flipHor(diag(3)) == "A..
                         .B.
                         ..C\n"
    
and vertically:

    flipVert("AA
              BB\n") == "BB
                         AA\n"
    
Joining two images horizontally:

                       composeHor("ABC\n", "CBA\n") == "ABCBA\n"
    composeHor(diag(3, 'C'), flipHor(diag(3, 'C'))) == "..A..
                                                        .B.B.
                                                        C...C\n"

and vertically

          composeVert("A
                       B
                       C\n", "C
                              B
                              A\n") == "A
                                        B
                                        C
                                        B
                                        A\n"
    composeVert("AA
                 BB
                 CC\n", "CC
                         BB
                         AA\n") == "AA
                                    BB
                                    CC
                                    BB
                                    AA\n"

With these tools, composing a diamond becomes very easy:

    String diamond(int size) {
        var d = diag(size);
        var upper = composeHor(d, flipHor(d));
        var lower = flipVert(upper);
        return composeVert(upper, lower);
    }








*Want to leave a comment? Please do so on Linkedin!*
