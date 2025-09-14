# 🚀 Quick Start: Host on GHL in 10 Minutes

## The Absolute Simplest Way (Copy-Paste Method)

### Step 1: Login to GoHighLevel
- Go to your GHL dashboard
- Navigate to: **Sites** → **Websites** → **"+ New Website"**

### Step 2: Create Blank Website
- Choose **"Blank Website"**
- Name: `Feeding Calculator`
- Click **Create**

### Step 3: Add Custom HTML Element
1. In the builder, delete everything
2. Drag **"Custom HTML"** element
3. Set width: **100%**
4. Set height: **100vh** (full screen)

### Step 4: Copy Your Code
1. Open these files on your computer:
   - `index.html`
   - `css/main.css`
   - `css/mobile.css`
   - `js/calculator.js`
   - `js/calendar.js`
   - `js/emergency.js`
   - `js/recipes.js`

### Step 5: Combine Everything
Create one big HTML file with everything inside:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
    <title>Seasonal Feeding Calculator</title>
    
    <style>
        /* PASTE YOUR main.css CONTENT HERE */
        [Copy everything from main.css]
        
        /* PASTE YOUR mobile.css CONTENT HERE */
        [Copy everything from mobile.css]
    </style>
</head>
<body>
    <!-- PASTE YOUR index.html BODY CONTENT HERE -->
    [Copy everything between <body> and </body> from index.html]
    
    <script>
        /* PASTE YOUR calculator.js HERE */
        [Copy entire calculator.js file]
        
        /* PASTE YOUR calendar.js HERE */
        [Copy entire calendar.js file]
        
        /* PASTE YOUR emergency.js HERE */
        [Copy entire emergency.js file]
        
        /* PASTE YOUR recipes.js HERE */
        [Copy entire recipes.js file]
    </script>
</body>
</html>
```

### Step 6: Paste & Publish
1. Paste this combined code into the Custom HTML element
2. Click **Save**
3. Click **Publish**
4. Choose your domain
5. **DONE!** Your calculator is live! 🎉

---

## Even Simpler: Use External Hosting

### Option A: Netlify (2 minutes)
1. Go to [netlify.com](https://netlify.com)
2. Drag your entire `feeding-calculator-webapp` folder onto the page
3. Get instant URL: `https://amazing-bee-12345.netlify.app`
4. Use this URL in GHL

### Option B: Vercel (3 minutes)
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub/GitLab/Bitbucket
3. Import your project
4. Auto-deploys in seconds
5. Get URL to use in GHL

### Add to GHL (After External Hosting)
In your GHL page, add Custom HTML:
```html
<iframe 
  src="YOUR-NETLIFY-OR-VERCEL-URL" 
  style="width: 100%; height: 100vh; border: none;">
</iframe>
```

---

## The "I Need This Working NOW" Method

### 1. Create a Codepen
1. Go to [codepen.io](https://codepen.io)
2. Create new pen
3. Paste HTML, CSS, JS in respective panels
4. Get shareable URL

### 2. Embed in GHL
```html
<iframe 
  src="https://codepen.io/your-username/full/pen-id" 
  style="width: 100%; height: 600px; border: 2px solid #d68910;">
</iframe>
```

---

## Testing Your Live Calculator

### Mobile Test (1 minute)
1. Open on your phone
2. Tap all 4 tabs
3. Try the calculator
4. Check if navigation is 2x2 grid

### Desktop Test (1 minute)
1. Open in Chrome
2. Press F12 for DevTools
3. Click mobile icon
4. Verify it looks good

---

## Common Issues & Quick Fixes

### "It looks broken!"
Add this to your GHL Custom HTML element's settings:
```css
* { margin: 0; padding: 0; box-sizing: border-box; }
```

### "JavaScript not working!"
Make sure scripts are at the BOTTOM, before `</body>`

### "Fonts look weird!"
Add Google Fonts to head:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
```

### "Can't see on mobile!"
Add viewport meta tag:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

---

## Order Bump Integration (2 minutes)

### In Your Sales Page
Add this near your order form:

```html
<div style="border: 3px solid #d68910; padding: 20px; margin: 20px 0; border-radius: 8px;">
    <h3>✅ YES! Add the Feeding Calculator ($19 value)</h3>
    <p>Calculate exact feeding amounts for YOUR colonies!</p>
    <ul>
        <li>✓ Regional schedules for your zone</li>
        <li>✓ Emergency feeding guide</li>
        <li>✓ Works offline on your phone</li>
        <li>✓ Saves colonies from starvation</li>
    </ul>
    <label>
        <input type="checkbox" name="order_bump" value="feeding_calculator">
        <strong>Add to my order for just $19</strong>
    </label>
</div>
```

---

## You're Done! 🎯

**Total Time**: 10-15 minutes
**Skill Level**: Copy & Paste
**Result**: Professional feeding calculator live on your domain

### Next Steps
1. Share URL with 2-3 beekeepers for feedback
2. Add to your email sequence
3. Include in thank you page
4. Start tracking conversions

### Remember
- The calculator works offline after first visit
- Mobile users see 2x2 navigation grid
- All dropdowns have larger, readable text
- It's already saving colonies!

**Need Help?** The calculator is self-contained and tested. If it works on localhost:9999, it will work on GHL!