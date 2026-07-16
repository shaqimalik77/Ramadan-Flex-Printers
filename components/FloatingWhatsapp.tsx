'use client';

import React from 'react';
import styles from './FloatingWhatsApp.module.css';

const WHATSAPP_URL = 'https://wa.me/923017413377';

const FloatingWhatsApp: React.FC = () => {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.container}
      aria-label="Chat on WhatsApp"
    >
      <span className={styles.pulse} aria-hidden="true" />
      <svg
        className={styles.icon}
        viewBox="0 0 32 32"
        aria-hidden="true"
        focusable="false"
      >
        <path
          fill="currentColor"
          d="M16 2C8.268 2 2 8.268 2 16c0 3.058 1.015 5.888 2.736 8.197L2 30l5.985-2.696C10.99 29.025 13.381 30 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm6.578 19.578c-.176.494-1.022.938-1.43.997-.378.055-.861.08-1.444-.111-.585-.191-3.914-1.938-4.582-4.22-.168-.564-.152-.977.083-1.432.234-.456.352-.745.532-1.182.181-.437.091-.751-.045-1.068-.135-.315-.631-1.624-.864-2.224-.23-.595-.466-.514-.678-.525l-.578-.004c-.183 0-.48.069-.731.373-.251.304-1.004 1.024-1.004 2.5 0 1.477 1.092 2.901 1.242 3.103.149.203 2.138 3.258 5.207 4.558.731.316 1.306.505 1.752.647.732.233 1.399.2 1.928.122.588-.087 1.822-.744 2.082-1.463.26-.718.26-1.333.182-1.463-.08-.13-.292-.206-.607-.357z"
        />
      </svg>
      <span className={styles.tooltip}>Chat on WhatsApp</span>
    </a>
  );
};

export default FloatingWhatsApp;