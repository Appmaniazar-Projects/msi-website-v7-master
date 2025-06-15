import crypto from 'crypto';

export interface PayFastNotification {
  merchant_id: string;
  merchant_key: string;
  payment_status: string;
  pf_payment_id: string;
  amount_gross: string;
  amount_fee: string;
  amount_net: string;
  item_name: string;
  item_description: string;
  custom_str1?: string;
  custom_str2?: string;
  custom_str3?: string;
  custom_str4?: string;
  custom_str5?: string;
  name_first?: string;
  name_last?: string;
  email_address?: string;
  signature: string;
}

export const verifyPayFastSignature = (data: PayFastNotification): boolean => {
  // Remove signature from data before generating new signature
  const { signature, ...dataWithoutSignature } = data;
  
  // Sort the object by key
  const sortedData = Object.keys(dataWithoutSignature)
    .sort()
    .reduce((acc, key) => {
      if (dataWithoutSignature[key] !== '') {
        acc[key] = dataWithoutSignature[key];
      }
      return acc;
    }, {} as Record<string, string>);

  // Create the query string
  const queryString = Object.entries(sortedData)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

  // Generate signature using passphrase if available
  const passphrase = process.env.PAYFAST_PASSPHRASE;
  const dataToSign = passphrase ? `${queryString}&passphrase=${passphrase}` : queryString;

  // Generate MD5 hash
  const generatedSignature = crypto
    .createHash('md5')
    .update(dataToSign)
    .digest('hex');

  return generatedSignature === signature;
};

export const validatePayFastHost = async (ip: string): Promise<boolean> => {
  const validHosts = [
    '196.33.227.224/29',
    '197.97.145.144/28',
    '203.81.171.64/28',
  ];

  // Convert IP ranges to start and end numbers for comparison
  const ipNumber = ip.split('.').reduce((sum, octet) => (sum << 8) + parseInt(octet, 10), 0) >>> 0;

  return validHosts.some(range => {
    const [network, bits] = range.split('/');
    const mask = ~((1 << (32 - parseInt(bits))) - 1) >>> 0;
    const net = network.split('.').reduce((sum, octet) => (sum << 8) + parseInt(octet, 10), 0) >>> 0;
    return (ipNumber & mask) === (net & mask);
  });
};
