import React from 'react';
import type { Card } from '../types/Card';
import { BarcodeDisplay } from './BarcodeDisplay';
import styles from './SingleCardView.module.css';

interface SingleCardViewProps {
    card: Card;
    onBack: () => void;
    onEdit: (card: Card) => void;
    onDelete: (id: string) => void;
}

export const SingleCardView: React.FC<SingleCardViewProps> = ({
    card,
    onBack,
    onEdit,
    onDelete
}) => {
    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this card?')) {
            onDelete(card.id);
            onBack();
        }
    };

    // Generate a consistent background color based on card ID
    const getCardColorClass = (cardId: string) => {
        let hash = 0;
        for (let i = 0; i < cardId.length; i++) {
            const char = cardId.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }

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

    return (
        <div className={styles.singleCardView}>
            <div className={styles.header}>
                <button
                    onClick={onBack}
                    className={styles.backButton}
                    title="Back to card list"
                >
                    ← Back
                </button>
                <div className={styles.actions}>
                    <button
                        onClick={() => onEdit(card)}
                        className={`${styles.btn} ${styles.btnEdit}`}
                        title="Edit card"
                    >
                        ✏️ Edit
                    </button>
                    <button
                        onClick={handleDelete}
                        className={`${styles.btn} ${styles.btnDelete}`}
                        title="Delete card"
                    >
                        🗑️ Delete
                    </button>
                </div>
            </div>

            <div className={`${styles.cardContainer} ${getCardColorClass(card.id)}`}>
                <div className={styles.cardContent}>
                    <h1 className={styles.cardName}>{card.name}</h1>

                    <div className={styles.barcodeContainer}>
                        <BarcodeDisplay value={card.code} />
                    </div>

                    <div className={styles.cardDetails}>
                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>Card Code:</span>
                            <span className={styles.detailValue}>{card.code}</span>
                        </div>
                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>Created:</span>
                            <span className={styles.detailValue}>
                                {card.createdAt.toLocaleDateString()} at {card.createdAt.toLocaleTimeString()}
                            </span>
                        </div>
                        {card.updatedAt.getTime() !== card.createdAt.getTime() && (
                            <div className={styles.detailItem}>
                                <span className={styles.detailLabel}>Updated:</span>
                                <span className={styles.detailValue}>
                                    {card.updatedAt.toLocaleDateString()} at {card.updatedAt.toLocaleTimeString()}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className={styles.instructions}>
                <p>💡 Show this barcode at the store to earn points or get discounts</p>
            </div>
        </div>
    );
};
