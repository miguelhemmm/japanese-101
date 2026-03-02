import { render, screen, fireEvent } from '@testing-library/react';
import { GameScreen } from './GameScreen';

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { language: 'en', changeLanguage: jest.fn() }
  })
}));

// Mock the data module
jest.mock('../../../data', () => ({
  GAME_STATES: {
    SELECTING: 'selecting',
    PLAYING: 'playing',
    FEEDBACK: 'feedback',
    COMPLETED: 'completed'
  },
  CATEGORY_INFO: {
    hiragana: { nameKey: 'categories.hiragana.name', descriptionKey: 'categories.hiragana.description', icon: 'あ' },
    katakana: { nameKey: 'categories.katakana.name', descriptionKey: 'categories.katakana.description', icon: 'ア' },
    kanji: { nameKey: 'categories.kanji.name', descriptionKey: 'categories.kanji.description', icon: '漢' },
    verbs: { nameKey: 'categories.verbs.name', descriptionKey: 'categories.verbs.description', icon: '動' }
  }
}));

describe('GameScreen', () => {
  const mockOnSubmitAnswer = jest.fn();
  const mockOnNextQuestion = jest.fn();
  const mockOnReset = jest.fn();

  const defaultProps = {
    gameState: 'playing',
    currentQuestion: {
      id: 'h_a',
      character: 'あ',
      romanji: ['a'],
      category: 'hiragana'
    },
    progress: { current: 1, total: 10 },
    score: { correct: 0, total: 0 },
    streak: 0,
    lastAnswer: null,
    onSubmitAnswer: mockOnSubmitAnswer,
    onNextQuestion: mockOnNextQuestion,
    onReset: mockOnReset
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders completion screen when COMPLETED', () => {
    render(
      <GameScreen
        {...defaultProps}
        gameState="completed"
        score={{ correct: 8, total: 10 }}
      />
    );

    expect(screen.getByText('game.practiceComplete')).toBeInTheDocument();
    expect(screen.getByText('buttons.playAgain')).toBeInTheDocument();
  });

  test('shows final score and accuracy on completion', () => {
    render(
      <GameScreen
        {...defaultProps}
        gameState="completed"
        score={{ correct: 8, total: 10 }}
      />
    );

    expect(screen.getByText('8')).toBeInTheDocument(); // correct
    expect(screen.getByText('10')).toBeInTheDocument(); // total
    expect(screen.getByText('80%')).toBeInTheDocument(); // accuracy
  });

  test('renders game screen with scoreboard when PLAYING', () => {
    render(<GameScreen {...defaultProps} />);

    expect(screen.getByText('game.progress')).toBeInTheDocument();
    expect(screen.getByText('game.correct')).toBeInTheDocument();
    expect(screen.getByText('game.streak')).toBeInTheDocument();
  });

  test('shows AnswerInput when PLAYING', () => {
    render(<GameScreen {...defaultProps} />);

    expect(screen.getByPlaceholderText('input.placeholder')).toBeInTheDocument();
    expect(screen.getByText('buttons.check')).toBeInTheDocument();
  });

  test('does not show AnswerInput when FEEDBACK', () => {
    render(
      <GameScreen
        {...defaultProps}
        gameState="feedback"
        lastAnswer={{
          correct: true,
          userAnswer: 'a',
          correctAnswers: { romanji: ['a'] }
        }}
      />
    );

    expect(screen.queryByPlaceholderText('input.placeholder')).not.toBeInTheDocument();
  });

  test('shows FeedbackDisplay when FEEDBACK', () => {
    render(
      <GameScreen
        {...defaultProps}
        gameState="feedback"
        lastAnswer={{
          correct: true,
          userAnswer: 'a',
          correctAnswers: { romanji: ['a'] }
        }}
      />
    );

    expect(screen.getByText('feedback.correct')).toBeInTheDocument();
    expect(screen.getByText('buttons.next')).toBeInTheDocument();
  });

  test('back button calls onReset', () => {
    render(<GameScreen {...defaultProps} />);

    const backButton = screen.getByText('buttons.backToCategories');
    fireEvent.click(backButton);

    expect(mockOnReset).toHaveBeenCalledTimes(1);
  });

  test('play again button calls onReset on completion screen', () => {
    render(
      <GameScreen
        {...defaultProps}
        gameState="completed"
        score={{ correct: 8, total: 10 }}
      />
    );

    const playAgainButton = screen.getByText('buttons.playAgain');
    fireEvent.click(playAgainButton);

    expect(mockOnReset).toHaveBeenCalledTimes(1);
  });

  test('renders character display with current question', () => {
    render(<GameScreen {...defaultProps} />);

    expect(screen.getByText('あ')).toBeInTheDocument();
  });

  test('renders verb with furigana', () => {
    const verbQuestion = {
      id: 'v_taberu',
      character: '食べる',
      romanji: ['taberu'],
      english: ['to eat', 'eat'],
      furigana: [{ kanji: '食', reading: 'た' }],
      category: 'verbs'
    };

    render(<GameScreen {...defaultProps} currentQuestion={verbQuestion} />);

    expect(screen.getByText('食')).toBeInTheDocument();
    expect(screen.getByText('た')).toBeInTheDocument();
    expect(screen.getByText('べる')).toBeInTheDocument();
  });

  test('renders kanji with furigana', () => {
    const kanjiQuestion = {
      id: 'kj_mountain',
      character: '山',
      romanji: ['yama', 'san'],
      english: ['mountain'],
      furigana: 'やま',
      category: 'kanji'
    };

    render(<GameScreen {...defaultProps} currentQuestion={kanjiQuestion} />);

    expect(screen.getByText('山')).toBeInTheDocument();
    expect(screen.getByText('やま')).toBeInTheDocument();
  });

  test('renders category name from translation', () => {
    render(<GameScreen {...defaultProps} />);

    // The category name is looked up via CATEGORY_INFO and translated
    expect(screen.getByText('categories.hiragana.name')).toBeInTheDocument();
  });

  test('handles 0% accuracy on completion', () => {
    render(
      <GameScreen
        {...defaultProps}
        gameState="completed"
        score={{ correct: 0, total: 10 }}
      />
    );

    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  test('handles 0 total (edge case) on completion', () => {
    render(
      <GameScreen
        {...defaultProps}
        gameState="completed"
        score={{ correct: 0, total: 0 }}
      />
    );

    expect(screen.getByText('0%')).toBeInTheDocument();
  });
});
