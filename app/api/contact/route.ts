import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  applicationType?: string;
}

export async function POST(request: Request) {
  try {
    // Validate request origin
    const headersList = await headers();
    const origin = headersList.get('origin');
    
    // Add your domain to this check
    const allowedOrigins = [
      'https://mathsandscienceinfinity.org.za', 
      'http://localhost:3000',
      'https://main.d2w26kf2mh58ov.amplifyapp.com',

    ].filter(Boolean);
    
    if (!origin || !allowedOrigins.some(allowed => origin.includes(allowed))) {
      return NextResponse.json({ error: 'Unauthorized origin' }, { status: 403 });
    }

    const data: ContactFormData = await request.json();
    
    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

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
      
      for (const [key, value] of Object.entries(data)) {
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
      subject: `New Message from Contact Form - ${data.subject || 'No Subject'}`,
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
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to process contact form submission' },
      { status: 500 }
    );
  }
}