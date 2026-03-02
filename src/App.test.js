import { render, screen } from "@testing-library/react";
import App from "./App";
import { useGameState } from "./features/game";

// Mock i18n before any imports
jest.mock("./i18n", () => ({}));

// Mock react-i18next
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { language: "en", changeLanguage: jest.fn() },
  }),
}));

// Mock the game state hook
jest.mock("./features/game", () => {
  const actual = jest.requireActual("./features/game");
  return {
    ...actual,
    useGameState: jest.fn(),
  };
});

// Mock the data module
jest.mock("./features/data", () => ({
  GAME_STATES: {
    SELECTING: "selecting",
    PLAYING: "playing",
    FEEDBACK: "feedback",
    COMPLETED: "completed",
  },
  getAllCharacters: () => [],
  CATEGORIES: {
    HIRAGANA: "hiragana",
    KATAKANA: "katakana",
    KANJI: "kanji",
    VERBS: "verbs",
  },
  CATEGORY_INFO: {
    hiragana: {
      nameKey: "categories.hiragana.name",
      descriptionKey: "categories.hiragana.description",
      icon: "あ",
    },
    katakana: {
      nameKey: "categories.katakana.name",
      descriptionKey: "categories.katakana.description",
      icon: "ア",
    },
    kanji: {
      nameKey: "categories.kanji.name",
      descriptionKey: "categories.kanji.description",
      icon: "漢",
    },
    verbs: {
      nameKey: "categories.verbs.name",
      descriptionKey: "categories.verbs.description",
      icon: "動",
    },
  },
}));

const mockUseGameState = useGameState;

describe("App", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders CategorySelection when gameState is SELECTING", () => {
    mockUseGameState.mockReturnValue({
      gameState: "selecting",
      currentQuestion: null,
      progress: { current: 0, total: 0 },
      score: { correct: 0, total: 0 },
      streak: 0,
      lastAnswer: null,
      initializeGame: jest.fn(),
      submitAnswer: jest.fn(),
      nextQuestion: jest.fn(),
      resetGame: jest.fn(),
    });

    render(<App />);

    // CategorySelection renders the app title
    expect(screen.getByText("app.title")).toBeInTheDocument();
    expect(screen.getByText("app.subtitle")).toBeInTheDocument();
  });

  test("renders GameScreen when gameState is PLAYING", () => {
    mockUseGameState.mockReturnValue({
      gameState: "playing",
      currentQuestion: {
        id: "h_a",
        character: "あ",
        romanji: ["a"],
        category: "hiragana",
      },
      progress: { current: 1, total: 10 },
      score: { correct: 0, total: 0 },
      streak: 0,
      lastAnswer: null,
      initializeGame: jest.fn(),
      submitAnswer: jest.fn(),
      nextQuestion: jest.fn(),
      resetGame: jest.fn(),
    });

    render(<App />);

    // GameScreen should render
    expect(screen.getByText("buttons.backToCategories")).toBeInTheDocument();
    expect(screen.getByText("あ")).toBeInTheDocument();
  });

  test("renders GameScreen when gameState is FEEDBACK", () => {
    mockUseGameState.mockReturnValue({
      gameState: "feedback",
      currentQuestion: {
        id: "h_a",
        character: "あ",
        romanji: ["a"],
        category: "hiragana",
      },
      progress: { current: 1, total: 10 },
      score: { correct: 1, total: 1 },
      streak: 1,
      lastAnswer: {
        correct: true,
        userAnswer: "a",
        correctAnswers: { romanji: ["a"] },
      },
      initializeGame: jest.fn(),
      submitAnswer: jest.fn(),
      nextQuestion: jest.fn(),
      resetGame: jest.fn(),
    });

    render(<App />);

    expect(screen.getByText("buttons.backToCategories")).toBeInTheDocument();
    expect(screen.getByText("feedback.correct")).toBeInTheDocument();
  });

  test("LanguageToggle is always rendered in header", () => {
    mockUseGameState.mockReturnValue({
      gameState: "selecting",
      currentQuestion: null,
      progress: { current: 0, total: 0 },
      score: { correct: 0, total: 0 },
      streak: 0,
      lastAnswer: null,
      initializeGame: jest.fn(),
      submitAnswer: jest.fn(),
      nextQuestion: jest.fn(),
      resetGame: jest.fn(),
    });

    render(<App />);

    // LanguageToggle should render with ES button (since language is 'en')
    expect(screen.getByRole("button", { name: "ES" })).toBeInTheDocument();
  });
});
