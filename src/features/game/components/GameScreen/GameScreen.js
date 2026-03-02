import { useTranslation } from 'react-i18next';
import { GAME_STATES, CATEGORY_INFO } from '../../../data';
import { CharacterDisplay } from '../CharacterDisplay';
import { AnswerInput } from '../AnswerInput';
import { FeedbackDisplay } from '../FeedbackDisplay';
import { ScoreBoard } from '../ScoreBoard';
import './GameScreen.css';

export const GameScreen = ({
  gameState,
  currentQuestion,
  progress,
  score,
  streak,
  lastAnswer,
  onSubmitAnswer,
  onNextQuestion,
  onReset
}) => {
  const { t } = useTranslation();
  const isPlaying = gameState === GAME_STATES.PLAYING;
  const isFeedback = gameState === GAME_STATES.FEEDBACK;
  const isCompleted = gameState === GAME_STATES.COMPLETED;

  if (isCompleted) {
    const percentage = score.total > 0
      ? Math.round((score.correct / score.total) * 100)
      : 0;

    return (
      <div className="game-screen completed">
        <h1 className="completed-title">{t('game.practiceComplete')}</h1>
        <div className="final-score">
          <div className="final-stat">
            <span className="stat-value">{score.correct}</span>
            <span className="stat-label">{t('game.correct')}</span>
          </div>
          <div className="final-stat">
            <span className="stat-value">{score.total}</span>
            <span className="stat-label">{t('game.total')}</span>
          </div>
          <div className="final-stat">
            <span className="stat-value">{percentage}%</span>
            <span className="stat-label">{t('game.accuracy')}</span>
          </div>
        </div>
        <button className="play-again-button" onClick={onReset}>
          {t('buttons.playAgain')}
        </button>
      </div>
    );
  }

  const categoryInfo = CATEGORY_INFO[currentQuestion?.category];
  const categoryName = categoryInfo ? t(categoryInfo.nameKey) : currentQuestion?.category;

  return (
    <div className="game-screen">
      <button className="back-button" onClick={onReset}>
        {t('buttons.backToCategories')}
      </button>

      <ScoreBoard progress={progress} score={score} streak={streak} />

      {currentQuestion && (
        <>
          <CharacterDisplay
            character={currentQuestion.character}
            category={categoryName}
            furigana={currentQuestion.furigana}
            categoryType={currentQuestion.category}
          />

          {isPlaying && (
            <AnswerInput onSubmit={onSubmitAnswer} disabled={!isPlaying} />
          )}

          {isFeedback && (
            <FeedbackDisplay lastAnswer={lastAnswer} onNext={onNextQuestion} />
          )}
        </>
      )}
    </div>
  );
};
