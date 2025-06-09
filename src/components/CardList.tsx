import React from 'react';
import type { Card } from '../types/Card';
import { BarcodeDisplay } from './BarcodeDisplay';
import styles from './CardList.module.css';

interface CardListProps {
    cards: Card[];
    onEdit: (card: Card) => void;
    onDelete: (id: string) => void;
}

export const CardList: React.FC<CardListProps> = ({ cards, onEdit, onDelete }) => {
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
                <div className={styles.emptyIcon}>📱</div>
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
                    className={`${styles.cardItem} ${getCardColorClass(card.id)}`}
                >
                    <div className={styles.cardHeader}>
                        <h3 className={styles.cardName}>{card.name}</h3>
                        <div className={styles.cardActions}>
                            <button
                                onClick={() => onEdit(card)}
                                className={`${styles.btn} ${styles.btnEdit} ${styles.btnSm}`}
                                title="Edit card"
                            >
                                ✏️
                            </button>
                            <button
                                onClick={() => onDelete(card.id)}
                                className={`${styles.btn} ${styles.btnDelete} ${styles.btnSm}`}
                                title="Delete card"
                            >
                                🗑️
                            </button>
                        </div>
                    </div>

                    <div className={styles.cardBarcode}>
                        <BarcodeDisplay value={card.code.toString()} />
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
