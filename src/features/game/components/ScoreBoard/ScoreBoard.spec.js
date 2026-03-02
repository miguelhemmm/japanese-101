import { render, screen } from '@testing-library/react';
import { ScoreBoard } from './ScoreBoard';

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { language: 'en', changeLanguage: jest.fn() }
  })
}));

describe('ScoreBoard', () => {
  test('renders progress as "current / total"', () => {
    render(
      <ScoreBoard
        progress={{ current: 5, total: 10 }}
        score={{ correct: 3, total: 4 }}
        streak={2}
      />
    );

    expect(screen.getByText('5 / 10')).toBeInTheDocument();
  });

  test('renders correct count with percentage', () => {
    render(
      <ScoreBoard
        progress={{ current: 5, total: 10 }}
        score={{ correct: 3, total: 4 }}
        streak={2}
      />
    );

    expect(screen.getByText('3 (75%)')).toBeInTheDocument();
  });

  test('calculates percentage correctly', () => {
    render(
      <ScoreBoard
        progress={{ current: 10, total: 20 }}
        score={{ correct: 7, total: 10 }}
        streak={0}
      />
    );

    expect(screen.getByText('7 (70%)')).toBeInTheDocument();
  });

  test('handles zero total (shows 0%)', () => {
    render(
      <ScoreBoard
        progress={{ current: 1, total: 10 }}
        score={{ correct: 0, total: 0 }}
        streak={0}
      />
    );

    expect(screen.getByText('0 (0%)')).toBeInTheDocument();
  });

  test('displays streak count', () => {
    render(
      <ScoreBoard
        progress={{ current: 5, total: 10 }}
        score={{ correct: 3, total: 3 }}
        streak={5}
      />
    );

    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('game.streak')).toBeInTheDocument();
  });

  test('displays all labels correctly', () => {
    render(
      <ScoreBoard
        progress={{ current: 1, total: 10 }}
        score={{ correct: 0, total: 0 }}
        streak={0}
      />
    );

    expect(screen.getByText('game.progress')).toBeInTheDocument();
    expect(screen.getByText('game.correct')).toBeInTheDocument();
    expect(screen.getByText('game.streak')).toBeInTheDocument();
  });

  test('rounds percentage correctly', () => {
    render(
      <ScoreBoard
        progress={{ current: 4, total: 10 }}
        score={{ correct: 1, total: 3 }}
        streak={1}
      />
    );

    // 1/3 = 33.33...% should round to 33%
    expect(screen.getByText('1 (33%)')).toBeInTheDocument();
  });

  test('shows 100% when all answers are correct', () => {
    render(
      <ScoreBoard
        progress={{ current: 10, total: 10 }}
        score={{ correct: 10, total: 10 }}
        streak={10}
      />
    );

    expect(screen.getByText('10 (100%)')).toBeInTheDocument();
  });
});
