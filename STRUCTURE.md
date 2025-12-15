# VeridFace Dashboard - Project Structure

## 📁 Struktur Folder

```
src/
├── api/                          # API services & HTTP calls
│   └── index.js                 # API barrel exports
├── assets/                       # Static assets
│   └── images/                  # Image files
├── components/                   # React components
│   ├── common/                  # Reusable components
│   │   ├── ProtectedRoute/
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── index.js
│   │   └── index.js            # Common components barrel
│   ├── features/                # Feature-specific components
│   │   ├── Charts/
│   │   │   ├── Charts.jsx
│   │   │   └── index.js
│   │   ├── DashboardCards/
│   │   │   ├── DashboardCards.jsx
│   │   │   └── index.js
│   │   ├── RealTimeAccessMonitoring/
│   │   │   ├── RealTimeAccessMonitoring.jsx
│   │   │   └── index.js
│   │   └── index.js            # Features barrel
│   ├── layout/                  # Layout components
│   │   ├── Header/
│   │   │   ├── Header.jsx
│   │   │   └── index.js
│   │   ├── Sidebar/
│   │   │   ├── Sidebar.jsx
│   │   │   └── index.js
│   │   └── index.js            # Layout barrel
│   └── index.js                 # Main components barrel
├── constants/                    # Constants & configuration
│   └── index.js
├── context/                      # React Context providers
│   ├── AuthContext.jsx
│   └── index.js                 # Context barrel
├── hooks/                        # Custom React hooks
│   └── index.js
├── pages/                        # Page components
│   ├── AttendancePage.jsx
│   ├── AttendanceSysPage.jsx
│   ├── DashboardPage.jsx
│   ├── DevicePage.jsx
│   ├── LoginPage.jsx
│   ├── LogPage.jsx
│   ├── PermissionPage.jsx
│   ├── SettingsPage.jsx
│   ├── UserPage.jsx
│   ├── VisitorPage.jsx
│   └── index.js                 # Pages barrel
├── routes/                       # Routing configuration
├── styles/                       # Global styles
│   └── index.css
├── utils/                        # Helper functions
│   └── index.js
├── App.jsx                       # Main App component
└── main.jsx                      # Entry point
```

## 🎯 Path Aliases

Project ini menggunakan path aliases untuk import yang lebih clean:

```javascript
@/            → src/
@components   → src/components
@pages        → src/pages
@hooks        → src/hooks
@utils        → src/utils
@constants    → src/constants
@context      → src/context
@api          → src/api
@routes       → src/routes
@styles       → src/styles
@assets       → src/assets
```

## 📦 Import Examples

### Before (Old Structure):
```javascript
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import DashboardCards from '../components/DashboardCards';
```

### After (New Structure):
```javascript
import { Sidebar, Header, DashboardCards } from '@components';
```

### Multiple Imports:
```javascript
// Layout components
import { Sidebar, Header } from '@components';

// Pages
import { DashboardPage, UserPage } from '@pages';

// Context
import { AuthProvider, useAuth } from '@context';
```

## 🏗️ Component Structure

Setiap component mengikuti struktur folder yang konsisten:

```
ComponentName/
├── ComponentName.jsx     # Component logic
├── ComponentName.module.css (optional) # Component styles
└── index.js              # Barrel export
```

Example `index.js`:
```javascript
export { default } from './ComponentName';
```

## 📝 Barrel Exports

Barrel exports (`index.js`) digunakan di setiap folder untuk memudahkan imports:

### components/index.js:
```javascript
// Layout components
export * from './layout';

// Common components
export * from './common';

// Feature components
export * from './features';
```

### pages/index.js:
```javascript
export { default as DashboardPage } from './DashboardPage';
export { default as UserPage } from './UserPage';
// ... more exports
```

## 🚀 Best Practices

1. **Component Organization**:
   - `common/`: Reusable UI components (Button, Input, Modal, dll)
   - `layout/`: Layout components (Header, Sidebar, Footer)
   - `features/`: Feature-specific components (Charts, DashboardCards)

2. **Import Strategy**:
   - Gunakan barrel exports untuk multiple imports
   - Gunakan path aliases untuk clean imports
   - Group imports berdasarkan kategori (external → internal → local)

3. **File Naming**:
   - Components: PascalCase (DashboardCards.jsx)
   - Utils/Hooks: camelCase (useAuth.js, formatDate.js)
   - Constants: UPPER_SNAKE_CASE (API_CONFIG.js)

4. **Code Organization**:
   - Keep components small and focused
   - Extract reusable logic to custom hooks
   - Use constants for configuration values
   - Separate business logic from UI components

## 🔧 Configuration Files

- `vite.config.js`: Path aliases configuration
- `tailwind.config.js`: Tailwind CSS configuration
- `postcss.config.js`: PostCSS configuration

## 📚 Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## ✨ Features

- ✅ Clean folder structure following React best practices
- ✅ Path aliases for better imports
- ✅ Barrel exports for organized code
- ✅ Consistent component structure
- ✅ Separation of concerns (layout, common, features)
- ✅ TypeScript-ready structure (optional migration)
- ✅ Scalable architecture for growing projects

---

**Last Updated**: December 15, 2025
**Version**: 2.0.0
