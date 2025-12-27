# Fix: Token Permission Issue

## Problem
Your token doesn't have write (`repo`) permissions to push to the repository.

## Solution: Regenerate Token with Proper Permissions

### Step 1: Create New Token with Repo Access

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Name it: `Discord Server Manager - Full Access`
4. Select expiration (30 days, 90 days, or no expiration)
5. **IMPORTANT**: Check these scopes:
   - ✅ **`repo`** (Full control of private repositories)
     - This includes: repo:status, repo_deployment, public_repo, repo:invite, security_events
6. Click **"Generate token"**
7. **COPY THE TOKEN** - you won't see it again!

### Step 2: Update Remote with New Token

```bash
cd /root/.local/MillerScript/Bots/webapp

# Remove old remote
git remote remove origin

# Add with new token (replace NEW_TOKEN with your new token)
git remote add origin https://NEW_TOKEN@github.com/Harrybradrocco/GINC.git

# Push
git push -u origin main
```

### Alternative: Use SSH (More Secure)

If you have SSH keys set up:

```bash
cd /root/.local/MillerScript/Bots/webapp

# Switch to SSH URL
git remote set-url origin git@github.com:Harrybradrocco/GINC.git

# Push
git push -u origin main
```

## Quick Fix Command

After getting your new token with `repo` scope, run:

```bash
cd /root/.local/MillerScript/Bots/webapp
git remote set-url origin https://YOUR_NEW_TOKEN@github.com/Harrybradrocco/GINC.git
git push -u origin main
```

