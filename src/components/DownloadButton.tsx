"use client";

import { track } from '@vercel/analytics/react';

interface DownloadButtonProps {
  href: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export default function DownloadButton({ href, className, style, children }: DownloadButtonProps) {
  return (
    <a 
      href={href} 
      download 
      className={className}
      style={style}
      onClick={() => {
        track('Download APK', {
          file: href
        });
      }}
    >
      {children}
    </a>
  );
}
