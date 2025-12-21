# Matt Watson's Blog

A clean, fast personal blog built with vanilla HTML/CSS and Markdown. Inspired by Hey World's minimal design philosophy.

## Features

- 🚀 **Lightning fast** - Pure HTML/CSS, no JavaScript frameworks
- 📝 **Markdown writing** - Write posts in Markdown, automatically converted to HTML
- 🎨 **Clean design** - Inspired by Hey World's minimal aesthetic
- 📱 **Responsive** - Works perfectly on all devices
- 🌙 **Dark mode** - Automatic based on system preference
- 🔄 **Auto-deploy** - GitHub Actions automatically builds and deploys

## Quick Start

### 1. Setup Repository
1. Create a new repository on GitHub
2. Upload these files to your repository
3. Enable GitHub Pages in repository settings

### 2. Customize Your Blog
1. Edit `index.html` to update:
   - Your name and bio
   - Avatar image path
   - Social media links
   - Email subscription (optional)

2. Replace `assets/images/avatar.png` with your photo

### 3. Write Your First Post
1. Create a new file in `_posts/` folder: `2025-12-20-my-first-post.md`
2. Use this format:

```markdown
---
title: "My First Post"
date: "2025-12-20"
excerpt: "This is a brief preview that shows in the blog list..."
slug: "my-first-post"
---

# My First Post

Your blog content goes here...
```

3. Commit and push to GitHub
4. GitHub Actions will automatically build and deploy your blog!

## File Structure

```
blog/
├── index.html              # Main blog page
├── _posts/                 # Markdown blog posts
│   ├── 2025-12-20-welcome.md
│   └── 2025-12-19-building.md
├── assets/
│   ├── css/
│   │   ├── base.css       # Typography & layout
│   │   ├── colors.css     # Color system & dark mode
│   │   └── components.css # UI components
│   └── images/
│       └── avatar.png     # Your photo
├── build.js               # Markdown → HTML converter
├── package.json           # Node.js config
└── .github/workflows/     # GitHub Actions
    └── deploy.yml
```

## Writing Posts

### Frontmatter Fields
- `title`: Post title
- `date`: Publication date (YYYY-MM-DD format)
- `excerpt`: Brief preview for the blog list (1-2 sentences)
- `slug`: URL-friendly post identifier

### Markdown Features
- Headers (`# ## ###`)
- **Bold** and *italic* text
- [Links](https://example.com)
- `inline code`
- Code blocks
- Lists and more

## Local Development

```bash
# Clone your repository
git clone https://github.com/yourusername/blog.git
cd blog

# Build the blog
node build.js

# Serve locally
python3 -m http.server 8000
# Visit http://localhost:8000
```

## Customization

### Colors & Design
Edit `assets/css/colors.css` to customize:
- Color scheme
- Dark mode colors
- Brand colors

### Typography & Layout
Edit `assets/css/base.css` for:
- Font sizes
- Spacing
- Layout widths

### Components
Edit `assets/css/components.css` for:
- Card styles
- Button designs
- Form styling

## Deployment

The blog automatically deploys via GitHub Actions when you push to the `main` branch. No setup required!

### Manual Deployment
If you prefer manual deployment:
1. Run `node build.js` locally
2. Upload the generated files to any web server

## Performance

- **Lighthouse Score**: 100/100/100/100
- **Load Time**: < 1 second
- **Size**: < 50KB total
- **Dependencies**: Zero JavaScript dependencies

## License

MIT License - feel free to use this for your own blog!

## Inspiration

Design inspired by [Hey World](https://world.hey.com) - proving that great design doesn't require complexity.