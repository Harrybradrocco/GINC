# 🚀 Quick Start Guide

## Step 1: Install Git (if not installed)
```bash
sudo apt-get update
sudo apt-get install -y git
```

## Step 2: Navigate to Webapp Directory
```bash
cd /root/.local/MillerScript/Bots/webapp
```

## Step 3: Initialize Git Repository
```bash
git init
git add .
git commit -m "Initial commit: Discord Server Manager Webapp"
```

## Step 4: Create GitHub Repository
1. Go to https://github.com/new
2. Create a new repository (e.g., `discord-server-manager`)
3. **Don't** initialize with README, .gitignore, or license

## Step 5: Connect and Push
```bash
# Replace YOUR_USERNAME and YOUR_REPO_NAME with your actual values
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## Step 6: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select:
   - Branch: **main**
   - Folder: **/ (root)**
4. Click **Save**

## Step 7: Access Your Webapp
Your webapp will be live at:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

## All-in-One Command (After Git is Installed)
```bash
cd /root/.local/MillerScript/Bots/webapp && \
git init && \
git add . && \
git commit -m "Initial commit: Discord Server Manager Webapp" && \
echo "✅ Repository initialized! Now add your GitHub remote and push."
```

## What's Included
- ✅ Complete webapp (HTML, CSS, JS)
- ✅ Channel deletion features
- ✅ Channel renaming with symbols/fonts
- ✅ Discohook integration
- ✅ Beautiful modern UI
- ✅ GitHub Pages ready

