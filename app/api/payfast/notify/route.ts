import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const data = Object.fromEntries(formData.entries())
    
    // Log the incoming data for debugging (remove in production)
    console.log('PayFast notification received:', {
      ...data,
      signature: data.signature ? '[REDACTED]' : 'missing',
      merchant_key: '[REDACTED]'
    })
    
    // Extract important payment information
    const paymentStatus = data.payment_status as string
    const amount = data.amount as string
    const email = data.email_address as string
    const transactionId = data.pf_payment_id as string || 'unknown'
    
    // Process the payment notification
    console.log('Payment Notification:', {
      transactionId,
      paymentStatus,
      amount,
      email
    })
    
    // Here you would typically:
    // 1. Update your database with the payment status
    // 2. Send confirmation emails
    // 3. Update subscription status if applicable
    
    // PayFast expects a 200 response with empty body
    // See: https://developers.payfast.co.za/docs#notify-page
    return new Response(null, { status: 200 })
  } catch (error) {
    console.error('Error processing PayFast notification:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}