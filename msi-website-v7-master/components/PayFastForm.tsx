'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

interface FormData {
  name_first: string
  name_last: string
  email_address: string
  email_address_confirm: string
  cell_number: string
}

export default function PayFastForm() {
  // Set minimum donation amount
  const MIN_AMOUNT = 5.00;
  
  const [amount, setAmount] = useState('5.00')
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once')
  const [formData, setFormData] = useState<FormData>({
    name_first: '',
    name_last: '',
    email_address: '',
    email_address_confirm: '',
    cell_number: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    // Required fields validation
    if (!formData.name_first) newErrors.name_first = 'First name is required'
    if (!formData.name_last) newErrors.name_last = 'Last name is required'
    if (!formData.email_address) newErrors.email_address = 'Email address is required'
    
    // Email validation
    if (formData.email_address && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email_address)) {
      newErrors.email_address = 'Please enter a valid email address'
    }
    
    // Email confirmation validation
    if (formData.email_address !== formData.email_address_confirm) {
      newErrors.email_address_confirm = 'Email addresses do not match'
    }
    
    // Amount validation
    const numAmount = parseFloat(amount)
    if (isNaN(numAmount) || numAmount < MIN_AMOUNT) {
      newErrors.amount = `Minimum donation amount is R${MIN_AMOUNT.toFixed(2)}`
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Amount validation directly in handleSubmit
    const numAmount = parseFloat(amount)
    if (isNaN(numAmount) || numAmount < MIN_AMOUNT) {
      setErrors({...errors, amount: `Minimum donation amount is R${MIN_AMOUNT.toFixed(2)}`})
      return
    }
    
    if (!validateForm()) return
    
    setIsSubmitting(true)

    try {
      // Create form directly - no client-side signature generation
      const form = document.createElement('form')
      form.method = 'POST'
      form.action = 'https://www.payfast.co.za/eng/process'
      
      // Basic required PayFast fields
      const formFields = {
        // Merchant details
        merchant_id: process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_ID || '',
        merchant_key: process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_KEY || '',
        
        // Transaction details
        amount: numAmount.toFixed(2),
        item_name: 'MSI Donation',
        
        // Customer details
        name_first: formData.name_first,
        name_last: formData.name_last,
        email_address: formData.email_address,
        
        // URLs
        return_url: `${window.location.origin}/donate/thank-you`,
        cancel_url: `${window.location.origin}/donate`,
        notify_url: `${window.location.origin}/api/payfast/notify`,
      }
      
      // Add optional fields
      if (formData.cell_number) {
        formFields['cell_number'] = formData.cell_number
      }
      
      // Add subscription fields for monthly donations
      if (frequency === 'monthly') {
        formFields['subscription_type'] = '1'
        formFields['frequency'] = '3'
        formFields['cycles'] = '0'
      }
      
      // Add all fields to form
      Object.entries(formFields).forEach(([name, value]) => {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = name
        input.value = String(value)
        form.appendChild(input)
      })
      
      console.log('Submitting payment to PayFast with fields:', {
        ...formFields,
        merchant_key: '[REDACTED]'
      })
      
      // Submit form
      document.body.appendChild(form)
      form.submit()
    } catch (error) {
      console.error('Error submitting payment form:', error)
      alert('An error occurred while processing your payment. Please try again later.')
      setIsSubmitting(false)
    }
  }
  
  // Handle amount input to ensure only valid numbers
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and a single decimal point
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setAmount(value);
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      <Card className="p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Complete Your Donation
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name_first">First Name</Label>
              <Input 
                id="name_first" 
                value={formData.name_first}
                onChange={(e) => setFormData({ ...formData, name_first: e.target.value })}
                className={errors.name_first ? 'border-red-500' : ''}
              />
              {errors.name_first && (
                <p className="text-red-500 text-sm mt-1">{errors.name_first}</p>
              )}
            </div>

            <div>
              <Label htmlFor="name_last">Last Name</Label>
              <Input 
                id="name_last" 
                value={formData.name_last}
                onChange={(e) => setFormData({ ...formData, name_last: e.target.value })}
                className={errors.name_last ? 'border-red-500' : ''}
              />
              {errors.name_last && (
                <p className="text-red-500 text-sm mt-1">{errors.name_last}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="cell_number">Phone Number (Optional)</Label>
            <Input 
              id="cell_number" 
              value={formData.cell_number}
              onChange={(e) => setFormData({ ...formData, cell_number: e.target.value })}
              className={errors.cell_number ? 'border-red-500' : ''}
            />
            {errors.cell_number && (
              <p className="text-red-500 text-sm mt-1">{errors.cell_number}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email_address">Email Address</Label>
            <Input
              id="email_address"
              type="email"
              value={formData.email_address}
              onChange={(e) => setFormData({ ...formData, email_address: e.target.value })}
              className={errors.email_address ? 'border-red-500' : ''}
            />
            {errors.email_address && (
              <p className="text-red-500 text-sm mt-1">{errors.email_address}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email_address_confirm">Confirm Email Address</Label>
            <Input
              id="email_address_confirm"
              type="email"
              value={formData.email_address_confirm}
              onChange={(e) => setFormData({ ...formData, email_address_confirm: e.target.value })}
              className={errors.email_address_confirm ? 'border-red-500' : ''}
            />
            {errors.email_address_confirm && (
              <p className="text-red-500 text-sm mt-1">{errors.email_address_confirm}</p>
            )}
          </div>

          <div>
            <Label htmlFor="amount">Donation Amount (ZAR)</Label>
            <Input
              id="amount"
              type="text"
              value={amount}
              onChange={handleAmountChange}
              min={MIN_AMOUNT}
              placeholder={`${MIN_AMOUNT.toFixed(2)}`}
              className={errors.amount ? 'border-red-500' : ''}
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <Label className="flex items-center space-x-2">
              <input
                type="radio"
                checked={frequency === 'once'}
                onChange={() => setFrequency('once')}
                className="form-radio h-4 w-4 text-red-600"
              />
              <span>One-time donation</span>
            </Label>
            <Label className="flex items-center space-x-2">
              <input
                type="radio"
                checked={frequency === 'monthly'}
                onChange={() => setFrequency('monthly')}
                className="form-radio h-4 w-4 text-red-600"
              />
              <span>Monthly donation</span>
            </Label>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-red-600 hover:bg-red-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
          </Button>
        </form>
      </Card>
    </motion.div>
  )
}