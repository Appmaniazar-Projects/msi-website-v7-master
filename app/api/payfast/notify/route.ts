import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { verifyPayFastSignature, validatePayFastHost, PayFastNotification } from './utils';
import nodemailer from 'nodemailer';

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

export async function POST(request: Request) {
  try {
    // Get client IP
    const headersList = await headers();
    const forwardedFor = headersList.get('x-forwarded-for') || '';
    const clientIp = forwardedFor.split(',')[0] || '127.0.0.1';

    // Validate PayFast host
    const isValidHost = await validatePayFastHost(clientIp);
    if (!isValidHost) {
      console.error('Invalid PayFast host:', clientIp);
      return NextResponse.json({ error: 'Invalid host' }, { status: 403 });
    }

    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries()) as unknown as PayFastNotification;
    
    // Verify signature
    const isValidSignature = verifyPayFastSignature(data);
    if (!isValidSignature) {
      console.error('Invalid signature for transaction:', data.pf_payment_id);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Process successful payment
    if (data.payment_status === 'COMPLETE') {
      // Send confirmation email
      const emailContent = `
        <h2>Thank you for your donation!</h2>
        <p>Dear ${data.name_first},</p>
        <p>We have received your generous donation of R${data.amount_gross}. Your transaction ID is ${data.pf_payment_id}.</p>
        <p>Your support helps us continue our mission of providing quality education to all.</p>
        <p>Best regards,</p>
        <p>Maths and Science Infinity Team</p>
      `;

      await transporter.sendMail({
        from: `MSI Website <${process.env.EMAIL_USER}>`,
        to: data.email_address,
        subject: 'Thank you for your donation to MSI',
        html: emailContent
      });

      // Send notification to admin
      const adminEmailContent = `
        <h2>New Donation Received</h2>
        <p>Amount: R${data.amount_gross}</p>
        <p>From: ${data.name_first} ${data.name_last}</p>
        <p>Email: ${data.email_address}</p>
        <p>Transaction ID: ${data.pf_payment_id}</p>
        <p>Date: ${new Date().toLocaleString()}</p>
      `;

      await transporter.sendMail({
        from: `MSI Website <${process.env.EMAIL_USER}>`,
        to: 'info@mathsandscienceinfinity.org.za',
        subject: 'New Donation Received',
        html: adminEmailContent
      });
    }

    // Log the successful processing
    console.log('Successfully processed PayFast notification:', {
      transactionId: data.pf_payment_id,
      status: data.payment_status,
      amount: data.amount_gross,
      email: data.email_address
    });

    // Return empty 200 response as required by PayFast
    return new Response(null, { status: 200 });
  } catch (error) {
    console.error('Error processing PayFast notification:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}