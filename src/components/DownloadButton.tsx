"use client";

import { motion } from "framer-motion";
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
    <motion.a 
      href={href} 
      download={extractFilename(href)}
      className={className}
      style={style}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onClick={() => {
        track('Download APK', {
          file: href
        });
      }}
    >
      {children}
    </motion.a>
  );
}

