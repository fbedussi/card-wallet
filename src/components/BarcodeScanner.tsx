import React, { useRef, useEffect, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';

interface BarcodeScannerProps {
    onScan: (code: string) => void;
    onError: (error: string) => void;
    isActive: boolean;
}

export const BarcodeScanner: React.FC<BarcodeScannerProps> = ({
    onScan,
    onError,
    isActive
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [codeReader, setCodeReader] = useState<BrowserMultiFormatReader | null>(null);

    useEffect(() => {
        const reader = new BrowserMultiFormatReader();
        setCodeReader(reader);

        return () => {
            reader.reset();
        };
    }, []);

    useEffect(() => {
        if (!codeReader || !isActive) return;

        const startScanning = async () => {
            try {
                const videoInputDevices = await codeReader.listVideoInputDevices();

                if (videoInputDevices.length === 0) {
                    onError('No camera devices found');
                    return;
                }

                // Use the first available camera (usually back camera on mobile)
                const selectedDeviceId = videoInputDevices[0].deviceId;

                codeReader.decodeFromVideoDevice(
                    selectedDeviceId,
                    videoRef.current,
                    (result, error) => {
                        if (result) {
                            const scannedCode = result.getText();
                            onScan(scannedCode);
                        }
                        if (error && !(error instanceof Error && error.name === 'NotFoundException')) {
                            console.error('Scanning error:', error);
                        }
                    }
                );
            } catch (error) {
                console.error('Error starting camera:', error);
                onError('Failed to access camera. Please check permissions.');
            }
        };

        startScanning();

        return () => {
            codeReader.reset();
        };
    }, [codeReader, isActive, onScan, onError]);

    if (!isActive) return null;

    return (
        <div className="scanner-container">
            <video
                ref={videoRef}
                className="scanner-video"
                style={{
                    width: '100%',
                    maxWidth: '400px',
                    height: 'auto',
                    border: '2px solid #007bff',
                    borderRadius: '8px'
                }}
                autoPlay
                playsInline
                muted
            />
            <div className="scanner-overlay">
                <div className="scan-frame" style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '200px',
                    height: '200px',
                    border: '2px solid #ff6b6b',
                    borderRadius: '8px',
                    pointerEvents: 'none'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '-10px',
                        left: '-10px',
                        right: '-10px',
                        bottom: '-10px',
                        border: '2px solid rgba(255, 107, 107, 0.3)',
                        borderRadius: '12px',
                        animation: 'pulse 2s infinite'
                    }} />
                </div>
                <p style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    color: 'white',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    margin: 0
                }}>
                    Position barcode within the frame
                </p>
            </div>

            <style>{`
        .scanner-container {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .scanner-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
        }
        
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
        </div>
    );
};
