# Repository Guidelines

## Project Structure & Module Organization
This Hugo site keeps authoring files under version control to track content alongside layout changes. Key directories:
- `content/` holds Markdown pages and posts; use subfolders like `posts/` for dated articles.
- `archetypes/` provides starter front matter; update these templates before large-scale changes.
- `layouts/` contains Go template overrides; keep custom partials near their consuming layouts.
- `static/` serves assets verbatim; favour hashed filenames for new assets to avoid caching issues.
- `themes/` pins third-party theme code; configure look-and-feel in `hugo.toml`.
Generated HTML lives in `public/`; clean it before regenerating artefacts.

## Build, Test, and Development Commands
- `make serve` (or `hugo serve -D`): start a live-reload server with drafts enabled on http://localhost:1313.
- `make open`: open the local preview in your browser once the server is running.
- `hugo`: produce the production-ready site in `public/`; run this before publishing to verify output.

## Coding Style & Naming Conventions
Write Markdown with TOML front matter bounded by `+++`. Use ISO-8601 dates (`YYYY-MM-DD`) and short, hyphenated slugs (`posts/2024-03-05-topic`). Prefer semantic HTML snippets within Markdown when embedding custom markup. Keep indentation to two spaces inside lists and template blocks; align Hugo template logic for readability. Static assets and scripts should use lowercase kebab-case filenames.

## Testing Guidelines
No automated test suite exists, so rely on local Hugo checks. Before opening a PR, run `hugo serve -D --panicOnWarning` to surface build issues. Inspect the rendered pages in multiple viewports and confirm links, images, and code blocks. Delete stale artifacts in `public/` if unexpected files appear after a build.

## Commit & Pull Request Guidelines
Match the existing history: concise, lowercase summaries using verbs (e.g., `polish-post-metadata`). Reference related issues inline when available. Each PR should include: a short problem statement, screenshots for visual changes, and notes on manual verification steps (commands run, pages reviewed). Keep commits focused; split large content updates from theme or configuration changes to ease review.

## Publishing Notes
The site is hosted from the generated `public/` directory. After running `hugo`, review Git status to ensure only intentional files are staged. Coordinate publishing with any deployment automation so the latest `public/` output is pushed in sync with content updates.
