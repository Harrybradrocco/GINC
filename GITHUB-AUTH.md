# GitHub Authentication Setup

## ⚠️ Important: GitHub No Longer Accepts Passwords

GitHub requires a **Personal Access Token** instead of a password for authentication.

## Step 1: Create a GitHub Repository

1. Go to https://github.com/new
2. Repository name: `discord-server-manager` (or any name you prefer)
3. Make it **Public** (required for free GitHub Pages)
4. **Don't** initialize with README, .gitignore, or license
5. Click **Create repository**

## Step 2: Create a Personal Access Token

1. Go to https://github.com/settings/tokens
2. Click **Generate new token** → **Generate new token (classic)**
3. Give it a name: `Discord Server Manager`
4. Select expiration (30 days, 90 days, or no expiration)
5. Check these scopes:
   - ✅ `repo` (Full control of private repositories)
6. Click **Generate token**
7. **COPY THE TOKEN IMMEDIATELY** - you won't see it again!

## Step 3: Set Up Git Remote

Replace `harrybradrocco` with your GitHub username and `YOUR_REPO_NAME` with your repository name:

```bash
cd /root/.local/MillerScript/Bots/webapp

# Remove old remote if exists
git remote remove origin 2>/dev/null || true

# Add correct remote (replace with your actual repo name)
git remote add origin https://github.com/harrybradrocco/YOUR_REPO_NAME.git

# Rename branch to main
git branch -M main
```

## Step 4: Push Using Token

When you push, use your **username** and **token** (not password):

```bash
git push -u origin main
```

When prompted:
- **Username**: `harrybradrocco` (your GitHub username)
- **Password**: Paste your **Personal Access Token** (not your GitHub password)

## Alternative: Use Token in URL (More Secure)

You can embed the token in the URL to avoid entering it each time:

```bash
# Format: https://TOKEN@github.com/USERNAME/REPO.git
git remote set-url origin https://YOUR_TOKEN@github.com/harrybradrocco/YOUR_REPO_NAME.git
git push -u origin main
```

## Quick Commands (After Creating Repo and Token)

```bash
cd /root/.local/MillerScript/Bots/webapp

# Set your git identity (optional but recommended)
git config user.name "harrybradrocco"
git config user.email "your-email@example.com"

# Add remote (replace YOUR_REPO_NAME)
git remote add origin https://github.com/harrybradrocco/YOUR_REPO_NAME.git

# Rename branch
git branch -M main

# Push (use token when prompted for password)
git push -u origin main
```

## Troubleshooting

### "Authentication failed"
- Make sure you're using a **token**, not your password
- Check that the token has `repo` scope
- Verify the repository name is correct

### "Repository not found"
- Make sure the repository exists on GitHub
- Check that you spelled the repository name correctly
- Verify you have access to the repository

### "Permission denied"
- Your token might have expired
- Create a new token and try again

