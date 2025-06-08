import React from 'react';
import type { CardData } from '../types/Card';
import { BarcodeDisplay } from './BarcodeDisplay';

interface CardListProps {
    cards: CardData[];
    onEdit: (card: CardData) => void;
    onDelete: (id: string) => void;
}

export const CardList: React.FC<CardListProps> = ({ cards, onEdit, onDelete }) => {
    if (cards.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-icon">📱</div>
                <h3>No cards yet</h3>
                <p>Scan your first fidelity card to get started!</p>
            </div>
        );
    }

    return (
        <div className="card-list">
            {cards.map((card) => (
                <div key={card.id} className="card-item">
                    <div className="card-header">
                        <h3 className="card-name">{card.name}</h3>
                        <div className="card-actions">
                            <button
                                onClick={() => onEdit(card)}
                                className="btn btn-secondary btn-sm"
                                title="Edit card"
                            >
                                ✏️
                            </button>
                            <button
                                onClick={() => onDelete(card.id)}
                                className="btn btn-danger btn-sm"
                                title="Delete card"
                            >
                                🗑️
                            </button>
                        </div>
                    </div>

                    <div className="card-barcode">
                        <BarcodeDisplay value={card.code.toString()} />
                    </div>

                    <div className="card-info">
                        <span className="card-code">Code: {card.code}</span>
                        <span className="card-date">
                            Added: {card.createdAt.toLocaleDateString()}
                        </span>
                    </div>
                </div>
            ))}

            <style>{`
        .card-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .card-item {
          background: white;
          border-radius: 8px;
          padding: 1rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          border: 1px solid #e9ecef;
        }
        
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        
        .card-name {
          margin: 0;
          color: #495057;
          font-size: 1.1rem;
        }
        
        .card-actions {
          display: flex;
          gap: 0.5rem;
        }
        
        .card-barcode {
          display: flex;
          justify-content: center;
          margin-bottom: 1rem;
          overflow-x: auto;
        }
        
        .card-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.9rem;
          color: #6c757d;
        }
        
        .empty-state {
          text-align: center;
          padding: 3rem 1rem;
          color: #6c757d;
        }
        
        .empty-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }
        
        .empty-state h3 {
          margin: 0 0 0.5rem 0;
          color: #495057;
        }
        
        .empty-state p {
          margin: 0;
        }
        
        .btn {
          padding: 0.375rem 0.75rem;
          border: 1px solid transparent;
          border-radius: 0.25rem;
          cursor: pointer;
          font-size: 0.875rem;
          text-decoration: none;
          display: inline-block;
          text-align: center;
          background: none;
        }
        
        .btn-sm {
          padding: 0.25rem 0.5rem;
          font-size: 0.8rem;
        }
        
        .btn-secondary {
          color: #6c757d;
          border-color: #6c757d;
        }
        
        .btn-secondary:hover {
          background-color: #6c757d;
          color: white;
        }
        
        .btn-danger {
          color: #dc3545;
          border-color: #dc3545;
        }
        
        .btn-danger:hover {
          background-color: #dc3545;
          color: white;
        }
      `}</style>
        </div>
    );
};
