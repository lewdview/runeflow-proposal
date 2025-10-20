const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { email, company, focus, challenge, timestamp } = JSON.parse(event.body);

    // Validate required fields
    if (!email || !company || !focus || !challenge) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Configure your email service
    // Using environment variables for sensitive data
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content for you (admin)
    const adminEmailContent = `
    <h2>New Growth System Inquiry</h2>
    <p><strong>Timestamp:</strong> ${timestamp}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Company:</strong> ${company}</p>
    <p><strong>Primary Focus:</strong> ${focus}</p>
    <p><strong>Challenge:</strong></p>
    <p>${challenge.replace(/\n/g, '<br>')}</p>
    <hr>
    <p>Reply to: ${email}</p>
    `;

    // Email content for the user (confirmation)
    const userEmailContent = `
    <h2>We Got Your Inquiry!</h2>
    <p>Hey,</p>
    <p>Thanks for reaching out! We received your details and will review them shortly.</p>
    <p><strong>What we got:</strong></p>
    <ul>
      <li><strong>Company:</strong> ${company}</li>
      <li><strong>Focus:</strong> ${focus}</li>
      <li><strong>Your Challenge:</strong> "${challenge}"</li>
    </ul>
    <p>We'll get back to you within 24 hours with a tailored solution and next steps.</p>
    <p>Talk soon,<br>The RuneFlow Team</p>
    `;

    // Send email to admin
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: `Growth System Inquiry - ${company}`,
      html: adminEmailContent,
      replyTo: email,
    });

    // Send confirmation email to user
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'We received your inquiry - RuneFlow',
      html: userEmailContent,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Inquiry sent successfully' }),
    };
  } catch (error) {
    console.error('Email sending error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send inquiry' }),
    };
  }
};
