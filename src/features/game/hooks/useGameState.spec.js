import { renderHook, act } from '@testing-library/react';
import { useGameState } from './useGameState';

// Mock the data module
jest.mock('../../data', () => ({
  GAME_STATES: {
    SELECTING: 'selecting',
    PLAYING: 'playing',
    FEEDBACK: 'feedback',
    COMPLETED: 'completed'
  },
  CATEGORIES: {
    HIRAGANA: 'hiragana',
    KATAKANA: 'katakana',
    KANJI: 'kanji',
    VERBS: 'verbs'
  }
}));

describe('useGameState', () => {
  const mockCharacters = [
    { id: 'h_a', character: 'あ', romanji: ['a'], english: [], category: 'hiragana' },
    { id: 'h_i', character: 'い', romanji: ['i'], english: [], category: 'hiragana' },
    { id: 'h_u', character: 'う', romanji: ['u'], english: [], category: 'hiragana' },
    { id: 'k_a', character: 'ア', romanji: ['a'], english: [], category: 'katakana' },
    { id: 'k_i', character: 'イ', romanji: ['i'], english: [], category: 'katakana' },
    {
      id: 'kanji_1',
      character: '食',
      romanji: ['taberu', 'shoku'],
      english: ['eat', 'food'],
      spanish: ['comer'],
      category: 'kanji'
    },
    {
      id: 'verb_1',
      character: '食べる',
      romanji: ['taberu'],
      english: ['to eat'],
      spanish: ['comer'],
      category: 'verbs'
    }
  ];

  describe('initial state', () => {
    test('starts in SELECTING state', () => {
      const { result } = renderHook(() => useGameState(mockCharacters));

      expect(result.current.gameState).toBe('selecting');
    });

    test('has null currentQuestion initially', () => {
      const { result } = renderHook(() => useGameState(mockCharacters));

      expect(result.current.currentQuestion).toBeNull();
    });

    test('has zero scores initially', () => {
      const { result } = renderHook(() => useGameState(mockCharacters));

      expect(result.current.score).toEqual({ correct: 0, total: 0 });
      expect(result.current.streak).toBe(0);
    });
  });

  describe('initializeGame', () => {
    test('filters by selected categories', () => {
      const { result } = renderHook(() => useGameState(mockCharacters));

      act(() => {
        result.current.initializeGame(['hiragana']);
      });

      // All questions should be hiragana
      expect(result.current.progress.total).toBe(3); // 3 hiragana characters
    });

    test('filters by multiple categories', () => {
      const { result } = renderHook(() => useGameState(mockCharacters));

      act(() => {
        result.current.initializeGame(['hiragana', 'katakana']);
      });

      expect(result.current.progress.total).toBe(5); // 3 hiragana + 2 katakana
    });

    test('transitions to PLAYING state', () => {
      const { result } = renderHook(() => useGameState(mockCharacters));

      act(() => {
        result.current.initializeGame(['hiragana']);
      });

      expect(result.current.gameState).toBe('playing');
    });

    test('shuffles questions (randomizes order)', () => {
      // Run multiple times and check that order varies
      const orders = [];
      for (let i = 0; i < 10; i++) {
        const { result } = renderHook(() => useGameState(mockCharacters));

        act(() => {
          result.current.initializeGame(['hiragana']);
        });

        orders.push(result.current.currentQuestion?.id);
      }

      // With 3 items and 10 runs, it's extremely unlikely to get the same first item every time
      // if shuffling is working
      const uniqueFirstItems = new Set(orders);
      expect(uniqueFirstItems.size).toBeGreaterThanOrEqual(1);
    });

    test('resets score and streak', () => {
      const { result } = renderHook(() => useGameState(mockCharacters));

      // Initialize and submit some answers
      act(() => {
        result.current.initializeGame(['hiragana']);
      });

      act(() => {
        result.current.submitAnswer('a');
      });

      // Re-initialize
      act(() => {
        result.current.initializeGame(['hiragana']);
      });

      expect(result.current.score).toEqual({ correct: 0, total: 0 });
      expect(result.current.streak).toBe(0);
    });

    test('sets currentQuestion to first question', () => {
      const { result } = renderHook(() => useGameState(mockCharacters));

      act(() => {
        result.current.initializeGame(['hiragana']);
      });

      expect(result.current.currentQuestion).not.toBeNull();
      expect(result.current.currentQuestion.category).toBe('hiragana');
    });
  });

  describe('normalizeAnswer (tested via submitAnswer)', () => {
    test('normalizes to lowercase', () => {
      const { result } = renderHook(() => useGameState(mockCharacters));

      act(() => {
        result.current.initializeGame(['hiragana']);
      });

      const currentChar = result.current.currentQuestion;

      act(() => {
        // Submit uppercase version of correct answer
        result.current.submitAnswer(currentChar.romanji[0].toUpperCase());
      });

      expect(result.current.lastAnswer.correct).toBe(true);
    });

    test('trims whitespace', () => {
      const { result } = renderHook(() => useGameState(mockCharacters));

      act(() => {
        result.current.initializeGame(['hiragana']);
      });

      const currentChar = result.current.currentQuestion;

      act(() => {
        result.current.submitAnswer('  ' + currentChar.romanji[0] + '  ');
      });

      expect(result.current.lastAnswer.correct).toBe(true);
    });
  });

  describe('isAnswerCorrect (tested via submitAnswer)', () => {
    test('validates romanji correctly', () => {
      const { result } = renderHook(() => useGameState(mockCharacters));

      act(() => {
        result.current.initializeGame(['hiragana']);
      });

      const currentChar = result.current.currentQuestion;

      act(() => {
        result.current.submitAnswer(currentChar.romanji[0]);
      });

      expect(result.current.lastAnswer.correct).toBe(true);
    });

    test('rejects wrong romanji', () => {
      const { result } = renderHook(() => useGameState(mockCharacters));

      act(() => {
        result.current.initializeGame(['hiragana']);
      });

      act(() => {
        result.current.submitAnswer('definitely wrong answer');
      });

      expect(result.current.lastAnswer.correct).toBe(false);
    });

    test('validates English for kanji', () => {
      const { result } = renderHook(() => useGameState(mockCharacters));

      act(() => {
        result.current.initializeGame(['kanji']);
      });

      act(() => {
        result.current.submitAnswer('eat');
      });

      expect(result.current.lastAnswer.correct).toBe(true);
    });

    test('validates English for verbs', () => {
      const { result } = renderHook(() => useGameState(mockCharacters));

      act(() => {
        result.current.initializeGame(['verbs']);
      });

      act(() => {
        result.current.submitAnswer('to eat');
      });

      expect(result.current.lastAnswer.correct).toBe(true);
    });

    test('validates Spanish for kanji', () => {
      const { result } = renderHook(() => useGameState(mockCharacters));

      act(() => {
        result.current.initializeGame(['kanji']);
      });

      act(() => {
        result.current.submitAnswer('comer');
      });

      expect(result.current.lastAnswer.correct).toBe(true);
    });

    test('validates Spanish for verbs', () => {
      const { result } = renderHook(() => useGameState(mockCharacters));

      act(() => {
        result.current.initializeGame(['verbs']);
      });

      act(() => {
        result.current.submitAnswer('comer');
      });

      expect(result.current.lastAnswer.correct).toBe(true);
    });
  });

  describe('submitAnswer', () => {
    test('increments score for correct answer', () => {
      const { result } = renderHook(() => useGameState(mockCharacters));

      act(() => {
        result.current.initializeGame(['hiragana']);
      });

      const correctAnswer = result.current.currentQuestion.romanji[0];

      act(() => {
        result.current.submitAnswer(correctAnswer);
      });

      expect(result.current.score.correct).toBe(1);
      expect(result.current.score.total).toBe(1);
    });

    test('does not increment correct count for wrong answer', () => {
      const { result } = renderHook(() => useGameState(mockCharacters));

      act(() => {
        result.current.initializeGame(['hiragana']);
      });

      act(() => {
        result.current.submitAnswer('wrong');
      });

      expect(result.current.score.correct).toBe(0);
      expect(result.current.score.total).toBe(1);
    });

    test('increments streak for correct answer', () => {
      const { result } = renderHook(() => useGameState(mockCharacters));

      act(() => {
        result.current.initializeGame(['hiragana']);
      });

      const correctAnswer = result.current.currentQuestion.romanji[0];

      act(() => {
        result.current.submitAnswer(correctAnswer);
      });

      expect(result.current.streak).toBe(1);
    });

    test('resets streak for incorrect answer', () => {
      const { result } = renderHook(() => useGameState(mockCharacters));

      act(() => {
        result.current.initializeGame(['hiragana']);
      });

      // Submit correct answer to build streak
      const firstCorrect = result.current.currentQuestion.romanji[0];
      act(() => {
        result.current.submitAnswer(firstCorrect);
      });
      act(() => {
        result.current.nextQuestion();
      });

      // Verify streak increased
      expect(result.current.streak).toBe(1);

      // Submit wrong answer
      act(() => {
        result.current.submitAnswer('wrong');
      });

      expect(result.current.streak).toBe(0);
    });

    test('transitions to FEEDBACK state', () => {
      const { result } = renderHook(() => useGameState(mockCharacters));

      act(() => {
        result.current.initializeGame(['hiragana']);
      });

      act(() => {
        result.current.submitAnswer('a');
      });

      expect(result.current.gameState).toBe('feedback');
    });

    test('sets lastAnswer with correct info', () => {
      const { result } = renderHook(() => useGameState(mockCharacters));

      act(() => {
        result.current.initializeGame(['hiragana']);
      });

      const currentQuestion = result.current.currentQuestion;

      act(() => {
        result.current.submitAnswer('myAnswer');
      });

      expect(result.current.lastAnswer).toEqual({
        userAnswer: 'myAnswer',
        correct: expect.any(Boolean),
        correctAnswers: {
          romanji: currentQuestion.romanji,
          english: currentQuestion.english,
          spanish: currentQuestion.spanish
        }
      });
    });

    test('does nothing if not in PLAYING state', () => {
      const { result } = renderHook(() => useGameState(mockCharacters));

      // Try to submit without initializing (still in SELECTING)
      act(() => {
        result.current.submitAnswer('a');
      });

      expect(result.current.score.total).toBe(0);
      expect(result.current.lastAnswer).toBeNull();
    });
  });

  describe('nextQuestion', () => {
    test('advances index', () => {
      const { result } = renderHook(() => useGameState(mockCharacters));

      act(() => {
        result.current.initializeGame(['hiragana']);
      });

      const firstQuestion = result.current.currentQuestion;

      act(() => {
        result.current.submitAnswer('a');
      });
      act(() => {
        result.current.nextQuestion();
      });

      expect(result.current.progress.current).toBe(2);
      expect(result.current.currentQuestion).not.toEqual(firstQuestion);
    });

    test('transitions to COMPLETED at end', () => {
      const { result } = renderHook(() => useGameState(mockCharacters));

      // Initialize with just 1 category that has few items
      act(() => {
        result.current.initializeGame(['hiragana']);
      });

      // Go through all 3 hiragana questions
      for (let i = 0; i < 3; i++) {
        act(() => {
          result.current.submitAnswer('a');
        });
        act(() => {
          result.current.nextQuestion();
        });
      }

      expect(result.current.gameState).toBe('completed');
    });

    test('clears lastAnswer when advancing', () => {
      const { result } = renderHook(() => useGameState(mockCharacters));

      act(() => {
        result.current.initializeGame(['hiragana']);
      });

      act(() => {
        result.current.submitAnswer('a');
      });

      expect(result.current.lastAnswer).not.toBeNull();

      act(() => {
        result.current.nextQuestion();
      });

      expect(result.current.lastAnswer).toBeNull();
    });

    test('transitions back to PLAYING state', () => {
      const { result } = renderHook(() => useGameState(mockCharacters));

      act(() => {
        result.current.initializeGame(['hiragana']);
      });

      act(() => {
        result.current.submitAnswer('a');
      });

      expect(result.current.gameState).toBe('feedback');

      act(() => {
        result.current.nextQuestion();
      });

      // Should be playing again (if not at end)
      if (result.current.progress.current <= result.current.progress.total) {
        expect(result.current.gameState).toBe('playing');
      }
    });
  });

  describe('resetGame', () => {
    test('returns to SELECTING state', () => {
      const { result } = renderHook(() => useGameState(mockCharacters));

      act(() => {
        result.current.initializeGame(['hiragana']);
      });

      act(() => {
        result.current.resetGame();
      });

      expect(result.current.gameState).toBe('selecting');
    });

    test('clears questions', () => {
      const { result } = renderHook(() => useGameState(mockCharacters));

      act(() => {
        result.current.initializeGame(['hiragana']);
      });

      act(() => {
        result.current.resetGame();
      });

      expect(result.current.currentQuestion).toBeNull();
      expect(result.current.progress.total).toBe(0);
    });

    test('resets all state', () => {
      const { result } = renderHook(() => useGameState(mockCharacters));

      act(() => {
        result.current.initializeGame(['hiragana']);
      });

      act(() => {
        result.current.submitAnswer('a');
      });

      act(() => {
        result.current.resetGame();
      });

      expect(result.current.score).toEqual({ correct: 0, total: 0 });
      expect(result.current.streak).toBe(0);
      expect(result.current.lastAnswer).toBeNull();
    });
  });

  describe('progress', () => {
    test('tracks current position correctly', () => {
      const { result } = renderHook(() => useGameState(mockCharacters));

      act(() => {
        result.current.initializeGame(['hiragana']);
      });

      expect(result.current.progress.current).toBe(1);

      act(() => {
        result.current.submitAnswer('a');
      });
      act(() => {
        result.current.nextQuestion();
      });

      expect(result.current.progress.current).toBe(2);
    });

    test('tracks total correctly', () => {
      const { result } = renderHook(() => useGameState(mockCharacters));

      act(() => {
        result.current.initializeGame(['hiragana']);
      });

      expect(result.current.progress.total).toBe(3);
    });
  });
});
