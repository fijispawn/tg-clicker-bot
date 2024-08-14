import React from "react";
import "./AboutModal.modules.css"; // Добавьте стили для модального окна

function AboutModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>About This Application</h2>
        <p className="text-about">
          This is a clicker game where you can level up by accumulating points.
          Use the boost to increase your points gain temporarily. You can also
          visit the shop to purchase items that enhance your game experience.
        </p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default AboutModal;
