<?php
/**
 * PHPMailer Email Handler
 * 
 * Instructions for Hostinger:
 * 1. Upload this file to public_html/api/
 * 2. Upload config.php to public_html/api/ (created from config.example.php)
 * 3. Install PHPMailer:
 *    Option A (Easy): Download PHPMailer ZIP from https://github.com/PHPMailer/PHPMailer/archive/refs/heads/master.zip
 *                     Unzip and rename folder to 'PHPMailer' inside 'api' folder.
 *                     Structure should be: public_html/api/PHPMailer/src/...
 *    Option B (Composer): Run 'composer require phpmailer/phpmailer' in api directory
 */

header('Content-Type: application/json');

// 1. CORS Setup
// Allow requests only from your domain to prevent abuse
require_once 'config.php'; // Load configuration

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
// Allow local development and production domain
if ($origin === ALLOWED_ORIGIN || $origin === 'http://localhost:3000') {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
} else {
    // Optional: blocks requests from other domains, but for now we'll just not send CORS headers
    // http_response_code(403);
    // exit(json_encode(['status' => 'error', 'message' => 'Forbidden origin']));
}

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
    exit;
}

// 2. Load PHPMailer
// Try to load via Composer autoload or manual fallback
if (file_exists('vendor/autoload.php')) {
    require 'vendor/autoload.php';
} elseif (file_exists('PHPMailer/src/PHPMailer.php')) {
    require 'PHPMailer/src/Exception.php';
    require 'PHPMailer/src/PHPMailer.php';
    require 'PHPMailer/src/SMTP.php';
} else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Server error: PHPMailer library not found. Please upload PHPMailer folder.']);
    exit;
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// 3. Rate Limiting (Simple File-based)
$ip = $_SERVER['REMOTE_ADDR'];
$rate_file = sys_get_temp_dir() . '/rate_limit_' . md5($ip);
$current_time = time();

if (file_exists($rate_file)) {
    $data = json_decode(file_get_contents($rate_file), true);
    if ($data['count'] >= RATE_LIMIT_REQUESTS && ($current_time - $data['start_time']) < RATE_LIMIT_TIME) {
        http_response_code(429);
        echo json_encode(['status' => 'error', 'message' => 'Too many submissions. Please try again later.']);
        exit;
    }
    // Reset if time window passed
    if (($current_time - $data['start_time']) >= RATE_LIMIT_TIME) {
        $data = ['count' => 0, 'start_time' => $current_time];
    }
} else {
    $data = ['count' => 0, 'start_time' => $current_time];
}

// 4. Process Form Data
$input = json_decode(file_get_contents('php://input'), true);

$name = filter_var($input['name'] ?? '', FILTER_SANITIZE_STRING);
$email = filter_var($input['email'] ?? '', FILTER_SANITIZE_EMAIL);
$phone = filter_var($input['phone'] ?? '', FILTER_SANITIZE_STRING);
$subject = filter_var($input['subject'] ?? '', FILTER_SANITIZE_STRING);
$message = filter_var($input['message'] ?? '', FILTER_SANITIZE_STRING);

// Basic Validation
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Name, Email and Message are required.']);
    exit;
}

// 5. Send Email
$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->isSMTP();
    $mail->Host       = SMTP_HOST;
    $mail->SMTPAuth   = true;
    $mail->Username   = SMTP_USERNAME;
    $mail->Password   = SMTP_PASSWORD;
    $mail->SMTPSecure = SMTP_SECURE; // 'tls'
    $mail->Port       = SMTP_PORT;    // 587

    // Recipients
    $mail->setFrom(SMTP_FROM_EMAIL, SMTP_FROM_NAME);
    $mail->addAddress(SMTP_TO_EMAIL);     // Add a recipient
    $mail->addReplyTo($email, $name);     // Reply to the user

    // Content
    $mail->isHTML(true);
    $mail->Subject = "New Contact: " . ($subject ?: 'No Subject');
    $mail->Body    = "
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> {$name}</p>
        <p><strong>Email:</strong> {$email}</p>
        <p><strong>Phone:</strong> {$phone}</p>
        <p><strong>Subject:</strong> {$subject}</p>
        <hr>
        <p><strong>Message:</strong><br>{$message}</p>
    ";
    $mail->AltBody = "Name: $name\nEmail: $email\nPhone: $phone\nSubject: $subject\nMessage: $message";

    $mail->send();

    // Update rate limit
    $data['count']++;
    file_put_contents($rate_file, json_encode($data));

    echo json_encode(['status' => 'success', 'message' => 'Message sent successfully!']);

} catch (Exception $e) {
    // Log actual error to server file, return generic message to user
    error_log("Mailer Error: {$mail->ErrorInfo}");
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Message could not be sent. Please contact us directly.']);
}
