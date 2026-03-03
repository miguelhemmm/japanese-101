import { render, screen, fireEvent } from '@testing-library/react';
import { CategorySelection } from './CategorySelection';

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { language: 'en', changeLanguage: jest.fn() }
  })
}));

// Mock the data module
jest.mock('../../../data', () => ({
  CATEGORIES: {
    HIRAGANA: 'hiragana',
    KATAKANA: 'katakana',
    KANJI: 'kanji',
    VERBS: 'verbs'
  },
  CATEGORY_INFO: {
    hiragana: { nameKey: 'categories.hiragana.name', descriptionKey: 'categories.hiragana.description', icon: 'あ' },
    katakana: { nameKey: 'categories.katakana.name', descriptionKey: 'categories.katakana.description', icon: 'ア' },
    kanji: { nameKey: 'categories.kanji.name', descriptionKey: 'categories.kanji.description', icon: '漢' },
    verbs: { nameKey: 'categories.verbs.name', descriptionKey: 'categories.verbs.description', icon: '動' }
  }
}));

describe('CategorySelection', () => {
  const mockOnStartGame = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders all 4 category cards', () => {
    render(<CategorySelection onStartGame={mockOnStartGame} />);

    expect(screen.getByText('あ')).toBeInTheDocument(); // Hiragana icon
    expect(screen.getByText('ア')).toBeInTheDocument(); // Katakana icon
    expect(screen.getByText('漢')).toBeInTheDocument(); // Kanji icon
    expect(screen.getByText('動')).toBeInTheDocument(); // Verbs icon
  });

  test('toggling categories updates selection state', () => {
    render(<CategorySelection onStartGame={mockOnStartGame} />);

    // Find the hiragana card by its icon and click the select button
    const hiraganaIcon = screen.getByText('あ');
    const hiraganaSelectButton = hiraganaIcon.closest('.category-card__select');
    const hiraganaCard = hiraganaIcon.closest('.category-card');
    fireEvent.click(hiraganaSelectButton);

    // Card should now have selected class
    expect(hiraganaCard).toHaveClass('selected');

    // Click again to deselect
    fireEvent.click(hiraganaSelectButton);
    expect(hiraganaCard).not.toHaveClass('selected');
  });

  test('Start button is disabled when no categories selected', () => {
    render(<CategorySelection onStartGame={mockOnStartGame} />);

    const startButton = screen.getByText('buttons.startPractice');
    expect(startButton).toBeDisabled();
  });

  test('Start button is enabled when categories selected', () => {
    render(<CategorySelection onStartGame={mockOnStartGame} />);

    // Select a category
    const hiraganaIcon = screen.getByText('あ');
    const hiraganaSelectButton = hiraganaIcon.closest('.category-card__select');
    fireEvent.click(hiraganaSelectButton);

    // Start button should be enabled
    const startButton = screen.getByText('buttons.startPractice').closest('button');
    expect(startButton).not.toBeDisabled();
  });

  test('shows selected count when categories are selected', () => {
    render(<CategorySelection onStartGame={mockOnStartGame} />);

    // Select one category
    const hiraganaIcon = screen.getByText('あ');
    const hiraganaSelectButton = hiraganaIcon.closest('.category-card__select');
    fireEvent.click(hiraganaSelectButton);

    // The count is rendered as "(1 selected)" where "selected" is the translation key
    expect(screen.getByText(/\(1 selected\)/)).toBeInTheDocument();

    // Select another category
    const katakanaIcon = screen.getByText('ア');
    const katakanaSelectButton = katakanaIcon.closest('.category-card__select');
    fireEvent.click(katakanaSelectButton);

    expect(screen.getByText(/\(2 selected\)/)).toBeInTheDocument();
  });

  test('onStartGame called with selected categories', () => {
    render(<CategorySelection onStartGame={mockOnStartGame} />);

    // Select hiragana and katakana
    const hiraganaIcon = screen.getByText('あ');
    const hiraganaSelectButton = hiraganaIcon.closest('.category-card__select');
    fireEvent.click(hiraganaSelectButton);

    const katakanaIcon = screen.getByText('ア');
    const katakanaSelectButton = katakanaIcon.closest('.category-card__select');
    fireEvent.click(katakanaSelectButton);

    // Click start button
    const startButton = screen.getByText('buttons.startPractice').closest('button');
    fireEvent.click(startButton);

    expect(mockOnStartGame).toHaveBeenCalledTimes(1);
    expect(mockOnStartGame).toHaveBeenCalledWith(['hiragana', 'katakana'], 'all');
  });

  test('onStartGame not called when no categories selected', () => {
    render(<CategorySelection onStartGame={mockOnStartGame} />);

    // Try to click start button without selecting categories
    const startButton = screen.getByText('buttons.startPractice');
    fireEvent.click(startButton);

    expect(mockOnStartGame).not.toHaveBeenCalled();
  });
});
