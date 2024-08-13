import React from "react";
import { IoIosClose } from "react-icons/io";
import "./ConnectModal.modules.css";

function ConnectModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <IoIosClose className="close-icon" onClick={onClose} />
        <h2>Connect your TON wallet to purchase game items.</h2>
      </div>
    </div>
  );
}

export default ConnectModal;
