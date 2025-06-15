import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const data = await request.json();
    const { to, applicationType, ...formData } = data;
    
    // Configure nodemailer with your email service
    const transporter = nodemailer.createTransport({
      host: 'mail.mathsandscienceinfinity.org.za',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Format application data for email
    const formatApplicationData = () => {
      let formattedData = '';
      
      for (const [key, value] of Object.entries(formData)) {
        if (value && value.toString().trim() !== '') {
          const formattedKey = key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase());

          formattedData += `<p><strong>${formattedKey}:</strong> ${value}</p>`;
        }
      }
      
      return formattedData;
    };

    // Create email content
    const mailOptions = {
      from: `MSI Website <${process.env.EMAIL_USER}>`,
      to: 'info@mathsandscienceinfinity.org.za',
      subject: `New Message from Contact Form - ${formData.subject || 'No Subject'}`,
      text: `New contact form message received:\n\n${JSON.stringify(formData, null, 2)}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <div>${formatApplicationData()}</div>
        <p>Submitted at: ${new Date().toLocaleString()}</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing application:', error);
    return NextResponse.json(
      { error: 'Failed to process application' },
      { status: 500 }
    );
  }
} 