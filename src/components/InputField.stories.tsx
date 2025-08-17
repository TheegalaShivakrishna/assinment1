import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import InputField from './InputField';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible input component with validation states, multiple variants, sizes, and optional features like clear button and password toggle.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined', 'ghost'],
      description: 'Visual style variant of the input',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the input field',
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email', 'number'],
      description: 'HTML input type',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the input is disabled',
    },
    invalid: {
      control: { type: 'boolean' },
      description: 'Whether the input shows error state',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Whether the input shows loading state',
    },
    clearable: {
      control: { type: 'boolean' },
      description: 'Whether to show a clear button',
    },
    showPasswordToggle: {
      control: { type: 'boolean' },
      description: 'Whether to show password toggle (for password type)',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Whether the field is required',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Input Field
export const Default: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    helperText: 'We\'ll never share your email with anyone else.',
  },
};

// With Value
export const WithValue: Story = {
  args: {
    label: 'Username',
    value: 'john_doe',
    placeholder: 'Enter username',
  },
};

// Required Field
export const Required: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your full name',
    required: true,
    helperText: 'This field is required',
  },
};

// Error State
export const Error: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    value: 'invalid-email',
    invalid: true,
    errorMessage: 'Please enter a valid email address',
  },
};

// Disabled State
export const Disabled: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    value: 'user@example.com',
    disabled: true,
    helperText: 'This field is currently disabled',
  },
};

// Loading State
export const Loading: Story = {
  args: {
    label: 'Search',
    placeholder: 'Searching...',
    loading: true,
    helperText: 'Please wait while we search...',
  },
};

// Variants
export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <InputField
        label="Filled Variant"
        placeholder="Filled input"
        variant="filled"
      />
      <InputField
        label="Outlined Variant"
        placeholder="Outlined input"
        variant="outlined"
      />
      <InputField
        label="Ghost Variant"
        placeholder="Ghost input"
        variant="ghost"
      />
    </div>
  ),
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <InputField
        label="Small Size"
        placeholder="Small input"
        size="sm"
      />
      <InputField
        label="Medium Size"
        placeholder="Medium input"
        size="md"
      />
      <InputField
        label="Large Size"
        placeholder="Large input"
        size="lg"
      />
    </div>
  ),
};

// Password Input with Toggle
export const Password: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    showPasswordToggle: true,
    helperText: 'Your password must be at least 8 characters long',
  },
};

// Clearable Input
export const Clearable: Story = {
  args: {
    label: 'Search Query',
    placeholder: 'Type to search...',
    value: 'react components',
    clearable: true,
    helperText: 'You can clear this input using the X button',
  },
};

// Interactive Example
export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [isInvalid, setIsInvalid] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
      
      // Simple validation
      if (newValue.length > 0 && newValue.length < 3) {
        setIsInvalid(true);
        setErrorMessage('Input must be at least 3 characters long');
      } else {
        setIsInvalid(false);
        setErrorMessage('');
      }
    };

    return (
      <div className="w-80 space-y-4">
        <InputField
          label="Interactive Input"
          placeholder="Type something..."
          value={value}
          onChange={handleChange}
          invalid={isInvalid}
          errorMessage={errorMessage}
          helperText="Try typing less than 3 characters to see validation"
          clearable={true}
        />
        <div className="text-sm text-gray-600">
          <p>Current value: {value || '(empty)'}</p>
          <p>Character count: {value.length}</p>
        </div>
      </div>
    );
  },
};

// Dark Theme Support
export const DarkTheme: Story = {
  render: () => (
    <div className="dark bg-gray-900 p-6 rounded-lg w-80">
      <InputField
        label="Dark Theme Input"
        placeholder="Works in dark mode"
        variant="filled"
        helperText="This input adapts to dark theme"
      />
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// All Features Combined
export const AllFeatures: Story = {
  args: {
    label: 'Complete Input Field',
    placeholder: 'This input has all features enabled',
    value: 'sample text',
    type: 'password',
    variant: 'filled',
    size: 'lg',
    clearable: true,
    showPasswordToggle: true,
    required: true,
    helperText: 'This is a comprehensive example with all features',
  },
};

// Form Example
export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      confirmPassword: '',
    });

    const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({
        ...prev,
        [field]: e.target.value
      }));
    };

    return (
      <div className="w-96 space-y-4 p-6 border border-gray-200 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Registration Form</h3>
        
        <InputField
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange('email')}
          required={true}
          variant="outlined"
          helperText="We'll use this for account verification"
        />
        
        <InputField
          label="Password"
          type="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={handleInputChange('password')}
          required={true}
          variant="outlined"
          showPasswordToggle={true}
          helperText="Must be at least 8 characters"
        />
        
        <InputField
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleInputChange('confirmPassword')}
          required={true}
          variant="outlined"
          showPasswordToggle={true}
          invalid={formData.confirmPassword !== '' && formData.password !== formData.confirmPassword}
          errorMessage={formData.confirmPassword !== '' && formData.password !== formData.confirmPassword ? 'Passwords do not match' : ''}
        />
        
        <button className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors">
          Create Account
        </button>
      </div>
    );
  },
};
