+++

title = 'My current favorite readings on coding with AI'
slug = 'current-favorite-readings-on-coding-with-ai'
date = 2026-03-14T13:55:07+01:00
tags = [
    "AI",
]
+++

I’ve been experimenting with coding with AI intensely for the past 13 months. Along the way, some things I read stayed with me and I would recommend them to anyone on this learning journey.  These are *some* of my favorites; I’m only including choice representatives from each category, to keep this post short.

## Personal workflows

It's always fascinating to read about talented individuals' personal work habits.  Here are two favorites out of many.

* Shrivu Shankar's [AI Can't Read Your Docs](https://blog.sshh.io/p/ai-cant-read-your-docs) contains a mix of advice on what works and what doesn't, especially related to "how do I teach AI what I like"
* Boris Tane's [How I Use Claude Code](https://boristane.com/blog/how-i-use-claude-code/) explains how to focus on planning a programming task, which is one of my favorite strategies for levelling up with agentic AI.


## Team and company workflows

* Kieran Klaassen's [Guide To Compound Engineering](https://every.to/guides/compound-engineering "Compound Engineering: Make Every Unit of Work Compound Into the Next") is where I would start introducing AI in a company.  The guide explains a clear progression from casual AI use to intentional continuous improvement.  The leveling up starts with focusing on the plans.
* Ryan Lopopolo's [Harness Engineering](https://openai.com/index/harness-engineering/ "Harness engineering: leveraging Codex in an agent-first world | OpenAI") focuses on how to guide the AI with lints, and explains the extremely important idea of "garbage collection": an ongoing process to simplify and reduce the size of the codebase.

## Pattern languages

Emily Bache recently argued that, given that traditional TDD katas are no match for AI coding assistants, we should study patterns instead.  She has a very good point, though I think that finding existing open source codebases and making them safe to operate with AI is also a very good exercise.

Here are the only two coding-with-AI pattern collections I know

* Lada Kesseler and others publish the [Augmented Coding Patterns](https://lexler.github.io/augmented-coding-patterns/): a very high quality collection.  One of my favorites here is [Approved Fixtures](https://lexler.github.io/augmented-coding-patterns/patterns/approved-fixtures/ "Augmented Coding Patterns")
* Simon Willison's [Agentic Engineering Patterns](https://simonwillison.net/guides/agentic-engineering-patterns/) is a recent addition and is growing fast.


## Book

Not many books on this subject; of the ones I read, this one is the only one I like:

* Uberto Barbini's [Process Over Magic: Beyond Vibe Coding](https://pragprog.com/titles/ubaidev/process-over-magic-beyond-vibe-coding/ "Process Over Magic: Beyond Vibe Coding: Faster, Smarter, and Safer Coding with AI Assistants by Uberto Barbini") is a good all-around starting point.  I like how Uberto explains how AI is a tool he uses daily and would never want to give up, while at the same time keeping a healthy skeptical attitude, knowing that AI always makes mistakes, sometimes big ones.


## Theories

* Birgitta Böckeler's [Understanding Spec-Driven Development](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html "Understanding Spec-Driven-Development: Kiro, spec-kit, and Tessl") brings clarity on a technique that is implemented in dozens of frameworks, but has surprisingly little written about.  Among the three kinds of SDD she identifies is *spec-as-source*: an approach where the spec is the ground truth and code is derived from it, making the codebase essentially ephemeral.
* Chad Fowler's blog on what he calls the [Phoenix Architecture](https://aicoding.leaflet.pub/ "The Phoenix Architecture") is a detailed treatment of exactly that idea: spec-as-source taken to its logical extreme.  It's unclear what the limits of applicability are; I can't find tangible evidence of it being applied at scale, besides [a POC library](https://www.dbreunig.com/2026/01/08/a-software-library-with-no-code.html "A Software Library with No Code") and the claims from [the StrongDM team](https://factory.strongdm.ai/ "StrongDM Software Factory")


*Want to leave a comment? Please do so on LinkedIn!*
