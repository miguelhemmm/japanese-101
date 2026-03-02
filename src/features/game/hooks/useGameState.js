import { useState, useCallback, useMemo } from 'react';
import { GAME_STATES, CATEGORIES } from '../../data';

// Fisher-Yates shuffle algorithm
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Normalize answer for comparison
const normalizeAnswer = (answer) => {
  return answer.toLowerCase().trim();
};

// Check if answer is correct
const isAnswerCorrect = (userAnswer, correctItem) => {
  const normalized = normalizeAnswer(userAnswer);

  // Check romanji answers
  const romanjiMatch = correctItem.romanji.some(r =>
    normalizeAnswer(r) === normalized
  );

  if (romanjiMatch) return true;

  // For kanji and verbs, also check English and Spanish meanings
  if (correctItem.category === CATEGORIES.KANJI || correctItem.category === CATEGORIES.VERBS) {
    const englishMatch = correctItem.english.some(e =>
      normalizeAnswer(e) === normalized
    );
    if (englishMatch) return true;

    // Check Spanish translations
    if (correctItem.spanish?.some(s => normalizeAnswer(s) === normalized)) {
      return true;
    }
  }

  return false;
};

export const useGameState = (characters) => {
  const [gameState, setGameState] = useState(GAME_STATES.SELECTING);
  const [studyCategory, setStudyCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [streak, setStreak] = useState(0);
  const [lastAnswer, setLastAnswer] = useState(null);

  const currentQuestion = useMemo(() => {
    return questions[currentIndex] || null;
  }, [questions, currentIndex]);

  const progress = useMemo(() => ({
    current: currentIndex + 1,
    total: questions.length
  }), [currentIndex, questions.length]);

  const initializeGame = useCallback((selectedCategories, limit = 'all') => {
    // Filter characters by selected categories
    const filteredChars = characters.filter(c =>
      selectedCategories.includes(c.category)
    );

    // Shuffle and limit questions
    const shuffled = shuffleArray(filteredChars);
    const limitedQuestions = limit === 'all' ? shuffled : shuffled.slice(0, Number(limit));
    setQuestions(limitedQuestions);
    setCurrentIndex(0);
    setScore({ correct: 0, total: 0 });
    setStreak(0);
    setLastAnswer(null);
    setGameState(GAME_STATES.PLAYING);
  }, [characters]);

  const submitAnswer = useCallback((answer) => {
    if (!currentQuestion || gameState !== GAME_STATES.PLAYING) return;

    const correct = isAnswerCorrect(answer, currentQuestion);

    setScore(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1
    }));

    setStreak(prev => correct ? prev + 1 : 0);

    setLastAnswer({
      userAnswer: answer,
      correct,
      correctAnswers: {
        romanji: currentQuestion.romanji,
        english: currentQuestion.english,
        spanish: currentQuestion.spanish
      }
    });

    setGameState(GAME_STATES.FEEDBACK);
  }, [currentQuestion, gameState]);

  const nextQuestion = useCallback(() => {
    if (currentIndex + 1 >= questions.length) {
      setGameState(GAME_STATES.COMPLETED);
    } else {
      setCurrentIndex(prev => prev + 1);
      setLastAnswer(null);
      setGameState(GAME_STATES.PLAYING);
    }
  }, [currentIndex, questions.length]);

  const resetGame = useCallback(() => {
    setGameState(GAME_STATES.SELECTING);
    setStudyCategory(null);
    setQuestions([]);
    setCurrentIndex(0);
    setScore({ correct: 0, total: 0 });
    setStreak(0);
    setLastAnswer(null);
  }, []);

  const startStudy = useCallback((category) => {
    setStudyCategory(category);
    setGameState(GAME_STATES.STUDYING);
  }, []);

  return {
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
  };
};
