import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative p-8 bg-white rounded-lg w-96 max-w-md">
        {children}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 bg-red-500 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default Modal;
