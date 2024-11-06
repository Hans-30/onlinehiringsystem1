import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Modal.css'; // Import your CSS for the modal

const Modal = ({ message, onClose, isQualified }) => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [allowUploadID, setAllowUploadID] = useState(false);
    const [allowUploadResume, setAllowUploadResume] = useState(false);
    const [agreementError, setAgreementError] = useState('');

    const handleProceed = () => {
        // Check if the checkboxes are checked
        if (isQualified && !(allowUploadID && allowUploadResume)) {
            setAgreementError('Please agree to the terms. If you don’t want to agree, you cannot proceed to step 2.');
        } else {
            setAgreementError('');
            navigate('/applicant-info'); // Redirect to the ApplicantInfo page
        }
    };

    const handleGoHome = () => {
        navigate('/'); // Redirect to the home page
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-message">{message}</div>

                {isQualified && (
                    <div className="modal-checkboxes">
                        <label>
                            <input
                                type="checkbox"
                                checked={allowUploadID}
                                onChange={(e) => setAllowUploadID(e.target.checked)}
                            />
                            Allow to upload ID
                        </label>
                        <br />
                        <label>
                            <input
                                type="checkbox"
                                checked={allowUploadResume}
                                onChange={(e) => setAllowUploadResume(e.target.checked)}
                            />
                            Allow to upload digital resume
                        </label>
                        {agreementError && <div className="error-message">{agreementError}</div>}
                    </div>
                )}

                <div className="modal-buttons">
                    {isQualified ? (
                        <>
                            <button onClick={handleGoHome}>I Don't Want to Proceed</button>
                            <button onClick={handleProceed}>Proceed</button>
                        </>
                    ) : (
                        <button onClick={onClose}>OK</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;
