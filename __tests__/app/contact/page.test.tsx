import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactPage from '@/app/contact/page';

// Mock fetch
global.fetch = jest.fn();

describe('ContactPage', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('renders contact form', () => {
    render(<ContactPage />);
    
    expect(screen.getByText('Contact Find Your Light Psychiatry')).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i, { selector: 'input' })).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i, { selector: 'input[type="email"]' })).toBeInTheDocument();
    expect(screen.getByLabelText(/date of birth/i, { selector: 'input[type="date"]' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /request appointment/i })).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    const user = userEvent.setup();
    render(<ContactPage />);
    
    const submitButton = screen.getByRole('button', { name: /request appointment/i });
    await user.click(submitButton);
    
    // Form should show HTML5 validation
    const nameInput = screen.getByLabelText(/name/i, { selector: 'input' });
    expect(nameInput).toBeInvalid();
  });

  it('submits form successfully', async () => {
    const user = userEvent.setup();
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, message: 'Thank you for your request.' }),
    });

    render(<ContactPage />);
    
    await user.type(screen.getByLabelText(/name/i, { selector: 'input' }), 'John Doe');
    await user.type(screen.getByLabelText(/date of birth/i, { selector: 'input[type="date"]' }), '1990-01-01');
    await user.type(screen.getByLabelText(/email/i, { selector: 'input[type="email"]' }), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'Test message');
    await user.click(screen.getByLabelText(/I understand this form/i));
    
    const submitButton = screen.getByRole('button', { name: /request appointment/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: expect.any(String),
      });
    });
  });

  it('handles form submission errors', async () => {
    const user = userEvent.setup();
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Server error' }),
    });

    render(<ContactPage />);
    
    await user.type(screen.getByLabelText(/name/i, { selector: 'input' }), 'John Doe');
    await user.type(screen.getByLabelText(/date of birth/i, { selector: 'input[type="date"]' }), '1990-01-01');
    await user.type(screen.getByLabelText(/email/i, { selector: 'input[type="email"]' }), 'john@example.com');
    await user.click(screen.getByLabelText(/I understand this form/i));
    
    const submitButton = screen.getByRole('button', { name: /request appointment/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});

