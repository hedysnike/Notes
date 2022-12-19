import React from "react";

const Modal = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div onClick={onClose}>
      <div className="opacity-30 bg-[#202124] z-10 w-full h-full fixed"></div>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modalContainer"
      ></div>
    </div>
  );
};

export default Modal;
