import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files');
    const applicationType = formData.get('applicationType');
    const formDataObj = Object.fromEntries(formData.entries());
    
    // Configure nodemailer with your email service
    const transporter = nodemailer.createTransport({
      host: 'mail.mathsandscienceinfinity.org.za', // cPanel mail server
      port: 465, // Standard secure port for cPanel
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      },
      tls: {
        rejectUnauthorized: false // Important for cPanel emails
      }
    });

    // Format application data for email
    const formatApplicationData = () => {
      let formattedData = '';
      
      for (const [key, value] of Object.entries(formDataObj)) {
        if (value && value.toString().trim() !== '') {
          const formattedKey = key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .replace(/ Id/i, ' ID')
            .replace(/ Sace/i, ' SACE');

          formattedData += `<p><strong>${formattedKey}:</strong> ${value}</p>`;
        }
      }
      
      return formattedData;
    };

    // Create email content
    const mailOptions = {
      from: `MSI Website <${process.env.EMAIL_USER}>`,
      to: 'careers@mathsandscienceinfinity.org.za',
      subject: `New ${applicationType} Application - ${formDataObj.name} from MSI Website`,
      text: `New ${applicationType} application received:\n\n${JSON.stringify(formDataObj, null, 2)}`,
      html: `
        <h2>New ${applicationType} Application</h2>
        <div>${formatApplicationData()}</div>
        <p>Submitted at: ${new Date().toLocaleString()}</p>
      `,
      attachments: [] // Add this empty array for attachments
    };

    // Process files
    const attachments = [];
    for (const file of files) {
      if (file instanceof File) {
        const buffer = Buffer.from(await file.arrayBuffer());
        attachments.push({
          filename: file.name,
          content: buffer,
          contentType: file.type
        });
      }
    }
    
    // Add attachments to mail options
    mailOptions.attachments = attachments;

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: 'Application submitted successfully' },
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