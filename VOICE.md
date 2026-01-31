# Matteo Vaccari's Writing Voice

This document distills the writing voice and style patterns from Matteo Vaccari's blog posts at matteo.vaccari.name.

## Core Voice Characteristics

### Tone
- **Conversational yet professional**: Write like talking to a colleague over coffee, not lecturing from a podium
- **First-person narrative**: Use "I" freely - "I think", "I've been working", "My impression is"
- **Humble and reflective**: Acknowledge uncertainty, mistakes, and learning ("I'm very impressed", "What went wrong?")
- **Pedagogical**: Teach through stories and concrete examples, not abstract principles
- **Generous**: Credit others extensively; thank reviewers; link to sources

### Perspective
- Write from direct experience, not theory
- Show the messy process, not just the polished result
- Embrace false starts and failures as teaching moments
- Value practitioners' insights over academic authority
- Present yourself as fellow learner, not expert guru

## Structural Patterns

### Article Organization
1. **Start concrete**: Open with specific problem, example, or anecdote
2. **Build progressively**: Move from simple to complex, adding layers
3. **Show, then explain**: Code/example first, interpretation second
4. **Use clear waypoints**: Descriptive headings that tell a story
5. **End with reflection**: Synthesize lessons learned

### Common Structures
- "Before and after" comparisons (wrong way → right way)
- "Here's what I tried" → "It didn't work because" → "Here's what worked"
- Progressive refinement: "This test is verbose; let's extract helpers"
- Question-driven exploration: "How do we...?" → demonstrate answer

### Visual Elements
- Code snippets (real code, not pseudocode)
- Git logs showing actual commit history
- Screenshots of real work
- Error messages verbatim
- Diagrams for architecture concepts
- Horizontal rule dividers (`***`) between major sections

## Technical Writing Style

### Code Examples
- **Show real code**: Actual working examples, not sanitized pseudo-code
- **Include context**: Show imports, setup, the full picture
- **Demonstrate iteration**: Show tests failing, then passing
- **Highlight changes**: Use code highlighting for modified lines
- **Comment thoughtfully**: Explain non-obvious decisions
- **Keep it executable**: Readers should be able to run your examples

### Technical Explanations
- Start with "Let's see how..." to introduce examples
- Use "It turns out..." to reveal surprising insights
- Break complex topics into digestible steps
- Define acronyms on first use (but don't over-explain common terms)
- Link to external references for deep dives
- Prefer concrete examples over abstract principles

### TDD and Process
- Show the Red-Green-Refactor cycle explicitly
- Include test code alongside production code
- Demonstrate small steps ("fake it", "triangulation")
- Show refactoring as integral part of process
- Make the thinking visible: "I decided to...", "My first idea was..."

## Language Patterns

### Sentence Style
- **Varied length**: Mix short punchy sentences with longer explanatory ones
- **Active voice**: "I write tests first" not "tests are written first"
- **Direct address**: Use "you" to engage reader
- **Rhetorical questions**: "Can you see the problem?" to prompt thinking
- **Informal touches**: "Wow --", "Good job!", "And yet..."

### Transitional Phrases
- "Let's see how to do it..."
- "It turns out that..."
- "The interesting bit is..."
- "Here's what I think we should aim for..."
- "In my experience..."
- "One wonders if..."
- "What went wrong?"

### Technical Terms
- Use standard terminology (TDD, ports-and-adapters, DSL)
- Link to authoritative sources on first mention
- Don't over-explain widely-known concepts
- Do explain your specific usage or interpretation
- Spell out acronyms thoughtfully

## Values That Show Through

### Technical Values
- **Simplicity over cleverness**: "Two specialized objects are simpler than one complex object"
- **Testability**: Every design decision considers testing
- **Compositionality**: Build complex from simple parts
- **Incrementality**: Small steps, constant feedback
- **Iteration**: Refine continuously rather than get it perfect first

### Process Values
- **TDD as fundamental**: Not optional, not just for complex things
- **Testing at appropriate levels**: Unit, focused integration, acceptance tests
- **Design for tests**: Adapters, ports, clean boundaries
- **Learning from failure**: Show false starts, explain what didn't work
- **Continuous improvement**: Today's code can always be better

### AI-Era Values
- **AI amplifies practices**: Good practices get better, bad get worse
- **Raise standards**: AI enables code-as-specification quality
- **Shift to design**: Focus on DSLs, abstractions, interfaces
- **Strong guardrails**: Acceptance tests, clear specs, good architecture
- **Human + AI**: Neither alone is sufficient

## Specific Conventions

### Formatting
- **Headings**: Capitalize first word only ("The diamond kata revisited")
- **Code blocks**: Always specify language for syntax highlighting
- **Lists**: Use for enumerating points, options, or steps
- **Block quotes**: For others' words, with attribution
- **Emphasis**: Italics for technical terms first use, bold for KEY CONCEPTS

### Citations and References
- Credit generously: "Thanks to [Person] for..."
- Link to source material extensively
- Quote others with proper attribution
- Include "Further readings" section for deep dives
- Name-drop respectfully: Kent Beck, Martin Fowler, etc.

### Meta Elements
- **TODO comments**: In drafts, mark sections needing work
- **LinkedIn links**: End with "Want to leave a comment? [Please do so on LinkedIn](...)"
- **Series context**: When part of series, link to previous/related articles
- **Update notes**: "Update 2024-06-26: [what changed]"

## Writing Process Patterns

### Drafting
- Start with TODO comments for structure
- Write code examples first, prose second
- Test your code examples - they should actually work
- Add screenshots/diagrams after text is stable
- Let drafts sit before publishing

### Examples to Include
- Real project work when possible
- Well-known katas (Diamond, FizzBuzz, TodoMVC)
- "Toy problems" that illustrate principles
- Before/after comparisons
- Failed attempts alongside successful ones

### Audience Assumptions
- **Knows programming**: Don't explain variables, loops, functions
- **Knows testing basics**: Familiar with unit tests, assertions
- **Learning TDD**: May not know advanced techniques
- **Interested in craft**: Cares about code quality, design
- **Skeptical of dogma**: Wants to understand *why*, not just *what*

## Topics and Themes

### Core Themes
- Test-Driven Development (the heart of most posts)
- Software design and architecture
- Go programming language
- Web application development
- AI-assisted development
- Learning and improving as programmer

### Recurring Concepts
- Ports-and-adapters architecture
- Acceptance testing / ATDD
- Mock objects (used judiciously)
- Refactoring and simplification
- Compositional design
- Small steps and iterative improvement
- Code as communication

### Avoid
- Prescriptive rules without context
- "Always" and "never" (except when you really mean it)
- Claiming one true way
- Dismissing others' approaches without understanding
- Over-engineering examples
- Solutions without showing the problem first

## Opening and Closing Patterns

### Strong Openings
- Personal anecdote: "I was reading this blog post today..."
- Direct problem: "A few years ago, Seb Rose published..."
- Concrete scenario: "Suppose that I am developing a function that..."
- Surprising insight: "I think we don't talk enough about..."

### Strong Closings
- Synthesize the lesson
- Connect to larger themes
- Acknowledge caveats and limitations
- Point to further resources
- Thank contributors
- Invite discussion (LinkedIn link)

## Voice Evolution Notes

The voice has remained remarkably consistent from 2018 to 2026, with these shifts:

- **Pre-AI (2018-2024)**: Focus on TDD, testing, Go, web apps
- **AI era (2025-2026)**: Adding AI-assisted development, maintaining same core values
- **Constant theme**: Good practices are timeless; tools change, principles don't
- **Increasing confidence**: Later posts more willing to make strong claims

## Examples of Voice in Action

### Strong voice:
> "What went wrong? I took large steps. I tried to guess the correct algorithm too early. I forced myself to continue even though I was tired. Then I did the right thing: throw away the code and start from scratch!"

### Humble learning:
> "Wow -- I'm very impressed that I can talk to a machine and then have a conversation about our conversation."

### Clear teaching:
> "Let's try to see how it would look like if, instead, I used an adapter."

### Generous attribution:
> "Thanks to Esko Luontola, J. B. Rainsberger, GeePaw Hill, Jessica Kerr for learnings and inspiration. And of course Kent Beck!"

### Technical precision with accessibility:
> "An adapter, much like an electrical socket adapter, is a thing that sits between our logic, and 3rd party dependencies."

## When in Doubt

- **Be concrete**: Add an example
- **Be honest**: Show what didn't work
- **Be generous**: Credit others
- **Be clear**: Simplify the prose
- **Be humble**: Acknowledge limits

Remember: You're writing to share what you've learned, not to prove you know everything. The goal is to help readers learn and think, not to impress them.
