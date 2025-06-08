import type { Card } from '../types/Card';

const STORAGE_KEY = 'card-wallet-cards';

export class CardStorage {
    static getCards(): Card[] {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (!stored) return [];

            const cards = JSON.parse(stored);
            return cards;
        } catch (error) {
            alert(`Error loading cards: ${error}`);
            return [];
        }
    }

    static saveCards(cards: Card[]): void {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
        } catch (error) {
            alert(`Error saving cards: ${error}`);
            throw new Error('Failed to save cards');
        }
    }

    static addCard(newCardData: Omit<Card, 'createdAt' | 'updatedAt'>): Card {
        const cards = this.getCards();
        const newCard: Card = {
            ...newCardData,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        cards.push(newCard);
        this.saveCards(cards);
        return newCard;
    }

    static updateCard(id: string, updates: Partial<Card>): Card | null {
        const oldCards = this.getCards();
        let updatedCard: Card | null = null
        const updatedCards = oldCards.map(card => card.id === id ? updatedCard = {
            ...card,
            ...updates,
            updatedAt: new Date()
        } : card);
        this.saveCards(updatedCards);
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
        return JSON.stringify(cards, null, 2);
    }

    static importCards(jsonData: string): { success: boolean; imported: number; error: string } {
        try {
            const importedCards = JSON.parse(jsonData);

            if (!Array.isArray(importedCards)) {
                return { success: false, imported: 0, error: 'Invalid format: expected an array' };
            }

            const validCards: Card[] = importedCards
                .filter((card) => card.id && card.name && typeof card.code === 'number')
                .map(card => ({
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    ...card,
                }));

            if (validCards.length === 0) {
                return { success: false, imported: 0, error: 'No valid cards found' };
            }

            const existingCards = this.getCards();
            const existingIds = new Set(existingCards.map(card => card.id));

            const newCards = validCards.filter(card => !existingIds.has(card.id));

            this.saveCards(existingCards.concat(newCards));

            return {
                success: true,
                imported: newCards.length,
                error: newCards.length < validCards.length ?
                    `${validCards.length - newCards.length} cards were skipped (duplicate IDs)` :
                    ''
            };
        } catch (error) {
            return { success: false, imported: 0, error: 'Invalid JSON format' };
        }
    }
}
