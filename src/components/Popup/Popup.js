import React from "react";
import closeIcon from "../../assets/icons/close.png"
import "./Popup.css";

export default function PopUp({ children, closeModal, isOpen }) {
    return (
        <div className="popup-container">
            <div className="popup-dark-bg" onClick={() => closeModal(false)} />
            <div className="centered">
                <div className="modal">
                    <img onClick={() => closeModal(false)}
                        src={closeIcon} alt="close-icon" className="close-icon" />
                    {children}
                </div>
            </div>
        </div>
    )

}