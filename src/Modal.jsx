import React from "react";
import "./Modal.css";

const Modal = ({ show, onClose, word }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <p>Word clicked: {word}</p>
      </div>
    </div>
  );
};

export default Modal;
