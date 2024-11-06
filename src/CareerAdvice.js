import React, { useState } from 'react';
import './CareerAdvice.css';

const quotes = [
  "Never stop learning.",
  "Success is not the key to happiness. Happiness is the key to success.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "Don't watch the clock; do what it does. Keep going.",
  "Your limitation—it's only your imagination.",
  "Push yourself, because no one else is going to do it for you.",
  "Great things never come from comfort zones.",
  "Dream it. Wish it. Do it.",
  "Success doesn't just find you. You have to go out and get it.",
  "The harder you work for something, the greater you'll feel when you achieve it.",
  "Believe in yourself and all that you are.",
  "Opportunities don't happen, you create them."
];

function CareerAdvice() {
  const [thankYouVisible, setThankYouVisible] = useState(false);

  const handleLikeClick = () => {
    setThankYouVisible(true);
    setTimeout(() => {
      setThankYouVisible(false);
    }, 3000);
  };

  return (
    <div className="career-advice">
      <h2>Career Advice</h2>
      <div className="quote-grid">
        {quotes.map((quote, index) => (
          <div className="quote-card" key={index}>
            <p>{quote}</p>
            <button className="like-button" onClick={handleLikeClick}>Like</button>
          </div>
        ))}
      </div>
      {thankYouVisible && (
        <div className="thank-you-modal">
          <div className="thank-you-note">Thank you!</div>
        </div>
      )}
    </div>
  );
}

export default CareerAdvice;
