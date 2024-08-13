import React from 'react';
import './Button.modules.css';

function Button({ active = false, color = '', text = '', textColor = 'black', onClick, children, style, ...props }) {
  return (
    <button
      className={`custom-button ${active ? 'active' : 'inactive'}`}
      style={{ backgroundColor: color, ...style }}
      onClick={onClick}
      {...props}
    >
      {children}
      {text && <span className="button-text" style={{ color: textColor }}>{text}</span>}
    </button>
  );
}

export default Button;
