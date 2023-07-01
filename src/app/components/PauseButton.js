import React from 'react';

const PauseButton = ({ size = 24, strokeWidth = 1.5, color = 'currentColor' }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        strokeWidth={strokeWidth}
        stroke={color}
        style={{ fill: 'rgba(0, 0, 0, 1)', transform: '', msFilter: '' }}
    >
        <path
            d="M8 7h3v10H8zm5 0h3v10h-3z"
        />
    </svg>
);

export default PauseButton;