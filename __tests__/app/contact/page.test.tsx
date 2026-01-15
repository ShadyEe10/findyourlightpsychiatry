import { render, screen, waitFor, within, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactPage from '@/app/contact/page';
import { axe } from 'jest-axe';

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
    expect(screen.getByRole('button', { name: /submit intake form/i })).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    const user = userEvent.setup();
    render(<ContactPage />);
    
    const submitButton = screen.getByRole('button', { name: /submit intake form/i });
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
    await user.type(screen.getByLabelText(/phone/i, { selector: 'input[type="tel"]' }), '2065551234');
    await user.type(screen.getByLabelText(/email/i, { selector: 'input[type="email"]' }), 'john@example.com');
    await user.click(screen.getByLabelText(/Queen Anne/i));
    const insuranceGroup = screen.getByRole('group', { name: /Do you have insurance\?/i });
    await user.click(within(insuranceGroup).getByRole('radio', { name: /^No$/i }));
    await user.click(screen.getByLabelText(/Medication Management/i));
    await user.type(screen.getByLabelText(/Brief description/i), 'Test message for care');
    const safetyGroup = screen.getByRole('group', {
      name: /Are you experiencing any thoughts of harming yourself or others\?/i,
    });
    await user.click(within(safetyGroup).getByRole('radio', { name: /^No$/i }));
    const diagnosisGroup = screen.getByRole('group', {
      name: /Have you been diagnosed with a mental health condition\?/i,
    });
    await user.click(within(diagnosisGroup).getByRole('radio', { name: /^No$/i }));
    const medsGroup = screen.getByRole('group', {
      name: /Are you currently taking psychiatric medications\?/i,
    });
    await user.click(within(medsGroup).getByRole('radio', { name: /^No$/i }));
    const hospitalizationGroup = screen.getByRole('group', {
      name: /Have you ever been hospitalized for mental health reasons\?/i,
    });
    await user.click(within(hospitalizationGroup).getByRole('radio', { name: /^No$/i }));
    await user.click(
      screen.getByRole('checkbox', {
        name: /does not guarantee an appointment or establish a patient-provider relationship/i,
      }),
    );
    await user.click(
      screen.getByRole('checkbox', {
        name: /this form is not for emergencies/i,
      }),
    );
    
    const submitButton = screen.getByRole('button', { name: /submit intake form/i });
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
    await user.type(screen.getByLabelText(/phone/i, { selector: 'input[type="tel"]' }), '2065551234');
    await user.type(screen.getByLabelText(/email/i, { selector: 'input[type="email"]' }), 'john@example.com');
    await user.click(screen.getByLabelText(/Queen Anne/i));
    const insuranceGroup = screen.getByRole('group', { name: /Do you have insurance\?/i });
    await user.click(within(insuranceGroup).getByRole('radio', { name: /^No$/i }));
    await user.click(screen.getByLabelText(/Medication Management/i));
    await user.type(screen.getByLabelText(/Brief description/i), 'Test message for care');
    const safetyGroup = screen.getByRole('group', {
      name: /Are you experiencing any thoughts of harming yourself or others\?/i,
    });
    await user.click(within(safetyGroup).getByRole('radio', { name: /^No$/i }));
    const diagnosisGroup = screen.getByRole('group', {
      name: /Have you been diagnosed with a mental health condition\?/i,
    });
    await user.click(within(diagnosisGroup).getByRole('radio', { name: /^No$/i }));
    const medsGroup = screen.getByRole('group', {
      name: /Are you currently taking psychiatric medications\?/i,
    });
    await user.click(within(medsGroup).getByRole('radio', { name: /^No$/i }));
    const hospitalizationGroup = screen.getByRole('group', {
      name: /Have you ever been hospitalized for mental health reasons\?/i,
    });
    await user.click(within(hospitalizationGroup).getByRole('radio', { name: /^No$/i }));
    await user.click(
      screen.getByRole('checkbox', {
        name: /does not guarantee an appointment or establish a patient-provider relationship/i,
      }),
    );
    await user.click(
      screen.getByRole('checkbox', {
        name: /this form is not for emergencies/i,
      }),
    );
    
    const submitButton = screen.getByRole('button', { name: /submit intake form/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });

  it('has no axe accessibility violations', async () => {
    cleanup();
    const { container } = render(<ContactPage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

