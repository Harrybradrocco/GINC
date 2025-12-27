# Discord Server Manager Webapp

A beautiful, modern web application for managing Discord servers. This webapp allows you to manage channels, send webhooks, and integrate with Discohook - all from your browser!

## Features

### 🔐 Authentication
- Secure token storage (localStorage)
- Server ID management
- Real-time server information display

### 📁 Channel Management
- **Delete Channels**: Delete channels by category or delete all channels at once
- **Rename Channels**: 
  - Add symbols/prefixes to channel names
  - Apply different font styles (Bold, Italic, Monospace, Small Caps, Circled Numbers)
  - Apply to specific categories or all channels

### 🔗 Discohook Integration
- **Send Webhook Messages**: Send messages via Discord webhooks
- **Create Rich Embeds**: Build and send beautiful embeds with custom colors, images, and thumbnails
- **Create Share Links**: Generate Discohook share links for message templates

## 🚀 Deployment to GitHub Pages

### Method 1: Simple Deployment (Recommended)

1. **Create a GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/discord-server-manager.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click on **Settings**
   - Scroll down to **Pages** section
   - Under **Source**, select **main** branch and **/ (root)** folder
   - Click **Save**

3. **Access Your Webapp**
   - Your webapp will be available at: `https://YOUR_USERNAME.github.io/discord-server-manager/`

### Method 2: Using GitHub Actions (Advanced)

1. Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - name: Deploy
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./webapp
   ```

## 📋 Prerequisites

- A Discord Bot Token (create one at [Discord Developer Portal](https://discord.com/developers/applications))
- Bot must be added to your server with appropriate permissions:
  - `MANAGE_CHANNELS` - For deleting and renaming channels
  - `VIEW_CHANNEL` - For viewing channel information
- A Discord Webhook URL (for Discohook features)

## 🔧 Setup Instructions

1. **Get Your Discord Bot Token**
   - Go to [Discord Developer Portal](https://discord.com/developers/applications)
   - Create a new application or select an existing one
   - Go to the "Bot" section
   - Click "Reset Token" and copy your token
   - Enable "Message Content Intent" if needed

2. **Invite Bot to Server**
   - Go to "OAuth2" → "URL Generator"
   - Select scopes: `bot`
   - Select permissions: `Manage Channels`, `View Channels`
   - Copy the generated URL and open it in your browser
   - Select your server and authorize

3. **Get Server ID**
   - Enable Developer Mode in Discord (Settings → Advanced → Developer Mode)
   - Right-click on your server → Copy Server ID

4. **Get Webhook URL** (for Discohook features)
   - Go to Server Settings → Integrations → Webhooks
   - Create a new webhook or copy an existing one

## 🎨 Usage

1. **Enter Token and Server ID**
   - Enter your Discord bot token
   - Enter your server ID
   - Click "Save Token"

2. **Delete Channels**
   - Select a category (or leave empty for all channels)
   - Click "Delete Selected Channels"
   - Confirm the action

3. **Rename Channels**
   - Enter a symbol/prefix (optional)
   - Select a font style
   - Select a category (or leave empty for all channels)
   - Click "Apply Changes"

4. **Send Webhook Messages**
   - Enter webhook URL
   - Enter message content
   - Optionally add username and avatar URL
   - Click "Send Webhook Message"

5. **Create Embeds**
   - Fill in embed details (title, description, color, etc.)
   - Click "Send Embed"

6. **Create Share Links**
   - Enter message data in JSON format
   - Click "Create Share Link"
   - Copy the generated link

## ⚠️ Security Notes

- **Never share your bot token** with anyone
- Tokens are stored locally in your browser (localStorage)
- This webapp runs entirely client-side - no data is sent to external servers except Discord API
- Be careful when deleting channels - this action cannot be undone!

## 🐛 Troubleshooting

### "Failed to load server data"
- Check that your bot token is correct
- Ensure the bot is in the server
- Verify the server ID is correct
- Check that the bot has necessary permissions

### "Failed to delete/rename channel"
- Ensure the bot has `MANAGE_CHANNELS` permission
- Check that you're not trying to delete/rename system channels
- Verify rate limits aren't being hit

### CORS Errors
- **Important**: Discord API may block direct browser requests due to CORS policy
- **Solution 1**: Use a CORS proxy service (for testing only)
- **Solution 2**: Host on a proper domain (GitHub Pages works!)
- **Solution 3**: Use a browser extension to disable CORS (development only)
- **Note**: When hosted on GitHub Pages, CORS should work fine as it's a proper domain

## 📝 File Structure

```
webapp/
├── index.html      # Main HTML structure
├── styles.css      # Styling and themes
├── app.js          # Main application logic
└── README.md       # This file
```

## 🔗 Resources

- [Discord API Documentation](https://discord.com/developers/docs/intro)
- [Discohook API Documentation](https://docs.discohook.app/)
- [Discord Developer Portal](https://discord.com/developers/applications)

## 📄 License

This project is open source and available for personal use.

## 🙏 Credits

Built with ❤️ for Discord server management.

---

**Note**: This tool uses Discord's Bot API. Make sure you comply with Discord's Terms of Service when using this application.

