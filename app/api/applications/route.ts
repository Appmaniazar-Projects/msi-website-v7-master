import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import nodemailer from 'nodemailer';

// Define the expected file types
interface ApplicationFile extends File {
  buffer?: Buffer;
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
      process.env.NEXT_PUBLIC_AWS_DOMAIN || '',  // AWS domain
      process.env.NEXT_PUBLIC_SITE_URL || ''     // For any other deployment URL
    ].filter(Boolean);
    
    if (!origin || !allowedOrigins.some(allowed => origin.includes(allowed))) {
      return NextResponse.json({ error: 'Unauthorized origin' }, { status: 403 });
    }

    const formData = await request.formData();
    const files = formData.getAll('files') as ApplicationFile[];
    const applicationType = formData.get('applicationType') as string;
    
    // Create an object from FormData
    const formDataObj = Object.fromEntries(formData.entries());
    
    // Validate required fields based on application type
    if (!applicationType) {
      return NextResponse.json(
        { error: 'Application type is required' },
        { status: 400 }
      );
    }

    // Basic form data validation
    const requiredFields = ['name', 'email', 'phone'];
    for (const field of requiredFields) {
      if (!formData.get(field)) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Validate email format
    const email = formData.get('email') as string;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate file types and sizes
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
          { error: 'Invalid file type. Only PDF, JPEG, and PNG files are allowed.' },
          { status: 400 }
        );
      }
      if (file.size > maxSize) {
        return NextResponse.json(
          { error: 'File size too large. Maximum size is 5MB.' },
          { status: 400 }
        );
      }
    }

    // Configure nodemailer
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
      
      for (const [key, value] of Object.entries(formDataObj)) {
        if (value && value.toString().trim() !== '' && key !== 'files') {
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

    // Process files and create attachments
    const attachments = await Promise.all(
      files.map(async (file) => {
        if (file instanceof File) {
          const buffer = Buffer.from(await file.arrayBuffer());
          return {
            filename: file.name,
            content: buffer,
            contentType: file.type
          };
        }
        return null;
      })
    ).then(results => results.filter(Boolean));

    // Create email content
    const mailOptions = {
      from: `MSI Website <${process.env.EMAIL_USER}>`,
      to: 'careers@mathsandscienceinfinity.org.za',
      subject: `New ${applicationType} Application - ${formDataObj.name} from MSI Website`,
      html: `
        <h2>New ${applicationType} Application</h2>
        <div>${formatApplicationData()}</div>
        <p>Submitted at: ${new Date().toLocaleString()}</p>
      `,
      attachments
    };

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