import './i18n';
import './App.css';
import { GAME_STATES, getAllCharacters } from './features/data';
import { CategorySelection } from './features/selection';
import { GameScreen, useGameState } from './features/game';
import { LanguageToggle } from './components/LanguageToggle';

const allCharacters = getAllCharacters();

function App() {
  const {
    gameState,
    currentQuestion,
    progress,
    score,
    streak,
    lastAnswer,
    initializeGame,
    submitAnswer,
    nextQuestion,
    resetGame
  } = useGameState(allCharacters);

  return (
    <div className="app">
      <LanguageToggle />
      <main className="app-content">
        {gameState === GAME_STATES.SELECTING ? (
          <CategorySelection onStartGame={initializeGame} />
        ) : (
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
