"use client";

import React, { useEffect, useState } from 'react';
import { track } from '@vercel/analytics/react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Star } from 'lucide-react';

interface ArchitectureDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  appName: string;
  links: {
    arm64: string;
    arm32: string;
    universal: string;
  };
}

export default function ArchitectureDownloadModal({ isOpen, onClose, appName, links }: ArchitectureDownloadModalProps) {
  const [detectedArch, setDetectedArch] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Try to detect architecture
      const detect = async () => {
        try {
          let arch = null;
          
          // 1. Try modern userAgentData API
          if (typeof navigator !== 'undefined' && 'userAgentData' in navigator) {
            const nav = navigator as Navigator & {
              userAgentData?: {
                getHighEntropyValues?: (hints: string[]) => Promise<{ architecture?: string; bitness?: string }>;
              };
            };
            if (nav.userAgentData?.getHighEntropyValues) {
              const uaData = await nav.userAgentData.getHighEntropyValues(['architecture', 'bitness']);
              if (uaData.architecture === 'arm' || uaData.architecture === 'arm64') {
                arch = (uaData.bitness === '64' || uaData.architecture === 'arm64') ? 'arm64-v8a' : 'armeabi-v7a';
              } else if (uaData.architecture === 'x86') {
                arch = 'x86';
              }
            }
          }

          // 2. Fallback to parsing userAgent and platform strings
          if (!arch && typeof navigator !== 'undefined') {
            const ua = navigator.userAgent.toLowerCase();
            const platform = (navigator.platform || '').toLowerCase();
            
            if (
              ua.includes('aarch64') || ua.includes('arm64') || ua.includes('armv8') ||
              platform.includes('aarch64') || platform.includes('arm64') || platform.includes('armv8') ||
              (ua.includes('android') && ua.includes('64'))
            ) {
              arch = 'arm64-v8a';
            } else if (ua.includes('arm') || platform.includes('arm')) {
              arch = 'armeabi-v7a';
            }
          }
          
          if (arch) {
            setDetectedArch(arch);
          }
        } catch (e) {
          console.error('Failed to detect architecture', e);
        }
      };
      detect();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.45)', backdropFilter: 'blur(8px)', zIndex: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px'
          }}
        >
          <motion.div 
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: "spring", stiffness: 420, damping: 30 }}
            style={{
              backgroundColor: '#FFFFFF', 
              borderRadius: '20px', 
              padding: '28px',
              maxWidth: '440px', 
              width: '100%', 
              position: 'relative',
              boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.2)',
              border: '1px solid rgba(0, 0, 0, 0.08)'
            }}
          >
            <button 
              onClick={onClose} 
              aria-label="Close dialog"
              style={{ 
                position: 'absolute', 
                top: '20px', 
                right: '20px', 
                background: 'rgba(0, 0, 0, 0.04)', 
                border: 'none', 
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer', 
                color: '#525252',
                transition: 'background 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0, 0, 0, 0.08)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0, 0, 0, 0.04)'}
            >
              <X size={16} />
            </button>
            
            <div style={{ marginBottom: '18px' }}>
              <span className="font-mono-meta" style={{ fontSize: '0.72rem', color: '#737373', display: 'block', marginBottom: '4px' }}>
                ARCHITECTURE SPECIFICATION
              </span>
              <h3 id="modal-title" style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: '#000000', letterSpacing: '-0.02em' }}>
                Download {appName} for Android
              </h3>
            </div>

            <p style={{ fontSize: '0.9rem', color: '#666666', lineHeight: 1.5, marginBottom: '22px' }}>
              Select the binary matching your device architecture for optimal CPU execution speed and compact install size.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              
              <motion.a 
                href={links.arm64}
                download
                onClick={() => track('Download APK', { type: 'arm64' })}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                style={{
                  display: 'flex', alignItems: 'center', padding: '14px 18px',
                  border: detectedArch === 'arm64-v8a' ? '2px solid #000000' : '1px solid rgba(0, 0, 0, 0.08)',
                  borderRadius: '12px', textDecoration: 'none', color: '#000000',
                  backgroundColor: detectedArch === 'arm64-v8a' ? '#F9F9F9' : '#FFFFFF',
                  boxShadow: detectedArch === 'arm64-v8a' ? '0 4px 16px rgba(0, 0, 0, 0.06)' : 'none',
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>arm64-v8a</span>
                    {detectedArch === 'arm64-v8a' && (
                      <span className="font-mono-meta" style={{ display: 'flex', alignItems: 'center', fontSize: '0.65rem', color: '#FFFFFF', background: '#000000', padding: '2px 8px', borderRadius: '4px' }}>
                        <Star size={10} style={{ marginRight: '4px' }}/> RECOMMENDED
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#737373', display: 'block', marginTop: '2px' }}>
                    Standard for modern 64-bit Android devices (~40MB)
                  </span>
                </div>
                <Download size={18} color="#000000" />
              </motion.a>

              <motion.a 
                href={links.arm32}
                download
                onClick={() => track('Download APK', { type: 'arm32' })}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                style={{
                  display: 'flex', alignItems: 'center', padding: '14px 18px',
                  border: detectedArch === 'armeabi-v7a' ? '2px solid #000000' : '1px solid rgba(0, 0, 0, 0.08)',
                  borderRadius: '12px', textDecoration: 'none', color: '#000000',
                  backgroundColor: detectedArch === 'armeabi-v7a' ? '#F9F9F9' : '#FFFFFF',
                  boxShadow: detectedArch === 'armeabi-v7a' ? '0 4px 16px rgba(0, 0, 0, 0.06)' : 'none',
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>armeabi-v7a</span>
                    {detectedArch === 'armeabi-v7a' && (
                      <span className="font-mono-meta" style={{ display: 'flex', alignItems: 'center', fontSize: '0.65rem', color: '#FFFFFF', background: '#000000', padding: '2px 8px', borderRadius: '4px' }}>
                        <Star size={10} style={{ marginRight: '4px' }}/> RECOMMENDED
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#737373', display: 'block', marginTop: '2px' }}>
                    Legacy 32-bit Android devices (~40MB)
                  </span>
                </div>
                <Download size={18} color="#000000" />
              </motion.a>

              <motion.a 
                href={links.universal}
                download
                onClick={() => track('Download APK', { type: 'universal' })}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                style={{
                  display: 'flex', alignItems: 'center', padding: '14px 18px',
                  border: (detectedArch !== 'arm64-v8a' && detectedArch !== 'armeabi-v7a') ? '2px solid #000000' : '1px solid rgba(0, 0, 0, 0.08)',
                  borderRadius: '12px', textDecoration: 'none', color: '#000000',
                  backgroundColor: (detectedArch !== 'arm64-v8a' && detectedArch !== 'armeabi-v7a') ? '#F9F9F9' : '#FFFFFF',
                  boxShadow: (detectedArch !== 'arm64-v8a' && detectedArch !== 'armeabi-v7a') ? '0 4px 16px rgba(0, 0, 0, 0.06)' : 'none',
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>Universal APK</span>
                    {(detectedArch !== 'arm64-v8a' && detectedArch !== 'armeabi-v7a') && (
                      <span className="font-mono-meta" style={{ display: 'flex', alignItems: 'center', fontSize: '0.65rem', color: '#FFFFFF', background: '#000000', padding: '2px 8px', borderRadius: '4px' }}>
                        <Star size={10} style={{ marginRight: '4px' }}/> RECOMMENDED
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#737373', display: 'block', marginTop: '2px' }}>
                    Universal binary running on all CPU architectures (~130MB)
                  </span>
                </div>
                <Download size={18} color="#000000" />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

      )}
    </AnimatePresence>
  );
}


