import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams for dynamic routing
import KPIAssessment from './KPIAssessment'; // Import your KPI assessment component
import ConfirmationPage from './ConfirmationPage'; // Import your confirmation component
import ApplicantInfo from './ApplicantInfo'; // Use ApplicantInfo component
import EssayQuestion from './EssayQuestions'; // Import your Essay Question component
import Modal from './Modal'; // Import the modal component

function JobApplicationFlow() {
    const { jobTitle } = useParams(); // Get the jobTitle from URL parameters
    const [score, setScore] = useState(null);
    const [currentStep, setCurrentStep] = useState('kpi'); // Manage current step
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal open state
    const [modalMessage, setModalMessage] = useState(''); // Modal message
    const [isQualified, setIsQualified] = useState(false); // Qualification state
    const [isEssayQuestionVisible, setIsEssayQuestionVisible] = useState(false); // Essay question visibility

    const handleDecline = () => {
        alert(`You are not allowed to apply again for the ${jobTitle} position.`);
        // Additional logic for handling decline (e.g., navigation)
    };

    const handleResult = (resultScore) => {
        setScore(resultScore);
        if (resultScore >= 35) {
            setModalMessage(`Congratulations! You scored ${resultScore}. You may proceed with the application.`);
            setIsQualified(true); // Set qualified to true
            setIsEssayQuestionVisible(true); // Show essay question
        } else {
            setModalMessage(`Unfortunately, you scored ${resultScore}. You cannot proceed with the application.`);
            handleDecline(); // Handle the decline
            setIsQualified(false); // Ensure this is false for declines
            setCurrentStep('kpi'); // Reset to KPI step or other logic if needed
        }
        setIsModalOpen(true); // Open modal with the result message
    };

    const handleNext = () => {
        if (isEssayQuestionVisible) {
            // If the essay question is visible, proceed to the next step after essay
            setIsEssayQuestionVisible(false); // Hide the essay question
            setCurrentStep('applicantInfo'); // Move to the Applicant Info step
        } else {
            setCurrentStep('idScan'); // Move to the ID Scan step
        }
    };

    const closeModal = () => {
        setIsModalOpen(false); // Close the modal
    };

    const proceedToNextStep = () => {
        closeModal();
        handleNext(); // Move to the next step after closing modal
    };

    const renderCurrentStep = () => {
        if (isEssayQuestionVisible) {
            return <EssayQuestion />; // Show Essay Question if visible
        }
        switch (currentStep) {
            case 'kpi':
                return <KPIAssessment jobTitle={jobTitle} onResult={handleResult} />;
            case 'applicantInfo':
                return <ApplicantInfo onNext={handleNext} />;
            case 'confirmation':
                return <ConfirmationPage />;
            default:
                return null;
        }
    };

    return (
        <div>
            {renderCurrentStep()} {/* Render the current step based on state */}
            {isModalOpen && (
                <Modal
                    message={modalMessage}
                    onClose={closeModal}
                    onProceed={proceedToNextStep}
                    isQualified={isQualified}
                />
            )}
        </div>
    );
}

export default JobApplicationFlow;




