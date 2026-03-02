import { render, screen } from '@testing-library/react';
import { CharacterDisplay } from './CharacterDisplay';

describe('CharacterDisplay', () => {
  test('renders character prop correctly', () => {
    render(<CharacterDisplay character="あ" category="Hiragana" />);

    expect(screen.getByText('あ')).toBeInTheDocument();
  });

  test('renders category label correctly', () => {
    render(<CharacterDisplay character="あ" category="Hiragana" />);

    expect(screen.getByText('Hiragana')).toBeInTheDocument();
  });

  test('renders both character and category together', () => {
    render(<CharacterDisplay character="ア" category="Katakana" />);

    expect(screen.getByText('ア')).toBeInTheDocument();
    expect(screen.getByText('Katakana')).toBeInTheDocument();
  });

  test('renders kanji character correctly', () => {
    render(<CharacterDisplay character="食" category="Kanji" />);

    expect(screen.getByText('食')).toBeInTheDocument();
    expect(screen.getByText('Kanji')).toBeInTheDocument();
  });

  test('renders verb character correctly', () => {
    render(<CharacterDisplay character="食べる" category="Verbs" />);

    expect(screen.getByText('食べる')).toBeInTheDocument();
    expect(screen.getByText('Verbs')).toBeInTheDocument();
  });

  test('renders kanji with furigana', () => {
    render(
      <CharacterDisplay
        character="山"
        category="Kanji"
        furigana="やま"
        categoryType="kanji"
      />
    );

    expect(screen.getByText('山')).toBeInTheDocument();
    expect(screen.getByText('やま')).toBeInTheDocument();
  });

  test('renders verb with furigana above kanji', () => {
    render(
      <CharacterDisplay
        character="食べる"
        category="Verbs"
        furigana={[{ kanji: '食', reading: 'た' }]}
        categoryType="verbs"
      />
    );

    expect(screen.getByText('食')).toBeInTheDocument();
    expect(screen.getByText('た')).toBeInTheDocument();
    expect(screen.getByText('べる')).toBeInTheDocument();
  });

  test('renders verb with multiple kanji furigana', () => {
    render(
      <CharacterDisplay
        character="買い物する"
        category="Verbs"
        furigana={[
          { kanji: '買', reading: 'か' },
          { kanji: '物', reading: 'もの' }
        ]}
        categoryType="verbs"
      />
    );

    expect(screen.getByText('買')).toBeInTheDocument();
    expect(screen.getByText('か')).toBeInTheDocument();
    expect(screen.getByText('物')).toBeInTheDocument();
    expect(screen.getByText('もの')).toBeInTheDocument();
  });

  test('renders verb without furigana when array is empty', () => {
    render(
      <CharacterDisplay
        character="する"
        category="Verbs"
        furigana={[]}
        categoryType="verbs"
      />
    );

    expect(screen.getByText('する')).toBeInTheDocument();
  });

  test('renders hiragana without furigana annotation', () => {
    render(
      <CharacterDisplay
        character="あ"
        category="Hiragana"
        categoryType="hiragana"
      />
    );

    expect(screen.getByText('あ')).toBeInTheDocument();
    // No ruby element should be rendered for hiragana
    expect(screen.queryByRole('ruby')).not.toBeInTheDocument();
  });
});
