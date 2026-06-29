import React from 'react';
import './DeleteModal.css';

export default function DeleteModal({ isOpen, onClose, onConfirm, itemTitle }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <h3 className="modal-title">Confirm Deletion</h3>
        <p className="modal-text">
          Are you sure you want to permanently delete <strong>{itemTitle || "this product"}</strong>? This action cannot be undone.
        </p>
        <div className="modal-actions">
          <button className="modal-btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="modal-btn-confirm" onClick={onConfirm}>
            Delete Product
          </button>
        </div>
      </div>
    </div>
  );
}