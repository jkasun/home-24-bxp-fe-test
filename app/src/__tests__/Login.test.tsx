import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Login } from '../components/LoginPage/Login';
import { useAuth } from '../contexts/AuthContext';
import { ConfigProvider } from 'antd';
import { act } from 'react';

// Mock the useAuth hook
jest.mock('../contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

// Mock message from antd
const mockMessage = {
  success: jest.fn(),
  error: jest.fn(),
};

// Mock the antd App component
jest.mock('antd', () => ({
  ...jest.requireActual('antd'),
  App: {
    useApp: () => ({
      message: mockMessage,
    }),
  },
}));

// Wrapper component with providers
const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConfigProvider>
      {children}
    </ConfigProvider>
  );
};

describe('Login Component', () => {
  const mockLogin = jest.fn();

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    // Setup default mock implementation for useAuth
    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
    });
  });

  const renderWithProviders = (ui: React.ReactElement) => {
    return render(ui, { wrapper: Wrapper });
  };

  it('renders login form with all elements', () => {
    renderWithProviders(<Login />);

    // Check if all form elements are present
    expect(screen.getByText('Product Management System')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
    expect(screen.getByText(/Use admin@organization.com\/password123 to login/i)).toBeInTheDocument();
  });

  it('has correct initial values', () => {
    renderWithProviders(<Login />);

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');

    expect(usernameInput).toHaveValue('admin@organization.com');
    expect(passwordInput).toHaveValue('password123');
  });

  it('shows validation errors when submitting empty form', async () => {
    renderWithProviders(<Login />);

    // Clear the initial values
    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');

    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: '' } });
      fireEvent.change(passwordInput, { target: { value: '' } });
    });

    // Submit the form
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /log in/i }));
    });

    // Check for validation messages
    expect(await screen.findByText('Please input your username!')).toBeInTheDocument();
    expect(await screen.findByText('Please input your password!')).toBeInTheDocument();

    // Verify login was not called
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('calls login function with form values when submitted', async () => {
    mockLogin.mockResolvedValue(undefined);
    renderWithProviders(<Login />);

    // Submit the form with initial values
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /log in/i }));
    });

    // Wait for the login function to be called
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        username: 'admin@organization.com',
        password: 'password123',
      });
    });
  });
}); 