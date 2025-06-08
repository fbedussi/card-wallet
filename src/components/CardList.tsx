import React from 'react';
import type { CardData } from '../types/Card';
import { BarcodeDisplay } from './BarcodeDisplay';
import styles from './CardList.module.css';

interface CardListProps {
    cards: CardData[];
    onEdit: (card: CardData) => void;
    onDelete: (id: string) => void;
}

export const CardList: React.FC<CardListProps> = ({ cards, onEdit, onDelete }) => {
    // Generate a consistent background color based on card ID
    const getCardBackgroundColor = (cardId: string) => {
        // Use card ID to generate a consistent hash
        let hash = 0;
        for (let i = 0; i < cardId.length; i++) {
            const char = cardId.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }

        // Use solid colors from the specified color palette
        const colors = [
            '#309898',      // Teal
            '#FF9F00',      // Orange
            '#F4631E',      // Orange-red
            '#CB0404',      // Red
        ];

        return colors[Math.abs(hash) % colors.length];
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
                    className={styles.cardItem}
                    style={{ background: getCardBackgroundColor(card.id) }}
                >
                    <div className={styles.cardHeader}>
                        <h3 className={styles.cardName}>{card.name}</h3>
                        <div className={styles.cardActions}>
                            <button
                                onClick={() => onEdit(card)}
                                className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSm}`}
                                title="Edit card"
                            >
                                ✏️
                            </button>
                            <button
                                onClick={() => onDelete(card.id)}
                                className={`${styles.btn} ${styles.btnDanger} ${styles.btnSm}`}
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
                        <span className="card-code">Code: {card.code}</span>
                        <span className="card-date">
                            Added: {card.createdAt.toLocaleDateString()}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};
