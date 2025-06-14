import React, { useState, useMemo } from 'react';
import type { Card } from '../types/Card';
import { ScanIcon } from './icons';
import styles from './CardList.module.css';
import { calculateCardColorHue } from '../utils/utils';

interface CardListProps {
    cards: Card[];
    onCardClick?: (card: Card) => void;
}

export const CardList: React.FC<CardListProps> = ({ cards, onCardClick }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredCards = useMemo(() => {
        if (!searchQuery.trim()) {
            return cards;
        }
        return cards.filter(card =>
            card.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [cards, searchQuery]);

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
        <div className={styles.cardListContainer}>
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Search cards by name..."
                    value={searchQuery}
                    onChange={(event) => {
                        setSearchQuery(event.target.value);
                    }}
                    className={styles.searchInput}
                />
            </div>

            {filteredCards.length === 0 && searchQuery.trim() ? (
                <div className={styles.noResults}>
                    <p>No cards found matching "{searchQuery}"</p>
                </div>
            ) : (
                <div className={styles.cardList}>
                    {filteredCards.map((card) => (
                        <div
                            key={card.id}
                            className={`${styles.cardItem}`}
                            style={{ backgroundColor: `hsl(${calculateCardColorHue(card.code)}deg 60% 60%)` }}
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
            )}
        </div>
    );
};
