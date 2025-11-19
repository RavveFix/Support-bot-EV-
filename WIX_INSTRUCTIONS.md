# How to Add Monta Chat Widget to Wix

## Step 1: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your GitHub repository: `https://github.com/RavveFix/Support-bot-EV-.git`
4. Click **"Deploy"**
5. Wait for deployment to complete
6. Copy your Vercel URL (e.g., `https://support-bot-ev.vercel.app`)

## Step 2: Add to Wix Site

### Method 1: Custom Code (Recommended)

1. In Wix Editor, go to **Settings** → **Custom Code**
2. Click **"+ Add Custom Code"**
3. Paste this code:

```html
<script src="https://YOUR-VERCEL-URL.vercel.app/embed.js"></script>
```

4. Replace `YOUR-VERCEL-URL` with your actual Vercel URL
5. Set **"Load code on"** → **"All pages"**
6. Set **"Place code in"** → **"Body - end"**
7. Click **"Apply"**

### Method 2: Embed Element

1. In Wix Editor, click **"Add"** (+)
2. Go to **"Embed"** → **"Custom Embeds"** → **"Embed a Widget"**
3. Paste this code:

```html
<script src="https://YOUR-VERCEL-URL.vercel.app/embed.js"></script>
```

4. Replace `YOUR-VERCEL-URL` with your actual Vercel URL
5. Position the embed element anywhere (it will create a floating widget)

## Step 3: Publish

1. Click **"Publish"** in Wix
2. The chat widget will appear in the bottom-right corner
3. It will auto-open after 1 second

## Features

✅ Works on all pages  
✅ Mobile-friendly  
✅ Auto-opens after 1 second  
✅ No keyboard popup on mobile  
✅ GDPR compliant (no data storage)  

## Troubleshooting

**Widget not showing?**
- Check that the Vercel URL is correct
- Make sure Custom Code is set to "All pages"
- Clear your browser cache

**Widget appears twice?**
- Remove one of the embed methods (use either Custom Code OR Embed Element, not both)

## Need Help?

Contact Vercel support or check the browser console for errors (F12).
