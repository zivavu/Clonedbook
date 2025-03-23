'use client';

import { useMockAlgolia } from '@/config/algolia.config';
import { logEnvironmentVariables } from '@/config/debug-env';
import { isUsingEmulator } from '@/config/firebase.config';
import { FC, useEffect, useState } from 'react';

/**
 * A small component that indicates which environment we're using
 * Only displayed in development mode
 */
const DevModeIndicator: FC = () => {
  const [expanded, setExpanded] = useState<boolean>(false);

  useEffect(() => {
    // Log environment variables when component mounts
    logEnvironmentVariables();

    // Log raw environment variables for debugging
    console.log('Raw environment variables in DevModeIndicator:');
    console.log('NODE_ENV:', process.env.NODE_ENV);
    console.log('USE_FIREBASE_EMULATOR:', process.env.USE_FIREBASE_EMULATOR);
    console.log(
      'NEXT_PUBLIC_USE_FIREBASE_EMULATOR:',
      process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR,
    );
    console.log('USE_ALGOLIA_MOCK:', process.env.USE_ALGOLIA_MOCK);
    console.log('NEXT_PUBLIC_USE_ALGOLIA_MOCK:', process.env.NEXT_PUBLIC_USE_ALGOLIA_MOCK);
  }, []);

  // Only show in development mode
  if (process.env.NODE_ENV !== 'development') {
    console.log('DevModeIndicator: Not showing because NODE_ENV is not development');
    return null;
  }

  const toggleExpanded = (): void => {
    setExpanded(!expanded);
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '5px 10px',
        borderRadius: '4px',
        fontSize: '12px',
        zIndex: 9999,
        minWidth: '200px',
        cursor: 'pointer',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      }}
      onClick={toggleExpanded}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontWeight: 'bold',
          borderBottom: '1px solid rgba(255,255,255,0.3)',
          paddingBottom: '3px',
          marginBottom: '3px',
        }}>
        <span>Development Mode</span>
        <span>{expanded ? '▲' : '▼'}</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Firebase:</span>
        <span style={{ color: isUsingEmulator ? '#4ade80' : '#f87171' }}>
          {isUsingEmulator ? '🟢 Local Emulator' : '🔴 Production'}
        </span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Algolia:</span>
        <span style={{ color: useMockAlgolia ? '#4ade80' : '#f87171' }}>
          {useMockAlgolia ? '🟢 Local Mock' : '🔴 Production'}
        </span>
      </div>

      {expanded && (
        <div
          style={{
            marginTop: '5px',
            borderTop: '1px solid rgba(255,255,255,0.3)',
            paddingTop: '5px',
            fontSize: '11px',
          }}>
          <div>
            NODE_ENV:{' '}
            <span style={{ color: '#93c5fd' }}>{process.env.NODE_ENV || 'undefined'}</span>
          </div>
          <div>
            NEXT_PUBLIC_USE_FIREBASE_EMULATOR:{' '}
            <span style={{ color: '#93c5fd' }}>
              {process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR || 'undefined'}
            </span>
          </div>
          <div>
            NEXT_PUBLIC_USE_ALGOLIA_MOCK:{' '}
            <span style={{ color: '#93c5fd' }}>
              {process.env.NEXT_PUBLIC_USE_ALGOLIA_MOCK || 'undefined'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DevModeIndicator;
