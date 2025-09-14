# Custom Domain Setup Guide
## Connect thebackyardbeekeeping.com to Your Feeding Calculator

### You Have 3 Excellent Options:

---

## Option 1: Subdomain with GitHub Pages (RECOMMENDED)
**URL: `calculator.thebackyardbeekeeping.com`**

### Pros:
- ✅ FREE hosting on GitHub Pages
- ✅ Automatic SSL certificate
- ✅ No GHL limitations
- ✅ Full PWA functionality
- ✅ Easy to update

### Setup Steps:

#### Step 1: Create CNAME File in Repository
```bash
# In your local repository
echo "calculator.thebackyardbeekeeping.com" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push
```

#### Step 2: Configure DNS (Where Your Domain is Hosted)
Add these DNS records:

**If using Cloudflare/Namecheap/GoDaddy:**
```
Type: CNAME
Name: calculator
Value: anskm.github.io
TTL: Auto/3600
Proxy: OFF (if using Cloudflare)
```

#### Step 3: Update GitHub Pages Settings
1. Go to: https://github.com/AnsKM/bee-feeding-calculator/settings/pages
2. Under "Custom domain", enter: `calculator.thebackyardbeekeeping.com`
3. Check "Enforce HTTPS"
4. Wait 10-30 minutes for DNS propagation

#### Step 4: Test
Visit: https://calculator.thebackyardbeekeeping.com

---

## Option 2: GHL Subdomain Redirect
**URL: `calculator.thebackyardbeekeeping.com` → GHL Page**

### Pros:
- ✅ Integrated with your GHL funnels
- ✅ Track conversions in GHL
- ✅ Can add to membership areas
- ✅ Use GHL automations

### Setup Steps:

#### Step 1: Create GHL Website
1. In GHL: **Sites** → **Websites** → **New Website**
2. Name: "Feeding Calculator"
3. Add Custom HTML element with iframe:

```html
<!DOCTYPE html>
<html style="height: 100%; margin: 0; padding: 0;">
<head>
    <title>Feeding Calculator - Backyard Beekeeping</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            margin: 0;
            padding: 0;
            height: 100vh;
            overflow: hidden;
        }
        iframe {
            width: 100%;
            height: 100%;
            border: none;
        }
    </style>
</head>
<body>
    <iframe src="https://anskm.github.io/bee-feeding-calculator/" 
            title="Seasonal Feeding Calculator"
            allowfullscreen>
    </iframe>
</body>
</html>
```

#### Step 2: Connect Domain in GHL
1. Go to: **Settings** → **Domains**
2. Add domain: `calculator.thebackyardbeekeeping.com`
3. GHL will provide DNS records

#### Step 3: Update DNS
Add GHL's provided CNAME record:
```
Type: CNAME
Name: calculator
Value: [GHL-provided-value].clickfunnels.com
TTL: 3600
```

---

## Option 3: Embed in Main Site with Path
**URL: `thebackyardbeekeeping.com/calculator`**

### Pros:
- ✅ Better for SEO (same domain)
- ✅ Easier to remember
- ✅ Can track in main analytics
- ✅ Looks more professional

### Setup Methods:

#### Method A: If Using GHL for Main Site
1. Create new page in your site
2. URL slug: `/calculator`
3. Add Custom HTML element:

```html
<div style="width: 100%; min-height: 100vh; position: relative;">
    <iframe 
        src="https://anskm.github.io/bee-feeding-calculator/"
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
        title="Seasonal Feeding Calculator">
    </iframe>
</div>
```

#### Method B: If Using WordPress
Add to page or post:
```html
[iframe src="https://anskm.github.io/bee-feeding-calculator/" width="100%" height="800"]
```

Or use plugin like "Advanced iFrame"

#### Method C: If Using Other Platform
Create HTML page with:
```html
<!DOCTYPE html>
<html>
<head>
    <title>Feeding Calculator - The Backyard Beekeeping</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Calculate precise bee feeding amounts for your colonies">
    
    <!-- Redirect for direct access -->
    <script>
        // Optional: Check if mobile and open full screen
        if (window.innerWidth < 768) {
            window.location.href = 'https://anskm.github.io/bee-feeding-calculator/';
        }
    </script>
    
    <style>
        * { margin: 0; padding: 0; }
        body { overflow: hidden; }
        iframe { width: 100vw; height: 100vh; border: none; }
    </style>
</head>
<body>
    <iframe src="https://anskm.github.io/bee-feeding-calculator/"></iframe>
</body>
</html>
```

---

## 🎯 RECOMMENDED APPROACH

### Best Setup for Your Situation:

1. **Primary:** Use `calculator.thebackyardbeekeeping.com` with GitHub Pages
   - Free, fast, reliable
   - Professional subdomain
   - Full control

2. **Sales Integration:** Embed in GHL funnels
   - Use iframe in order forms
   - Track conversions
   - A/B test placement

3. **Marketing:** Link from main site
   - Add button: "Free Feeding Calculator"
   - Include in navigation menu
   - Feature on homepage

---

## Quick DNS Setup Guide

### Find Your DNS Provider:

#### If GoDaddy:
1. Login to GoDaddy
2. Go to: **My Products** → **Domains** → **Manage DNS**
3. Add CNAME record as shown above

#### If Namecheap:
1. Login to Namecheap
2. Go to: **Domain List** → **Manage** → **Advanced DNS**
3. Add CNAME record

#### If Cloudflare:
1. Login to Cloudflare
2. Select your domain
3. Go to: **DNS** → **Add Record**
4. Add CNAME (Proxy OFF for GitHub Pages)

#### If GHL is Managing DNS:
1. In GHL: **Settings** → **Domains**
2. Click your domain
3. Add DNS record

---

## Testing Your Setup

### After DNS Changes (Wait 10-30 minutes):

```bash
# Test DNS propagation
nslookup calculator.thebackyardbeekeeping.com

# Should return:
# calculator.thebackyardbeekeeping.com CNAME anskm.github.io
```

### Check These URLs:
- [ ] https://calculator.thebackyardbeekeeping.com
- [ ] Mobile responsive
- [ ] SSL certificate active
- [ ] Offline mode works

---

## Marketing Integration Ideas

### Email Signature:
```
📊 Free Feeding Calculator for Beekeepers
https://calculator.thebackyardbeekeeping.com
```

### Social Media Bio:
```
🐝 Backyard Beekeeping Resources
📊 Free Calculator: calculator.thebackyardbeekeeping.com
```

### Business Cards:
```
[QR Code]
Scan for Free Feeding Calculator
calculator.thebackyardbeekeeping.com
```

### Sales Page CTA:
```html
<a href="https://calculator.thebackyardbeekeeping.com" 
   class="button" 
   target="_blank">
   Try Our Free Feeding Calculator →
</a>
```

---

## Tracking & Analytics

### Add to Your Calculator (index.html):
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
  
  // Track calculator usage
  gtag('event', 'calculator_loaded', {
    'event_category': 'engagement',
    'event_label': 'feeding_calculator'
  });
</script>
```

### Track in GHL:
- Add FB Pixel
- Add Google Ads conversion
- Track form submissions
- Monitor time on page

---

## Support & Troubleshooting

### DNS Not Working?
- Wait up to 48 hours for global propagation
- Clear browser cache
- Try incognito mode
- Check DNS at: whatsmydns.net

### SSL Certificate Issues?
- GitHub Pages provides free SSL
- May take 24 hours to activate
- Force HTTPS in GitHub settings

### Need Help?
1. Check GitHub Pages status: githubstatus.com
2. Verify DNS: dnschecker.org
3. Test SSL: sslshopper.com/ssl-checker

---

## Summary - Your Best Path:

1. **Add CNAME file** to repository with `calculator.thebackyardbeekeeping.com`
2. **Add CNAME DNS record** pointing to `anskm.github.io`
3. **Update GitHub Pages** settings with custom domain
4. **Wait 30 minutes** and test
5. **Market everywhere** with your professional URL!

Your calculator will be available at:
### **https://calculator.thebackyardbeekeeping.com**

Professional, branded, and FREE! 🐝🎯