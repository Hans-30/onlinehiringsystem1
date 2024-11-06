// EssayQuestions.js
import React, { useState } from 'react';
import './EssayQuestions.css'; // Import your CSS file for styling

const EssayQuestions = () => {
    const [answer, setAnswer] = useState('');

    const handleChange = (event) => {
        setAnswer(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle submission logic (e.g., send answer to the server)
        console.log("Answer submitted:", answer);
    };

    return (
        <div className="essay-questions">
            <h2>Essay Question</h2>
            <form onSubmit={handleSubmit}>
                <div className="question">
                    <label htmlFor="essay-question">1. Please describe why you are interested in this position:</label>
                    <textarea
                        id="essay-question"
                        name="essay-question"
                        rows="6"
                        required
                        value={answer}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="submit-button">Submit Answer</button>
            </form>
        </div>
    );
};

export default EssayQuestions;
