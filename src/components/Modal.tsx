import React, { useRef, useEffect } from 'react';
import styles from './Modal.module.css';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    showCloseButton?: boolean;
    className?: string;
}

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    showCloseButton = true,
    className = ''
}) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isOpen) {
            dialog.showModal();
        } else {
            dialog.close();
        }

        // Handle ESC key and backdrop clicks
        const handleClose = (event: Event) => {
            if (event.target === dialog) {
                onClose();
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        dialog.addEventListener('click', handleClose);
        dialog.addEventListener('keydown', handleKeyDown);

        return () => {
            dialog.removeEventListener('click', handleClose);
            dialog.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    return (
        <dialog
            ref={dialogRef}
            className={`${styles.modal} ${className}`}
            aria-labelledby={title ? 'modal-title' : undefined}
        >
            <div className={styles.modalContent}>
                {(title || showCloseButton) && (
                    <div className={styles.modalHeader}>
                        {title && (
                            <h2 id="modal-title" className={styles.modalTitle}>
                                {title}
                            </h2>
                        )}
                        {showCloseButton && (
                            <button
                                onClick={onClose}
                                className={styles.closeButton}
                                type="button"
                                aria-label="Close modal"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                )}

                <div className={styles.modalBody}>
                    {children}
                </div>
            </div>
        </dialog>
    );
};
