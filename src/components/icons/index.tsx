import React from 'react';

interface IconProps {
    size?: number;
    className?: string;
    color?: string;
    style?: React.CSSProperties;
}

export const CardIcon: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor', style }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        style={style}
    >
        <rect x="2" y="6" width="20" height="12" rx="2" stroke={color} strokeWidth="2" fill="none" />
        <rect x="2" y="9" width="20" height="3" fill={color} />
        <rect x="5" y="14" width="4" height="1" rx="0.5" fill={color} />
    </svg>
);

export const ScanIcon: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor', style }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        style={style}
    >
        <rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth="2" fill="none" />
        <path d="M9 9L7 9C6.44772 9 6 9.44772 6 10L6 12" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <path d="M15 9L17 9C17.5523 9 18 9.44772 18 10L18 12" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <path d="M9 15L7 15C6.44772 15 6 14.5523 6 14L6 12" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <path d="M15 15L17 15C17.5523 15 18 14.5523 18 14L18 12" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <line x1="7" y1="12" x2="17" y2="12" stroke={color} strokeWidth="1" />
    </svg>
);

export const AddIcon: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor', style }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        style={style}
    >
        <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none" />
        <line x1="12" y1="8" x2="12" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <line x1="8" y1="12" x2="16" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
);

export const EditIcon: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor', style }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        style={style}
    >
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" stroke={color} strokeWidth="2" fill="none" />
        <path d="m15 5 4 4" stroke={color} strokeWidth="2" />
    </svg>
);

export const DeleteIcon: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor', style }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        style={style}
    >
        <path d="m3 6 18 0" stroke={color} strokeWidth="2" />
        <path d="m19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" stroke={color} strokeWidth="2" fill="none" />
        <path d="m8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" stroke={color} strokeWidth="2" fill="none" />
        <line x1="10" y1="11" x2="10" y2="17" stroke={color} strokeWidth="2" />
        <line x1="14" y1="11" x2="14" y2="17" stroke={color} strokeWidth="2" />
    </svg>
);

export const DownloadIcon: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor', style }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        style={style}
    >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke={color} strokeWidth="2" fill="none" />
        <polyline points="7,10 12,15 17,10" stroke={color} strokeWidth="2" fill="none" />
        <line x1="12" y1="15" x2="12" y2="3" stroke={color} strokeWidth="2" />
    </svg>
);

export const UploadIcon: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor', style }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        style={style}
    >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke={color} strokeWidth="2" fill="none" />
        <polyline points="17,8 12,3 7,8" stroke={color} strokeWidth="2" fill="none" />
        <line x1="12" y1="3" x2="12" y2="15" stroke={color} strokeWidth="2" />
    </svg>
);

export const InputIcon: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor', style }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        style={style}
    >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke={color} strokeWidth="2" fill="none" />
        <polyline points="14,2 14,8 20,8" stroke={color} strokeWidth="2" fill="none" />
        <line x1="16" y1="13" x2="8" y2="13" stroke={color} strokeWidth="2" />
        <line x1="16" y1="17" x2="8" y2="17" stroke={color} strokeWidth="2" />
        <polyline points="10,9 9,9 8,9" stroke={color} strokeWidth="2" fill="none" />
    </svg>
);

export const ArrowLeftIcon: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor', style }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        style={style}
    >
        <line x1="19" y1="12" x2="5" y2="12" stroke={color} strokeWidth="2" />
        <polyline points="12,19 5,12 12,5" stroke={color} strokeWidth="2" fill="none" />
    </svg>
);

export const PointUpIcon: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor', style }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        style={style}
    >
        <path d="M12 2L12 22" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <path d="M8 6L12 2L16 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="18" cy="8" r="2" fill={color} />
    </svg>
);
