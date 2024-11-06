// UploadDocuments.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './UploadDocuments.css';

const UploadDocuments = () => {
    const navigate = useNavigate();
    const [idFile, setIdFile] = useState(null);
    const [resumeFile, setResumeFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPopup, setShowPopup] = useState(false); // State for displaying popup

    // Handle file selection and validation
    const handleFileChange = (event, setFile) => {
        const file = event.target.files[0];
        const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];

        if (file && validTypes.includes(file.type)) {
            setFile(file);
            setErrorMessage('');
        } else {
            setErrorMessage('Please upload a valid file (JPEG, PNG, PDF).');
        }
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!idFile || !resumeFile) {
            setErrorMessage('Both ID and Resume are required.');
            return;
        }

        if (!isSubmitting) {
            setIsSubmitting(true);

            // Simulate form submission
            setTimeout(() => {
                setShowPopup(true); // Show popup after submission
                setIsSubmitting(false);
            }, 1000);
        }
    };

    // Close popup and navigate to employee site
    const handleClosePopup = () => {
        setShowPopup(false);
        navigate('/employee-site');
    };

    return (
        <div className="upload-documents">
            <h2>Upload Documents</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="id-upload">Upload ID:</label>
                <input
                    type="file"
                    id="id-upload"
                    name="id-upload"
                    accept=".jpg, .jpeg, .png, .pdf"
                    required
                    onChange={(e) => handleFileChange(e, setIdFile)}
                />

                <label htmlFor="resume-upload">Upload Resume:</label>
                <input
                    type="file"
                    id="resume-upload"
                    name="resume-upload"
                    accept=".jpg, .jpeg, .png, .pdf"
                    required
                    onChange={(e) => handleFileChange(e, setResumeFile)}
                />

                <button type="submit" className="submit-button" disabled={isSubmitting}>
                    Submit
                </button>
            </form>

            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-container">
                        <p>Your application was submitted successfully.</p>
                        <p>
                            Please log in to your account on the{" "}
                            <Link to="/employee-site" className="employee-site-link" onClick={handleClosePopup}>
                                employee site
                            </Link>.
                        </p>
                        <button onClick={handleClosePopup} className="close-button">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadDocuments;
