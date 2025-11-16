import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { UI_TEXT } from '../constants';
import { ARIcon } from './icons';

interface ARViewModalProps {
  itemName: string;
  onClose: () => void;
}

const modalRoot = document.getElementById('modal-root');

export const ARViewModal: React.FC<ARViewModalProps> = ({ itemName, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Animate in on mount
    setShow(true);
  }, []);

  const handleClose = () => {
    setShow(false);
    // Unmount after animation
    setTimeout(onClose, 300); // Must match transition duration
  };

  if (!modalRoot) {
    return null; // Should not happen if index.html is correct
  }

  const modalContent = (
    <div
      className={`fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-50 transition-opacity duration-300 ease-out ${show ? 'opacity-100' : 'opacity-0'}`}
      onClick={handleClose}
    >
      <div
        className={`bg-zinc-900 border border-white/10 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl shadow-orange-500/10 transition-all duration-300 ease-out ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center mb-4">
            <ARIcon className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-2">{UI_TEXT.arModalTitle}</h2>
        <p className="text-gray-300 mb-6">{`Aperçu 3D pour : "${itemName}".`}</p>
        <div className="w-full aspect-square flex items-center justify-center mb-6">
            <div className="scene">
                <div className="cube">
                    <div className="cube__face cube__face--front">X</div>
                    <div className="cube__face cube__face--back"></div>
                    <div className="cube__face cube__face--right"></div>
                    <div className="cube__face cube__face--left"></div>
                    <div className="cube__face cube__face--top"></div>
                    <div className="cube__face cube__face--bottom"></div>
                </div>
            </div>
        </div>
        <p className="text-sm text-gray-400 mb-6">{UI_TEXT.arModalDescription}</p>
        <button
          onClick={handleClose}
          className="w-full px-6 py-3 text-lg font-bold text-white bg-orange-600 rounded-full hover:bg-orange-700 transition-colors"
        >
          {UI_TEXT.arModalClose}
        </button>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, modalRoot);
};