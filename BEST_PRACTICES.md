# React Project Best Practices - VeridFace

## 🎯 Code Organization

### Component Structure
Every component follows this pattern:
```
ComponentName/
├── ComponentName.jsx    # Component logic
├── index.js            # Barrel export
└── ComponentName.test.jsx (optional)
```

### Import Order
Always organize imports in this order:
```javascript
// 1. External libraries
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 2. Internal modules (using aliases)
import { Sidebar, Header } from '@components';
import { useModal, useFilters } from '@hooks';

// 3. Local imports
import { AddDeviceModal } from './modals';

// 4. Assets & styles
import logo from '@assets/logo.png';
```

## 🪝 Custom Hooks Guidelines

### When to Create a Hook
Create a custom hook when you have:
- Reusable stateful logic
- Complex state management
- Side effects that need to be shared
- Multiple related state variables

### Hook Naming
- Always start with `use` prefix
- Use descriptive names: `useModal`, `useFilters`, `useSelection`
- One responsibility per hook

### Example:
```javascript
// ✅ Good
export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  return { isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) };
};

// ❌ Bad (too many responsibilities)
export const useModalAndFormAndValidation = () => { ... };
```

## 📦 Component Guidelines

### Small Components
Keep components under 200 lines. If larger:
1. Extract sub-components
2. Move logic to custom hooks
3. Split into multiple files

### Prop Drilling
If passing props > 3 levels deep:
- Use Context API
- Consider state management library
- Extract to custom hook

### Example:
```javascript
// ✅ Good - Small, focused component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return <div onClick={onClose}>{children}</div>;
};

// ❌ Bad - Too many responsibilities
const MegaComponent = ({ ... 50 props ... }) => {
  // 500 lines of code
};
```

## 🎨 Styling Guidelines

### Tailwind CSS
- Use consistent spacing scale (4, 8, 16, 24, 32)
- Create reusable className combinations
- Consider extracting to constants for complex classes

```javascript
// ✅ Good
const buttonClasses = "px-8 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors";

// ✅ Better - Extract to constants
const BUTTON_CLASSES = {
  primary: "px-8 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors",
  secondary: "px-8 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors",
};
```

## 🔄 State Management

### Local State (useState)
Use for:
- Component-specific state
- Simple toggles
- Form inputs

### Custom Hooks
Use for:
- Reusable stateful logic
- Complex state management
- Multiple related states

### Context
Use for:
- Global app state (auth, theme)
- Shared state across many components
- Avoiding prop drilling

### When to Use What:
```javascript
// ✅ Local state for simple toggles
const [isOpen, setIsOpen] = useState(false);

// ✅ Custom hook for complex logic
const { filters, handleChange, reset } = useFilters({...});

// ✅ Context for global state
const { user, isAuthenticated } = useAuth();
```

## 📝 Naming Conventions

### Files
- Components: `PascalCase.jsx` (DashboardCards.jsx)
- Hooks: `camelCase.js` (useModal.js)
- Utils: `camelCase.js` (formatDate.js)
- Constants: `UPPER_SNAKE_CASE.js` (API_CONFIG.js)

### Variables
- State: `camelCase` (isOpen, userData)
- Constants: `UPPER_SNAKE_CASE` (API_BASE_URL)
- Functions: `camelCase` (handleClick, fetchData)
- Components: `PascalCase` (Modal, Button)

### Event Handlers
Always prefix with `handle`:
```javascript
const handleClick = () => { ... };
const handleSubmit = () => { ... };
const handleChange = () => { ... };
```

## 🧪 Testing Best Practices

### What to Test
1. User interactions (clicks, typing)
2. Data display (rendering)
3. State changes
4. API calls (mocked)

### What NOT to Test
1. Implementation details
2. Third-party libraries
3. Styling (use visual regression instead)

### Example:
```javascript
// ✅ Test user behavior
test('opens modal when button is clicked', () => {
  render(<MyComponent />);
  fireEvent.click(screen.getByText('Open'));
  expect(screen.getByRole('dialog')).toBeInTheDocument();
});

// ❌ Don't test implementation
test('calls setIsOpen with true', () => { ... });
```

## 🚀 Performance Tips

### Memoization
Use when:
- Expensive calculations
- Props rarely change
- Preventing re-renders

```javascript
// ✅ Good use of useMemo
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);

// ❌ Unnecessary memoization
const simpleValue = useMemo(() => a + b, [a, b]);
```

### useCallback
Use for:
- Callbacks passed to optimized child components
- Dependencies in other hooks

```javascript
// ✅ Good use
const handleClick = useCallback(() => {
  doSomething(data);
}, [data]);

return <MemoizedChild onClick={handleClick} />;
```

## 📚 Code Review Checklist

Before submitting PR, check:
- [ ] No console.log() statements
- [ ] All imports use path aliases
- [ ] Components < 200 lines
- [ ] Proper error handling
- [ ] Loading states implemented
- [ ] PropTypes or TypeScript types defined
- [ ] No duplicate code
- [ ] Meaningful variable names
- [ ] Comments for complex logic only
- [ ] No commented-out code

## 🔒 Security Best Practices

1. **Never store secrets in code**
   ```javascript
   // ❌ Bad
   const API_KEY = "sk-abc123";
   
   // ✅ Good
   const API_KEY = import.meta.env.VITE_API_KEY;
   ```

2. **Sanitize user input**
   ```javascript
   // ✅ Always validate
   const sanitized = DOMPurify.sanitize(userInput);
   ```

3. **Use HTTPS for API calls**
4. **Implement proper authentication**
5. **Don't expose sensitive data in client-side code**

## 🎯 Common Pitfalls to Avoid

### 1. Prop Drilling
```javascript
// ❌ Bad - Passing through many levels
<Parent>
  <Child user={user}>
    <GrandChild user={user}>
      <GreatGrandChild user={user} />
    </GrandChild>
  </Child>
</Parent>

// ✅ Good - Use Context
const UserContext = createContext();
<UserProvider value={user}>
  <Parent />
</UserProvider>
```

### 2. Large Components
```javascript
// ❌ Bad - 500+ lines in one component
const MegaPage = () => {
  // Tons of logic, modals, forms, etc.
};

// ✅ Good - Split into smaller components
const Page = () => {
  return (
    <>
      <Header />
      <Content />
      <Modals />
    </>
  );
};
```

### 3. Inline Functions in JSX
```javascript
// ❌ Bad - Creates new function every render
<button onClick={() => handleClick(id)}>Click</button>

// ✅ Good - Use callback
const handleButtonClick = useCallback(() => {
  handleClick(id);
}, [id]);

<button onClick={handleButtonClick}>Click</button>
```

### 4. Not Handling Loading/Error States
```javascript
// ❌ Bad
const { data } = useQuery('users');
return <div>{data.map(...)}</div>;

// ✅ Good
const { data, isLoading, error } = useQuery('users');
if (isLoading) return <Spinner />;
if (error) return <Error message={error.message} />;
return <div>{data.map(...)}</div>;
```

## 📖 Resources

### Official Documentation
- [React Docs](https://react.dev/)
- [Vite Guide](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

### Recommended Reading
- [React Patterns](https://reactpatterns.com/)
- [JavaScript Clean Code](https://github.com/ryanmcdermott/clean-code-javascript)
- [React Best Practices](https://react.dev/learn/thinking-in-react)

### Tools
- ESLint for code quality
- Prettier for formatting
- Husky for git hooks
- React DevTools for debugging

---

**Remember:** Code is read more often than it's written. Always optimize for readability and maintainability! 🚀
