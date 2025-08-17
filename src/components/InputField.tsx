import React, { useState, forwardRef } from 'react';
import { EyeIcon, EyeSlashIcon, XMarkIcon } from '@heroicons/react/24/outline';

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: 'text' | 'password' | 'email' | 'number';
  clearable?: boolean;
  showPasswordToggle?: boolean;
  className?: string;
  id?: string;
  name?: string;
  required?: boolean;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(({
  value = '',
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  loading = false,
  variant = 'outlined',
  size = 'md',
  type = 'text',
  clearable = false,
  showPasswordToggle = false,
  className = '',
  id,
  name,
  required = false,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    console.log('Clear button clicked, current value:', value);
    if (onChange) {
      const event = {
        target: { value: '' }
      } as React.ChangeEvent<HTMLInputElement>;
      console.log('Calling onChange with empty value');
      onChange(event);
    } else {
      console.log('No onChange handler provided');
    }
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-4 py-3 text-lg'
  };

  // Variant classes
  const variantClasses = {
    filled: 'bg-gray-50 border-gray-300 focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20',
    outlined: 'bg-transparent border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20',
    ghost: 'bg-transparent border-transparent hover:bg-gray-50 focus:bg-white focus:border-gray-300 focus:ring-2 focus:ring-gray-500/20'
  };

  // State classes
  const stateClasses = {
    default: 'border-gray-300 text-gray-900 placeholder-gray-500',
    focused: 'border-primary-500 text-gray-900',
    invalid: 'border-error-500 text-error-900 placeholder-error-500 focus:border-error-500 focus:ring-error-500/20',
    disabled: 'bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed'
  };

  // Get current state classes
  const getStateClasses = () => {
    if (disabled) return stateClasses.disabled;
    if (invalid) return stateClasses.invalid;
    if (isFocused) return stateClasses.focused;
    return stateClasses.default;
  };

  // Label size classes
  const labelSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  // Helper text size classes
  const helperSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-sm'
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Label */}
      {label && (
        <label 
          htmlFor={id} 
          className={`block font-medium text-gray-700 mb-2 ${labelSizeClasses[size]} ${
            disabled ? 'text-gray-500' : ''
          }`}
        >
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        <input
          ref={ref}
          id={id}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          required={required}
          className={`
            w-full rounded-lg border-2 transition-all duration-200 ease-in-out
            ${sizeClasses[size]}
            ${variantClasses[variant]}
            ${getStateClasses()}
            ${loading ? 'animate-pulse' : ''}
            focus:outline-none
            disabled:cursor-not-allowed
          `}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {/* Loading Spinner */}
        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-500 border-t-transparent"></div>
          </div>
        )}

        {/* Password Toggle */}
        {showPasswordToggle && type === 'password' && !loading && (
          <button
            type="button"
            onClick={handlePasswordToggle}
            disabled={disabled}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {showPassword ? (
              <EyeSlashIcon className="h-4 w-4" />
            ) : (
              <EyeIcon className="h-4 w-4" />
            )}
          </button>
        )}

        {/* Clear Button */}
        {clearable && value && !loading && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className={`absolute top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors z-10 ${
              showPasswordToggle ? 'right-12' : 'right-3'
            }`}
            title="Clear input"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        )}

        {/* Right side spacing for buttons */}
        {(clearable || showPasswordToggle) && (
          <div className={`absolute top-1/2 transform -translate-y-1/2 w-6 h-6 ${
            showPasswordToggle && clearable ? 'right-16' : 'right-3'
          }`}></div>
        )}
      </div>

      {/* Helper Text or Error Message */}
      {(helperText || errorMessage) && (
        <div className={`mt-2 ${helperSizeClasses[size]} ${
          errorMessage ? 'text-error-600' : 'text-gray-500'
        }`}>
          {errorMessage || helperText}
        </div>
      )}
    </div>
  );
});

InputField.displayName = 'InputField';

export default InputField;
