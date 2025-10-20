# Form Setup Guide

The contact form has been updated to collect three key pieces of information:
1. **Email** - Their contact email
2. **Company/Business Name** - To understand their business
3. **Primary Focus** - Which system they're interested in (LSRS, CMS, FSGS, or Custom)
4. **Current Challenge** - Their biggest growth obstacle

## Setup Options

### Option 1: Netlify Functions (Recommended for Proton Mail)
If you're using Netlify to host this site:

1. **Install dependencies:**
   ```bash
   npm install nodemailer
   ```

2. **Set environment variables in Netlify:**
   - Go to Site settings → Build & deploy → Environment
   - Add these variables:
     - `SMTP_HOST` = smtp.proton.me
     - `SMTP_PORT` = 465
     - `SMTP_USER` = your email
     - `SMTP_PASS` = [ProtonMail App Password - generate in ProtonMail settings]
     - `SMTP_FROM` = your sender email
     - `ADMIN_EMAIL` = webhalla@proton.me

3. **Deploy** - The function at `netlify/functions/send-email.js` will automatically be deployed.

### Option 2: Formspree (Easiest - No Backend)
Use Formspree for a zero-config email solution:

1. Go to https://formspree.io
2. Sign up and create a new form for webhalla@proton.me
3. Copy your form ID
4. Update the fetch URL in `src/main.js` line 366:
   ```javascript
   const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
   ```

### Option 3: EmailJS (Client-side JavaScript)
Zero backend setup:

1. Sign up at https://www.emailjs.com
2. Create an email service with your Proton Mail
3. Get your Service ID and Template ID
4. Add EmailJS to your project:
   ```bash
   npm install @emailjs/browser
   ```
5. Replace the fetch in `src/main.js` with EmailJS initialization

## Testing

After setup, the form will:
- Collect email, company, focus, and challenge
- Send to your admin email with all details
- Send confirmation email to the user
- Fall back to mailto link if backend fails
- Show success message for 3 seconds then close

The user gets immediate feedback, and you get structured data to offer better solutions.
