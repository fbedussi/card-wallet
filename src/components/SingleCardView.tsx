import React, { useState } from 'react';
import type { Card } from '../types/Card';
import { BarcodeDisplay } from './BarcodeDisplay';
import { Modal } from './Modal';
import { EditIcon, DeleteIcon } from './icons';
import styles from './SingleCardView.module.css';
import { calculateCardColorHue } from '../utils/utils';

interface SingleCardViewProps {
    card: Card;
    onEdit: (card: Card) => void;
    onDelete: (id: string) => void;
}

export const SingleCardView: React.FC<SingleCardViewProps> = ({
    card,
    onEdit,
    onDelete
}) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleDelete = () => {
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        onDelete(card.id);
        setIsDeleteModalOpen(false);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalOpen(false);
    };

    return (
        <div className={styles.singleCardView}>
            <div className={styles.header}>
                <div className={styles.actions}>
                    <button
                        onClick={() => onEdit(card)}
                        className={`${styles.btn} ${styles.btnEdit}`}
                        title="Edit card"
                    >
                        <EditIcon size={16} />
                        Edit
                    </button>
                    <button
                        onClick={handleDelete}
                        className={`${styles.btn} ${styles.btnDelete}`}
                        title="Delete card"
                    >
                        <DeleteIcon size={16} />
                        Delete
                    </button>
                </div>
            </div>

            <div
                className={`${styles.cardContainer}`}
                style={{ backgroundColor: `hsl(${calculateCardColorHue(card.code)}deg 60% 60%)` }}
            >
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

            <Modal
                isOpen={isDeleteModalOpen}
                onClose={handleCancelDelete}
                title="Delete Card"
                showCloseButton={false}
            >
                <div className={styles.deleteConfirmation}>
                    <p>Are you sure you want to delete this card?</p>
                    <p className={styles.cardNameToDelete}>"{card.name}"</p>
                    <p>This action cannot be undone.</p>

                    <div className={styles.confirmationActions}>
                        <button
                            onClick={handleCancelDelete}
                            className={`${styles.btn} ${styles.btnSecondary}`}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirmDelete}
                            className={`${styles.btn} ${styles.btnDanger}`}
                        >
                            Delete Card
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};
