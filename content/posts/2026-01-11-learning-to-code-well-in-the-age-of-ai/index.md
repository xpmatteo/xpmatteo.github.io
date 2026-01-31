+++
title = 'Learning to code well in the age of AI'
slug = 'learning-to-code-well-in-the-age-of-ai'
date = 2026-01-11T11:00:00+01:00
tags = [
    "AI",
    "TDD",
    "refactoring",
    "DSL",
]
+++

<!-- TODO: Add introduction paragraph that sets up the main thesis -->

I was reading [this blog post today](https://joshtuddenham.dev/blog/vertigo/) and I think I understand their point of view.

<!-- ALTERNATIVE: I've been reading blog posts about whether AI is killing our ability to learn programming. [This one from Josh Tuddenham](https://joshtuddenham.dev/blog/vertigo/) stuck with me. -->

It's partly true that if you have AI generate code for you, you don't learn even a tenth of what you learn if you program by hand. But it also partly depends on how much work you do discussing and deciding how the code should be written. Even for writing a parser, there are many different approaches: you can ask the AI to generate it as a jumble of if-then-else statements, or you can ask for parser combinators. You can ask for a straightforward imperative implementation, or you can discuss with the AI how to structure it as a little DSL.

<!-- ALTERNATIVE: Here's what I've noticed in my own work: yes, if I just take whatever the AI spits out, I don't learn much. But when I spend time discussing with the AI *how* the code should be structured, that's different. Take writing a parser. I could accept a jumble of if-then-else statements. Or I could ask for parser combinators. Or I could discuss with the AI how to structure it as a little DSL. The choice matters. -->

<!-- TODO: Elaborate on the different approaches and what makes one more readable than the other -->

The real question is not whether AI-generated code prevents learning, but whether we're using AI to raise our standards for what good code looks like.

<!-- ALTERNATIVE: So maybe the question isn't "does AI prevent learning?" Maybe it's "are we using AI to raise our standards for what good code looks like?" -->

## The refactoring opportunity

I think we don't talk enough about the fact that with AI, you can not only generate code quickly, but you can also choose to have it generated at a level of refactoring that we rarely take the time to do. I'm thinking about this:

<!-- ALTERNATIVE: Here's something I don't see people talking about much: with AI, we can generate code at a level of refactoring that we rarely have time for otherwise. I've been thinking about this quote from Lance Walton: -->

<blockquote>
<p>
I'm finding that because TDD pushes you towards small things, and because of some very good mentoring in the late 1990's, everything I write is tiny and looks like a toy problem. Many times, I've had those who don't understand TDD say things like "Why did you bother to write tests for all this? It's all too simple to bother.", which has some resonance with "Test Everything That Could Possibly Break", where there is errr… nothing that could possibly break, because it's all so simple (take that last bit with some humour please).
</p>

<p>
And yet, when I do write the code without TDDing it, although I maintain the smallness and the simplicity, I often find defects.
</p>

<p>
So my answer to this issue is that ALL well factored code has that "toy problem" quality to it, and indeed that is what should be aspired to. If you only aim to TDD (or test after the fact) the complex stuff, then I can pretty much guarantee that you will get a lot of complex stuff, most of which won't work. And the anecdotal evidence we have for this is overwhelming (in the financial sector in which I tend to work).
</p>

<cite><a href="http://groups.google.com/group/lonely-coaches-sodality/msg/368d125e4487d9fb">Lance Walton</a></cite>
</blockquote>

What AI gives us is the ability to achieve this "toy problem" quality without the time pressure that usually forces us to settle for "good enough." We can now insist on code that is truly excellent.

<!-- ALTERNATIVE: This is what AI gives us: we can achieve this "toy problem" quality without fighting the time pressure. We used to settle for "good enough" because refactoring takes time. Now we can insist on excellent. -->

## Code as readable as specifications

Here's what I think we should be aiming for in the age of AI: **code that is as readable as specifications**.

<!-- ALTERNATIVE: Here's what I think we should aim for: code that reads like specifications. -->

When dealing with complicated domains, we should now expect our implementation code to be written as [internal DSLs](https://martinfowler.com/bliki/DomainSpecificLanguage.html) (Domain Specific Languages). Martin Fowler describes internal DSLs as a way to write code in a particular domain-specific way within a general-purpose language, creating a [fluent interface](https://martinfowler.com/bliki/FluentInterface.html) that reads almost like natural language.

<!-- ALTERNATIVE: When you're dealing with complicated domains, you can write the implementation as [internal DSLs](https://martinfowler.com/bliki/DomainSpecificLanguage.html). Martin Fowler writes about this: you write code in a domain-specific way within your general-purpose language, creating a [fluent interface](https://martinfowler.com/bliki/FluentInterface.html) that reads almost like natural language. -->

<!-- TODO: Add specific example of code before/after DSL treatment -->

In the past, creating these internal DSLs was time-consuming. We knew it was the right thing to do, but project pressures often meant we settled for less readable code. With AI, we can generate well-factored, DSL-style code as easily as we once generated messy imperative code. The bottleneck is no longer typing—it's our willingness to insist on quality.

<!-- ALTERNATIVE: Creating internal DSLs used to take time. I knew it was the right thing to do, but project pressures meant I often settled for less readable code. With AI, I can generate well-factored, DSL-style code as easily as messy imperative code. The bottleneck isn't typing anymore. It's whether I'm willing to insist on quality. -->

<!-- TODO: Discuss what this means for learning - you learn by designing the DSL, not by typing the implementation -->

Once, a colleague told me: "I've never seen anyone do with code what you do" (meaning: insisting on refactoring to such a degree).

<!-- ALTERNATIVE: Once a colleague said to me: "I've never seen anyone do with code what you do." He meant: insisting on refactoring to such a degree. -->

<!-- TODO: Expand on what this means - what kind of refactoring? Give concrete example -->

## Learning in the age of AI

So how do we learn to code well when AI can generate the implementation for us?

<!-- ALTERNATIVE: So how do you learn to code well when AI writes the implementation? -->

The answer is that **we shift our focus from implementation to design**. Instead of learning by typing out algorithms and data structures, we learn by:

1. **Designing the DSL** - What should the ideal code look like? What abstractions would make the domain clear?
2. **Evaluating the generated code** - Does it match our vision? Is it as readable as a specification?
3. **Iterating on the design** - Refining our requirements until the code truly reads like documentation

<!-- ALTERNATIVE: You shift your focus from implementation to design. Instead of learning by typing algorithms and data structures, you learn by:

1. Designing the DSL - what should the ideal code look like? What abstractions make the domain clear?
2. Evaluating what the AI generates - does it match your vision? Is it readable as a specification?
3. Iterating on the design - refining your requirements until the code reads like documentation -->

<!-- TODO: Add example of this iterative process -->

This is actually a higher level of learning than traditional coding. You're learning to think about code as a communication medium, not just as instructions for a computer.

<!-- ALTERNATIVE: This is a higher level of learning than typing code. You're learning to think about code as communication, not just instructions for a computer. -->

For more on Domain Specific Languages and how to design them, see Martin Fowler's work on [DSLs](https://martinfowler.com/dsl.html) and [fluent interfaces](https://martinfowler.com/bliki/FluentInterface.html).

## Conclusion

<!-- TODO: Write conclusion that ties together the themes: AI enables higher standards, code as specifications, learning through design rather than typing -->
