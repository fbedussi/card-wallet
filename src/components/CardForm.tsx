import React, { useState, useEffect } from 'react';
import type { Card } from '../types/Card';
import styles from './CardForm.module.css';

interface CardFormProps {
    card?: Card | null;
    onSave: (card: Omit<Card, 'createdAt' | 'updatedAt'>) => void;
    onCancel: () => void;
    scannedCode?: string;
}

export const CardForm: React.FC<CardFormProps> = ({
    card,
    onSave,
    onCancel,
    scannedCode
}) => {
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [errors, setErrors] = useState<{ name?: string; code?: string }>({});

    useEffect(() => {
        if (card) {
            setName(card.name);
            setCode(card.code.toString());
        } else if (scannedCode) {
            setCode(scannedCode);
            setName('');
        } else {
            setName('');
            setCode('');
        }
        setErrors({});
    }, [card, scannedCode]);

    const validateForm = () => {
        const newErrors: { name?: string; code?: string } = {};

        if (!name.trim()) {
            newErrors.name = 'Card name is required';
        }

        if (!code.trim()) {
            newErrors.code = 'Barcode is required';
        } else if (!/^\d+$/.test(code.trim())) {
            newErrors.code = 'Barcode must contain only numbers';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        const cardData: Omit<Card, 'createdAt' | 'updatedAt'> = {
            id: card?.id || `card_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            name: name.trim(),
            code: code.trim(),
        };

        onSave(cardData);
    };

    return (
        <div className={styles.cardFormOverlay}>
            <div className={styles.cardForm}>
                <h3>{card ? 'Edit Card' : 'Add New Card'}</h3>

                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="cardName">Card Name *</label>
                        <input
                            id="cardName"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g., Starbucks, Gym Membership"
                            className={errors.name ? styles.error : ''}
                            autoFocus
                        />
                        {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="cardCode">Barcode Number *</label>
                        <input
                            id="cardCode"
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Enter or scan barcode number"
                            className={errors.code ? styles.error : ''}
                        />
                        {errors.code && <span className={styles.errorMessage}>{errors.code}</span>}
                    </div>

                    <div className={styles.formActions}>
                        <button type="button" onClick={onCancel} className={`${styles.btn} ${styles.btnSecondary}`}>
                            Cancel
                        </button>
                        <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
                            {card ? 'Update' : 'Add'} Card
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
