+++
title = 'Learning to code well in the age of AI'
slug = 'learning-to-code-well-in-the-age-of-ai'
date = 2026-01-11T12:00:00+01:00
tags = [
    "AI",
    "TDD",
    "refactoring",
]
draft = true
+++

<!-- TODO: Add introduction paragraph -->

I was reading [this blog post today](https://joshtuddenham.dev/blog/vertigo/) and I think I understand their point of view.

It's partly true that if you have AI generate code for you, you don't learn even a tenth of what you learn if you program by hand. But it also partly depends on how much work you do discussing and deciding how the code should be written. Even for writing a parser, there are many different approaches; you can generate it as a jumble of if-then-else statements, or you can use parser combinators.

<!-- TODO: Elaborate on the different approaches to writing parsers and what this teaches us -->

## The refactoring opportunity

I think we don't talk enough about the fact that with AI, you can not only generate code quickly, but you can also choose to have it generated at a level of refactoring that we rarely take the time to do. I'm thinking about this:

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

<!-- TODO: Connect Lance's quote to how AI enables this level of refactoring -->

<!-- TODO: Discuss how AI can help achieve this "toy problem" quality -->

Once, a colleague told me: "I've never seen anyone do with code what you do" (meaning: insisting on refactoring to such a degree).

<!-- TODO: Expand on what this means - what kind of refactoring? Examples? -->

<!-- TODO: Connect to learning - how does using AI with this mindset actually help you learn better than traditional coding? -->

<!-- TODO: Add conclusion - what's the answer to "learning to code well in the age of AI"? -->
