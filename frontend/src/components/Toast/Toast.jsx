import React, { useEffect, useState } from 'react';
import './Toast.css';

export default function Toast() {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    function onShow(e) {
      setMessage(e.detail?.message || String(e.detail || ''));
      setTimeout(() => setMessage(null), 3000);
    }

    window.addEventListener('show-toast', onShow);
    return () => window.removeEventListener('show-toast', onShow);
  }, []);

  if (!message) return null;

  return (
    <div className="toast-container">
      <div className="toast">{message}</div>
    </div>
  );
}
