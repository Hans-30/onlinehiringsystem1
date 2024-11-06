import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './KPIAssessment.css';
import Modal from './Modal';
import ApplicantInfo from './ApplicantInfo';
import EssayQuestion from './EssayQuestions';

const jobKPIQuestions = {
    "Engagement Assistant": [
        {
            question: "What is the purpose of engagement planning?",
            answers: ["To outline audit strategies", "To manage warehouse inventory", "To prepare tax documents", "To supervise staff performance", "To perform financial forecasting"],
            correctAnswer: "To outline audit strategies"
        },
        {
            question: "What is an engagement letter?",
            answers: ["A letter that defines audit scope", "A document to track inventory", "A tax filing requirement", "A letter to hire staff", "A report to manage finances"],
            correctAnswer: "A letter that defines audit scope"
        },
        {
            question: "Who prepares working papers?",
            answers: ["The auditor", "The HR department", "The client", "The tax manager", "The CEO"],
            correctAnswer: "The auditor"
        },
        {
            question: "What is an audit program?",
            answers: ["A set of audit procedures", "A tax filing document", "A financial statement", "An inventory plan", "A legal document"],
            correctAnswer: "A set of audit procedures"
        },
        {
            question: "What is the main goal of an audit?",
            answers: ["To express an opinion on financial statements", "To manage staff", "To create marketing plans", "To perform risk assessments", "To balance accounts"],
            correctAnswer: "To express an opinion on financial statements"
        }
    ],
    "Branch Booking": [
        {
            question: "What is branch accounting?",
            answers: ["Accounting for separate branches", "Managing company-wide inventory", "Tracking national sales", "Calculating payroll", "Supervising marketing campaigns"],
            correctAnswer: "Accounting for separate branches"
        },
        {
            question: "How is inter-branch transfer recorded?",
            answers: ["As inter-branch transaction", "As a payroll item", "As a tax deduction", "As a balance sheet item", "As a cash flow item"],
            correctAnswer: "As inter-branch transaction"
        },
        {
            question: "What is the key function of a branch accountant?",
            answers: ["Reconciliation of branch accounts", "Supervision of HR processes", "Designing marketing strategies", "Creating annual budgets", "Tracking performance metrics"],
            correctAnswer: "Reconciliation of branch accounts"
        },
        {
            question: "What document summarizes branch assets?",
            answers: ["Branch balance sheet", "Annual report", "Marketing plan", "HR report", "Project budget"],
            correctAnswer: "Branch balance sheet"
        },
        {
            question: "What is the purpose of branch reconciliation?",
            answers: ["To verify branch transactions", "To manage company-wide finances", "To perform staff evaluations", "To conduct external audits", "To manage project timelines"],
            correctAnswer: "To verify branch transactions"
        }
    ],
    "Warehouse Checker": [
        {
            question: "What is cycle counting?",
            answers: ["A periodic inventory check", "A financial audit", "A sales forecast", "A tax evaluation", "An HR policy review"],
            correctAnswer: "A periodic inventory check"
        },
        {
            question: "What is FIFO?",
            answers: ["First In, First Out", "Finance In, Finance Out", "Fiscal Input Format", "Fixed Inventory Forecast", "Finance Inventory Flow"],
            correctAnswer: "First In, First Out"
        },
        {
            question: "How do you handle damaged goods?",
            answers: ["Document and dispose as per policy", "Store for future use", "Include in inventory", "Allocate to HR", "Send to finance"],
            correctAnswer: "Document and dispose as per policy"
        },
        {
            question: "What is the purpose of an inventory audit?",
            answers: ["To verify stock accuracy", "To measure staff productivity", "To manage payroll", "To calculate taxes", "To plan marketing"],
            correctAnswer: "To verify stock accuracy"
        },
        {
            question: "What does a warehouse checker do?",
            answers: ["Monitors inventory accuracy", "Prepares tax documents", "Manages HR policies", "Leads audit teams", "Coordinates marketing"],
            correctAnswer: "Monitors inventory accuracy"
        }
    ],
    "Warehouse Supervisor": [
        {
            question: "What is warehouse layout planning?",
            answers: ["Organizing storage areas for efficiency", "Scheduling employee shifts", "Managing financial accounts", "Preparing tax returns", "Tracking payroll expenses"],
            correctAnswer: "Organizing storage areas for efficiency"
        },
        {
            question: "What is the purpose of a safety inspection?",
            answers: ["To ensure workplace safety", "To audit accounts", "To review tax compliance", "To assess marketing plans", "To track payroll accuracy"],
            correctAnswer: "To ensure workplace safety"
        },
        {
            question: "What does inventory rotation ensure?",
            answers: ["Older stock is sold first", "Payroll is accurate", "HR policies are updated", "Finances are tracked", "Marketing materials are relevant"],
            correctAnswer: "Older stock is sold first"
        },
        {
            question: "What is the role of a warehouse supervisor?",
            answers: ["Overseeing warehouse operations", "Managing payroll", "Preparing tax documents", "Designing marketing plans", "Conducting audits"],
            correctAnswer: "Overseeing warehouse operations"
        },
        {
            question: "What is PPE?",
            answers: ["Personal Protective Equipment", "Payroll Processing Expense", "Production Planning Estimate", "Product Placement Evaluation", "Purchase Price Estimate"],
            correctAnswer: "Personal Protective Equipment"
        }
    ],
    "Head Office Accounting": [
        {
            question: "What is consolidation in accounting?",
            answers: ["Combining financial statements", "Payroll management", "Inventory control", "Supervising marketing", "Conducting audits"],
            correctAnswer: "Combining financial statements"
        },
        {
            question: "What is a trial balance?",
            answers: ["A list of all balances", "An inventory report", "A payroll report", "A tax form", "A marketing document"],
            correctAnswer: "A list of all balances"
        },
        {
            question: "What does GAAP stand for?",
            answers: ["Generally Accepted Accounting Principles", "Global Accounting and Auditing Policy", "Government Audit and Assurance Protocol", "General Asset Allocation Policy", "Gross Annual Adjustment Procedure"],
            correctAnswer: "Generally Accepted Accounting Principles"
        },
        {
            question: "What is an adjusting entry?",
            answers: ["An entry to correct balances", "A tax filing process", "A payroll adjustment", "An HR form", "An audit procedure"],
            correctAnswer: "An entry to correct balances"
        },
        {
            question: "What is the role of head office accounting?",
            answers: ["Managing company-wide finances", "Supervising staff", "Planning marketing campaigns", "Tracking inventory", "Developing software"],
            correctAnswer: "Managing company-wide finances"
        }
    ],
    "Business Associate for Creative Content": [
        {
            question: "What is the main goal of a creative brief?",
            answers: [
                "To outline project objectives",
                "To manage project budgets",
                "To track employee performance",
                "To develop tax strategies",
                "To audit financial records"
            ],
            correctAnswer: "To outline project objectives"
        },
        {
            question: "Which tool is commonly used for project management?",
            answers: [
                "Trello",
                "Microsoft Excel",
                "Adobe Photoshop",
                "QuickBooks",
                "Slack"
            ],
            correctAnswer: "Trello"
        },
        {
            question: "What is the purpose of content marketing?",
            answers: [
                "To drive engagement and attract customers",
                "To manage payroll",
                "To prepare financial statements",
                "To design marketing campaigns",
                "To conduct audits"
            ],
            correctAnswer: "To drive engagement and attract customers"
        },
        {
            question: "What does SEO stand for?",
            answers: [
                "Search Engine Optimization",
                "Social Engagement Outreach",
                "Sales Enhancement Operation",
                "Strategic Event Organization",
                "Standardized Evaluation Objectives"
            ],
            correctAnswer: "Search Engine Optimization"
        },
        {
            question: "What is a key performance indicator (KPI) for content success?",
            answers: [
                "Engagement rates",
                "Employee turnover rates",
                "Tax filing accuracy",
                "Audit completion time",
                "Inventory turnover"
            ],
            correctAnswer: "Engagement rates"
        }
    ]

};  



const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

function KPIAssessment({ jobTitle }) {
    const navigate = useNavigate();
    const [shuffledQuestions, setShuffledQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [score, setScore] = useState(0);
    const [isQualified, setIsQualified] = useState(false);
    const [agreeToUploadID, setAgreeToUploadID] = useState(false);
    const [agreeToUploadResume, setAgreeToUploadResume] = useState(false);
    const [showAgreementMessage, setShowAgreementMessage] = useState(false);

    useEffect(() => {
        const questionsForJob = jobKPIQuestions[jobTitle] || [];
        const shuffled = shuffleArray(questionsForJob);
        setShuffledQuestions(shuffled);
        setAnswers(Array(questionsForJob.length).fill(''));
    }, [jobTitle]);

    const handleAnswerChange = (index, answer) => {
        const updatedAnswers = [...answers];
        updatedAnswers[index] = answer;
        setAnswers(updatedAnswers);
    };

    const calculateScore = () => {
        if (answers.some((answer) => answer === '')) {
            alert('Please answer all questions.');
            return;
        }

        let newScore = 0;
        shuffledQuestions.forEach((q, index) => {
            if (answers[index] === q.correctAnswer) {
                newScore += 10; // Assuming each question is worth 10 points
            }
        });

        setScore(newScore);
        setIsQualified(newScore >= 35);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        if (isQualified) {
            // If qualified, check agreements
            if (agreeToUploadID && agreeToUploadResume) {
                // Proceed to essay questions if both agreements are checked
                navigate('/essay-questions'); // Update this path to your essay questions route
            } else {
                setShowAgreementMessage(true); // Show agreement message if not agreed
            }
        } else {
            navigate('/'); // Redirect to homepage or another appropriate page if not qualified
        }
    };

    const handleProceed = () => {
        if (agreeToUploadID && agreeToUploadResume) {
            navigate('/essay-questions'); // Proceed directly to essay questions if agreements are checked
        } else {
            setShowAgreementMessage(true); // Show agreement message if not agreed
        }
    };

    const modalMessage = isQualified
        ? "Congratulations! You passed the assessment. Go on to step 2."
        : "Unfortunately, you can't continue this application because your score did not pass. Please try for another job title position.";

    return (
        <div className="kpi-assessment">
            <h1>KPI Assessment for {jobTitle}</h1>
            <form onSubmit={(e) => { e.preventDefault(); calculateScore(); }}>
                {shuffledQuestions.map((question, index) => (
                    <div key={index}>
                        <p>{question.question}</p>
                        {question.answers.map((answer) => (
                            <label key={answer}>
                                <input
                                    type="radio"
                                    name={`question${index}`}
                                    value={answer}
                                    checked={answers[index] === answer}
                                    onChange={() => handleAnswerChange(index, answer)}
                                />
                                {answer}
                            </label>
                        ))}
                    </div>
                ))}
                <button type="submit">Submit Answers</button>
            </form>
            {showModal && (
                <Modal 
                    message={modalMessage} 
                    onClose={handleCloseModal} 
                    onProceed={handleProceed} 
                    isQualified={isQualified}
                >
                    {isQualified && (
                        <div>
                            <label>
                                <input 
                                    type="checkbox" 
                                    checked={agreeToUploadID} 
                                    onChange={() => setAgreeToUploadID(!agreeToUploadID)} 
                                />
                                Allow to upload ID
                            </label>
                            <label>
                                <input 
                                    type="checkbox" 
                                    checked={agreeToUploadResume} 
                                    onChange={() => setAgreeToUploadResume(!agreeToUploadResume)} 
                                />
                                Allow to upload digital resume
                            </label>
                        </div>
                    )}
                </Modal>
            )}
            {showAgreementMessage && (
                <div className="agreement-message">
                    <p>Please agree to the agreements. If you don't want to agree, you can't proceed to step 2.</p>
                </div>
            )}
        </div>
    );
}

export default KPIAssessment;