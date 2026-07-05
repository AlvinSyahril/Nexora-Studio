"use client";

import React, { useEffect, useState } from 'react';
import { track } from '@vercel/analytics/react';
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
          if (typeof navigator !== 'undefined' && 'userAgentData' in navigator) {
            const nav: any = navigator;
            const uaData = await nav.userAgentData.getHighEntropyValues(['architecture', 'bitness']);
            if (uaData.architecture === 'arm' && uaData.bitness === '64') {
              setDetectedArch('arm64-v8a');
            } else if (uaData.architecture === 'arm') {
              setDetectedArch('armeabi-v7a');
            } else if (uaData.architecture === 'x86') {
              setDetectedArch('x86');
            }
          } else {
             // Fallback
             const ua = navigator.userAgent.toLowerCase();
             if (ua.includes('aarch64') || ua.includes('arm64') || ua.includes('armv8')) {
                 setDetectedArch('arm64-v8a');
             } else if (ua.includes('arm')) {
                 setDetectedArch('armeabi-v7a');
             }
          }
        } catch (e) {
          console.error('Failed to detect architecture', e);
        }
      };
      detect();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#fff', borderRadius: '16px', padding: '24px',
        maxWidth: '400px', width: '100%', position: 'relative',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
      }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}>
          <X size={20} />
        </button>
        
        <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>Download {appName}</h3>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
          Please select the version that matches your device architecture for optimal performance and smaller app size.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          <a 
            href={links.arm64}
            download
            onClick={() => track('Download APK', { type: 'arm64' })}
            style={{
              display: 'flex', alignItems: 'center', padding: '12px 16px',
              border: detectedArch === 'arm64-v8a' ? '2px solid #5C9EAD' : '1px solid #eee',
              borderRadius: '8px', textDecoration: 'none', color: '#333',
              backgroundColor: detectedArch === 'arm64-v8a' ? '#F4F9F9' : '#fafafa',
              transition: 'all 0.2s'
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: '600' }}>arm64-v8a</span>
                {detectedArch === 'arm64-v8a' && (
                  <span style={{ display: 'flex', alignItems: 'center', fontSize: '12px', color: '#5C9EAD', background: '#D4F0F0', padding: '2px 6px', borderRadius: '4px' }}>
                    <Star size={12} style={{ marginRight: '4px' }}/> Recommended
                  </span>
                )}
              </div>
              <span style={{ fontSize: '12px', color: '#888' }}>For most modern Android devices (~40MB)</span>
            </div>
            <Download size={20} color="#5C9EAD" />
          </a>

          <a 
            href={links.arm32}
            download
            onClick={() => track('Download APK', { type: 'arm32' })}
            style={{
              display: 'flex', alignItems: 'center', padding: '12px 16px',
              border: detectedArch === 'armeabi-v7a' ? '2px solid #5C9EAD' : '1px solid #eee',
              borderRadius: '8px', textDecoration: 'none', color: '#333',
              backgroundColor: detectedArch === 'armeabi-v7a' ? '#F4F9F9' : '#fafafa',
              transition: 'all 0.2s'
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: '600' }}>armeabi-v7a</span>
                {detectedArch === 'armeabi-v7a' && (
                  <span style={{ display: 'flex', alignItems: 'center', fontSize: '12px', color: '#5C9EAD', background: '#D4F0F0', padding: '2px 6px', borderRadius: '4px' }}>
                    <Star size={12} style={{ marginRight: '4px' }}/> Recommended
                  </span>
                )}
              </div>
              <span style={{ fontSize: '12px', color: '#888' }}>For older Android devices (~40MB)</span>
            </div>
            <Download size={20} color="#5C9EAD" />
          </a>

          <a 
            href={links.universal}
            download
            onClick={() => track('Download APK', { type: 'universal' })}
            style={{
              display: 'flex', alignItems: 'center', padding: '12px 16px',
              border: '1px solid #eee',
              borderRadius: '8px', textDecoration: 'none', color: '#333',
              backgroundColor: '#fafafa',
              transition: 'all 0.2s'
            }}
          >
            <div style={{ flex: 1 }}>
              <span style={{ fontWeight: '600', display: 'block' }}>Universal</span>
              <span style={{ fontSize: '12px', color: '#888' }}>Works on all devices but larger size (~130MB)</span>
            </div>
            <Download size={20} color="#A0AAB2" />
          </a>
        </div>
      </div>
    </div>
  );
}
