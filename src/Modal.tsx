import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  onChangeBackground: (image: string) => void; // Add this
  backgroundImages: string[]; // Add this line
  borderVisible: boolean;
  setBorderVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  onChangeBackground,
  backgroundImages,
  borderVisible,
  setBorderVisible,
}) => {
  if (!isOpen) return null;

  // Slider to toggle border
  const handleBorderToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBorderVisible(event.target.checked);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close-button">
          X
        </button>
        {children}
        <div className="toggle-container">
          <label htmlFor="border-toggle">Border:</label>
          <label className="switch">
            <input
              id="border-toggle"
              type="checkbox"
              checked={borderVisible}
              onChange={handleBorderToggle}
            />
            <span className="slider round"></span>
          </label>
        </div>
        Click below to change backdrop. To generate custom backdrop, please
        subscribe to premium membership.
        <div className="thumbnail-container">
          {backgroundImages.map((image, index) => (
            <img
              className="thumbnail-image"
              key={index}
              src={image}
              onClick={() => onChangeBackground(image)}
              alt={`Background ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
