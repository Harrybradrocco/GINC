# Custom Domain Setup: ginc.qzz.io

## Important Note About DNS Records

Since `ginc.qzz.io` is a **subdomain** (not an apex domain like `qzz.io`), you need to use a **CNAME record**, not A or ANAME records.

- **A/ANAME records**: Used for apex domains (root domains like `qzz.io`)
- **CNAME records**: Used for subdomains (like `ginc.qzz.io`)

## Step 1: Add Custom Domain in GitHub

1. Go to your repository: https://github.com/Harrybradrocco/GINC/settings/pages
2. Under **"Custom domain"**, enter: `ginc.qzz.io`
3. Click **Save**
4. This will automatically create a `CNAME` file in your repository

## Step 2: Configure DNS Record

Go to your DNS provider (where you manage `qzz.io`) and create a **CNAME record**:

### DNS Record Details:
- **Type**: `CNAME`
- **Name/Host**: `ginc` (or `ginc.qzz.io` depending on your DNS provider)
- **Value/Target**: `harrybradrocco.github.io`
- **TTL**: 3600 (or default)

### Important:
- The CNAME must point to `harrybradrocco.github.io` (without the repository name)
- Do NOT point it to `harrybradrocco.github.io/GINC` or `harrybradrocco.github.io/ginc`

## Step 3: Verify DNS Configuration

After creating the CNAME record, verify it's working:

```bash
dig ginc.qzz.io +nostats +nocomments +nocmd
```

You should see something like:
```
ginc.qzz.io.    IN    CNAME    harrybradrocco.github.io.
harrybradrocco.github.io.    IN    CNAME    github-pages-server.
```

Or use online tools:
- https://dnschecker.org/
- https://www.whatsmydns.net/

## Step 4: Enable HTTPS (Optional but Recommended)

1. Go back to: https://github.com/Harrybradrocco/GINC/settings/pages
2. Wait for DNS to propagate (can take up to 24 hours)
3. Once DNS is verified, check **"Enforce HTTPS"**
4. This may take up to 24 hours to become available

## Troubleshooting

### DNS Not Working?
- Wait up to 24 hours for DNS propagation
- Make sure the CNAME points to `harrybradrocco.github.io` (not the full URL)
- Verify the record type is CNAME, not A or ANAME

### HTTPS Not Available?
- DNS must be fully propagated first
- Wait up to 24 hours after DNS is working
- Make sure the CNAME is correctly configured

### Still Having Issues?
- Check GitHub Pages status: https://github.com/Harrybradrocco/GINC/settings/pages
- Verify the CNAME file exists in your repository root
- Check DNS propagation with: https://dnschecker.org/

## Quick Reference

- **Your Domain**: `ginc.qzz.io`
- **GitHub Pages URL**: `harrybradrocco.github.io`
- **DNS Record Type**: `CNAME`
- **DNS Target**: `harrybradrocco.github.io`

