import React from 'react';
import { createPortal } from 'react-dom';

export default function Portal({ close, component }) {
  // Get the target DOM node for the portal
  const portalRoot = document.getElementById('root_m');

  // Ensure the portal root element exists before rendering
  if (!portalRoot) {
    console.error("Target element with id 'root_m' not found");
    return null;
  }

  // Define styles as JavaScript objects
  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
      backdropFilter: 'blur(5px)', // Apply blur effect
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000, 
    },
    content: {
      background: 'white',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
      
      textAlign: 'center',
      position: 'relative', 
    },
    closeButton: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      background: '#ff5c5c',
      color: 'white',
      border: 'none',
      padding: '8px 12px',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'background 0.3s ease',
    },
    closeButtonHover: {
      background: '#ff1e1e',
    },
  };

  return createPortal(
    <div style={styles.overlay}>
      <div style={styles.content}>
       ` {component}`
        <button
          onClick={close}
          style={styles.closeButton}
          onMouseEnter={(e) => (e.target.style.background = styles.closeButtonHover.background)}
          onMouseLeave={(e) => (e.target.style.background = styles.closeButton.background)}
        >
          X
        </button>
      </div>
    </div>,
    portalRoot
  );
}
