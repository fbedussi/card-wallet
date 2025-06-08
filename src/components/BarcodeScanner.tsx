import React, { useRef, useEffect, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';
import styles from './BarcodeScanner.module.css';

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
        <div className={styles.scannerContainer}>
            <video
                ref={videoRef}
                className={styles.scannerVideo}
                autoPlay
                playsInline
                muted
            />
            <div className={styles.scannerOverlay}>
                <div className={styles.scanFrame}>
                    <div className={styles.scanFrameOuter} />
                </div>
                <p className={styles.scanInstruction}>
                    Position barcode within the frame
                </p>
            </div>
        </div>
    );
};
