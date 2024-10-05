// Drawer.js
import React from 'react';
import './drawer.css';

const Drawer = ({ isOpen, children, onClose }) => {
  return (
    <div className={`drawer ${isOpen ? 'open' : 'drawer_anoop'}`}>
      <div className="drawer-content">
        <button className="close-btn" onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Drawer;
