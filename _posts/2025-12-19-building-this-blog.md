---
title: "Building This Blog"
date: "2025-12-19"
excerpt: "Creating a personal blog that balances simplicity with functionality isn't always easy. I wanted something that focused on content, loaded fast, and was easy to maintain. Here's how I built this site using modern web standards..."
slug: "building-this-blog"
---

# Building This Blog

Creating a personal blog in 2025 means making choices. Framework or vanilla? Static or dynamic? Complex tooling or simple files? After considering many options, I chose simplicity and performance over complexity.

## Design Philosophy

I wanted a blog that:

- **Loads instantly** - No heavy JavaScript frameworks or unnecessary dependencies
- **Focuses on content** - Clean typography and generous white space
- **Works everywhere** - Progressive enhancement and responsive design
- **Easy to maintain** - Simple file structure and deployment process

## Technical Decisions

### Pure HTML/CSS
No JavaScript frameworks, no build steps, just modern web standards. The entire site uses vanilla HTML and CSS with:

- **CSS Custom Properties** for theming and consistency
- **System font stack** for performance and native feel
- **Progressive enhancement** for accessibility
- **Mobile-first responsive design**

### Markdown + GitHub Actions
Writing posts in Markdown while maintaining full control over the HTML output. A simple Node.js script converts Markdown to HTML and regenerates the blog automatically on every commit.

### GitHub Pages Hosting
Simple, reliable, and free. Perfect for a static blog that doesn't need server-side processing.

## The Result

A blog that loads in milliseconds, works on any device, and lets me focus on what matters most: writing quality content.

The source code is available on [GitHub](https://github.com/yourusername/blog) if you're curious about the implementation details.

## What's Next?

I'm planning to add:
- RSS feed generation
- Dark mode toggle
- Simple analytics
- Maybe a search feature

But only if they genuinely improve the experience. Sometimes the best feature is the one you don't build.

---

*This blog is inspired by the clean design of Hey World, proving that great design doesn't require complexity.*