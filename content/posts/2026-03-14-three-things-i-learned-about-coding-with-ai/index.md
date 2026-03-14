+++

title = 'Three things I learned about coding with AI'
slug = 'three-things-i-learned-about-coding-with-ai'
date = 2026-03-14T15:07:28+01:00
tags = [
    "AI",
]
draft = true
+++

I've been experimenting with coding with AI intensely for the past 13 months. I had fun, I had disappointments and I learned a lot. My thinking around "how to get good results with AI" is now basically down to 3 main things.

### 1. Make the codebase a source of good examples for the AI

We must be *extremely* opinionated about what kind of code we want, and stubborn on insisting on iterating until the code we get looks like the code we want.  Mind you, I like it when the AI comes up with a solution that's different from what I would have written myself, as long as the code is written the way I want.

On the other hand, the AI's aim is to please the user, but it cannot know straight away what exactly will please the user. In the case of programming, some folks are perfectly happy with expressing business entities with dictionaries and arrays of strings, other folks, including me, insist on domain-specific, expressive data structures.  If the AI sees dictionaries, it will keep using dictionaries, unless we politely but stubbornly insist that it creates the kind of data structures we want.  This means iterating over code multiple times.  Once we get to code that we like, we can reinforce our preferences in two ways.


### 2. State your preferences in documents (context engineering)

The obvious thing is to write down our preferences in style guides, starting from the `CLAUDE.md`, `GEMINI.md` or `AGENTS.md` at the root of our repository.  Be aware, though, that there's a limit to the amount of written instructions that the AI can usefully pay attention to.  At the beginning, I thought it would be cool to condense whole online style guides into documents that the AI should read whenever it works with me, but this does not work, because if we give a ton of written instructions to any intelligence, artificial or not, it will naturally pay attention to only a part of it, and we don't control which part!

So we must be sparing with our written recommendations.  After all, the AI has literally read all the books already, and all it needs is to understand which parts of which books are most important to the user.  A good strategy is to add to our style guide only when we observe the AI doing something we don't like, repeatedly.

Another strategy is to condense the examples that we like in a document, so that we can simply say "read document X then do Y".  It's a good idea to get the AI to write the style guides, eg "read A, B and C and summarize the style in a document".  This I got from Shrivu Shankar.

### 3. Prevent deviations with lints (harness engineering)

The complementary strategy is to have strong automated (deterministic) checks that correct the AI whenever it writes code we don't like.  We can start with the rule "All code must be compiled, from the first day of development, with all compiler warnings enabled at the compiler's most pedantic setting. All code must compile with these settings without any warnings" — one of the 10 rules for coding at NASA compiled by Gerard J. Holzmann.  We can continue adding custom lint rules, and it's easy to get the AI to code them.

When a custom lint rule fails, the script should provide advice on how to correct the problem, so that the lint prompts the AI.


*Want to leave a comment? Please do so on LinkedIn!*
