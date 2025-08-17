import React, { useState } from 'react';
import InputField from './components/InputField';
import Navigation from './components/Navigation';
import DataTablePage from './pages/DataTablePage';

function App() {
  const [currentPage, setCurrentPage] = useState<'input' | 'datatable'>('input');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    smallInput: '',
    mediumInput: '',
    largeInput: '',
  });

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Render the appropriate page based on currentPage state
  if (currentPage === 'datatable') {
    return (
      <div className={`min-h-screen transition-colors duration-200 ${isDarkMode ? 'dark' : ''}`}>
        <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
        <DataTablePage />
      </div>
    );
  }

  // InputField page (default)
  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDarkMode ? 'dark' : ''}`}>
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Theme Toggle */}
        <div className="flex justify-end mb-6">
          <button
            onClick={toggleTheme}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              isDarkMode
                ? 'bg-gray-700 text-white hover:bg-gray-600'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        {/* Main Registration Form */}
        <div className={`rounded-lg shadow-lg p-6 mb-8 transition-colors duration-200 ${
          isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        }`}>
          <h2 className="text-2xl font-bold mb-6">User Registration Form</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="First Name"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleInputChange('firstName')}
                helperText="Your legal first name"
                clearable={true}
                variant="filled"
                size="md"
              />
              
              <InputField
                label="Last Name"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleInputChange('lastName')}
                helperText="Your legal last name"
                clearable={true}
                variant="filled"
                size="md"
              />
            </div>

            <InputField
              label="Email Address"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleInputChange('email')}
              helperText="We'll never share your email"
              clearable={true}
              variant="filled"
              size="md"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Password"
                placeholder="Enter your password"
                type="password"
                value={formData.password}
                onChange={handleInputChange('password')}
                helperText="Minimum 8 characters"
                clearable={true}
                showPasswordToggle={true}
                variant="filled"
                size="md"
              />
              
              <InputField
                label="Confirm Password"
                placeholder="Confirm your password"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange('confirmPassword')}
                helperText="Must match your password"
                clearable={true}
                showPasswordToggle={true}
                variant="filled"
                size="md"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Register
              </button>
            </div>
          </form>
        </div>

        {/* Variant Showcase */}
        <div className={`rounded-lg shadow-lg p-6 mb-8 transition-colors duration-200 ${
          isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        }`}>
          <h3 className="text-xl font-semibold mb-4">Input Variants</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputField
              label="Filled Variant"
              placeholder="This is a filled input"
              helperText="Default filled style"
              clearable={true}
              variant="filled"
              size="md"
            />
            
            <InputField
              label="Outlined Variant"
              placeholder="This is an outlined input"
              helperText="Clean outlined style"
              clearable={true}
              variant="outlined"
              size="md"
            />
            
            <InputField
              label="Ghost Variant"
              placeholder="This is a ghost input"
              helperText="Subtle ghost style"
              clearable={true}
              variant="ghost"
              size="md"
            />
          </div>
        </div>

        {/* Size Showcase */}
        <div className={`rounded-lg shadow-lg p-6 mb-8 transition-colors duration-200 ${
          isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        }`}>
          <h3 className="text-xl font-semibold mb-4">Input Sizes</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputField
              label="Small Size"
              placeholder="Small input field"
              helperText="Compact size for tight spaces"
              value={formData.smallInput}
              onChange={handleInputChange('smallInput')}
              clearable={true}
              variant="filled"
              size="sm"
            />
            
            <InputField
              label="Medium Size"
              placeholder="Medium input field"
              helperText="Standard size for most forms"
              value={formData.mediumInput}
              onChange={handleInputChange('mediumInput')}
              clearable={true}
              variant="filled"
              size="md"
            />
            
            <InputField
              label="Large Size"
              placeholder="Large input field"
              helperText="Prominent size for important fields"
              value={formData.largeInput}
              onChange={handleInputChange('largeInput')}
              clearable={true}
              variant="filled"
              size="lg"
            />
          </div>
        </div>

        {/* Special Features */}
        <div className={`rounded-lg shadow-lg p-6 mb-8 transition-colors duration-200 ${
          isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        }`}>
          <h3 className="text-xl font-semibold mb-4">Special Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Loading State"
              placeholder="This input is loading"
              helperText="Shows loading spinner"
              loading={true}
              variant="filled"
              size="md"
            />
            
            <InputField
              label="Disabled State"
              placeholder="This input is disabled"
              helperText="Cannot be edited"
              disabled={true}
              variant="filled"
              size="md"
            />
            
            <InputField
              label="Invalid State"
              placeholder="This input has an error"
              helperText="Please fix this error"
              errorMessage="This field is required"
              invalid={true}
              variant="filled"
              size="md"
            />
            
            <InputField
              label="With Password Toggle"
              placeholder="Enter your password"
              type="password"
              helperText="Click the eye to show/hide"
              showPasswordToggle={true}
              variant="filled"
              size="md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
