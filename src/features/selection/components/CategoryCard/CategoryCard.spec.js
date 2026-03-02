import { render, screen, fireEvent } from '@testing-library/react';
import { CategoryCard } from './CategoryCard';

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { language: 'en', changeLanguage: jest.fn() }
  })
}));

describe('CategoryCard', () => {
  const mockInfo = {
    nameKey: 'categories.hiragana.name',
    descriptionKey: 'categories.hiragana.description',
    icon: 'あ'
  };

  const mockOnToggle = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders icon from props', () => {
    render(
      <CategoryCard
        category="hiragana"
        info={mockInfo}
        isSelected={false}
        onToggle={mockOnToggle}
      />
    );

    expect(screen.getByText('あ')).toBeInTheDocument();
  });

  test('renders name from props (translation key)', () => {
    render(
      <CategoryCard
        category="hiragana"
        info={mockInfo}
        isSelected={false}
        onToggle={mockOnToggle}
      />
    );

    expect(screen.getByText('categories.hiragana.name')).toBeInTheDocument();
  });

  test('renders description from props (translation key)', () => {
    render(
      <CategoryCard
        category="hiragana"
        info={mockInfo}
        isSelected={false}
        onToggle={mockOnToggle}
      />
    );

    expect(screen.getByText('categories.hiragana.description')).toBeInTheDocument();
  });

  test('shows checkmark when isSelected is true', () => {
    render(
      <CategoryCard
        category="hiragana"
        info={mockInfo}
        isSelected={true}
        onToggle={mockOnToggle}
      />
    );

    expect(screen.getByText('✓')).toBeInTheDocument();
  });

  test('does not show checkmark when isSelected is false', () => {
    render(
      <CategoryCard
        category="hiragana"
        info={mockInfo}
        isSelected={false}
        onToggle={mockOnToggle}
      />
    );

    expect(screen.queryByText('✓')).not.toBeInTheDocument();
  });

  test('applies selected CSS class when selected', () => {
    render(
      <CategoryCard
        category="hiragana"
        info={mockInfo}
        isSelected={true}
        onToggle={mockOnToggle}
      />
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('selected');
  });

  test('does not apply selected CSS class when not selected', () => {
    render(
      <CategoryCard
        category="hiragana"
        info={mockInfo}
        isSelected={false}
        onToggle={mockOnToggle}
      />
    );

    const button = screen.getByRole('button');
    expect(button).not.toHaveClass('selected');
  });

  test('onToggle callback fires with category on click', () => {
    render(
      <CategoryCard
        category="hiragana"
        info={mockInfo}
        isSelected={false}
        onToggle={mockOnToggle}
      />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockOnToggle).toHaveBeenCalledTimes(1);
    expect(mockOnToggle).toHaveBeenCalledWith('hiragana');
  });
});
