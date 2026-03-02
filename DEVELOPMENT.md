# Notework Development Guide

## 🛠 Development Setup

### Prerequisites
- Node.js 18+ (check with `node -v`)
- npm or yarn
- Git
- Code editor (VS Code recommended)

### Initial Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5175 in your browser
```

## 📝 Code Standards

### TypeScript
- Use strict mode (enabled in `tsconfig.json`)
- Always define types for props and state
- Use `type` for simple types, `interface` for objects
- Avoid `any` type - use `unknown` if needed

```typescript
// ✅ Good
interface ButtonProps {
  onClick: () => void
  disabled?: boolean
}

// ❌ Bad
interface ButtonProps {
  onClick: any
  disabled: any
}
```

### React Hooks
- Use custom hooks for logic reuse
- Use `useCallback` for event handlers
- Use `useEffect` for side effects
- Order hooks consistently

```typescript
// Order: useState, useEffect, useCallback, etc.
const MyComponent: React.FC<Props> = ({ prop1 }) => {
  const [state, setState] = useState('')
  
  useEffect(() => {
    // Side effects
  }, [])
  
  const handleClick = useCallback(() => {
    // Handler
  }, [])
  
  return <div />
}
```

### Components
- Functional components only (no class components)
- Export named components
- Keep components focused and small
- Use TypeScript for props

```typescript
interface Props {
  title: string
  onClick?: () => void
}

export function MyComponent({ title, onClick }: Props) {
  return <button onClick={onClick}>{title}</button>
}
```

### Styling
- Use Tailwind CSS classes
- Group related classes
- Use custom CSS only for complex animations
- Mobile-first responsive design

```typescript
// ✅ Good - organized classes
<div className="
  bg-white rounded-lg border border-gray-200
  p-4 shadow-md
  hover:shadow-lg transition-shadow
  md:p-6 lg:p-8
">
  Content
</div>

// ❌ Bad - scattered classes
<div className="bg-white rounded-lg border border-gray-200 p-4 shadow-md hover:shadow-lg transition-shadow md:p-6 lg:p-8">
  Content
</div>
```

## 🏗 Adding New Features

### Adding a New Component
1. Create file in `src/components/`
2. Define TypeScript interface for props
3. Export named component
4. Add tests (in future)

```bash
# Create component
touch src/components/MyComponent.tsx
```

```typescript
interface MyComponentProps {
  title: string
}

export function MyComponent({ title }: MyComponentProps) {
  return <div>{title}</div>
}
```

### Adding a New Page
1. Create file in `src/pages/`
2. Create component
3. Add to routing (future - currently single page)

### Adding a New Context
1. Create file in `src/contexts/`
2. Create context with proper typing
3. Create provider component
4. Create custom hook
5. Export both

```typescript
// src/contexts/MyContext.tsx
interface MyContextType {
  value: string
  setValue: (v: string) => void
}

const MyContext = createContext<MyContextType | undefined>(undefined)

export function MyProvider({ children }: { children: ReactNode }) {
  const [value, setValue] = useState('')
  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  )
}

export function useMyContext() {
  const context = useContext(MyContext)
  if (!context) {
    throw new Error('useMyContext must be used within MyProvider')
  }
  return context
}
```

### Adding a New Type
1. Create in `src/types/`
2. Define and export
3. Use in components

```typescript
// src/types/mytype.ts
export interface MyType {
  id: string
  name: string
}

export type MyEnum = 'option1' | 'option2'
```

## 🧪 Testing (Future)

### Unit Tests
```bash
npm test
```

### Integration Tests
```bash
npm run test:integration
```

### E2E Tests
```bash
npm run test:e2e
```

## 🐛 Debugging

### Browser DevTools
- Use React Developer Tools extension
- Inspect component state and props
- Use console for logging

### Logging
```typescript
// Conditional logging
const DEBUG = true
if (DEBUG) console.log('Debug info:', value)

// Better: use debug utility
import debug from 'debug'
const log = debug('notework:component')
log('Component mounted')
```

### Common Issues

#### Port Already in Use
```bash
# Kill process on port 5175
lsof -ti:5175 | xargs kill -9
npm run dev
```

#### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

#### TypeScript Errors
```bash
# Type check
npx tsc --noEmit

# Fix all fixable issues
npx eslint src --fix
```

## 📦 Adding Dependencies

### Before Adding
1. Check if already installed: `npm ls package-name`
2. Check bundle size impact
3. Consider alternatives
4. Verify compatibility

### Adding Package
```bash
npm install package-name
npm install --save-dev @types/package-name
```

### Removing Package
```bash
npm uninstall package-name
```

## 🔄 Git Workflow

### Creating a Feature
```bash
git checkout -b feature/my-feature
# Make changes
git add .
git commit -m "feat: add my feature"
git push origin feature/my-feature
```

### Commit Messages
Follow conventional commits:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Code style
- `refactor:` - Refactoring
- `perf:` - Performance
- `test:` - Tests
- `chore:` - Build, deps

```bash
git commit -m "feat: add kanban board drag and drop"
git commit -m "fix: prevent status update race conditions"
git commit -m "docs: add installation guide"
```

## 🚀 Performance Tips

### React Performance
1. Use `React.memo` for expensive components
2. Use `useCallback` for handler props
3. Use `useMemo` for expensive computations
4. Split large components into smaller ones
5. Lazy load routes (future)

```typescript
const ExpensiveComponent = React.memo(({ data }: Props) => {
  return <div>{data.map(...)}</div>
})
```

### Bundle Size
1. Check with `npm run build`
2. Use dynamic imports
3. Remove unused dependencies
4. Keep dependencies updated

```bash
npm run build  # Shows bundle size
```

### Runtime Performance
1. Use React DevTools Profiler
2. Check component render times
3. Optimize re-renders
4. Use production build for testing

## 🔒 Security Best Practices

### Input Validation
```typescript
// Validate all user input
const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

if (!validateEmail(userInput)) {
  // Show error
}
```

### API Security
```typescript
// Never commit secrets
// NEVER: const API_KEY = 'secret-key'
// Use environment variables
const apiKey = import.meta.env.VITE_API_KEY
```

### XSS Prevention
```typescript
// React prevents XSS automatically
// ✅ Good - React escapes
<div>{userInput}</div>

// ❌ Bad - Direct HTML (avoid)
<div dangerouslySetInnerHTML={{ __html: userInput }} />
```

## 📊 Monitoring

### Error Tracking
Currently not set up - add Sentry or similar:
```typescript
import * as Sentry from "@sentry/react"

Sentry.init({
  dsn: "your-dsn",
  environment: "production",
})
```

### Performance Monitoring
Use Web Vitals:
```bash
npm install web-vitals
```

## 🎯 Code Review Checklist

Before committing:
- [ ] TypeScript compiles without errors
- [ ] ESLint passes (`npm run lint`)
- [ ] Component has proper typing
- [ ] No console errors or warnings
- [ ] Responsive design works
- [ ] Accessibility (keyboard nav, aria labels)
- [ ] Browser compatibility checked
- [ ] Component is tested

```bash
npm run lint
npm run build
```

## 📚 Resources

### React
- [React Docs](https://react.dev)
- [React Patterns](https://patterns.dev/react)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [React + TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app)

### Tailwind CSS
- [Tailwind Docs](https://tailwindcss.com)
- [Tailwind UI](https://tailwindui.com)

### Performance
- [Web Vitals](https://web.dev/vitals)
- [React Performance](https://react.dev/learn/render-and-commit)

## 🤝 Contributing

1. Fork the repo
2. Create feature branch
3. Make changes following code standards
4. Commit with proper messages
5. Push and create pull request
6. Request review

---

Happy coding! 🎉
