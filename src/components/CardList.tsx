import React from 'react';
import type { Card } from '../types/Card';
import { ScanIcon } from './icons';
import styles from './CardList.module.css';

interface CardListProps {
    cards: Card[];
    onCardClick?: (card: Card) => void;
}

export const CardList: React.FC<CardListProps> = ({ cards, onCardClick }) => {
    // Generate a consistent background color based on card ID
    const getCardColorClass = (cardId: string) => {
        // Use card ID to generate a consistent hash
        let hash = 0;
        for (let i = 0; i < cardId.length; i++) {
            const char = cardId.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }

        // Use CSS classes with custom properties
        const colorClasses = [
            styles.colorTeal,
            styles.colorOrange,
            styles.colorOrangeRed,
            styles.colorRed,
            styles.colorRed2,
            styles.colorOrange2,
            styles.colorTeal2,
            styles.colorRetro,
        ];

        return colorClasses[Math.abs(hash) % colorClasses.length];
    };

    if (cards.length === 0) {
        return (
            <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>
                    <ScanIcon size={48} color="#9ca3af" />
                </div>
                <h3>No cards yet</h3>
                <p>Scan your first fidelity card to get started!</p>
            </div>
        );
    }

    return (
        <div className={styles.cardList}>
            {cards.map((card) => (
                <div
                    key={card.id}
                    className={`${styles.cardItem} ${getCardColorClass(card.id)} ${onCardClick ? styles.clickable : ''}`}
                    onClick={onCardClick ? () => onCardClick(card) : undefined}
                >
                    <div className={styles.cardHeader}>
                        <h3 className={styles.cardName}>{card.name}</h3>
                    </div>

                    <div className={styles.cardInfo}>
                        <span className={styles.cardCode}>Code: {card.code}</span>
                        <span className={styles.cardDate}>
                            Added: {card.createdAt.toLocaleDateString()}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};
