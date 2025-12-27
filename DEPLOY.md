# Quick Deployment Guide

## GitHub Pages Deployment (5 minutes)

### Step 1: Create Repository
```bash
cd webapp
git init
git add .
git commit -m "Initial commit: Discord Server Manager"
```

### Step 2: Push to GitHub
```bash
# Create a new repository on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select:
   - Branch: **main**
   - Folder: **/ (root)**
4. Click **Save**
5. Wait 1-2 minutes for deployment

### Step 4: Access Your Webapp
Your webapp will be live at:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

## Alternative: Deploy to Netlify/Vercel

### Netlify
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the `webapp` folder
3. Done! Your site is live

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel` in the `webapp` directory
3. Follow the prompts

## Local Testing

Simply open `index.html` in your browser, or use a local server:

```bash
# Python 3
python3 -m http.server 8000

# Node.js (with http-server)
npx http-server

# Then visit: http://localhost:8000
```

