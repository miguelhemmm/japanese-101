import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './AnswerInput.css';

export const AnswerInput = ({ onSubmit, disabled }) => {
  const { t } = useTranslation();
  const [answer, setAnswer] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);

  useEffect(() => {
    // Clear input when enabled again (new question)
    if (!disabled) {
      setAnswer('');
    }
  }, [disabled]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer.trim() && !disabled) {
      onSubmit(answer);
    }
  };

  return (
    <form className="answer-input" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder={t('input.placeholder')}
        disabled={disabled}
        className="answer-field"
        autoComplete="off"
        autoCapitalize="off"
        spellCheck="false"
      />
      <button
        type="submit"
        disabled={!answer.trim() || disabled}
        className="submit-button"
      >
        {t('buttons.check')}
      </button>
    </form>
  );
};
