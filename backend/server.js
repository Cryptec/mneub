require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  if (req.method === 'POST') {
    console.log('Request body:', JSON.stringify(req.body, null, 2));
  }
  next();
});

// Validate required environment variables
const requiredEnvVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'SMTP_FROM', 'SMTP_TO'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('Error: Missing required environment variables:', missingVars.join(', '));
  process.exit(1);
}

// Create transporter for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT, 10),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  tls: {
    // Do not fail on invalid certs
    rejectUnauthorized: false
  },
  debug: process.env.NODE_ENV === 'development',
  logger: process.env.NODE_ENV === 'development'
});

// Test route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'API is running' });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    // Log incoming request for debugging
    console.log('Received contact form submission:', req.body);
    
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      console.log('Validation failed - missing fields');
      return res.status(400).json({ 
        success: false, 
        message: 'Bitte füllen Sie alle Felder aus' 
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Validation failed - invalid email format');
      return res.status(400).json({
        success: false,
        message: 'Bitte geben Sie eine gültige E-Mail-Adresse ein'
      });
    }

    // Email options
    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_FROM}>`,
      to: process.env.SMTP_TO,
      replyTo: email,
      subject: `Neue Kontaktanfrage von ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nNachricht:\n${message}`,
      html: `
        <h2>Neue Kontaktanfrage</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Nachricht:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Send email
    console.log('Attempting to send email...');
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);

    res.status(200).json({
      success: true,
      message: 'Ihre Nachricht wurde erfolgreich versendet!',
    });
  } catch (error) {
    console.error('Error in contact form handler:', error);
    
    // More specific error messages based on error type
    let errorMessage = 'Beim Senden der Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.';
    
    if (error.code === 'ECONNECTION') {
      errorMessage = 'Verbindung zum E-Mail-Server fehlgeschlagen. Bitte überprüfen Sie Ihre Internetverbindung.';
    } else if (error.code === 'EAUTH') {
      errorMessage = 'Anmeldedaten für das E-Mail-Konto sind ungültig. Bitte überprüfen Sie die Einstellungen.';
    } else if (error.responseCode) {
      errorMessage = `E-Mail-Server hat mit Fehler geantwortet: ${error.responseCode} ${error.response}`;
    }
    
    res.status(500).json({
      success: false,
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  const os = require('os');
  const ifaces = os.networkInterfaces();
  const address = server.address();
  
  console.log(`\n=== Server Information ===`);
  console.log(`Server is running on port ${PORT}`);
  console.log(`\nAccess URLs:`);
  console.log(`  - Local:       http://localhost:${PORT}`);
  console.log(`  - Network:     http://${os.hostname()}:${PORT}`);
  
  // Log all available network interfaces
  console.log('\nNetwork Interfaces:');
  Object.keys(ifaces).forEach(ifname => {
    ifaces[ifname].forEach(iface => {
      if ('IPv4' === iface.family && !iface.internal) {
        console.log(`  - ${ifname}: http://${iface.address}:${PORT}`);
      }
    });
  });
  
  console.log(`\nEnvironment: ${process.env.NODE_ENV || 'development'}`);
  console.log('==========================\n');
  
  // Test the transporter
  transporter.verify((error) => {
    if (error) {
      console.error('Error with mail transporter:');
      console.error('  - Error Code:', error.code);
      console.error('  - Error Message:', error.message);
      if (error.command) console.error('  - Command:', error.command);
    } else {
      console.log('\n✅ Server is ready to send emails');
      console.log(`📧 Using SMTP: ${process.env.SMTP_HOST}:${process.env.SMTP_PORT}`);
    }
  });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  // Close server & exit process
  server.close(() => process.exit(1));
});

module.exports = app;
