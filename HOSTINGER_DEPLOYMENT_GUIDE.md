# Hostinger Deployment Guide - WBM Constructions

## Complete Step-by-Step Deployment Instructions

### Prerequisites
- Active Hostinger hosting account
- Your domain configured in Hostinger
- Gmail account with App Password (for email functionality)

---

## Part 1: Prepare Files for Upload

### 1. Build the Project (Already Done)
The `out` folder contains your built static website.

### 2. Prepare Email Configuration
You need to create the actual `config.php` file with your real credentials.

**Location:** `public/api/config.php`

---

## Part 2: Upload to Hostinger

### Method 1: Using Hostinger File Manager (Recommended for Beginners)

1. **Login to Hostinger**
   - Go to https://hpanel.hostinger.com
   - Login with your credentials

2. **Access File Manager**
   - Click on your hosting plan
   - Go to "Files" → "File Manager"
   - Navigate to `public_html` folder

3. **Clear public_html** (if not empty)
   - Delete all default files in `public_html` (like index.html, default pages)
   - Keep `.htaccess` if it exists

4. **Upload Website Files**
   - Upload ALL files from the `out` folder to `public_html`
   - Your structure should be:
     ```
     public_html/
     ├── _next/
     ├── api/          (this will be created in next steps)
     ├── images/
     ├── index.html
     ├── about.html
     ├── services.html
     ├── projects.html
     ├── blog.html
     ├── contact.html
     └── [other files from out folder]
     ```

5. **Create api folder**
   - In `public_html`, create a new folder called `api`
   - Upload these files to `public_html/api/`:
     * `send-email.php` (from your project's `public/api/send-email.php`)
     * `config.example.php` (from your project's `public/api/config.example.php`)

6. **Upload PHPMailer Library**
   - Download PHPMailer: https://github.com/PHPMailer/PHPMailer/archive/refs/heads/master.zip
   - Unzip the downloaded file
   - Rename the folder to `PHPMailer`
   - Upload the `PHPMailer` folder to `public_html/api/`
   - Final structure:
     ```
     public_html/api/
     ├── PHPMailer/
     │   ├── src/
     │   │   ├── PHPMailer.php
     │   │   ├── SMTP.php
     │   │   └── Exception.php
     │   └── [other PHPMailer files]
     ├── send-email.php
     └── config.example.php
     ```

---

### Method 2: Using FTP (FileZilla)

1. **Get FTP Credentials**
   - In Hostinger panel, go to "Files" → "FTP Accounts"
   - Note down: FTP Host, Username, Password, Port

2. **Connect with FileZilla**
   - Download FileZilla: https://filezilla-project.org
   - Open FileZilla
   - Enter: Host, Username, Password, Port (usually 21)
   - Click "Quickconnect"

3. **Upload Files**
   - Navigate to `public_html` on the right panel (server)
   - Navigate to your `out` folder on the left panel (local)
   - Delete default files in `public_html`
   - Drag all files from `out` folder to `public_html`
   - Create `api` folder in `public_html`
   - Upload `send-email.php` and `config.example.php` to `api` folder
   - Upload `PHPMailer` folder to `api` folder

---

## Part 3: Configure Email Functionality

### 1. Get Gmail App Password

1. Go to https://myaccount.google.com/apppasswords
2. Login with your Gmail account (Wbmcontracting@gmail.com)
3. Select "Mail" and "Other (custom name)"
4. Name it "WBM Website"
5. Click "Generate"
6. Copy the 16-character password (looks like: `abcd efgh ijkl mnop`)

### 2. Create config.php on Server

Using Hostinger File Manager:

1. Navigate to `public_html/api/`
2. Find `config.example.php`
3. Right-click → Edit or View
4. Copy the contents
5. Create a new file called `config.php`
6. Paste the contents
7. Replace the following values:

```php
<?php
// SMTP Configuration

// SMTP Constants
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_SECURE', 'tls');

// Credentials
define('SMTP_USERNAME', 'Wbmcontracting@gmail.com');
define('SMTP_PASSWORD', 'YOUR_16_CHAR_APP_PASSWORD_HERE'); // Paste the app password from step 1

// Email Settings
define('SMTP_FROM_EMAIL', 'Wbmcontracting@gmail.com');
define('SMTP_FROM_NAME', 'WBM Constructions Website');
define('SMTP_TO_EMAIL', 'Wbmcontracting@gmail.com'); // Where you want to receive emails

// Security & Rate Limiting
define('ALLOWED_ORIGIN', 'https://wbmcontractingllc.com'); // Your actual domain
define('RATE_LIMIT_REQUESTS', 5);
define('RATE_LIMIT_TIME', 3600);
```

8. Save the file
9. **Important:** Set file permissions to 644 (right-click → Permissions → 644)

### 3. Verify PHP Version

1. In Hostinger panel, go to "Advanced" → "PHP Configuration"
2. Ensure PHP version is 7.4 or higher (8.0+ recommended)
3. Save if you made changes

---

## Part 4: Update Domain Configuration (If Needed)

### If Using Subdomain

If your site is in a subdomain (e.g., www.wbmcontractingllc.com), update `config.php`:

```php
define('ALLOWED_ORIGIN', 'https://www.wbmcontractingllc.com');
```

### If Using www Redirect

In `public_html/.htaccess`, add:

```apache
RewriteEngine On
RewriteCond %{HTTP_HOST} ^wbmcontractingllc\.com$ [NC]
RewriteRule ^(.*)$ https://www.wbmcontractingllc.com/$1 [R=301,L]
```

---

## Part 5: Testing

### 1. Test Website Loading

- Visit your domain: https://wbmcontractingllc.com
- Check all pages load correctly
- Verify images display properly

### 2. Test Email Functionality

1. Go to the Contact page
2. Fill out the contact form
3. Submit the form
4. Check if:
   - Success message appears
   - Email arrives at Wbmcontracting@gmail.com
   - Email contains all form details

### 3. Test from Different Devices

- Desktop browser
- Mobile browser
- Different browsers (Chrome, Firefox, Safari)

---

## Part 6: Troubleshooting

### Email Not Sending

**Check 1: Verify config.php exists**
- Navigate to `public_html/api/config.php`
- Ensure it exists and has correct credentials

**Check 2: PHPMailer library**
- Verify `public_html/api/PHPMailer/src/` contains:
  - PHPMailer.php
  - SMTP.php
  - Exception.php

**Check 3: File permissions**
```
public_html/api/config.php → 644
public_html/api/send-email.php → 644
public_html/api/PHPMailer/ → 755
```

**Check 4: PHP Error Logs**
- In Hostinger panel, go to "Advanced" → "Error Logs"
- Look for PHP errors related to email

**Check 5: Gmail Security**
- Ensure "Less secure app access" is OFF
- Ensure you're using App Password, not regular password
- Check if Gmail blocked the sign-in attempt

### Website Not Loading

**Check 1: Domain DNS**
- In Hostinger panel, go to "Domain" → DNS settings
- Verify A record points to your hosting server IP

**Check 2: File structure**
- Ensure `index.html` is in `public_html` root
- Not in a subfolder

**Check 3: Clear browser cache**
- Hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)

### CORS Errors

If you see CORS errors in browser console:

1. Edit `public_html/api/send-email.php`
2. Update line 23 with your actual domain:
   ```php
   if ($origin === 'https://wbmcontractingllc.com' ||
       $origin === 'https://www.wbmcontractingllc.com' ||
       $origin === 'http://localhost:3000') {
   ```

---

## Quick Checklist

- [ ] Built website with `npm run build`
- [ ] Uploaded all files from `out/` to `public_html/`
- [ ] Created `api` folder in `public_html/`
- [ ] Uploaded `send-email.php` to `api/`
- [ ] Downloaded and uploaded PHPMailer library to `api/PHPMailer/`
- [ ] Generated Gmail App Password
- [ ] Created `config.php` with real credentials
- [ ] Set file permissions correctly
- [ ] Updated ALLOWED_ORIGIN with your domain
- [ ] Tested website loading
- [ ] Tested contact form
- [ ] Verified email delivery

---

## File Structure Reference

```
public_html/
├── _next/                    (from out folder)
├── api/
│   ├── PHPMailer/
│   │   └── src/
│   │       ├── PHPMailer.php
│   │       ├── SMTP.php
│   │       └── Exception.php
│   ├── send-email.php
│   └── config.php           (YOUR CREDENTIALS - DO NOT COMMIT TO GIT)
├── images/                   (from out folder)
├── index.html               (from out folder)
├── about.html               (from out folder)
├── services.html            (from out folder)
├── projects.html            (from out folder)
├── blog.html                (from out folder)
├── contact.html             (from out folder)
└── [other files from out]
```

---

## Security Notes

1. **NEVER** commit `config.php` to Git (already in .gitignore)
2. **ALWAYS** use App Password, never your real Gmail password
3. Consider adding reCAPTCHA for additional spam protection
4. Monitor email sending logs for abuse
5. Backup your `config.php` securely

---

## Support

If you encounter issues:

1. Check Hostinger Knowledge Base: https://support.hostinger.com
2. Contact Hostinger Support through your panel
3. Check browser console for JavaScript errors
4. Check Hostinger error logs for PHP errors

---

## Updates and Maintenance

### To Update Website Content:

1. Make changes in your local project
2. Run `npm run build`
3. Upload updated files from `out/` folder to `public_html/`
4. Clear browser cache to see changes

### To Update Email Settings:

1. Edit `public_html/api/config.php` directly on server
2. Or edit locally and re-upload

---

**Deployment Date:** December 2025
**Last Updated:** December 12, 2025
