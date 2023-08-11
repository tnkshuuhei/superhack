import React from "react";
import CustomButton from "./Button";

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative p-8 bg-white rounded-lg w-96 max-w-md">
        {children}
      </div>
    </div>
  );
};

export default Modal;
