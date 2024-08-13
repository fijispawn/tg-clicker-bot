import React from "react";
import "./ProductInfoModal.modules.css";
import { IoIosClose } from "react-icons/io";

function ProductInfoModal({ name, description, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <IoIosClose className="close-icon" onClick={onClose} />
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default ProductInfoModal;
