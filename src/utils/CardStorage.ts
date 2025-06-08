import type { Card, CardData } from '../types/Card';

const STORAGE_KEY = 'card-wallet-cards';

export class CardStorage {
  static getCards(): CardData[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];
      
      const cards = JSON.parse(stored);
      return cards.map((card: any) => ({
        ...card,
        createdAt: new Date(card.createdAt),
        updatedAt: new Date(card.updatedAt)
      }));
    } catch (error) {
      console.error('Error loading cards:', error);
      return [];
    }
  }

  static saveCards(cards: CardData[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
    } catch (error) {
      console.error('Error saving cards:', error);
      throw new Error('Failed to save cards');
    }
  }

  static addCard(card: Card): CardData {
    const cards = this.getCards();
    const newCard: CardData = {
      ...card,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    cards.push(newCard);
    this.saveCards(cards);
    return newCard;
  }

  static updateCard(id: string, updates: Partial<Card>): CardData | null {
    const cards = this.getCards();
    const cardIndex = cards.findIndex(card => card.id === id);
    
    if (cardIndex === -1) return null;
    
    const updatedCard = {
      ...cards[cardIndex],
      ...updates,
      updatedAt: new Date()
    };
    
    cards[cardIndex] = updatedCard;
    this.saveCards(cards);
    return updatedCard;
  }

  static deleteCard(id: string): boolean {
    const cards = this.getCards();
    const filteredCards = cards.filter(card => card.id !== id);
    
    if (filteredCards.length === cards.length) return false;
    
    this.saveCards(filteredCards);
    return true;
  }

  static exportCards(): string {
    const cards = this.getCards();
    const exportData = cards.map(({ id, name, code }) => ({ id, name, code }));
    return JSON.stringify(exportData, null, 2);
  }

  static importCards(jsonData: string): { success: boolean; imported: number; errors: string[] } {
    try {
      const importedCards = JSON.parse(jsonData);
      
      if (!Array.isArray(importedCards)) {
        return { success: false, imported: 0, errors: ['Invalid format: expected an array'] };
      }

      const errors: string[] = [];
      const validCards: Card[] = [];

      importedCards.forEach((card, index) => {
        if (!card.id || !card.name || typeof card.code !== 'number') {
          errors.push(`Card at index ${index}: missing required fields (id, name, code)`);
          return;
        }
        validCards.push(card);
      });

      if (validCards.length === 0) {
        return { success: false, imported: 0, errors };
      }

      const existingCards = this.getCards();
      const existingIds = new Set(existingCards.map(card => card.id));
      
      const newCards = validCards.filter(card => !existingIds.has(card.id));
      
      newCards.forEach(card => this.addCard(card));

      return { 
        success: true, 
        imported: newCards.length, 
        errors: newCards.length < validCards.length ? 
          [`${validCards.length - newCards.length} cards were skipped (duplicate IDs)`] : 
          []
      };
    } catch (error) {
      return { success: false, imported: 0, errors: ['Invalid JSON format'] };
    }
  }
}
