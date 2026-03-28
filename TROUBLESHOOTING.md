# 🔧 Troubleshooting Guide

## ❌ Error: 405 Method Not Allowed

### **Problem:**
When submitting the contact form on localhost, you get:
```
Request URL: http://localhost:3000/api/send-email.php
Status Code: 405 Method Not Allowed
```

### **Root Cause:**
Next.js **cannot execute PHP files**. It's a Node.js framework, not a PHP server. The PHP file exists in `/public/api/` but Next.js just treats it as a static file and doesn't know how to run it.

### **Solution:**

You need to run **TWO servers** for local development:

1. **Next.js Dev Server** (port 3000) - For your React/Next.js app
2. **PHP Server** (port 8000) - For the email API

---

## ✅ **Quick Start (Windows)**

### **Method 1: Use the Batch Script (Easiest)**

1. Double-click `start-local.bat` in the project root
2. Two command windows will open:
   - PHP Server on port 8000
   - Next.js on port 3000
3. Navigate to http://localhost:3000
4. Test the contact form
5. Press any key in the original window to stop both servers

### **Method 2: Manual Start (Two Terminals)**

**Terminal 1 - Start PHP Server:**
```bash
cd "d:\practice\wbm-constructions-next\public"
php -S localhost:8000
```

**Terminal 2 - Start Next.js:**
```bash
cd "d:\practice\wbm-constructions-next"
npm run dev
```

Navigate to: http://localhost:3000

---

## 🔍 **How to Debug 405 Errors**

### **Step 1: Check if PHP is installed**
```bash
php --version
```

**Expected output:**
```
PHP 8.x.x (cli) (built: ...)
```

**If not found:**
- Download PHP from https://windows.php.net/download/
- Add to system PATH
- Restart terminal

### **Step 2: Verify PHP server is running**

Open browser and visit:
```
http://localhost:8000/api/send-email.php
```

**Expected response (for GET request):**
```json
{"status":"error","message":"Method not allowed"}
```

This is **CORRECT** - it means PHP is working and only accepting POST requests.

**If you get "Connection refused" or "Cannot connect":**
- PHP server is not running
- Start it with: `cd public && php -S localhost:8000`

### **Step 3: Check the API URL in Contact.tsx**

Open [app/components/Contact.tsx](app/components/Contact.tsx) and verify line 35:

```typescript
const apiUrl = window.location.hostname === 'localhost'
  ? 'http://localhost:8000/api/send-email.php'  // ← Should be port 8000
  : 'https://wbmcontractingllc.com/api/send-email.php';
```

**If it says port 3000:**
- Change it to port 8000
- Save the file
- Refresh your browser

### **Step 4: Test the form submission**

1. Open http://localhost:3000
2. Go to contact section
3. Fill out the form
4. Open browser DevTools (F12) → Network tab
5. Click "Send Message"
6. Check the network request:

**Success indicators:**
- Request URL: `http://localhost:8000/api/send-email.php` (port 8000)
- Status: `200 OK`
- Response: `{"status":"success","message":"Message sent successfully!"}`

**Failure indicators:**
- Port 3000 instead of 8000 → Update Contact.tsx
- Connection refused → Start PHP server
- 405 error → Using wrong port or server not running

---

## 🌐 **Understanding the Setup**

### **Local Development:**
```
User Browser
    ↓
http://localhost:3000 (Next.js)
    ↓
[Contact Form Submit]
    ↓
http://localhost:8000/api/send-email.php (PHP)
    ↓
Gmail SMTP Server
    ↓
Email received at Wbmcontracting@gmail.com
```

### **Production:**
```
User Browser
    ↓
https://wbmcontractingllc.com (Next.js on Hostinger)
    ↓
[Contact Form Submit]
    ↓
https://wbmcontractingllc.com/api/send-email.php (PHP on same server)
    ↓
Gmail SMTP Server
    ↓
Email received at Wbmcontracting@gmail.com
```

---

## 📋 **Complete Testing Checklist**

### **Local Testing:**

- [ ] PHP is installed: `php --version`
- [ ] PHP server started: `cd public && php -S localhost:8000`
- [ ] Next.js started: `npm run dev`
- [ ] Contact.tsx uses port 8000 (line 35)
- [ ] Browser at http://localhost:3000
- [ ] Form submission shows loading spinner
- [ ] Network tab shows request to port 8000
- [ ] Status 200 OK received
- [ ] SweetAlert success message appears
- [ ] Email received at Wbmcontracting@gmail.com

### **Production Testing:**

- [ ] All files uploaded to `public_html/api/`
- [ ] PHPMailer folder exists: `public_html/api/PHPMailer/src/`
- [ ] config.php uploaded with credentials
- [ ] Next.js built: `npm run build`
- [ ] App deployed to https://wbmcontractingllc.com
- [ ] Form submission works
- [ ] Email received at Wbmcontracting@gmail.com

---

## 🐛 **Common Issues and Fixes**

### **Issue 1: "php is not recognized"**

**Cause:** PHP not installed or not in PATH

**Fix:**
1. Download PHP: https://windows.php.net/download/
2. Extract to `C:\php`
3. Add to PATH:
   - Windows → Edit System Environment Variables
   - System Variables → Path → Edit → New
   - Add: `C:\php`
4. Restart terminal
5. Test: `php --version`

---

### **Issue 2: Port 8000 already in use**

**Error:** `Failed to listen on localhost:8000`

**Fix:**
1. Find what's using port 8000:
   ```bash
   netstat -ano | findstr :8000
   ```
2. Kill the process or use a different port:
   ```bash
   php -S localhost:8001
   ```
3. Update Contact.tsx to use port 8001

---

### **Issue 3: CORS error in browser console**

**Error:** `Access to fetch at 'http://localhost:8000/...' has been blocked by CORS`

**Cause:** PHP server not sending proper CORS headers

**Fix:** Check [public/api/send-email.php](public/api/send-email.php) has these headers (already included):
```php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
```

---

### **Issue 4: Email not sending (PHP side)**

**Check PHP errors:**
1. Open [public/api/send-email.php](public/api/send-email.php)
2. Add at the top:
   ```php
   error_reporting(E_ALL);
   ini_set('display_errors', 1);
   ```
3. Check terminal running PHP server for error messages

**Common causes:**
- PHPMailer files missing → Re-download from GitHub
- Wrong Gmail credentials → Check config.php
- Gmail blocking access → Enable 2FA and use app password
- SMTP port blocked → Check firewall

---

### **Issue 5: Form doesn't reset after success**

**Cause:** JavaScript error in handleSubmit

**Fix:** Check browser console (F12) for errors

---

### **Issue 6: Success message doesn't appear**

**Cause:** SweetAlert2 not loaded

**Fix:**
1. Check package.json has sweetalert2
2. Reinstall: `npm install sweetalert2`
3. Rebuild: `npm run dev`

---

## 🎯 **Quick Diagnostic Commands**

Run these to check your setup:

```bash
# Check PHP installed
php --version

# Check Node installed
node --version

# Check npm installed
npm --version

# Check if port 8000 is available
netstat -ano | findstr :8000

# Check if port 3000 is available
netstat -ano | findstr :3000

# List files in api directory
dir "d:\practice\wbm-constructions-next\public\api"

# Check PHPMailer installed
dir "d:\practice\wbm-constructions-next\public\api\PHPMailer\src"
```

---

## 📞 **Still Having Issues?**

### **Check the following files:**

1. **[app/components/Contact.tsx:35](app/components/Contact.tsx#L35)** - API URL
2. **[public/api/config.php](public/api/config.php)** - Email credentials
3. **[public/api/send-email.php](public/api/send-email.php)** - Main handler

### **Verify setup:**

```bash
# Verify Contact.tsx has correct port
findstr "localhost:8000" app\components\Contact.tsx

# Verify config.php exists
dir public\api\config.php

# Verify PHPMailer exists
dir public\api\PHPMailer\src\PHPMailer.php
```

---

## ✅ **Success Indicators**

When everything works correctly:

1. **Terminal 1 (PHP):** Shows incoming POST requests
   ```
   [Wed Dec 11 21:45:23 2024] [::1]:54321 [200]: POST /api/send-email.php
   ```

2. **Terminal 2 (Next.js):** No errors, app running
   ```
   ✓ Ready in 2.5s
   ○ Compiling / ...
   ✓ Compiled / in 1.2s
   ```

3. **Browser Console:** No errors, success logged
   ```
   POST http://localhost:8000/api/send-email.php 200 OK
   ```

4. **Browser:** SweetAlert appears with success message

5. **Email:** Message arrives at Wbmcontracting@gmail.com

---

## 🚀 **Ready for Production?**

Once local testing works perfectly:

1. Build Next.js: `npm run build`
2. Upload `/public/api/` to hosting
3. Deploy Next.js app
4. Test on production URL
5. In production, PHP runs natively (no separate server needed)

The 405 error **ONLY happens in local development** because Next.js can't run PHP. In production (Hostinger), PHP runs natively and this issue doesn't exist! 🎉
