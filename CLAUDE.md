# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Hugo static site for Matteo Vaccari's personal blog at https://matteo.vaccari.name/. The site uses the `hugo-simple` theme and focuses on software development content, particularly around TDD, Go programming, and testing practices.

## Development Commands

### Local Development
- `hugo serve -D` or `make serve` or `make server` - Start the development server with drafts enabled
- `make open` - Open the local site in browser (http://localhost:1313)

### Content Creation
- `script/new-post.sh "Your Post Title"` - Create a new blog post with properly formatted filename
- `hugo new content posts/YYYY-MM-DD-post-title` - Alternative way to create new posts

### Theme Development
- `cd themes/hugo-simple && npm install` - Install theme dependencies (prettier for formatting)
- `cd themes/hugo-simple && npm run fmt` - Format theme templates and CSS
- `cd themes/hugo-simple && npm run check` - Check formatting of theme files

### Utilities
- `cd script && make pikchr` - Build the pikchr diagram tool from C source

## Site Architecture

### Content Structure
- **Posts**: Located in `content/posts/YYYY-MM-DD-title/` directories
- **Post Format**: Each post has an `index.md` file with TOML frontmatter containing title, date, slug, and tags
- **Assets**: Post-specific images and assets are stored alongside the `index.md` file
- **Pages**: Main pages (`about.md`, `_index.md`) are in the `content/` root

### Theme Customization
- **Base Theme**: Uses `hugo-simple` theme in `themes/hugo-simple/`
- **Custom Layouts**: Site-specific layout overrides in `layouts/partials/`
- **Hugo Configuration**: All site configuration in `hugo.toml`

### Key Configuration
- **Permalink Structure**: Uses slugs for clean URLs (`/:slugorfilename/`)
- **Taxonomies**: Only tags are enabled, other taxonomies disabled
- **RSS**: Limited to 42 items, section RSS disabled
- **Markup**: Goldmark renderer with unsafe HTML enabled, syntax highlighting configured

## Important Notes

- Hugo must be installed and available in PATH
- The site generates "Bearblog"-like URLs with taxonomies disabled except for tags
- Posts use date-based directory naming convention: `YYYY-MM-DD-title`
- The `public/` directory contains generated site output (not tracked for editing)
- Theme formatting requires npm dependencies to be installed in `themes/hugo-simple/`