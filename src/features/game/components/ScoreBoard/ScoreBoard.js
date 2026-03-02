import { useTranslation } from 'react-i18next';
import './ScoreBoard.css';

export const ScoreBoard = ({ progress, score, streak }) => {
  const { t } = useTranslation();
  const percentage = score.total > 0
    ? Math.round((score.correct / score.total) * 100)
    : 0;

  return (
    <div className="score-board">
      <div className="score-item progress">
        <span className="score-label">{t('game.progress')}</span>
        <span className="score-value">{progress.current} / {progress.total}</span>
      </div>
      <div className="score-item correct">
        <span className="score-label">{t('game.correct')}</span>
        <span className="score-value">{score.correct} ({percentage}%)</span>
      </div>
      <div className="score-item streak">
        <span className="score-label">{t('game.streak')}</span>
        <span className="score-value">{streak}</span>
      </div>
    </div>
  );
};
