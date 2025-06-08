import React, { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

interface BarcodeDisplayProps {
    value: string;
    width?: number;
    height?: number;
    format?: string;
    displayValue?: boolean;
}

export const BarcodeDisplay: React.FC<BarcodeDisplayProps> = ({
    value,
    width = 2,
    height = 100,
    format = 'CODE128',
    displayValue = true
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current && value) {
            try {
                JsBarcode(canvasRef.current, value, {
                    format,
                    width,
                    height,
                    displayValue,
                    fontSize: 14,
                    textMargin: 8,
                    background: '#ffffff',
                    lineColor: '#000000'
                });
            } catch (error) {
                console.error('Error generating barcode:', error);
                // Clear canvas on error
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.fillStyle = '#f8f9fa';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.fillStyle = '#dc3545';
                    ctx.font = '14px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText('Invalid barcode', canvas.width / 2, canvas.height / 2);
                }
            }
        }
    }, [value, width, height, format, displayValue]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                border: '1px solid #dee2e6',
                borderRadius: '4px',
                backgroundColor: '#ffffff'
            }}
        />
    );
};
