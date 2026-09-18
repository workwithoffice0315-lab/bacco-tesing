# Netlify Deployment Guide - Basco Group Website

Aapki website Netlify par 1-click deploy ke liye completely ready hai!

---

## Method 1: Git & GitHub ke through Deploy (Recommended)

1. **Code export ya push karein:**
   - AI Studio ke top right menu se **Export to GitHub** ya **Download ZIP** karein.
   - Code ko apne GitHub repository me push karein.

2. **Netlify Dashboard par jayein:**
   - [Netlify.com](https://app.netlify.com/) par login karein.
   - **"Add new site"** -> **"Import an existing project"** -> **"GitHub"** select karein.
   - Apni repository select karein.

3. **Build Settings (Netlify automatic detect kar lega via `netlify.toml`):**
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Functions directory:** `netlify/functions`

4. **Environment Variables (Optional par recommended):**
   - **Site configuration** -> **Environment variables** me jayein aur add karein:
     - `ADMIN_EMAIL` = `workwithoffice0315@gmail.com`
     - `ADMIN_WHATSAPP` = `919876543210` (apna 10/12 digit WhatsApp number)
     - `SMTP_HOST` = (Agar Gmail ya custom SMTP se live direct email dispatch karna ho)
     - `SMTP_USER` = (Aapka email)
     - `SMTP_PASS` = (App Password)

5. **Deploy Site** par click karein! Website kuch hi seconds me live ho jayegi.

---

## Method 2: Netlify Drop (Direct Folder Drag-and-Drop)

Agar aap bina Git ke direct deploy karna chahte hain:
1. Apne system par run karein:
   ```bash
   npm run build
   ```
2. Build complete hone par jo `dist` folder banta hai, use [Netlify Drop](https://app.netlify.com/drop) par drag-and-drop kar dein.
3. Website turant live ho jayegi! `public/_redirects` already setup hai isliye koi bhi page refresh karne par 404 error nahi aayega.

---

## Ready Features on Netlify:
- **Client-side Routing & Refresh:** `_redirects` aur `netlify.toml` configured hai.
- **Serverless API Functions:** Netlify Functions `/api/leads` aur `/api/settings` active hain.
- **WhatsApp Integration:** Form submit hote hi instant WhatsApp pre-filled message khulta hai.
- **Left-Side Floating WhatsApp:** Har page par active hai.
- **SEO & Meta Pixel:** Meta tags, OpenGraph, sitemap.xml, robots.txt sab bundled hain.
