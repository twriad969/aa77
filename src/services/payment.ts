// UddoktaPay Payment Gateway Integration
// API Documentation: https://docs.uddoktapay.com/

const UDDOKTAPAY_CONFIG = {
  baseURL: 'https://w2o87yke7u.paymently.io/',
  apiKey: 'w3smUXgTxFknH1ka9lrJlRg8qFfbwKyU81hrDX37',
  // Update these URLs based on your deployment
  redirectUrl: `${window.location.origin}/payment-success`,
  cancelUrl: `${window.location.origin}/payment-cancel`,
  webhookUrl: `${window.location.origin}/api/payment-webhook`,
};

export interface PaymentRequest {
  full_name: string;
  email: string;
  phone: string;
  amount: string;
  metadata?: {
    user_id?: string;
    order_id?: string;
    [key: string]: any;
  };
}

export interface PaymentResponse {
  status: boolean;
  message: string;
  payment_url?: string;
}

/**
 * Create a payment charge with UddoktaPay
 * @param data Payment request data
 * @returns Payment response with payment URL
 */
export async function createPaymentCharge(
  data: PaymentRequest
): Promise<PaymentResponse> {
  try {
    const requestBody = {
      full_name: data.full_name,
      email: data.email,
      amount: data.amount,
      metadata: {
        phone: data.phone,
        ...data.metadata,
      },
      redirect_url: UDDOKTAPAY_CONFIG.redirectUrl,
      return_type: 'GET',
      cancel_url: UDDOKTAPAY_CONFIG.cancelUrl,
      webhook_url: UDDOKTAPAY_CONFIG.webhookUrl,
    };

    const response = await fetch(
      `${UDDOKTAPAY_CONFIG.baseURL}api/checkout-v2`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'RT-UDDOKTAPAY-API-KEY': UDDOKTAPAY_CONFIG.apiKey,
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      throw new Error(`Payment API request failed: ${response.statusText}`);
    }

    const result: PaymentResponse = await response.json();
    return result;
  } catch (error) {
    console.error('Payment creation error:', error);
    throw error;
  }
}

/**
 * Redirect user to payment URL
 * @param paymentUrl The payment URL from UddoktaPay
 */
export function redirectToPayment(paymentUrl: string): void {
  window.location.href = paymentUrl;
}

export interface VerifyPaymentResponse {
  full_name: string;
  email: string;
  amount: string;
  fee: string;
  charged_amount: string;
  invoice_id: string;
  metadata: {
    [key: string]: any;
  };
  payment_method: string;
  sender_number: string;
  transaction_id: string;
  date: string;
  status: 'COMPLETED' | 'PENDING' | 'ERROR';
}

/**
 * Verify payment status
 * @param invoiceId The invoice ID from the payment callback
 * @returns Payment verification response
 */
export async function verifyPayment(
  invoiceId: string
): Promise<VerifyPaymentResponse> {
  try {
    const response = await fetch(
      `${UDDOKTAPAY_CONFIG.baseURL}api/verify-payment`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'RT-UDDOKTAPAY-API-KEY': UDDOKTAPAY_CONFIG.apiKey,
        },
        body: JSON.stringify({ invoice_id: invoiceId }),
      }
    );

    if (!response.ok) {
      throw new Error(`Payment verification failed: ${response.statusText}`);
    }

    const result: VerifyPaymentResponse = await response.json();
    return result;
  } catch (error) {
    console.error('Payment verification error:', error);
    throw error;
  }
}
