#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple markdown parser for frontmatter
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { frontmatter: {}, content: content };
  }

  const [, frontmatterStr, bodyContent] = match;
  const frontmatter = {};
  
  frontmatterStr.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
      frontmatter[key] = value;
    }
  });

  return { frontmatter, content: bodyContent };
}

// Simple markdown to HTML converter (basic features)
function markdownToHtml(markdown) {
  let html = markdown
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold and italic
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Code blocks (simple)
    .replace(/```[\s\S]*?```/g, (match) => {
      return '<pre><code>' + match.replace(/```/g, '').trim() + '</code></pre>';
    })
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Paragraphs (split by double newlines)
    .split('\n\n')
    .map(paragraph => {
      paragraph = paragraph.trim();
      if (!paragraph) return '';
      if (paragraph.startsWith('<h') || paragraph.startsWith('<pre') || paragraph.startsWith('<ul') || paragraph.startsWith('<ol')) {
        return paragraph;
      }
      return `<p>${paragraph.replace(/\n/g, '<br>')}</p>`;
    })
    .join('\n');

  return html;
}

// Generate individual post page
function generatePostPage(post, content) {
  const dateObj = new Date(post.date);
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const htmlContent = markdownToHtml(content);

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <title>${post.title} - Matt Watson</title>
    <meta name="description" content="${post.excerpt}">
    
    <link rel="stylesheet" href="../../assets/css/colors.css" media="all">
    <link rel="stylesheet" href="../../assets/css/base.css" media="all">
    <link rel="stylesheet" href="../../assets/css/components.css" media="all">
    
    <link rel="icon" type="image/jpeg" sizes="32x32" href="../../assets/images/avatar.jpeg">
    
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="${post.title}">
    <meta name="twitter:description" content="${post.excerpt}">
    
    <meta property="og:type" content="article">
    <meta property="og:title" content="${post.title}">
    <meta property="og:description" content="${post.excerpt}">
</head>

<body>
    <main id="main-content" class="page page--medium@medium">
        <div class="page__content">
            
            <header class="push_double--ends align--center">
                <a class="undecorated" aria-label="Back to Matt Watson's blog" href="/">
                    <img src="../../assets/images/avatar.jpeg" class="avatar i-flex" alt="Matt Watson">
                    
                    <p class="txt--x-small txt--subtle txt--uppercase txt--normal txt--spread flush--top">
                        Matt Watson
                    </p>
                </a>
            </header>

            <article class="push_double--bottom">
                <header class="align--center push--bottom">
                    <div class="txt--x-small txt--subtle push_quarter--bottom">
                        <span>${formattedDate}</span>
                    </div>
                    <h1 class="hdg hdg--x-large flush--top">
                        ${post.title}
                    </h1>
                </header>
                
                <div class="card__content">
                    ${htmlContent}
                </div>
            </article>

            <footer class="push_double--top align--center txt--x-small txt--subtle">
                <p><a href="/">← Back to all posts</a></p>
                <p>&copy; 2025 Matt Watson. All rights reserved.</p>
            </footer>

        </div>
    </main>
</body>
</html>`;
}

// Generate blog post HTML card
function generatePostCard(post) {
  const dateObj = new Date(post.date);
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return `
    <article class="card card--list push--bottom">
      <header class="align--center">
        <div class="card__date txt--x-small flush--top push_quarter--bottom txt--subtle">
          <span>${formattedDate}</span>
        </div>
        <h2 class="hdg hdg--x-large flush--top">
          ${post.title}
        </h2>
      </header>
      
      <div class="card__content">
        ${post.excerpt}
      </div>
      
      <a class="card__link" aria-label="Post: ${post.title}, on ${formattedDate}" href="/posts/${post.slug}">Read more</a>
      
      <div class="card__more txt--x-small" aria-hidden="true">
        <span class="btn btn--subtle">Read more</span>
      </div>
    </article>`;
}

// Read all markdown files and generate posts
function buildBlog() {
  const postsDir = path.join(__dirname, '_posts');
  const indexPath = path.join(__dirname, 'index.html');
  const postsOutputDir = path.join(__dirname, 'posts');
  
  // Create posts directory if it doesn't exist
  if (!fs.existsSync(postsOutputDir)) {
    fs.mkdirSync(postsOutputDir);
  }
  
  // Read all markdown files
  const posts = [];
  const files = fs.readdirSync(postsDir);
  
  files.forEach(file => {
    if (!file.endsWith('.md')) return;
    
    const filePath = path.join(postsDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { frontmatter, content: bodyContent } = parseFrontmatter(content);
    
    // Generate slug from filename (remove date prefix and .md extension)
    const slug = file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace('.md', '');
    
    posts.push({
      ...frontmatter,
      filename: file,
      slug: slug,
      content: bodyContent
    });
  });
  
  // Sort posts by date (newest first)
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Generate individual post pages
  posts.forEach(post => {
    const postHtml = generatePostPage(post, post.content);
    const postDir = path.join(postsOutputDir, post.slug);
    
    // Create directory for the post
    if (!fs.existsSync(postDir)) {
      fs.mkdirSync(postDir, { recursive: true });
    }
    
    // Create index.html inside the post directory
    const postPath = path.join(postDir, 'index.html');
    fs.writeFileSync(postPath, postHtml);
  });
  
  // Generate HTML for all posts
  const postsHtml = posts.map(generatePostCard).join('\n');
  
  // Read the template
  let indexHtml = fs.readFileSync(indexPath, 'utf-8');
  
  // Replace the blog posts section
  const blogPostsRegex = /<section id="blog-posts">[\s\S]*?<\/section>/;
  const newSection = `<section id="blog-posts">\n${postsHtml}\n            </section>`;
  
  indexHtml = indexHtml.replace(blogPostsRegex, newSection);
  
  // Write the updated index.html
  fs.writeFileSync(indexPath, indexHtml);
  
  console.log(`✅ Blog rebuilt with ${posts.length} posts`);
  console.log(`📝 Posts: ${posts.map(p => p.title).join(', ')}`);
  console.log(`📄 Individual pages created in /posts/`);
}

// Run the build
buildBlog();