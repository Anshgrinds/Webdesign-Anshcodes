/**
 * AcharyaPith Preschool - Backend API & Automated Email Dispatcher
 * Built with Express & Nodemailer with offline JSON persistence.
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration
const CONFIG = {
  schoolName: process.env.SCHOOL_NAME || 'AcharyaPith Preschool',
  schoolEmail: process.env.SCHOOL_EMAIL || 'admissions@acharyapith.edu.np',
  schoolPhone: process.env.SCHOOL_PHONE || '+977 (01) 458-9210',
  adminEmail: process.env.ADMIN_NOTIFICATION_EMAIL || 'admissions@acharyapith.edu.np',
  smtpHost: process.env.SMTP_HOST || '',
  smtpPort: parseInt(process.env.SMTP_PORT || '587', 10),
  smtpSecure: process.env.SMTP_SECURE === 'true',
  smtpUser: process.env.SMTP_USER || '',
  smtpPass: process.env.SMTP_PASS || '',
  smtpFrom: process.env.SMTP_FROM || 'AcharyaPith Admissions <admissions@acharyapith.edu.np>'
};

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static(__dirname));

// Persistent local storage path
const DATA_DIR = path.join(__dirname, 'data');
const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');

// Ensure data folder and bookings file exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(BOOKINGS_FILE)) {
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify([], null, 2), 'utf8');
}

/**
 * Helper to save booking record locally
 */
function saveBookingRecord(booking) {
  try {
    const rawData = fs.readFileSync(BOOKINGS_FILE, 'utf8');
    const bookings = JSON.parse(rawData || '[]');
    bookings.unshift(booking);
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error saving booking to file:', error);
    return false;
  }
}

/**
 * Configure Nodemailer Transporter
 */
function getTransporter() {
  if (CONFIG.smtpHost && CONFIG.smtpUser && CONFIG.smtpPass) {
    return nodemailer.createTransport({
      host: CONFIG.smtpHost,
      port: CONFIG.smtpPort,
      secure: CONFIG.smtpSecure,
      auth: {
        user: CONFIG.smtpUser,
        pass: CONFIG.smtpPass
      }
    });
  }
  return null;
}

/**
 * Generate Branded HTML Email Template for Parents
 */
function createParentEmailHtml(booking) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #FDFBF7; margin: 0; padding: 24px; color: #1E293B; }
      .container { max-width: 600px; margin: 0 auto; background: #FFFFFF; border-radius: 16px; overflow: hidden; border: 1px solid #E2D9CE; box-shadow: 0 4px 12px rgba(0,0,0,0.06); }
      .header { background: #172554; padding: 32px 28px; text-align: center; color: #FFFFFF; }
      .header h1 { margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
      .header span { color: #F59E0B; }
      .content { padding: 32px 28px; }
      .tag { display: inline-block; background-color: #FEF3C7; color: #B45309; padding: 4px 12px; border-radius: 999px; font-size: 12px; font-weight: bold; margin-bottom: 12px; }
      .details-box { background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 20px; margin: 24px 0; }
      .details-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px dashed #E2E8F0; font-size: 14px; }
      .details-row:last-child { border-bottom: none; }
      .label { color: #64748B; font-weight: 500; }
      .value { color: #172554; font-weight: 700; text-align: right; }
      .prep-list { background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 12px; padding: 18px; margin: 20px 0; font-size: 13.5px; color: #166534; }
      .prep-list ul { margin: 8px 0 0 16px; padding: 0; }
      .footer { background: #F8FAFC; border-top: 1px solid #E2E8F0; padding: 20px 28px; text-align: center; font-size: 12px; color: #64748B; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Acharya<span>Pith</span></h1>
        <p style="margin: 6px 0 0; font-size: 13px; opacity: 0.85;">Early Learning & Daycare Center</p>
      </div>

      <div class="content">
        <span class="tag">Campus Tour Confirmation</span>
        <h2 style="margin: 0 0 12px; color: #172554; font-size: 20px;">Namaste, ${booking.parentName}!</h2>
        <p style="line-height: 1.6; color: #475569; margin: 0 0 16px;">
          We are delighted that you are considering <strong>AcharyaPith</strong> for your child's early education. Your personalized campus walkthrough has been scheduled.
        </p>

        <div class="details-box">
          <div class="details-row">
            <span class="label">Reference ID:</span>
            <span class="value">${booking.referenceId}</span>
          </div>
          <div class="details-row">
            <span class="label">Tour Date:</span>
            <span class="value">${booking.tourDate}</span>
          </div>
          <div class="details-row">
            <span class="label">Time Slot:</span>
            <span class="value">${booking.tourTimeFormatted}</span>
          </div>
          <div class="details-row">
            <span class="label">Child Age Group:</span>
            <span class="value">${booking.childAge}</span>
          </div>
          <div class="details-row">
            <span class="label">Parent Contact:</span>
            <span class="value">${booking.parentPhone}</span>
          </div>
        </div>

        <div class="prep-list">
          <strong>What to expect during your visit:</strong>
          <ul>
            <li>A relaxed 30-minute campus tour observing live Montessori & play classes.</li>
            <li>A 1-on-1 discussion with our Academic Director regarding developmental goals.</li>
            <li>Feel free to bring your child along so they can experience our sensory spaces!</li>
          </ul>
        </div>

        <p style="line-height: 1.6; color: #475569; font-size: 14px;">
          If you need to reschedule or have urgent queries before your visit, simply call our front desk at <strong>${CONFIG.schoolPhone}</strong>.
        </p>
      </div>

      <div class="footer">
        <p style="margin: 0 0 4px;"><strong>AcharyaPith Campus</strong> &bull; Shanti Marg, Ward 4, Kathmandu, Nepal</p>
        <p style="margin: 0;">Inquiries: ${CONFIG.schoolEmail} | Phone: ${CONFIG.schoolPhone}</p>
      </div>
    </div>
  </body>
  </html>
  `;
}

/**
 * Generate Admin Notification Email
 */
function createAdminEmailHtml(booking) {
  return `
  <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
    <h2 style="color: #172554;">🔔 New Campus Tour Booking Request</h2>
    <p>A new tour has been submitted through the AcharyaPith website:</p>
    <table style="width: 100%; max-width: 500px; border-collapse: collapse; margin-top: 15px;">
      <tr><td style="padding: 6px; border: 1px solid #ddd; font-weight: bold;">Reference Code:</td><td style="padding: 6px; border: 1px solid #ddd;">${booking.referenceId}</td></tr>
      <tr><td style="padding: 6px; border: 1px solid #ddd; font-weight: bold;">Parent Name:</td><td style="padding: 6px; border: 1px solid #ddd;">${booking.parentName}</td></tr>
      <tr><td style="padding: 6px; border: 1px solid #ddd; font-weight: bold;">Phone:</td><td style="padding: 6px; border: 1px solid #ddd;">${booking.parentPhone}</td></tr>
      <tr><td style="padding: 6px; border: 1px solid #ddd; font-weight: bold;">Email:</td><td style="padding: 6px; border: 1px solid #ddd;">${booking.parentEmail}</td></tr>
      <tr><td style="padding: 6px; border: 1px solid #ddd; font-weight: bold;">Child Age:</td><td style="padding: 6px; border: 1px solid #ddd;">${booking.childAge}</td></tr>
      <tr><td style="padding: 6px; border: 1px solid #ddd; font-weight: bold;">Requested Date:</td><td style="padding: 6px; border: 1px solid #ddd;">${booking.tourDate}</td></tr>
      <tr><td style="padding: 6px; border: 1px solid #ddd; font-weight: bold;">Time Slot:</td><td style="padding: 6px; border: 1px solid #ddd;">${booking.tourTimeFormatted}</td></tr>
      <tr><td style="padding: 6px; border: 1px solid #ddd; font-weight: bold;">Parent Notes:</td><td style="padding: 6px; border: 1px solid #ddd;">${booking.tourNotes || 'None'}</td></tr>
      <tr><td style="padding: 6px; border: 1px solid #ddd; font-weight: bold;">Submitted At:</td><td style="padding: 6px; border: 1px solid #ddd;">${booking.createdAt}</td></tr>
    </table>
  </div>
  `;
}

/**
 * Dispatch Emails via Nodemailer or Log in Simulation Mode
 */
async function dispatchBookingEmails(booking) {
  const transporter = getTransporter();

  if (!transporter) {
    console.log('\n============================================================');
    console.log('📬 [EMAIL DISPATCH - SIMULATION MODE]');
    console.log('SMTP credentials not configured in .env. Email dispatch simulated.');
    console.log(`To Parent: ${booking.parentEmail}`);
    console.log(`To Admin:  ${CONFIG.adminEmail}`);
    console.log(`Subject:   Tour Confirmed: Welcome to AcharyaPith (${booking.referenceId})`);
    console.log(`Details:   ${booking.parentName} | ${booking.tourDate} (${booking.tourTimeFormatted})`);
    console.log('============================================================\n');
    return { sent: false, simulated: true };
  }

  try {
    // 1. Send confirmation email to parent
    await transporter.sendMail({
      from: CONFIG.smtpFrom,
      to: booking.parentEmail,
      subject: `🏫 Campus Tour Confirmed: Welcome to AcharyaPith (Ref: ${booking.referenceId})`,
      html: createParentEmailHtml(booking)
    });

    // 2. Send notification email to admin/admissions office
    await transporter.sendMail({
      from: CONFIG.smtpFrom,
      to: CONFIG.adminEmail,
      subject: `🔔 New Tour Booking: ${booking.parentName} (${booking.childAge}) - ${booking.tourDate}`,
      html: createAdminEmailHtml(booking)
    });

    console.log(`✅ [EMAIL DISPATCH] Real emails successfully delivered to ${booking.parentEmail} and ${CONFIG.adminEmail}`);
    return { sent: true, simulated: false };
  } catch (error) {
    console.error('❌ [EMAIL DISPATCH ERROR]', error);
    return { sent: false, error: error.message };
  }
}

// ==========================================
// API Endpoints
// ==========================================

/**
 * Health & Configuration Status
 */
app.get('/api/status', (req, res) => {
  const hasSmtp = Boolean(CONFIG.smtpHost && CONFIG.smtpUser && CONFIG.smtpPass);
  res.json({
    status: 'online',
    school: CONFIG.schoolName,
    emailMode: hasSmtp ? 'Live SMTP' : 'Simulation Mode (Saves locally & logs to terminal)',
    smtpConfigured: hasSmtp,
    timestamp: new Date().toISOString()
  });
});

/**
 * Book Campus Tour Endpoint
 */
app.post('/api/book-tour', async (req, res) => {
  try {
    const { parentName, parentPhone, parentEmail, childAge, tourDate, tourTime, tourNotes } = req.body;

    // Validation
    if (!parentName || !parentPhone || !parentEmail || !childAge || !tourDate || !tourTime) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields. Please fill in all required inputs.'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(parentEmail)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.'
      });
    }

    // Format human-friendly time slot
    const timeSlotMap = {
      morning: 'Morning (9:30 AM – 11:30 AM)',
      afternoon: 'Afternoon (1:00 PM – 3:00 PM)',
      evening: 'Late Afternoon (3:30 PM – 5:00 PM)'
    };
    const tourTimeFormatted = timeSlotMap[tourTime] || tourTime;

    // Generate unique reference ticket code
    const uniqueSuffix = Math.floor(1000 + Math.random() * 9000);
    const referenceId = `AP-${new Date().getFullYear()}-${uniqueSuffix}`;

    const newBooking = {
      referenceId,
      parentName: parentName.trim(),
      parentPhone: parentPhone.trim(),
      parentEmail: parentEmail.trim(),
      childAge,
      tourDate,
      tourTime,
      tourTimeFormatted,
      tourNotes: tourNotes ? tourNotes.trim() : '',
      createdAt: new Date().toISOString()
    };

    // 1. Save to local data store
    saveBookingRecord(newBooking);

    // 2. Dispatch email (live or simulated)
    const emailResult = await dispatchBookingEmails(newBooking);

    return res.status(201).json({
      success: true,
      message: 'Campus tour booked successfully!',
      referenceId,
      emailStatus: emailResult,
      booking: {
        parentName: newBooking.parentName,
        tourDate: newBooking.tourDate,
        tourTimeFormatted: newBooking.tourTimeFormatted,
        childAge: newBooking.childAge
      }
    });

  } catch (error) {
    console.error('API Error in /api/book-tour:', error);
    return res.status(500).json({
      success: false,
      error: 'An internal server error occurred while processing your tour request.'
    });
  }
});

/**
 * List all bookings (for administration)
 */
app.get('/api/bookings', (req, res) => {
  try {
    const rawData = fs.readFileSync(BOOKINGS_FILE, 'utf8');
    const bookings = JSON.parse(rawData || '[]');
    res.json({
      total: bookings.length,
      bookings
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve bookings.' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`\n============================================================`);
  console.log(`🚀 AcharyaPith Server listening on http://localhost:${PORT}`);
  console.log(`📋 Tour Bookings Endpoint: http://localhost:${PORT}/api/book-tour`);
  console.log(`📊 Admin Bookings View:   http://localhost:${PORT}/api/bookings`);
  console.log(`⚡ Email Service:          ${CONFIG.smtpHost ? 'Live SMTP (' + CONFIG.smtpHost + ')' : 'Simulation Mode (Local data/bookings.json)'}`);
  console.log(`============================================================\n`);
});
