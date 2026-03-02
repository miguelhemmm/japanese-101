import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './FeedbackDisplay.css';

export const FeedbackDisplay = ({ lastAnswer, onNext }) => {
  const { t } = useTranslation();
  const buttonRef = useRef(null);

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onNext]);

  if (!lastAnswer) return null;

  const { correct, userAnswer, correctAnswers } = lastAnswer;

  return (
    <div className={`feedback-display ${correct ? 'correct' : 'incorrect'}`}>
      <div className="feedback-icon">
        {correct ? '✓' : '✗'}
      </div>
      <div className="feedback-message">
        {correct ? t('feedback.correct') : t('feedback.incorrect')}
      </div>
      {!correct && (
        <div className="feedback-details">
          <p className="your-answer">
            {t('feedback.yourAnswer')} <span>{userAnswer}</span>
          </p>
          <p className="correct-answer">
            {t('feedback.correctAnswer')} <span>{correctAnswers.romanji.join(' / ')}</span>
            {correctAnswers.english?.length > 0 && (
              <span className="english-meaning">
                {' '}({correctAnswers.english.join(', ')})
              </span>
            )}
            {correctAnswers.spanish?.length > 0 && (
              <span className="spanish-meaning">
                {' '}[{correctAnswers.spanish.join(', ')}]
              </span>
            )}
          </p>
        </div>
      )}
      <button ref={buttonRef} className="next-button" onClick={onNext}>
        {t('buttons.next')}
      </button>
    </div>
  );
};
