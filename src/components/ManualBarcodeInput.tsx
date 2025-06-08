import React, { useState } from 'react';
import styles from './ManualBarcodeInput.module.css';

interface ManualBarcodeInputProps {
    onScan: (code: string) => void;
    onCancel: () => void;
}

export const ManualBarcodeInput: React.FC<ManualBarcodeInputProps> = ({
    onScan,
    onCancel
}) => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const numericCode = code.trim().replace(/\D/g, '');
        if (!numericCode) {
            setError('Please enter a valid barcode number');
            return;
        }

        onScan(numericCode);
    };

    return (
        <div className={styles.manualInputContainer}>
            <div className={styles.manualInputCard}>
                <h3>Enter Barcode Manually</h3>
                <p>Type or paste the barcode number</p>

                <form onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => {
                                setCode(e.target.value);
                                setError('');
                            }}
                            placeholder="e.g., 1234567890123"
                            autoFocus
                            className={error ? styles.error : ''}
                        />
                        {error && <span className={styles.errorText}>{error}</span>}
                    </div>

                    <div className={styles.buttonGroup}>
                        <button type="button" onClick={onCancel} className={`${styles.btn} ${styles.btnSecondary}`}>
                            Cancel
                        </button>
                        <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
                            Add Card
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
