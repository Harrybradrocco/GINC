#!/bin/bash

# Git Setup Script for Discord Server Manager Webapp

echo "🚀 Setting up Git repository..."

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Discord Server Manager Webapp

Features:
- Channel deletion (by category or all)
- Channel renaming with symbols and font styles
- Discohook integration (webhooks, embeds, share links)
- Beautiful modern UI
- GitHub Pages ready"

echo ""
echo "✅ Git repository initialized!"
echo ""
echo "📋 Next steps:"
echo "1. Create a new repository on GitHub"
echo "2. Run these commands:"
echo ""
echo "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Enable GitHub Pages in repository settings"
echo "   Settings → Pages → Source: main branch → Save"
echo ""
echo "4. Your webapp will be live at:"
echo "   https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/"

