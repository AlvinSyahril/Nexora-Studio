"use client";

import { track } from '@vercel/analytics/react';

interface DownloadButtonProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export default function DownloadButton({ href, className, children }: DownloadButtonProps) {
  return (
    <a 
      href={href} 
      download 
      className={className}
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
