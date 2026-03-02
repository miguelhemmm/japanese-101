import { render, screen, fireEvent } from '@testing-library/react';
import { FeedbackDisplay } from './FeedbackDisplay';

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { language: 'en', changeLanguage: jest.fn() }
  })
}));

describe('FeedbackDisplay', () => {
  const mockOnNext = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('returns null when lastAnswer is null', () => {
    const { container } = render(<FeedbackDisplay lastAnswer={null} onNext={mockOnNext} />);

    expect(container.firstChild).toBeNull();
  });

  test('renders correct icon (✓) and message for correct answer', () => {
    const lastAnswer = {
      correct: true,
      userAnswer: 'a',
      correctAnswers: { romanji: ['a'] }
    };

    render(<FeedbackDisplay lastAnswer={lastAnswer} onNext={mockOnNext} />);

    expect(screen.getByText('✓')).toBeInTheDocument();
    expect(screen.getByText('feedback.correct')).toBeInTheDocument();
  });

  test('renders incorrect icon (✗) and message for incorrect answer', () => {
    const lastAnswer = {
      correct: false,
      userAnswer: 'i',
      correctAnswers: { romanji: ['a'] }
    };

    render(<FeedbackDisplay lastAnswer={lastAnswer} onNext={mockOnNext} />);

    expect(screen.getByText('✗')).toBeInTheDocument();
    expect(screen.getByText('feedback.incorrect')).toBeInTheDocument();
  });

  test('shows user answer and correct answers when incorrect', () => {
    const lastAnswer = {
      correct: false,
      userAnswer: 'i',
      correctAnswers: { romanji: ['a'] }
    };

    render(<FeedbackDisplay lastAnswer={lastAnswer} onNext={mockOnNext} />);

    expect(screen.getByText('feedback.yourAnswer')).toBeInTheDocument();
    expect(screen.getByText('i')).toBeInTheDocument();
    expect(screen.getByText('feedback.correctAnswer')).toBeInTheDocument();
    expect(screen.getByText('a')).toBeInTheDocument();
  });

  test('shows multiple romanji answers separated by slash', () => {
    const lastAnswer = {
      correct: false,
      userAnswer: 'wrong',
      correctAnswers: { romanji: ['shi', 'si'] }
    };

    render(<FeedbackDisplay lastAnswer={lastAnswer} onNext={mockOnNext} />);

    expect(screen.getByText('shi / si')).toBeInTheDocument();
  });

  test('shows English meanings in parentheses', () => {
    const lastAnswer = {
      correct: false,
      userAnswer: 'wrong',
      correctAnswers: {
        romanji: ['taberu'],
        english: ['to eat', 'eat']
      }
    };

    render(<FeedbackDisplay lastAnswer={lastAnswer} onNext={mockOnNext} />);

    expect(screen.getByText('(to eat, eat)')).toBeInTheDocument();
  });

  test('shows Spanish meanings in brackets', () => {
    const lastAnswer = {
      correct: false,
      userAnswer: 'wrong',
      correctAnswers: {
        romanji: ['taberu'],
        english: ['to eat'],
        spanish: ['comer']
      }
    };

    render(<FeedbackDisplay lastAnswer={lastAnswer} onNext={mockOnNext} />);

    expect(screen.getByText('[comer]')).toBeInTheDocument();
  });

  test('shows both English and Spanish meanings when present', () => {
    const lastAnswer = {
      correct: false,
      userAnswer: 'wrong',
      correctAnswers: {
        romanji: ['neko'],
        english: ['cat'],
        spanish: ['gato']
      }
    };

    render(<FeedbackDisplay lastAnswer={lastAnswer} onNext={mockOnNext} />);

    expect(screen.getByText('(cat)')).toBeInTheDocument();
    expect(screen.getByText('[gato]')).toBeInTheDocument();
  });

  test('does not show English section when empty', () => {
    const lastAnswer = {
      correct: false,
      userAnswer: 'wrong',
      correctAnswers: {
        romanji: ['a'],
        english: []
      }
    };

    render(<FeedbackDisplay lastAnswer={lastAnswer} onNext={mockOnNext} />);

    // Should not find any parentheses wrapper for English
    expect(screen.queryByText(/^\(/)).not.toBeInTheDocument();
  });

  test('onNext called on button click', () => {
    const lastAnswer = {
      correct: true,
      userAnswer: 'a',
      correctAnswers: { romanji: ['a'] }
    };

    render(<FeedbackDisplay lastAnswer={lastAnswer} onNext={mockOnNext} />);

    const nextButton = screen.getByText('buttons.next');
    fireEvent.click(nextButton);

    expect(mockOnNext).toHaveBeenCalledTimes(1);
  });

  test('onNext called on Enter key press', () => {
    const lastAnswer = {
      correct: true,
      userAnswer: 'a',
      correctAnswers: { romanji: ['a'] }
    };

    render(<FeedbackDisplay lastAnswer={lastAnswer} onNext={mockOnNext} />);

    fireEvent.keyDown(window, { key: 'Enter' });

    expect(mockOnNext).toHaveBeenCalledTimes(1);
  });

  test('applies correct CSS class for correct answer', () => {
    const lastAnswer = {
      correct: true,
      userAnswer: 'a',
      correctAnswers: { romanji: ['a'] }
    };

    const { container } = render(<FeedbackDisplay lastAnswer={lastAnswer} onNext={mockOnNext} />);

    expect(container.firstChild).toHaveClass('correct');
  });

  test('applies incorrect CSS class for incorrect answer', () => {
    const lastAnswer = {
      correct: false,
      userAnswer: 'i',
      correctAnswers: { romanji: ['a'] }
    };

    const { container } = render(<FeedbackDisplay lastAnswer={lastAnswer} onNext={mockOnNext} />);

    expect(container.firstChild).toHaveClass('incorrect');
  });
});
