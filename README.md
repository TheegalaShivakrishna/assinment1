# React Component Library

A comprehensive React component library built with TypeScript, Tailwind CSS, and Storybook.

## 🚀 Features

### InputField Component
- **Text input** with label, placeholder, helper text, error message
- **States**: disabled, invalid, loading
- **Variants**: filled, outlined, ghost
- **Sizes**: small, medium, large
- **Optional features**: clear button, password toggle
- **Theme support**: light & dark mode
- **Accessibility**: ARIA labels, keyboard navigation

### DataTable Component
- **Display tabular data** with customizable columns
- **Column sorting** with visual indicators
- **Row selection**: single or multiple selection
- **Loading state** with skeleton animation
- **Empty state** with custom messaging
- **Responsive design** with horizontal scrolling
- **Custom cell rendering** for complex data

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Storybook** - Component development and documentation
- **Heroicons** - Beautiful SVG icons
- **PostCSS** - CSS processing

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd input-component

# Install dependencies
npm install

# Start development server
npm start

# Start Storybook
npm run storybook

# Build for production
npm run build
```

## 🎯 Usage

### Navigation

The application now has two main pages:

1. **InputField Component Page** (`/`) - Showcases all InputField features
2. **DataTable Component Page** (`/datatable`) - Demonstrates DataTable functionality

Use the navigation bar at the top to switch between pages.

### InputField Component

```tsx
import { InputField } from './components';

<InputField
  label="Email Address"
  placeholder="Enter your email"
  helperText="We'll never share your email"
  clearable={true}
  variant="filled"
  size="md"
  onChange={handleChange}
/>
```

### DataTable Component

```tsx
import { DataTable } from './components';

const columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { 
    key: 'status', 
    header: 'Status', 
    render: (value) => <StatusBadge status={value} />
  }
];

<DataTable
  data={users}
  columns={columns}
  selectable="multiple"
  onRowSelect={handleSelection}
/>
```

## 🎨 Component Features

### InputField Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `''` | Input value |
| `onChange` | `function` | - | Change handler |
| `label` | `string` | - | Input label |
| `placeholder` | `string` | - | Placeholder text |
| `helperText` | `string` | - | Helper text below input |
| `errorMessage` | `string` | - | Error message |
| `disabled` | `boolean` | `false` | Disabled state |
| `invalid` | `boolean` | `false` | Invalid state |
| `loading` | `boolean` | `false` | Loading state |
| `variant` | `'filled' \| 'outlined' \| 'ghost'` | `'filled'` | Visual variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Input size |
| `clearable` | `boolean` | `false` | Show clear button |
| `showPasswordToggle` | `boolean` | `false` | Show password toggle |

### DataTable Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `T[]` | `[]` | Array of data objects |
| `columns` | `Column<T>[]` | `[]` | Column definitions |
| `loading` | `boolean` | `false` | Show loading state |
| `selectable` | `'single' \| 'multiple' \| false` | `false` | Row selection type |
| `onRowSelect` | `function` | - | Selection change handler |
| `emptyMessage` | `string` | `'No data available'` | Empty state message |
| `className` | `string` | `''` | Additional CSS classes |
| `id` | `string` | - | Component ID |

## 🌙 Theme Support

Both components support light and dark themes:

- **Light theme**: Clean, modern appearance with subtle shadows
- **Dark theme**: Dark backgrounds with high contrast text
- **Automatic switching**: Use the theme toggle button in the header
- **CSS variables**: Smooth transitions between themes

## 📱 Responsive Design

- **Mobile-first** approach
- **Breakpoint responsive** layouts
- **Touch-friendly** interactions
- **Accessible** on all device sizes

## 🧪 Storybook

View and interact with components in isolation:

```bash
npm run storybook
```

Stories are available for:
- All InputField variants, sizes, and states
- DataTable with different data types and configurations
- Interactive examples with real data

## 🔧 Customization

### Tailwind CSS

Customize the design system by modifying `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: { /* your colors */ },
        error: { /* your colors */ },
        success: { /* your colors */ }
      }
    }
  }
}
```

### Component Styling

Override default styles using Tailwind classes:

```tsx
<InputField
  className="border-2 border-purple-300"
  // ... other props
/>
```

## 🌐 Browser Support

- **Modern browsers**: Chrome, Firefox, Safari, Edge
- **ES6+ features** with Babel transpilation
- **CSS Grid and Flexbox** for layouts
- **Progressive enhancement** approach

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For questions or issues:
- Check the Storybook documentation
- Review component props and examples
- Open an issue on GitHub

---

Built with ❤️ using React, TypeScript, and Tailwind CSS
