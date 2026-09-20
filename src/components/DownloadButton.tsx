"use client";

import { track } from '@vercel/analytics/react';

interface DownloadButtonProps {
  href: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export default function DownloadButton({ href, className, style, children }: DownloadButtonProps) {
  const extractFilename = (url: string) => {
    try {
      const pathname = new URL(url).pathname;
      return pathname.split('/').pop() || 'download';
    } catch {
      return 'download';
    }
  };

  return (
    <a 
      href={href} 
      download={extractFilename(href)}
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
