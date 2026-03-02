import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AnswerInput } from './AnswerInput';

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { language: 'en', changeLanguage: jest.fn() }
  })
}));

describe('AnswerInput', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('input auto-focuses when not disabled', () => {
    render(<AnswerInput onSubmit={mockOnSubmit} disabled={false} />);

    const input = screen.getByPlaceholderText('input.placeholder');
    expect(input).toHaveFocus();
  });

  test('input does not focus when disabled', () => {
    render(<AnswerInput onSubmit={mockOnSubmit} disabled={true} />);

    const input = screen.getByPlaceholderText('input.placeholder');
    expect(input).not.toHaveFocus();
  });

  test('input clears on disabled→enabled transition', async () => {
    const { rerender } = render(<AnswerInput onSubmit={mockOnSubmit} disabled={false} />);

    const input = screen.getByPlaceholderText('input.placeholder');

    // Type something
    await userEvent.type(input, 'test answer');
    expect(input).toHaveValue('test answer');

    // Disable then re-enable (simulate new question)
    rerender(<AnswerInput onSubmit={mockOnSubmit} disabled={true} />);
    rerender(<AnswerInput onSubmit={mockOnSubmit} disabled={false} />);

    expect(input).toHaveValue('');
  });

  test('form submission calls onSubmit with answer', async () => {
    render(<AnswerInput onSubmit={mockOnSubmit} disabled={false} />);

    const input = screen.getByPlaceholderText('input.placeholder');
    await userEvent.type(input, 'a');

    const submitButton = screen.getByRole('button', { name: 'buttons.check' });
    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith('a');
  });

  test('submit button disabled when answer is empty', () => {
    render(<AnswerInput onSubmit={mockOnSubmit} disabled={false} />);

    const submitButton = screen.getByRole('button', { name: 'buttons.check' });
    expect(submitButton).toBeDisabled();
  });

  test('submit button disabled when disabled prop is true', async () => {
    render(<AnswerInput onSubmit={mockOnSubmit} disabled={true} />);

    const submitButton = screen.getByRole('button', { name: 'buttons.check' });
    expect(submitButton).toBeDisabled();
  });

  test('submit button enabled when answer is not empty and not disabled', async () => {
    render(<AnswerInput onSubmit={mockOnSubmit} disabled={false} />);

    const input = screen.getByPlaceholderText('input.placeholder');
    await userEvent.type(input, 'a');

    const submitButton = screen.getByRole('button', { name: 'buttons.check' });
    expect(submitButton).not.toBeDisabled();
  });

  test('empty/whitespace answers are not submitted', async () => {
    render(<AnswerInput onSubmit={mockOnSubmit} disabled={false} />);

    const input = screen.getByPlaceholderText('input.placeholder');
    await userEvent.type(input, '   ');

    const submitButton = screen.getByRole('button', { name: 'buttons.check' });
    fireEvent.click(submitButton);

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test('form can be submitted with Enter key', async () => {
    render(<AnswerInput onSubmit={mockOnSubmit} disabled={false} />);

    const input = screen.getByPlaceholderText('input.placeholder');
    await userEvent.type(input, 'ka{enter}');

    expect(mockOnSubmit).toHaveBeenCalledWith('ka');
  });
});
