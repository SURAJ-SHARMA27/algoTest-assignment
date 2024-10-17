import React, { useEffect, useState } from 'react';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDate: string;
  col: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, currentDate, col }) => {
  const [selectedAction, setSelectedAction] = useState<'buy' | 'sell' | null>(null);
  const [lots, setLots] = useState<number>(1); // State to manage the number of lots

  // Use the class to control visibility
  const overlayClass = isOpen ? 'modal-overlay show' : 'modal-overlay';

  // Function to handle incrementing the lots
  const incrementLots = () => {
    setLots(prev => prev + 1);
  };

  // Function to handle decrementing the lots
  const decrementLots = () => {
    setLots(prev => (prev > 1 ? prev - 1 : 1)); // Ensure lots don't go below 1
  };

  const handleCancel = () => {
    setSelectedAction(null); // Reset selected action on cancel
    onClose(); // Call the onClose function
  };

  // Effect to handle closing the modal when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const modal = document.querySelector('.modal-content');
      if (modal && !modal.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={overlayClass}>
      <div className="modal-content">
        <div style={{ borderTop: "3px solid #dcdcdc", borderRadius: "5px", marginTop: "10px", marginRight: "120px", marginLeft: "120px" }}></div>

        <p
          style={{
            color: "#3A3A3A",
            fontSize: "16px",
            padding: "12px 16px",
            fontWeight: "bold"
          }}
        >{currentDate} {" "} {col === "Call" ? "CE" : "PE"}</p>
        <div className="modal-header" style={{ paddingLeft: "12px", paddingRight: "12px" }}>
          <button
            className={`modal-button ${selectedAction === 'buy' ? 'active' : ''}`}
            onClick={() => {
              setSelectedAction('buy');
            }}
          >
            Buy
          </button>
          <button
            className={`modal-button ${selectedAction === 'sell' ? 'active' : ''}`}
            onClick={() => {
              setSelectedAction('sell');
            }}
          >
            Sell
          </button>
        </div>
        <div className="modal-lots" style={{ paddingLeft: "12px", paddingRight: "12px" }} >
          <div className="lots-label">Lots:</div>
          <div className="lots-container">
            <button className="decrement-button" onClick={decrementLots} style={{ background: "white" }}>-</button>
            <span className="quantity">{lots}</span>
            <button className="increment-button" onClick={incrementLots} style={{ background: "white" }}>+</button>
          </div>
        </div>
        <div style={{ borderTop: "1px solid #e5e7eb", marginBottom: "10px" }}></div>
        <div className="modal-footer" style={{ paddingLeft: "12px", paddingRight: "12px" }}>
          <button className="cancel-button" onClick={handleCancel}>Cancel</button>
          <button className={`done-button ${!selectedAction ? 'disabled' : ''}`} onClick={() => alert('Done action')} disabled={!selectedAction}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
