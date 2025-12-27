# Git Setup Instructions

## Quick Setup

### Option 1: Run the Setup Script
```bash
cd /root/.local/MillerScript/Bots/webapp
./setup-git.sh
```

### Option 2: Manual Setup

1. **Initialize Git Repository**
   ```bash
   cd /root/.local/MillerScript/Bots/webapp
   git init
   ```

2. **Add All Files**
   ```bash
   git add .
   ```

3. **Create Initial Commit**
   ```bash
   git commit -m "Initial commit: Discord Server Manager Webapp"
   ```

4. **Add Remote Repository** (after creating on GitHub)
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   ```

5. **Push to GitHub**
   ```bash
   git branch -M main
   git push -u origin main
   ```

## Enable GitHub Pages

1. Go to your GitHub repository
2. Click **Settings** → **Pages**
3. Under **Source**, select:
   - Branch: **main**
   - Folder: **/ (root)**
4. Click **Save**
5. Wait 1-2 minutes for deployment

## Your Webapp URL

After deployment, your webapp will be available at:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

## Files Included

- `index.html` - Main application
- `styles.css` - Styling
- `app.js` - Application logic
- `README.md` - Documentation
- `.nojekyll` - GitHub Pages config
- `.gitignore` - Git ignore rules

## Troubleshooting

### Git not installed?
Install git:
```bash
# Ubuntu/Debian
sudo apt-get install git

# macOS (with Homebrew)
brew install git

# Windows
# Download from https://git-scm.com/download/win
```

### Permission denied?
Make sure you have write permissions:
```bash
chmod +x setup-git.sh
```

