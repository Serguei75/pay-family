// Google Gemini AI Integration
// Auto-categorization по фото чека

export interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export interface ReceiptAnalysis {
  vendorName: string;
  amount: number;
  category: string;
  confidence: number;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

export class GeminiService {
  private apiKey: string;
  private model = 'gemini-2.0-flash';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Analyze receipt image with Gemini Vision
   */
  async analyzeReceiptImage(imageBase64: string): Promise<ReceiptAnalysis | null> {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Analyze this receipt image and extract:
                    1. Vendor/Store name
                    2. Total amount
                    3. Category (Food, Transport, Entertainment, Shopping, Healthcare, Utilities, Office, Other)
                    4. List of items with quantities and prices
                    5. Confidence level (0-1)
                    
                    Return as JSON with fields: vendorName, amount, category, confidence, items[]`,
                  },
                  {
                    inline_data: {
                      mime_type: 'image/jpeg',
                      data: imageBase64.split(',')[1],
                    },
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) return null;
      const data = (await response.json()) as GeminiResponse;
      const text = data.candidates[0].content.parts[0].text;

      // Parse JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) return null;

      return JSON.parse(jsonMatch[0]) as ReceiptAnalysis;
    } catch (error) {
      console.error('Gemini analysis error:', error);
      return null;
    }
  }

  /**
   * Categorize expense by text
   */
  async categorizeExpense(text: string): Promise<string> {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Categorize this expense into one of these categories:
                    Food, Transport, Entertainment, Shopping, Healthcare, Utilities, Office, Other
                    
                    Return only the category name.
                    
                    Expense: ${text}`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = (await response.json()) as GeminiResponse;
      return data.candidates[0].content.parts[0].text.trim();
    } catch {
      return 'Other';
    }
  }
}

export const createGeminiService = (apiKey: string) => {
  return new GeminiService(apiKey);
};
