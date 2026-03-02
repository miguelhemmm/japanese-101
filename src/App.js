import './i18n';
import './App.css';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { CATEGORIES } from './features/data';
import { CategorySelection } from './features/selection';
import { GameScreen, GameProvider, useGame } from './features/game';
import { StudyScreen } from './features/study';
import { LanguageToggle } from './components/LanguageToggle';

const validCategories = Object.values(CATEGORIES);

function HomeRoute() {
  const { initializeGame, startStudy } = useGame();

  return (
    <CategorySelection onStartGame={initializeGame} onStudy={startStudy} />
  );
}

function StudyRoute() {
  const { category } = useParams();
  const { resetGame, startStudy, studyCategory, gameState } = useGame();

  // Validate category parameter
  if (!validCategories.includes(category)) {
    return <Navigate to="/" replace />;
  }

  // If coming directly to this route, set up study state
  if (gameState !== 'studying' || studyCategory !== category) {
    // Use effect would be better but for simplicity, trigger on render
    startStudy(category);
  }

  return <StudyScreen category={category} onBack={resetGame} />;
}

function GameRoute() {
  const {
    gameState,
    hasActiveGame,
    currentQuestion,
    progress,
    score,
    streak,
    lastAnswer,
    submitAnswer,
    nextQuestion,
    resetGame
  } = useGame();

  // Redirect to home if no active game
  if (!hasActiveGame) {
    return <Navigate to="/" replace />;
  }

  return (
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
  );
}

function AppContent() {
  return (
    <div className="app">
      <LanguageToggle />
      <main className="app-content">
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/study/:category" element={<StudyRoute />} />
          <Route path="/game" element={<GameRoute />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}

export default App;
