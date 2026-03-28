# Email API Setup Guide

This directory contains the PHP mailer setup for the contact form.

## 📧 Email Configuration

**From Email (Sender):** wbmcontractingcompany233@gmail.com
**To Email (Receiver):** Wbmcontracting@gmail.com
**App Password:** fbqm lybx njss jnjw

## 📁 Files Structure

```
public/api/
├── send-email.php      # Main email handler script
├── config.php          # Email credentials and settings (✅ Already configured)
├── config.example.php  # Template for configuration
├── PHPMailer/          # PHPMailer library (✅ Already installed)
│   └── src/
│       ├── PHPMailer.php
│       ├── SMTP.php
│       └── Exception.php
└── README.md           # This file
```

## 🚀 Deployment Instructions

### For Local Development (localhost)

1. **Install PHP** (if not already installed)
   - Windows: Download from https://windows.php.net/download/
   - Add PHP to your system PATH

2. **Test the setup**
   - The form will automatically use `http://localhost:3000/api/send-email.php`
   - Make sure PHP is accessible from your terminal

3. **Run your Next.js app**
   ```bash
   npm run dev
   ```

### For Production (Hostinger or other hosting)

1. **Upload Files via FTP/File Manager**
   - Upload the entire `api` folder to your hosting's `public_html` directory
   - Final structure: `public_html/api/send-email.php`

2. **Verify PHPMailer is uploaded**
   - Ensure `public_html/api/PHPMailer/src/` contains:
     - PHPMailer.php
     - SMTP.php
     - Exception.php

3. **Verify config.php exists**
   - File: `public_html/api/config.php`
   - Should contain your Gmail credentials (already configured)

4. **Set correct permissions** (via hosting control panel or FTP)
   ```bash
   chmod 644 send-email.php
   chmod 644 config.php
   chmod 755 api/
   ```

5. **Test the endpoint**
   - Visit: `https://wbmcontractingllc.com/api/send-email.php`
   - Should return: `{"status":"error","message":"Method not allowed"}` (this is correct for GET requests)

6. **Deploy your Next.js app**
   - Build: `npm run build`
   - The form will automatically use `https://wbmcontractingllc.com/api/send-email.php` in production

## 🧪 Testing

### Test locally:
1. Start your Next.js dev server: `npm run dev`
2. Navigate to the contact form
3. Fill out and submit the form
4. You should see a SweetAlert success message
5. Check the inbox at `Wbmcontracting@gmail.com`

### Test on production:
1. Visit https://wbmcontractingllc.com
2. Navigate to the contact section
3. Submit the form
4. Verify email arrives at `Wbmcontracting@gmail.com`

## 🔒 Security Features

✅ **CORS Protection** - Only allows requests from your domain
✅ **Rate Limiting** - Max 5 submissions per hour per IP
✅ **Input Sanitization** - All form data is sanitized
✅ **Email Validation** - Validates email format
✅ **SMTP Authentication** - Secure Gmail SMTP with app password

## 🐛 Troubleshooting

### Email not sending?

1. **Check PHP is installed**
   ```bash
   php --version
   ```

2. **Verify PHPMailer files exist**
   - Check `api/PHPMailer/src/PHPMailer.php` exists

3. **Check credentials in config.php**
   - From: wbmcontractingcompany233@gmail.com
   - Password: fbqm lybx njss jnjw
   - To: Wbmcontracting@gmail.com

4. **Gmail App Password issues**
   - Ensure 2FA is enabled on the Gmail account
   - Generate a new app password at: https://myaccount.google.com/apppasswords
   - Update `config.php` with the new password

5. **Check SMTP settings**
   - Host: smtp.gmail.com
   - Port: 587
   - Encryption: TLS

6. **Check hosting PHP version**
   - Requires PHP 7.4 or higher
   - Check via hosting control panel

### CORS errors?

- Add your domain to ALLOWED_ORIGIN in `config.php`
- Current: https://wbmcontractingllc.com

### Rate limit hit?

- Wait 1 hour or increase limits in `config.php`

## 📝 Notes

- **Email Flow**: User submits form → wbmcontractingcompany233@gmail.com sends email → Wbmcontracting@gmail.com receives it
- **Reply-To**: Set to user's email so you can reply directly
- **HTML Emails**: Nicely formatted with company branding
- **SweetAlert2**: Shows beautiful success/error messages
- **Loading States**: Button shows spinner while sending

## ✅ Implementation Complete

All files are properly configured and ready for deployment! 🎉

- ✅ SweetAlert2 installed
- ✅ Contact form updated with API integration
- ✅ PHP mailer script created
- ✅ PHPMailer library installed
- ✅ Config file created with credentials
- ✅ Loading states and error handling added
- ✅ Works on both local and production environments
