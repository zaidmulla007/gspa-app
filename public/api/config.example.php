<?php
// SMTP Configuration Template
// COPY THIS FILE TO 'config.php' AND FILL IN YOUR CREDENTIALS

// SMTP Constants
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587); // TLS port
define('SMTP_SECURE', 'tls'); // encryption

// Credentials
define('SMTP_USERNAME', 'Wbmcontracting@gmail.com');
define('SMTP_PASSWORD', 'YOUR_16_CHARACTER_APP_PASSWORD_HERE'); // Generate at myaccount.google.com/apppasswords

// Email Settings
define('SMTP_FROM_EMAIL', 'Wbmcontracting@gmail.com');
define('SMTP_FROM_NAME', 'WBM Constructions Form');
define('SMTP_TO_EMAIL', 'Wbmcontracting@gmail.com'); // Where to receive emails

// Security & Rate Limiting
define('ALLOWED_ORIGIN', 'https://wbmcontractingllc.com'); // Update this with your actual domain
define('RATE_LIMIT_REQUESTS', 5); // Max requests per hour
define('RATE_LIMIT_TIME', 3600); // Time window in seconds
