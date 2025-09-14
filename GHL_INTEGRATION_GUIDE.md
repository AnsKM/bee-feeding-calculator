# 🚀 GHL Integration Guide - Quick Setup

## Your Calculator URL:
**https://anskm.github.io/bee-feeding-calculator/**

---

## 📋 Step-by-Step GHL Setup

### Step 1: Create Calculator Page in GHL

1. **Login to GoHighLevel**
2. Go to: **Sites** → **Websites** (or **Funnels** if adding to funnel)
3. Click **"+ Add New"** → **"Blank Page"**
4. Name it: `Feeding Calculator`
5. URL Path: `/calculator`

### Step 2: Add the Embed Code

1. In the page builder, **delete all default elements**
2. Drag a **"Custom JS/HTML"** element
3. Click the element to edit
4. **Paste this code:**

```html
<!DOCTYPE html>
<html style="height: 100%; margin: 0; padding: 0;">
<head>
    <title>Feeding Calculator - The Backyard Beekeeping</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        * { margin: 0; padding: 0; }
        body { height: 100vh; overflow: hidden; }
        iframe { width: 100%; height: 100%; border: none; }
    </style>
</head>
<body>
    <iframe src="https://anskm.github.io/bee-feeding-calculator/"></iframe>
</body>
</html>
```

5. **Save** and **Publish**

### Step 3: Configure Settings

In GHL Page Settings:
- **SEO Title:** "Bee Feeding Calculator - Calculate Exact Amounts"
- **SEO Description:** "Free calculator to determine precise feeding amounts for your bee colonies based on region and season"
- **Page Path:** `/calculator`

---

## 🎯 Order Bump Integration

### Add to Your Checkout Page:

1. Go to your order form/checkout page
2. Add **"Custom JS/HTML"** element below order form
3. Paste this code:

```html
<div style="border: 3px solid #d68910; border-radius: 12px; padding: 20px; margin: 20px 0;">
    <h3 style="color: #d68910;">🐝 Try the Calculator!</h3>
    
    <iframe 
        src="https://anskm.github.io/bee-feeding-calculator/"
        style="width: 100%; height: 400px; border: 2px solid #f4d03f; border-radius: 8px;">
    </iframe>
    
    <label style="display: block; padding: 15px; background: #f4d03f; border-radius: 8px; margin-top: 15px; cursor: pointer;">
        <input type="checkbox" name="order_bump" value="feeding_calculator" style="margin-right: 10px;">
        <strong>YES! Add Calculator Access for Just $19</strong>
    </label>
</div>
```

### Configure Order Bump Product:

1. Go to: **Payments** → **Products**
2. Create product: "Seasonal Feeding Calculator"
3. Price: $19
4. Description: "Lifetime access to feeding calculator with updates"

---

## 📱 Mobile Optimization

### Add Mobile Redirect Option:

For better mobile experience, add this to your GHL page:

```html
<script>
// Detect mobile and offer full-screen option
if (window.innerWidth < 768) {
    const banner = document.createElement('div');
    banner.style.cssText = 'position: fixed; bottom: 0; left: 0; right: 0; background: #d68910; color: white; padding: 10px; text-align: center; z-index: 9999;';
    banner.innerHTML = `
        📱 For better mobile experience: 
        <a href="https://anskm.github.io/bee-feeding-calculator/" 
           target="_blank" 
           style="color: white; text-decoration: underline;">
           Open Full Screen →
        </a>
        <button onclick="this.parentElement.remove()" 
                style="margin-left: 10px; background: white; color: #d68910; border: none; padding: 2px 8px; border-radius: 3px;">
           ✕
        </button>
    `;
    document.body.appendChild(banner);
}
</script>
```

---

## 📊 Tracking Setup

### Add to Your GHL Global Tracking Code:

```javascript
// Track calculator views
if (window.location.pathname.includes('/calculator')) {
    // Facebook Pixel
    fbq('track', 'ViewContent', {
        content_name: 'Feeding Calculator',
        value: 19.00,
        currency: 'USD'
    });
    
    // Google Analytics
    gtag('event', 'page_view', {
        page_title: 'Feeding Calculator',
        page_path: '/calculator',
        value: 19
    });
}
```

---

## 🔗 Marketing Integration

### 1. Add to Navigation Menu
- **Menu Label:** "Feeding Calculator"
- **URL:** `/calculator`
- **Icon:** 🐝 or calculator icon

### 2. Email Campaign Link
```html
<a href="https://thebackyardbeekeeping.com/calculator" 
   style="display: inline-block; padding: 12px 24px; background: #d68910; color: white; text-decoration: none; border-radius: 5px;">
   Try Our Free Feeding Calculator →
</a>
```

### 3. SMS Campaign
```
🐝 Save your bees from starvation!
Try our FREE feeding calculator:
thebackyardbeekeeping.com/calculator

Calculate exact amounts for YOUR colonies.
```

### 4. Social Media Posts
```
New Tool Alert! 🐝

Our FREE Feeding Calculator helps you:
✓ Calculate exact feeding amounts
✓ Know when to switch ratios
✓ Prevent colony starvation

Try it now: thebackyardbeekeeping.com/calculator
```

---

## 🎨 Custom Styling (Optional)

### Match Your Brand Colors:

Add this CSS to your GHL global styles:

```css
/* Calculator Page Styling */
.calculator-page {
    background: #fef9f0;
}

.calculator-header {
    background: linear-gradient(135deg, #d68910, #f4d03f);
    padding: 20px;
    text-align: center;
    color: white;
}

.calculator-embed {
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    border-radius: 12px;
    overflow: hidden;
}
```

---

## ✅ Testing Checklist

After setup, test these:

- [ ] Desktop view works
- [ ] Mobile view works
- [ ] Calculator loads properly
- [ ] Order bump checkbox works
- [ ] Tracking fires correctly
- [ ] Mobile redirect works (if added)
- [ ] Navigation link works
- [ ] Page loads fast

---

## 🚀 Go Live Checklist

1. **Page Created** ✓
2. **Embed Code Added** ✓
3. **Mobile Optimized** ✓
4. **Tracking Added** ✓
5. **Order Bump Configured** ✓
6. **Published** ✓

Your calculator is now integrated with GHL!

**Live URL:** `https://thebackyardbeekeeping.com/calculator`

---

## 📈 Performance Tips

1. **Pre-load the iframe** on your main page:
```html
<link rel="preconnect" href="https://anskm.github.io">
<link rel="dns-prefetch" href="https://anskm.github.io">
```

2. **Lazy load** on long pages:
```html
<iframe loading="lazy" src="https://anskm.github.io/bee-feeding-calculator/"></iframe>
```

3. **Cache the page** in GHL:
- Go to page settings
- Enable "Cache Page"
- Set cache duration: 1 hour

---

## 🆘 Troubleshooting

**Calculator not loading?**
- Check if GitHub Pages is up: https://www.githubstatus.com
- Try direct URL: https://anskm.github.io/bee-feeding-calculator/

**Not responsive on mobile?**
- Ensure viewport meta tag is included
- Test in GHL mobile preview

**Tracking not working?**
- Check if GTM/Pixel is installed globally
- Verify in Facebook Pixel Helper extension

---

## 📞 Support

**Calculator Issues:** Create issue at https://github.com/AnsKM/bee-feeding-calculator/issues
**GHL Issues:** support.gohighlevel.com

You're all set! The calculator is ready to help convert visitors into customers! 🐝💰