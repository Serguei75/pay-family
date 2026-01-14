// Gmail API Integration
// Парсинг писем для автоимпорта чеков

export interface GmailMessage {
  id: string;
  threadId: string;
  labelIds: string[];
  snippet: string;
  from: string;
  to: string;
  subject: string;
  timestamp: string;
  headers: Record<string, string>;
}

export interface EmailReceipt {
  vendorName: string;
  amount: number;
  currency: string;
  date: string;
  subject: string;
  from: string;
}

export class GmailService {
  constructor(private accessToken: string) {}

  /**
   * Get emails from inbox
   */
  async getEmails(query = 'from:receipt', maxResults = 10): Promise<GmailMessage[]> {
    try {
      const response = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages?q=${query}&maxResults=${maxResults}`,
        {
          headers: { Authorization: `Bearer ${this.accessToken}` },
        }
      );

      if (!response.ok) throw new Error('Failed to fetch emails');
      const data = await response.json();
      return data.messages || [];
    } catch (error) {
      console.error('Gmail fetch error:', error);
      return [];
    }
  }

  /**
   * Get full email content
   */
  async getEmailContent(messageId: string): Promise<GmailMessage | null> {
    try {
      const response = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}`,
        {
          headers: { Authorization: `Bearer ${this.accessToken}` },
        }
      );

      if (!response.ok) return null;
      return response.json();
    } catch (error) {
      console.error('Gmail content fetch error:', error);
      return null;
    }
  }

  /**
   * Parse receipt from email
   */
  parseReceiptFromEmail(message: GmailMessage): EmailReceipt | null {
    try {
      // Extract vendor from sender
      const vendorMatch = message.from.match(/[<](.*?)@/);
      const vendorName = vendorMatch ? vendorMatch[1] : 'Unknown';

      // Extract amount (simple regex - improve for production)
      const amountMatch = message.snippet.match(/\$([\d,]+\.?\d{0,2})/i);
      const amount = amountMatch ? parseFloat(amountMatch[1].replace(/,/g, '')) : 0;

      return {
        vendorName,
        amount,
        currency: 'USD',
        date: new Date(parseInt(message.timestamp)).toISOString().split('T')[0],
        subject: message.subject,
        from: message.from,
      };
    } catch {
      return null;
    }
  }

  /**
   * Sync receipt emails
   */
  async syncReceiptEmails(): Promise<EmailReceipt[]> {
    const receipts: EmailReceipt[] = [];
    const messages = await this.getEmails('from:receipt OR from:order');

    for (const msg of messages) {
      const content = await this.getEmailContent(msg.id);
      if (content) {
        const receipt = this.parseReceiptFromEmail(content);
        if (receipt) receipts.push(receipt);
      }
    }

    return receipts;
  }
}

export const createGmailService = (accessToken: string) => {
  return new GmailService(accessToken);
};
