import { AppDataSource } from '../config/database';
import { NotificationService } from './notification.service';
import { logger } from '../utils/logger';

interface PaymentDetails {
  amount: number;
  currency: string;
  description: string;
  metadata?: Record<string, any>;
}

interface PaymentMethod {
  type: 'mpesa' | 'card' | 'bank';
  details: Record<string, any>;
}

interface PaymentResult {
  success: boolean;
  transactionId?: string;
  error?: string;
}

export class PaymentService {
  private notificationService = new NotificationService();
  private paymentRepository = AppDataSource.getRepository('payments');

  public async processPayment(
    userId: string,
    details: PaymentDetails,
    method: PaymentMethod
  ): Promise<PaymentResult> {
    try {
      // Create payment record
      const payment = await this.paymentRepository.save({
        userId,
        amount: details.amount,
        currency: details.currency,
        description: details.description,
        method: method.type,
        status: 'pending',
        metadata: details.metadata,
        createdAt: new Date()
      });

      // Process payment based on method
      let result: PaymentResult;
      switch (method.type) {
        case 'mpesa':
          result = await this.processMpesaPayment(payment.id, method.details);
          break;
        case 'card':
          result = await this.processCardPayment(payment.id, method.details);
          break;
        case 'bank':
          result = await this.processBankPayment(payment.id, method.details);
          break;
        default:
          throw new Error('Unsupported payment method');
      }

      // Update payment record
      await this.paymentRepository.update(payment.id, {
        status: result.success ? 'completed' : 'failed',
        transactionId: result.transactionId,
        error: result.error,
        completedAt: result.success ? new Date() : undefined
      });

      // Send notification
      await this.notificationService.sendNotification({
        userId,
        type: 'payment',
        title: result.success ? 'Payment Successful' : 'Payment Failed',
        message: result.success 
          ? `Your payment of ${details.currency} ${details.amount} was successful`
          : `Your payment of ${details.currency} ${details.amount} failed: ${result.error}`,
        data: {
          paymentId: payment.id,
          amount: details.amount,
          currency: details.currency,
          transactionId: result.transactionId
        }
      });

      return result;
    } catch (error) {
      logger.error('Error processing payment:', error);
      throw error;
    }
  }

  private async processMpesaPayment(paymentId: string, details: any): Promise<PaymentResult> {
    try {
      // Implement M-Pesa integration
      // This is a placeholder for the actual implementation
      return {
        success: true,
        transactionId: `MPESA-${Date.now()}`
      };
    } catch (error) {
      logger.error('Error processing M-Pesa payment:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  private async processCardPayment(paymentId: string, details: any): Promise<PaymentResult> {
    try {
      // Implement card payment integration
      // This is a placeholder for the actual implementation
      return {
        success: true,
        transactionId: `CARD-${Date.now()}`
      };
    } catch (error) {
      logger.error('Error processing card payment:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  private async processBankPayment(paymentId: string, details: any): Promise<PaymentResult> {
    try {
      // Implement bank transfer integration
      // This is a placeholder for the actual implementation
      return {
        success: true,
        transactionId: `BANK-${Date.now()}`
      };
    } catch (error) {
      logger.error('Error processing bank payment:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  public async getPaymentStatus(paymentId: string): Promise<any> {
    try {
      return await this.paymentRepository.findOneOrFail({
        where: { id: paymentId }
      });
    } catch (error) {
      logger.error('Error getting payment status:', error);
      throw error;
    }
  }

  public async refundPayment(paymentId: string, reason: string): Promise<PaymentResult> {
    try {
      const payment = await this.paymentRepository.findOneOrFail({
        where: { id: paymentId }
      });

      if (payment.status !== 'completed') {
        throw new Error('Cannot refund payment that is not completed');
      }

      // Process refund based on payment method
      const result = await this.processRefund(payment);

      // Update payment record
      await this.paymentRepository.update(paymentId, {
        status: 'refunded',
        refundReason: reason,
        refundedAt: new Date()
      });

      // Send notification
      await this.notificationService.sendNotification({
        userId: payment.userId,
        type: 'payment',
        title: 'Payment Refunded',
        message: `Your payment of ${payment.currency} ${payment.amount} has been refunded`,
        data: {
          paymentId,
          amount: payment.amount,
          currency: payment.currency,
          reason
        }
      });

      return result;
    } catch (error) {
      logger.error('Error processing refund:', error);
      throw error;
    }
  }

  private async processRefund(payment: any): Promise<PaymentResult> {
    // Implement refund logic based on payment method
    // This is a placeholder for the actual implementation
    return {
      success: true,
      transactionId: `REFUND-${payment.transactionId}`
    };
  }
}