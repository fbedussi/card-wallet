import React, { useState } from 'react';

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
        <div className="manual-input-container">
            <div className="manual-input-card">
                <h3>Enter Barcode Manually</h3>
                <p>Type or paste the barcode number</p>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => {
                                setCode(e.target.value);
                                setError('');
                            }}
                            placeholder="e.g., 1234567890123"
                            autoFocus
                            className={error ? 'error' : ''}
                        />
                        {error && <span className="error-text">{error}</span>}
                    </div>

                    <div className="button-group">
                        <button type="button" onClick={onCancel} className="btn-secondary">
                            Cancel
                        </button>
                        <button type="submit" className="btn-primary">
                            Add Card
                        </button>
                    </div>
                </form>
            </div>

            <style>{`
        .manual-input-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 300px;
          padding: 1rem;
        }
        
        .manual-input-card {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border: 1px solid #e9ecef;
          width: 100%;
          max-width: 400px;
          text-align: center;
        }
        
        .manual-input-card h3 {
          margin: 0 0 0.5rem 0;
          color: #495057;
          font-size: 1.3rem;
        }
        
        .manual-input-card p {
          margin: 0 0 2rem 0;
          color: #6c757d;
        }
        
        .input-group {
          margin-bottom: 2rem;
        }
        
        .input-group input {
          width: 100%;
          padding: 1rem;
          border: 2px solid #ced4da;
          border-radius: 8px;
          font-size: 1.1rem;
          text-align: center;
          box-sizing: border-box;
          transition: border-color 0.2s ease;
        }
        
        .input-group input:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
        }
        
        .input-group input.error {
          border-color: #dc3545;
        }
        
        .error-text {
          display: block;
          color: #dc3545;
          font-size: 0.9rem;
          margin-top: 0.5rem;
        }
        
        .button-group {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }
        
        .btn-secondary, .btn-primary {
          padding: 0.75rem 1.5rem;
          border: 2px solid;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.2s ease;
          background: none;
        }
        
        .btn-secondary {
          color: #6c757d;
          border-color: #6c757d;
        }
        
        .btn-secondary:hover {
          background: #6c757d;
          color: white;
        }
        
        .btn-primary {
          color: white;
          background: #007bff;
          border-color: #007bff;
        }
        
        .btn-primary:hover {
          background: #0056b3;
          border-color: #0056b3;
          transform: translateY(-1px);
        }
      `}</style>
        </div>
    );
};
