#!/bin/bash

# GitHub Setup Helper Script

echo "🔧 GitHub Repository Setup"
echo "=========================="
echo ""

# Get repository name
read -p "Enter your GitHub repository name (e.g., discord-server-manager): " REPO_NAME

if [ -z "$REPO_NAME" ]; then
    echo "❌ Repository name cannot be empty!"
    exit 1
fi

GITHUB_USER="harrybradrocco"
REPO_URL="https://github.com/${GITHUB_USER}/${REPO_NAME}.git"

echo ""
echo "📋 Repository URL: ${REPO_URL}"
echo ""
echo "⚠️  IMPORTANT: Before continuing, make sure you:"
echo "   1. Created the repository on GitHub: https://github.com/new"
echo "   2. Created a Personal Access Token: https://github.com/settings/tokens"
echo "   3. The token has 'repo' scope enabled"
echo ""
read -p "Have you created the repository and token? (y/n): " CONFIRMED

if [ "$CONFIRMED" != "y" ] && [ "$CONFIRMED" != "Y" ]; then
    echo ""
    echo "Please:"
    echo "1. Create repository: https://github.com/new"
    echo "2. Create token: https://github.com/settings/tokens"
    echo "3. Run this script again"
    exit 1
fi

echo ""
echo "🔗 Setting up remote..."

# Remove old remote if exists
git remote remove origin 2>/dev/null || true

# Add new remote
git remote add origin "${REPO_URL}"

# Rename branch to main
git branch -M main 2>/dev/null || git branch -m main

echo "✅ Remote configured!"
echo ""
echo "📤 Ready to push! Run:"
echo "   git push -u origin main"
echo ""
echo "When prompted:"
echo "  Username: ${GITHUB_USER}"
echo "  Password: [Paste your Personal Access Token]"
echo ""
echo "💡 Tip: You can also embed the token in the URL:"
echo "   git remote set-url origin https://YOUR_TOKEN@github.com/${GITHUB_USER}/${REPO_NAME}.git"

