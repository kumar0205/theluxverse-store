import React from 'react';

export default function PackageOpenIcon({ size = 16, strokeWidth = 2, className = '', style = {}, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        flexShrink: 0,
        ...style
      }}
      className={className}
      {...props}
    >
      <path d="M12 22v-9" />
      <path d="M15.17 19.83 22 16.5V10c0-1-1.5-2-3-2H5c-1.5 0-3 1-3 2v6.5l6.83 3.33a2 2 0 0 0 1.67 0z" />
      <path d="M22 10 16 5" />
      <path d="M2 10 8 5" />
      <path d="M16 5 8 5" />
      <path d="m20.8 14.8-4.8-3.2H8l-4.8 3.2" />
    </svg>
  );
}
