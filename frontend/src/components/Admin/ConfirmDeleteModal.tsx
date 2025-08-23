import React from "react";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName?: string; // optional: show item name in the message
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  itemName = "this item",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-base-100 rounded-lg shadow-lg p-6 w-11/12 max-w-md">
        <h2 className="text-lg font-bold text-error mb-4">Confirm Deletion</h2>
        <p className="text-neutral mb-6">
          Are you sure you want to delete <span className="font-semibold">{itemName}</span>? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            className="btn btn-outline btn-neutral"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="btn btn-error"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
