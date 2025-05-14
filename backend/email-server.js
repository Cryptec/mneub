const http = require('http');
const nodemailer = require('nodemailer');
require('dotenv').config();

const PORT = 3001;

// Create transporter for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT, 10),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

const server = http.createServer(async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Handle test endpoint
  if (req.method === 'GET' && req.url === '/api/test') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Test endpoint working!' }));
    return;
  }

  // Handle contact form submission
  if (req.method === 'POST' && req.url === '/api/contact') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', async () => {
      try {
        const { name, email, message } = JSON.parse(body);
        
        // Validate input
        if (!name || !email || !message) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ 
            success: false, 
            message: 'All fields are required' 
          }));
          return;
        }

        // Email options
        const mailOptions = {
          from: `"${name}" <${process.env.SMTP_FROM}>`,
          to: process.env.SMTP_TO,
          replyTo: email,
          subject: `New Contact Form Submission from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          `,
        };

        // Send email
        await transporter.sendMail(mailOptions);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          success: true, 
          message: 'Message sent successfully!' 
        }));
        
      } catch (error) {
        console.error('Error processing contact form:', error);
        
        let errorMessage = 'Failed to send message';
        if (error.code === 'ECONNECTION') {
          errorMessage = 'Could not connect to the email server';
        } else if (error.code === 'EAUTH') {
          errorMessage = 'Authentication failed. Please check your email settings';
        }
        
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          success: false, 
          message: errorMessage,
          error: process.env.NODE_ENV === 'development' ? error.message : undefined
        }));
      }
    });
    
    return;
  }

  // Handle 404
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Start the server
server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n=== Email Server ===`);
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Endpoints:');
  console.log(`  GET  http://localhost:${PORT}/api/test`);
  console.log(`  POST http://localhost:${PORT}/api/contact`);
  console.log(`\nSMTP Configuration:`);
  console.log(`  Host: ${process.env.SMTP_HOST}`);
  console.log(`  Port: ${process.env.SMTP_PORT}`);
  console.log(`  Secure: ${process.env.SMTP_SECURE}`);
  console.log(`  From: ${process.env.SMTP_FROM}`);
  console.log(`  To: ${process.env.SMTP_TO}`);
  console.log('===================\n');
  
  // Test the email configuration
  transporter.verify((error) => {
    if (error) {
      console.error('❌ Email server connection failed:');
      console.error('  - Error:', error.message);
      if (error.code) console.error('  - Code:', error.code);
      if (error.command) console.error('  - Command:', error.command);
    } else {
      console.log('✅ Email server connection successful!');
    }
  });
});
