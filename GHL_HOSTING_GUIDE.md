# GoHighLevel (GHL) Hosting Guide for Feeding Calculator
## Complete Beginner's Guide to Hosting Your Web App

### Table of Contents
1. [What You'll Need](#what-youll-need)
2. [Understanding GHL Hosting](#understanding-ghl-hosting)
3. [Step-by-Step Hosting Instructions](#step-by-step-hosting-instructions)
4. [Testing Your Live Site](#testing-your-live-site)
5. [Troubleshooting Common Issues](#troubleshooting-common-issues)
6. [Integration with Sales Funnel](#integration-with-sales-funnel)

---

## What You'll Need

### Prerequisites
- ✅ GoHighLevel account (with website hosting enabled)
- ✅ Your completed feeding calculator files (already done!)
- ✅ 15-30 minutes to set up
- ✅ Basic ability to copy/paste files

### Your Files to Upload
```
/feeding-calculator-webapp/
├── index.html          ← Main file
├── css/
│   ├── main.css       ← Styles
│   └── mobile.css     ← Mobile styles
├── js/
│   ├── calculator.js  ← Calculator logic
│   ├── calendar.js    ← Calendar logic
│   ├── emergency.js   ← Emergency guide
│   └── recipes.js     ← Recipe calculator
├── manifest.json      ← PWA configuration
└── service-worker.js  ← Offline functionality
```

---

## Understanding GHL Hosting

### What is GoHighLevel?
- **All-in-one marketing platform** that includes website hosting
- **Built for sales funnels** but can host standalone web apps
- **No coding required** for basic hosting
- **Automatic SSL** (https://) included

### Two Hosting Options in GHL

#### Option 1: Standalone Website (Recommended)
- Your calculator gets its own URL: `feeding-calculator.yourdomain.com`
- Full-screen experience
- Best for mobile use
- Can still be linked from sales pages

#### Option 2: Embedded in Funnel Page
- Calculator appears inside your sales funnel
- Integrated with order bumps
- May have sizing limitations
- Good for desktop users

---

## Step-by-Step Hosting Instructions

### Method 1: Using GHL Website Builder (Easiest)

#### Step 1: Access GHL Sites
1. **Login to GoHighLevel**
2. Navigate to: **Sites** → **Websites**
3. Click **"+ New Website"**
4. Choose **"Blank Website"** template
5. Name it: `Feeding Calculator`

#### Step 2: Upload Your Files
1. In the website builder, click **Settings** (gear icon)
2. Go to **"Custom Code"** section
3. Find **"Head Tracking Code"**
4. Add this code:
```html
<!-- Feeding Calculator Styles -->
<link rel="stylesheet" href="/css/main.css">
<link rel="stylesheet" href="/css/mobile.css">
<link rel="manifest" href="/manifest.json">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
<meta name="theme-color" content="#d68910">
```

#### Step 3: Create HTML Element
1. Return to page builder
2. Delete all default elements
3. Add **"Custom HTML"** element
4. Set to **full width** (100vw) and **full height** (100vh)
5. Paste your entire `index.html` content

#### Step 4: Upload CSS/JS Files
1. Go to **Settings** → **File Manager**
2. Create folders:
   - `css/`
   - `js/`
3. Upload files to respective folders:
   - Upload `main.css` and `mobile.css` to `/css/`
   - Upload all `.js` files to `/js/`
   - Upload `manifest.json` and `service-worker.js` to root

#### Step 5: Update File Paths
Since GHL uses CDN, update paths in your HTML:
```html
<!-- Change from -->
<link rel="stylesheet" href="css/main.css">

<!-- Change to -->
<link rel="stylesheet" href="https://storage.googleapis.com/msgsndr/[YOUR-ACCOUNT-ID]/css/main.css">
```

#### Step 6: Publish
1. Click **"Save"** in the builder
2. Click **"Publish"**
3. Choose domain/subdomain
4. Your app is now live! 🎉

---

### Method 2: Using GHL Funnel Builder (For Order Bump)

#### Step 1: Create or Edit Funnel
1. Navigate to: **Funnels** → Your sales funnel
2. Find your order form page
3. Click **"Edit Page"**

#### Step 2: Add Custom Code Section
1. Add a **"2 Column Row"** below your order form
2. In left column: Add your sales copy
3. In right column: Add **"Custom HTML"** element

#### Step 3: Embed Calculator
Add this iframe code:
```html
<div style="width: 100%; height: 600px; border: 2px solid #d68910; border-radius: 12px; overflow: hidden;">
  <iframe 
    src="https://feeding-calculator.yourdomain.com" 
    style="width: 100%; height: 100%; border: none;"
    title="Seasonal Feeding Calculator">
  </iframe>
</div>

<p style="text-align: center; margin-top: 10px;">
  <a href="https://feeding-calculator.yourdomain.com" 
     target="_blank" 
     style="color: #d68910; text-decoration: underline;">
    Open Calculator in New Tab for Better Mobile Experience
  </a>
</p>
```

#### Step 4: Add Order Bump Checkbox
1. Below the iframe, add order bump element
2. Configure:
   - **Product**: Seasonal Feeding Calculator
   - **Price**: $19-27
   - **Description**: "Get exact feeding amounts for YOUR colonies"

---

### Method 3: Using External Hosting + GHL Integration

If GHL file hosting is limited, use external hosting:

#### Option A: GitHub Pages (Free)
1. Create GitHub account
2. Create new repository: `feeding-calculator`
3. Upload all files
4. Enable GitHub Pages in Settings
5. Get URL: `https://yourusername.github.io/feeding-calculator`
6. Embed this URL in GHL

#### Option B: Netlify (Free)
1. Go to [netlify.com](https://netlify.com)
2. Drag your entire folder to deploy
3. Get instant URL
4. Use this URL in GHL iframe

---

## Testing Your Live Site

### Desktop Testing
1. **Open in regular browser**: Check all 4 tabs work
2. **Open in incognito**: Test without cache
3. **Test offline mode**: Disconnect internet, reload page

### Mobile Testing
1. **Open on your phone**: Visit the URL directly
2. **Add to home screen**: Test PWA installation
3. **Test offline**: Turn on airplane mode
4. **Test with others**: Send link to 2-3 people

### Testing Checklist
- [ ] Calculator computes correctly
- [ ] All tabs are clickable
- [ ] Dropdowns show larger text
- [ ] Navigation shows 2x2 grid on mobile
- [ ] Offline mode works after first visit
- [ ] Print recipe function works
- [ ] Settings save to local storage

---

## Troubleshooting Common Issues

### Issue: "Files won't upload"
**Solution**: 
- Check file size (GHL limit: 5MB per file)
- Compress images if needed
- Use external CDN for large files

### Issue: "JavaScript not working"
**Solution**:
```html
<!-- Add to bottom of HTML, before </body> -->
<script src="/js/calculator.js"></script>
<script src="/js/calendar.js"></script>
<script src="/js/emergency.js"></script>
<script src="/js/recipes.js"></script>
```

### Issue: "Styles look broken"
**Solution**:
- Clear GHL cache: Settings → Clear Cache
- Check file paths are correct
- Ensure CSS files uploaded successfully

### Issue: "Service worker not registering"
**Solution**:
- GHL requires HTTPS (automatic)
- Update service-worker.js path in index.html
- May need to host service-worker externally

### Issue: "Mobile view is zoomed in"
**Solution**:
Add to head section:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
```

---

## Integration with Sales Funnel

### As Order Bump
```markdown
✅ Add Seasonal Feeding Calculator ($19 Value)
   📊 Get exact feeding amounts for YOUR colonies
   📅 Regional schedules for your climate zone  
   🚨 Emergency feeding diagnostic included
   📱 Works offline on your phone in the bee yard
   [Add to Order - Just $19]
```

### As Upsell Page
Create dedicated page showing:
1. Screenshot/demo of calculator
2. Bullet points of benefits
3. Testimonial about preventing colony loss
4. Add to order button

### Email Follow-up
```
Subject: Your bees might starve this winter (calculator inside)

Hi [Name],

You got the Blueprint - great start! 

But Chapter 6 warned about starvation...

The #1 question I get: "How much should I feed?"

Your free calculator access: [Link]
(normally $27, free for Blueprint owners)

Save your colonies,
[Your name]
```

---

## Quick Setup Checklist

### Before Upload
- [ ] Test locally one more time
- [ ] Check all file paths are relative
- [ ] Ensure no console errors
- [ ] Verify mobile responsiveness

### During Upload  
- [ ] Create folder structure in GHL
- [ ] Upload HTML first
- [ ] Upload CSS files
- [ ] Upload JS files
- [ ] Upload manifest.json
- [ ] Upload service-worker.js

### After Upload
- [ ] Test on live URL
- [ ] Check mobile view
- [ ] Test offline functionality
- [ ] Share with 1-2 beta users
- [ ] Set up analytics tracking

### Integration
- [ ] Add to order bump
- [ ] Create email sequence
- [ ] Add to thank you page
- [ ] Include in member portal

---

## Advanced Tips

### Custom Domain
Instead of: `ghl-subdomain.yourdomain.com`
Use: `calculator.yourdomain.com`

1. Add CNAME record in your DNS
2. Point to GHL servers
3. Configure in GHL settings

### Analytics Tracking
Add to your HTML head:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-ID');
</script>
```

### Speed Optimization
1. Enable GHL CDN caching
2. Compress images (though we don't have any)
3. Minify CSS/JS files (optional)

---

## Support Resources

### GHL Support
- **Help Center**: support.gohighlevel.com
- **Facebook Group**: GHL Official Community
- **YouTube**: GoHighLevel channel

### Your App Issues
- Check browser console (F12)
- Test in different browsers
- Clear cache and cookies
- Try incognito/private mode

### Contact for Help
If stuck, provide:
1. Screenshot of error
2. Browser and device used
3. Steps you've completed
4. URL of your hosted site

---

## Final Notes

**Remember**: You're not just hosting a website - you're providing a valuable tool that can save beekeepers hundreds of dollars and prevent colony losses. The technical setup is just the beginning!

**Pro Tip**: Host it first as a simple test, get feedback from 2-3 beekeepers, then integrate fully into your sales funnel.

**Time Estimate**: 
- Basic hosting: 15-30 minutes
- Full integration: 1-2 hours
- Testing & refinement: 1-2 hours

You've got this! Your calculator is ready to help thousands of beekeepers. 🐝🎯