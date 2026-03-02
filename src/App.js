import './i18n';
import './App.css';
import { GAME_STATES, getAllCharacters } from './features/data';
import { CategorySelection } from './features/selection';
import { GameScreen, useGameState } from './features/game';
import { StudyScreen } from './features/study';
import { LanguageToggle } from './components/LanguageToggle';

const allCharacters = getAllCharacters();

function App() {
  const {
    gameState,
    studyCategory,
    currentQuestion,
    progress,
    score,
    streak,
    lastAnswer,
    initializeGame,
    submitAnswer,
    nextQuestion,
    resetGame,
    startStudy
  } = useGameState(allCharacters);

  return (
    <div className="app">
      <LanguageToggle />
      <main className="app-content">
        {gameState === GAME_STATES.SELECTING && (
          <CategorySelection onStartGame={initializeGame} onStudy={startStudy} />
        )}
        {gameState === GAME_STATES.STUDYING && (
          <StudyScreen category={studyCategory} onBack={resetGame} />
        )}
        {(gameState === GAME_STATES.PLAYING ||
          gameState === GAME_STATES.FEEDBACK ||
          gameState === GAME_STATES.COMPLETED) && (
          <GameScreen
            gameState={gameState}
            currentQuestion={currentQuestion}
            progress={progress}
            score={score}
            streak={streak}
            lastAnswer={lastAnswer}
            onSubmitAnswer={submitAnswer}
            onNextQuestion={nextQuestion}
            onReset={resetGame}
          />
        )}
      </main>
    </div>
  );
}

export default App;
