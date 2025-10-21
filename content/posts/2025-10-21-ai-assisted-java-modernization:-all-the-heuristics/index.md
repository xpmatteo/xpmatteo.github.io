+++
title = 'AI-assisted Java modernization: All the heuristics'
slug = 'ai-assisted-java-modernization-all-the-heuristics'
date = 2025-10-21T12:35:57+02:00
tags = [
    "AI",
    "java",
    "modernization",
]
draft = true
+++

<style>
pre {
  overflow-x: auto;
  white-space: pre;
}
</style>

Over the course of my [AI-assisted Java modernization series](/tags/modernization/), I've discovered and documented practical heuristics for working effectively with AI coding assistants on legacy modernization projects. This post consolidates all those heuristics in one place as a quick reference guide.

These heuristics emerged from real experience porting a [legacy JEE 6 application](https://github.com/xpmatteo/app-modernization-plants-by-websphere-jee6) to Spring Boot using Claude Code. They're not rigid rules—they're patterns that proved useful in practice. Use them as a starting point and adapt them to your context.

---

## Planning & Strategy Phase

These heuristics help you set direction before diving into code.

### 🎯 The Goal Heuristic

**Give the AI a goal and let it iterate towards that goal.**

Instead of giving step-by-step instructions, state the desired outcome and let the AI figure out how to get there. When the first attempt doesn't work, the AI will debug and iterate until it succeeds.

**Example:** Rather than "update this dependency, then fix this error, then rebuild," say "try to build the app" and let it handle the iteration.

**Why it matters:** AI excels at iteration and debugging. Letting it work autonomously towards a goal is faster than micromanaging each step.

*Credit: [Federico Feroldi](https://www.linkedin.com/posts/feroldi_my-eureka-moment-with-coding-agents-id-activity-7358402031109267456-LbMj)*

[See it in action in Part I](/posts/ai-assisted-modernization-of-java-part-i/)

---

### 💎 The Value First Heuristic

**Plan modernization projects so that the most valuable parts are ported first.**

Don't follow the "logical" order (infrastructure → foundation → features). Start with the most valuable user journey. Try to apply any desired enhancements while you modernize, since you're reworking the code anyway.

**Example:** In an e-commerce app, start with the purchase flow, not the user registration flow. The purchase flow is where the business value is.

**Why it matters:** Delivers business value early, enables early feedback, and maintains stakeholder engagement throughout the project.

[See it in action in Part II](/posts/ai-assisted-modernization-of-java-part-ii/)

---

### Ask For Options Heuristic

**Start new tasks in plan mode; ask for options to get the model to explore multiple approaches.**

Don't rush to code. Put the AI in plan mode and ask "what are our options?" This triggers deeper reasoning about trade-offs and alternatives.

**Example:** "We want to port the product page to Spring Boot. What are our options?" yields better architectural thinking than "Please port the product page."

**Why it matters:** AI's first idea isn't always the best. Exploring the solution space leads to better decisions.

*Credit: Inspired by [Andrej Karpathy's advice](https://x.com/karpathy/status/1915581920022585597)*

[See it in action in Part IV](/posts/ai-assisted-modernization-of-java-part-iv/)

---

### 🏈 The Team Sport Heuristic

**Legacy modernization is a team sport. Involve the people who normally work with this system.**

Don't rely solely on AI and code analysis. Talk to the humans who understand the business context, the hidden dependencies, and the "why" behind the code.

**Example:** When analyzing user journeys, the AI can trace code flows, but humans know which features customers actually care about and which are legacy cruft.

**Why it matters:** Domain knowledge and organizational context aren't in the codebase. People provide essential context that makes modernization successful.

[See it in action in Part II](/posts/ai-assisted-modernization-of-java-part-ii/)

---

## Active Development Phase

These heuristics guide your workflow while actively coding with AI.

### 🔄 The Iteration Heuristic

**If you find yourself accepting the AI output without question, you're losing control.**

Don't just accept the first thing the AI produces. Analyze it critically, ask yourself how it could be improved, then ask the AI to iterate. The most value from AI comes through iteration.

**Example:** AI writes a repository test using `@SpringBootTest`. You recognize this will be slow. Ask it to use a lighter-weight approach with manual DataSource configuration.

**Why it matters:** AI produces "average" code based on its training data. Your expertise combined with AI's implementation speed produces better results than either alone.

*Credit: [Uberto Barbini](https://www.linkedin.com/in/uberto/)*

[See it in action in Part II](/posts/ai-assisted-modernization-of-java-part-ii/) and [Part IV](/posts/ai-assisted-modernization-of-java-part-iv/)

---

### 🛑 The Break the Loop Heuristic

**Keep an eye on what the AI is doing and stop it if it's getting lost.**

AI can get stuck in loops, trying the same failed approach repeatedly, or pursuing the wrong path. Watch its progress and intervene when you see it losing direction.

**Example:** AI repeatedly tries to access the wrong URL for the home page, then attempts to rebuild the application. Stop it and provide the correct URL directly.

**Why it matters:** Context and tokens are precious. Letting the AI thrash wastes both and degrades its performance. Human intervention saves time.

[See it in action in Part II](/posts/ai-assisted-modernization-of-java-part-ii/)

---

### Let the AI Do the Testing Heuristic

**When the AI claims it's done with a task, let it verify using tools or MCP servers.**

Don't manually test what the AI built. Instead, have the AI use browser automation (Puppeteer), run tests, or otherwise verify its own work programmatically.

**Example:** After porting a product page, the AI uses Puppeteer MCP to navigate to the page, take screenshots, and verify the functionality works as expected.

**Why it matters:** AI can test faster than humans, catches obvious bugs immediately, and the testing becomes part of the documented workflow.

[See it in action in Part IV](/posts/ai-assisted-modernization-of-java-part-iv/)

---

### Get The AI To Program Itself Heuristic

**Don't write documentation files directly; tell the AI the effect you want to achieve and let it work for you.**

When you need to update CLAUDE.md, README, or other documentation, describe the desired outcome rather than editing directly. The AI will likely produce more comprehensive and better-organized documentation.

**Example:** Instead of editing CLAUDE.md yourself, say "update CLAUDE.md with clear instructions to use `make restart` when testing the application."

**Why it matters:** (1) Results in more effective documentation, (2) it's less work for you, (3) builds skills in delegating to AI agents.

[See it in action in Part IV](/posts/ai-assisted-modernization-of-java-part-iv/)

---

## Project Hygiene Phase

These heuristics keep your project clean and manageable.

### 💾 The One-Prompt-One-Commit Heuristic

**After every successful prompt, commit to version control.**

Each time the AI completes a task successfully, commit the changes. This creates a safety net and makes it easy to roll back if the next attempt goes wrong.

**Example:** AI successfully fixes the Maven build configuration. Commit. AI then updates Docker configuration. Commit. AI fixes database connectivity. Commit.

**Why it matters:** Creates checkpoint you can return to, makes debugging easier, documents the incremental progress, and prevents losing working states.

*Credit: [Uberto Barbini](https://www.linkedin.com/in/uberto/)*

[See it in action in Part I](/posts/ai-assisted-modernization-of-java-part-i/)

---

### 📊 The Manage Context Heuristic

**Be aware at all times of how much free context you have. Try to avoid getting close to the limit.**

Regularly check context window usage with `/context`. When context gets tight (>80%), either compact the context or start fresh. Don't let it fill completely as this degrades AI performance.

**Example:** Before starting a potentially lengthy debugging session, check `/context`. If at 82%, clear or compact first rather than starting new work.

**Why it matters:** Full context windows degrade AI reasoning, cause it to "forget" earlier context, and lead to mistakes. Managing context proactively maintains quality.

[See it in action in Part I](/posts/ai-assisted-modernization-of-java-part-i/) and [Part IV](/posts/ai-assisted-modernization-of-java-part-iv/)

---

### 🔧 The Makefile Heuristic

**Provide a Makefile (or equivalent tool) that makes it easy for humans and AI to execute common development tasks.**

Create explicit, documented commands for building, testing, starting, and restarting the application. This prevents the AI from guessing or using ineffective commands.

**Example:** Create a `Makefile` with `make restart` that does `mvn clean package && docker-compose down && docker-compose up -d --build` rather than letting the AI use ineffective `docker-compose restart`.

**Why it matters:** Reduces ambiguity, prevents wasted time on wrong commands, documents the canonical way to do things, and benefits both humans and AI.

*Credit: [Armin Ronacher](https://lucumr.pocoo.org/2025/6/12/agentic-coding/)*

[See it in action in Part III](/posts/ai-assisted-modernization-of-java-part-iii/)

---

## How to Use These Heuristics

These patterns emerged from practice, not theory. Start with the essentials:

1. **Goal Heuristic** - Let AI iterate towards outcomes
2. **One-Prompt-One-Commit** - Create safety checkpoints
3. **Iteration Heuristic** - Don't accept first outputs blindly

As you get comfortable, layer in the others based on what challenges you face. Adapt them to your context—they're starting points, not commandments.

## The Series

Want to see these heuristics in action? Read the full series:

- [Part I: Getting Legacy Code Running](/posts/ai-assisted-modernization-of-java-part-i/) - Making an abandoned Java 6 JEE app run in Docker
- [Part II: Documentation and Planning](/posts/ai-assisted-modernization-of-java-part-ii/) - Understanding the codebase and planning the conversion
- [Part III: Converting the Landing Page](/posts/ai-assisted-modernization-of-java-part-iii/) - Characterization logging and first Spring Boot conversion
- [Part IV: Reading from the Database](/posts/ai-assisted-modernization-of-java-part-iv/) - Building a complete MVC stack with ATDD/TDD

*Want to leave a comment? Please do so on Linkedin!*
