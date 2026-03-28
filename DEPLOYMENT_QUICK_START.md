# Quick Deployment Steps for Hostinger

## What You Need to Upload

Your project is now built and ready! Here's what to upload:

### Files to Upload to Hostinger

1. **Website Files (Static HTML/CSS/JS)**
   - Location: `out/` folder
   - Upload to: `public_html/` on Hostinger
   - This contains your entire built website

2. **Email API Files**
   - Location: `public/api/` folder
   - Upload to: `public_html/api/` on Hostinger
   - Files needed:
     - `send-email.php`
     - `config.php` (contains your email credentials)
     - `PHPMailer/` folder (download separately)

---

## Step-by-Step Upload Process

### Step 1: Login to Hostinger
1. Go to https://hpanel.hostinger.com
2. Login with your credentials
3. Click on your hosting plan
4. Go to "Files" → "File Manager"

### Step 2: Upload Website Files
1. Navigate to `public_html/` folder
2. Delete any default files (index.html, etc.)
3. Upload **ALL contents** from your local `out/` folder to `public_html/`
   - Upload the entire `_next/` folder
   - Upload all HTML files (index.html, about.html, etc.)
   - Upload `images/` folder
   - Upload all other files and folders

### Step 3: Create API Folder and Upload Email Files
1. In `public_html/`, create a new folder called `api`
2. Upload these files to `public_html/api/`:
   - `send-email.php` (from your `public/api/` folder)
   - `config.php` (from your `public/api/` folder)

### Step 4: Upload PHPMailer Library
1. Download PHPMailer: https://github.com/PHPMailer/PHPMailer/archive/refs/heads/master.zip
2. Unzip the downloaded file
3. Rename the unzipped folder to `PHPMailer`
4. Upload the entire `PHPMailer` folder to `public_html/api/`

### Step 5: Verify Your File Structure

Your Hostinger should look like this:

```
public_html/
├── _next/                    ← from out folder
│   ├── static/
│   └── [other Next.js files]
├── api/                      ← you created this
│   ├── PHPMailer/           ← downloaded separately
│   │   └── src/
│   │       ├── PHPMailer.php
│   │       ├── SMTP.php
│   │       └── Exception.php
│   ├── send-email.php       ← from public/api/
│   └── config.php           ← from public/api/
├── images/                   ← from out folder
├── index.html               ← from out folder
├── about.html               ← from out folder
├── services.html            ← from out folder
├── projects.html            ← from out folder
├── blog.html                ← from out folder
├── contact.html             ← from out folder
└── [other HTML files]       ← from out folder
```

---

## Your Email is Already Configured!

Your `config.php` file already has:
- SMTP Host: smtp.gmail.com
- Email: wbmcontractingcompany233@gmail.com
- App Password: fbqm lybx njss jnjw
- Receiving Email: Wbmcontracting@gmail.com
- Domain: https://wbmcontractingllc.com

**Just make sure to upload the config.php file as-is!**

---

## Testing After Upload

1. Visit your website: https://wbmcontractingllc.com
2. Navigate to the Contact page
3. Fill out the contact form
4. Submit the form
5. Check if email arrives at Wbmcontracting@gmail.com

---

## Common Issues and Fixes

### Issue: Email not sending
**Fix:** Verify these files exist on server:
- `public_html/api/send-email.php`
- `public_html/api/config.php`
- `public_html/api/PHPMailer/src/PHPMailer.php`

### Issue: 404 errors on pages
**Fix:** Ensure all files from `out/` are in `public_html/` root, not in a subfolder

### Issue: Images not loading
**Fix:** Make sure `images/` folder is uploaded to `public_html/images/`

---

## File Permissions (Set in Hostinger File Manager)

Right-click on files → Permissions:
- `config.php` → 644
- `send-email.php` → 644
- `PHPMailer/` folder → 755

---

## That's It!

Your website should now be live with working email functionality.

For detailed troubleshooting, see [HOSTINGER_DEPLOYMENT_GUIDE.md](HOSTINGER_DEPLOYMENT_GUIDE.md)
