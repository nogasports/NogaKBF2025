import { apiClient } from '../client';
import { ENDPOINTS } from '../endpoints';

export interface PaymentDetails {
  amount: number;
  type: 'registration' | 'membership' | 'fine' | 'prize';
  payerId: string;
  paymentMethod: 'card' | 'mpesa' | 'bank_transfer';
  description: string;
  metadata?: Record<string, any>;
}

export interface PaymentResponse {
  id: string;
  status: 'pending' | 'completed' | 'failed';
  transactionId: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  timestamp: string;
}

export const paymentService = {
  async processPayment(details: PaymentDetails): Promise<PaymentResponse> {
    const response = await apiClient.post('/payments/process', details);
    return response.data;
  },

  async verifyPayment(paymentId: string): Promise<{ verified: boolean; status: string }> {
    const response = await apiClient.get(`/payments/${paymentId}/verify`);
    return response.data;
  },

  async getPaymentStatus(paymentId: string): Promise<{ status: string; details: any }> {
    const response = await apiClient.get(`/payments/${paymentId}/status`);
    return response.data;
  },

  async generateReceipt(paymentId: string): Promise<{ receiptUrl: string }> {
    const response = await apiClient.post(`/payments/${paymentId}/receipt`);
    return response.data;
  },

  async listPayments(filters: {
    type?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<PaymentResponse[]> {
    const response = await apiClient.get('/payments', { params: filters });
    return response.data;
  },

  async recordFine(userId: string, details: {
    amount: number;
    reason: string;
    dueDate: string;
  }): Promise<void> {
    await apiClient.post('/payments/fines', {
      userId,
      ...details,
    });
  },

  async distributePrize(details: {
    tournamentId: string;
    winners: Array<{ teamId: string; position: number; amount: number }>;
  }): Promise<void> {
    await apiClient.post('/payments/prizes/distribute', details);
  },
};