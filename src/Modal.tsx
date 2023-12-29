import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  onChangeBackground: (image: string) => void; // Add this
  backgroundImages: string[]; // Add this line
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, onChangeBackground, backgroundImages }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close-button">X</button>
        {children}
        Click below to change backdrop. To generate custom backdrop, please subscribe to premium membership.
        <div className="thumbnail-container"> 
          {backgroundImages.map((image, index) => (
            <img className="thumbnail-image" key={index} src={image} onClick={() => onChangeBackground(image)} alt={`Background ${index + 1}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
