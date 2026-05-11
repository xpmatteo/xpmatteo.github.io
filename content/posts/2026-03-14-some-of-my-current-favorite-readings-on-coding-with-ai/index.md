+++

title = 'My current favorite readings on coding with AI'
slug = 'current-favorite-readings-on-coding-with-ai'
date = 2026-03-14T13:55:07+01:00
tags = [
    "AI",
]
+++


**Update 2026-05-11**: Added Daniel&nbsp;Euchar's blog, Matt&nbsp;Pocock's skills and Vlad&nbsp;Khononov's modularity plugin.  Add reference to Mario Zechner. Downplaying the Compound Engineering plugin.

**Update 2026-04-11**: Added Ivett Ördög's video, and sections on specific topics: TDD and testing, harnesses and guardrails, spec-driven development, and reviewing AI output.

I’ve been experimenting with coding with AI intensely for the past 13 months. Along the way, some things I read stayed with me and I would recommend them to anyone on this learning journey.  These are *some* of my favorites; I’m only including choice representatives from each category, to keep this post short.

## Personal workflows

It's always fascinating to read about talented individuals' personal work habits.  Here are a few favorites out of many.

* Shrivu Shankar's [AI Can't Read Your Docs](https://blog.sshh.io/p/ai-cant-read-your-docs) contains a mix of advice on what works and what doesn't, especially related to "how do I teach AI how I like to work"
* Boris Tane's [How I Use Claude Code](https://boristane.com/blog/how-i-use-claude-code/) explains how to focus on planning a programming task, which is one of my favorite strategies for levelling up with agentic AI.
* Ivett Ördög's [Managing Cognitive Load in the Age of AI](https://www.youtube.com/watch?v=GyI5qU9MNJU&amp;t=2250s) (video) explains her favorite tricks. 
  * *Habit Hooks* are a mix of deterministic trigger and markdown instructions
  * *RefaktTS*, a CLI refactoring tool for agents
  * [Approved Scenarios](https://lexler.github.io/augmented-coding-patterns/patterns/approved-scenarios/ "Augmented Coding Patterns"), an important testing pattern, similar to [test mini-languages](https://research.swtch.com/testing "Go Testing By Example")



## Team and company workflows

* Daniel Euchar's [Ship Features With AI — Without Losing the Plot](https://danieleuchar.medium.com/ship-features-with-ai-without-losing-the-plot-80844643b6d5) is my favorite summary of how to introduce AI in a team. It respects's Thoughtworks' traditional [Sensible Default Practices](https://www.thoughtworks.com/insights/podcasts/technology-podcasts/sensible-defaults-way-think-technology-practices "Sensible defaults: A way to think about our technology practices | Thoughtworks"), especially **proceed in small steps**. 
* Ryan Lopopolo's [Harness Engineering](https://openai.com/index/harness-engineering/ "Harness engineering: leveraging Codex in an agent-first world | OpenAI") focuses on how to guide the AI with lints, and explains the extremely important idea of "garbage collection": an ongoing process to simplify and reduce the size of the codebase.
* Kieran Klaassen's [Guide To Compound Engineering](https://every.to/guides/compound-engineering "Compound Engineering: Make Every Unit of Work Compound Into the Next") used to be my go-to resource, until I found that it tries to do too much too automatically.  The concept of compounding is gold; the actual implementation is a great source of ideas, but I don't recommend it as the primary way to introduce AI coding in a company.



## Pattern languages

Emily Bache recently argued that, given that traditional TDD katas are no match for AI coding assistants, we should study patterns instead.  She has a very good point, though I think that finding existing open source codebases and making them safe to operate with AI [is also a very good exercise](https://matteo.vaccari.name/posts/modernization/ "Modernization | Matteo Vaccari").

Here are the only two coding-with-AI pattern collections I know

* Lada Kesseler and others publish the [Augmented Coding Patterns](https://lexler.github.io/augmented-coding-patterns/): a very high quality collection.  One of my favorites here is [Approved Fixtures](https://lexler.github.io/augmented-coding-patterns/patterns/approved-fixtures/ "Augmented Coding Patterns")
* Simon Willison's [Agentic Engineering Patterns](https://simonwillison.net/guides/agentic-engineering-patterns/) is a recent addition and is growing fast.


## Book

Not many books on this subject; of the ones I read, this one is the only one I like:

* Uberto Barbini's [Process Over Magic: Beyond Vibe Coding](https://pragprog.com/titles/ubaidev/process-over-magic-beyond-vibe-coding/ "Process Over Magic: Beyond Vibe Coding: Faster, Smarter, and Safer Coding with AI Assistants by Uberto Barbini") is a good all-around starting point.  I like how Uberto explains how AI is a tool he uses daily and would never want to give up, while at the same time keeping a healthy skeptical attitude, knowing that AI always makes mistakes, sometimes big ones.


## Theories

* Birgitta Böckeler's [Understanding Spec-Driven Development](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html "Understanding Spec-Driven-Development: Kiro, spec-kit, and Tessl") brings clarity on a technique that is implemented in dozens of frameworks, but has surprisingly little written about.  Among the three kinds of SDD she identifies is *spec-as-source*: an approach where the spec is the ground truth and code is derived from it, making the codebase essentially ephemeral.
* Chad Fowler's blog on what he calls the [Phoenix Architecture](https://aicoding.leaflet.pub/ "The Phoenix Architecture") is a detailed treatment of exactly that idea: spec-as-source taken to its logical extreme.  It's unclear what the limits of applicability are; I can't find tangible evidence of it being applied at scale, besides [a POC library](https://www.dbreunig.com/2026/01/08/a-software-library-with-no-code.html "A Software Library with No Code") and the claims from [the StrongDM team](https://factory.strongdm.ai/ "StrongDM Software Factory")


## Specific topics

### DDD 

Some skills I saw about DDD, focus on the technicalities of Value Objects and Entities.  Surely these are important, but even more fundamental is paying attention to the domain language.  DDD is about communication, and working with AI is also about communication.  Building a precise vocabulary helps, because it makes our conversations, and our code, more concise and precise.

Matt Pocock's [Skills plugin](https://github.com/mattpocock/skills "GitHub - mattpocock/skills: Skills for Real Engineers. Straight from my .claude directory") contains the weirdly named "grill-me-with-docs" skill, that can be used to build a vocabulary from scratch, or to revise a task description against an existing one.


### TDD and testing in general

* [Ivett Ördög's video](https://youtu.be/GyI5qU9MNJU?si=AU9RyQOjoiI8yrlT&t=1577) on [Approved Scenarios](https://lexler.github.io/augmented-coding-patterns/patterns/approved-scenarios/ "Augmented Coding Patterns") and [Approved Logs](https://lexler.github.io/augmented-coding-patterns/patterns/approved-logs/ "Augmented Coding Patterns")
* Julias Shaw's article on [why specs without tests are next to useless](https://www.linkedin.com/pulse/youre-wasting-effort-you-put-spec-driven-development-julias-shaw-dxmcc/ "You're Wasting the Effort You Put Into Spec-Driven Development"). "Encoding specifications into automated tests that actually enforce the contract. [...], most developers outside the extreme programming crowd don't realize they need to". THIS
* Ross Cox's [famous presentation on testing in Go](https://research.swtch.com/testing "research!rsc: Go Testing By Example") is very much applicable to any other language, and arrives at similar conclusions as Ivett Ördög's
* It turns out it's easy to get AI to follow (its own version of) TDD: just tell it to "[use red/green TDD](https://simonwillison.net/guides/agentic-engineering-patterns/red-green-tdd/ "Red/green TDD - Agentic Engineering Patterns - Simon Willison's Weblog")", as Simon Willison reports. It's a different version of TDD where the AI writes a bunch of tests first, then checks that they fail, then makes them pass, whereas the original TDD calls for writing a test at a time.  Also, the AI will usually forget the refactoring part.  All the same, it's a very useful technique

### Architectural design

Architectural design is essential, in general, and it becomes even more important when working with AI, because AI does not care about the maintainability of our code, unless we direct it specifically to do something about it.  Now, modularity is often praised, but is rarely explained well. It's not enough to say "improve my code": we should explain clearly what we consider "better".  

* Matt Pocock's [Skills plugin](https://github.com/mattpocock/skills "GitHub - mattpocock/skills: Skills for Real Engineers. Straight from my .claude directory") contains the [Improve Codebase Architecture skill](https://github.com/mattpocock/skills/blob/main/skills/engineering/improve-codebase-architecture/SKILL.md), based on [John&nbsp;Ousterhout's theory of modular design](https://www.goodreads.com/book/show/39996759-a-philosophy-of-software-design): modules should be "deep", eg their interface should be narrow, and hide extensive content
* Vlad Khononov's [Modularity plugin](https://github.com/vladikk/modularity "GitHub - vladikk/modularity: Claude Code plugin for designing modular systems from functional requirements and reviewing existing codebases for modularity problems with actionable improvement recommendations. Based on the Balanced Coupling model") contains skills for analyzing existing architectures, and designing new ones; it is based on [Vlad's own theory of balanced coupling](https://coupling.dev/ "Balanced Coupling -- A Practical Framework for Managing Coupling in Software Design"), explained in his book.
* One of Kent Beck's takes on software design is that duplicated code can hint at missing abstractions.  [His prompt is wonderfully simple](https://tidyfirst.substack.com/p/augmented-coding-copypaste-detector) and effective: "*run the copy/paste detector over the whole rust codebase to see if there are missing abstractions*".


### Harnesses and guardrails

* Birgitta Böckeler's article on [Harness Engineering](https://martinfowler.com/articles/harness-engineering.html "Harness engineering for coding agent users") explains the concept and its nuances
* Ben O'Mahony's article on [Hardening Codebases for Agentic Coding](https://benomahony.com/blog/hardening-codebases-for-agentic-coding/) gives good tips for Python codebases; it's straightorward to extend this to other languages

### Spec Driven Development

* Birgitta Böckeler's article on [Understanding Spec-Driven Development](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html "Understanding Spec-Driven-Development: Kiro, spec-kit, and Tessl")

### Reviewing AI output

* Kieran Klaassen of Compound Engineering fame writes that he [stopped reading code, and his code reviews got better](https://every.to/source-code/i-stopped-reading-code-my-code-reviews-got-better "I Stopped Reading Code. My Code Reviews Got Better.")
* Simon Willison's [Linear Walkthrough](https://simonwillison.net/guides/agentic-engineering-patterns/linear-walkthroughs/ "Linear walkthroughs - Agentic Engineering Patterns - Simon Willison's Weblog") get the AI to write a report about the code it's written. 
* A counterpoint by Mario Zechner: *Read every line of code*, [from the video recording of his presentation](https://www.youtube.com/watch?v=_zdroS0Hc74 "AIE Europe Keynotes &amp; Coding Agents ft. Pi, Google Deepmind, Anthropic, Cursor, Linear, &amp; more - YouTube") at AI Engineer 2026

## Finally...

[Ivett's recommendation](https://youtu.be/GyI5qU9MNJU?si=vxUWz6OhnS571Khj&amp;t=1526) is gold: *Never use a prompt from anyone else, unless you have reviewed that prompt*


*[Want to leave a comment? Please do so on LinkedIn!](https://www.linkedin.com/posts/matteovaccari_my-current-favorite-readings-on-coding-with-activity-7438590952455172096-CweI "My current favorite readings on coding with AI | Matteo Vaccari")*

