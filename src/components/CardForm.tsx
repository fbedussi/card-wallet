import React, { useState, useEffect } from 'react';
import type { Card } from '../types/Card';

interface CardFormProps {
    card?: Card | null;
    onSave: (card: Card) => void;
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

        const cardData: Card = {
            id: card?.id || `card_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            name: name.trim(),
            code: parseInt(code.trim(), 10)
        };

        onSave(cardData);
    };

    return (
        <div className="card-form-overlay">
            <div className="card-form">
                <h3>{card ? 'Edit Card' : 'Add New Card'}</h3>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="cardName">Card Name *</label>
                        <input
                            id="cardName"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g., Starbucks, Gym Membership"
                            className={errors.name ? 'error' : ''}
                            autoFocus
                        />
                        {errors.name && <span className="error-message">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="cardCode">Barcode Number *</label>
                        <input
                            id="cardCode"
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Enter or scan barcode number"
                            className={errors.code ? 'error' : ''}
                        />
                        {errors.code && <span className="error-message">{errors.code}</span>}
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={onCancel} className="btn btn-secondary">
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            {card ? 'Update' : 'Add'} Card
                        </button>
                    </div>
                </form>
            </div>

            <style>{`
        .card-form-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }
        
        .card-form {
          background: white;
          border-radius: 8px;
          padding: 2rem;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .card-form h3 {
          margin: 0 0 1.5rem 0;
          color: #495057;
          text-align: center;
        }
        
        .form-group {
          margin-bottom: 1rem;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #495057;
        }
        
        .form-group input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ced4da;
          border-radius: 4px;
          font-size: 1rem;
          box-sizing: border-box;
        }
        
        .form-group input:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
        }
        
        .form-group input.error {
          border-color: #dc3545;
        }
        
        .error-message {
          display: block;
          color: #dc3545;
          font-size: 0.875rem;
          margin-top: 0.25rem;
        }
        
        .form-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          margin-top: 2rem;
        }
        
        .btn {
          padding: 0.75rem 1.5rem;
          border: 1px solid transparent;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
          text-decoration: none;
          display: inline-block;
          text-align: center;
          background: none;
        }
        
        .btn-secondary {
          color: #6c757d;
          border-color: #6c757d;
        }
        
        .btn-secondary:hover {
          background-color: #6c757d;
          color: white;
        }
        
        .btn-primary {
          color: white;
          background-color: #007bff;
          border-color: #007bff;
        }
        
        .btn-primary:hover {
          background-color: #0056b3;
          border-color: #0056b3;
        }
      `}</style>
        </div>
    );
};
