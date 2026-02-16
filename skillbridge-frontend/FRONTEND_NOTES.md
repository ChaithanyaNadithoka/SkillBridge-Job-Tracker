# Frontend Implementation Notes

## Architecture Overview

The frontend follows a component-based architecture:

```
App Component
├── Auth Pages (Register, Login)
├── Protected Routes
│   ├── Dashboard
│   ├── Applications List
│   └── Application Form
└── Layout Component
    ├── Navigation Bar
    └── Page Content
```

## Key Components

### Layout
- **Layout.tsx**: Main layout wrapper with navigation bar
- **ProtectedRoute.tsx**: Route protection based on JWT token

### Pages
- **RegisterPage.tsx**: User registration form
- **LoginPage.tsx**: User login form
- **DashboardPage.tsx**: Dashboard with statistics
- **ApplicationsListPage.tsx**: List of job applications
- **ApplicationFormPage.tsx**: Create/edit application form

### Services
- **authService.ts**: Authentication API calls and token management
- **applicationService.ts**: Job application CRUD operations
- **dashboardService.ts**: Dashboard statistics API calls

### Configuration
- **constants.ts**: API base URL
- **axiosConfig.ts**: Axios instance with JWT interceptor

### Types
- **index.ts**: TypeScript interfaces for API types

## State Management

The application uses React hooks for state management:
- `useState`: Local component state
- `useEffect`: Data fetching and side effects
- Context API for global state (token, user)

## API Communication

### Axios Configuration
- Automatic JWT token injection in Authorization header
- Global error handling (401 redirects to login)
- Request/response interceptors

### Error Handling
- Try-catch blocks in all API calls
- User-friendly error messages via Snackbar
- Automatic logout on 401 (unauthorized)

## Form Validation

### Frontend Validation
- Email format validation
- Password strength validation
- Required field validation
- Date validation

### Backend Validation
- All inputs validated on server
- Consistent error messages
- HTTP 400 for validation errors

## Authentication Flow

1. User registers with valid email and password
2. User logs in with credentials
3. JWT token received and stored in localStorage
4. Token automatically added to all API requests
5. Token removed on logout or 401 response

## Component Structure

### RegisterPage
```
RegisterPage
├── Email TextField
├── Password TextField
├── Confirm Password TextField
├── Submit Button
└── Link to Login
```

### LoginPage
```
LoginPage
├── Email TextField
├── Password TextField
├── Submit Button
└── Link to Register
```

### DashboardPage
```
DashboardPage
├── Total Applications Card
├── Applied Count Card
├── Interviewing Count Card
├── Offered Count Card
└── Rejected Count Card
```

### ApplicationsListPage
```
ApplicationsListPage
├── Add Application Button
├── Applications Table
│   ├── Company Column
│   ├── Role Column
│   ├── Status Column
│   ├── Applied Date Column
│   └── Actions Column
└── Pagination
```

### ApplicationFormPage
```
ApplicationFormPage
├── Company Name TextField
├── Job Role TextField
├── Status Select
├── Applied Date DatePicker
└── Submit Button
```

## Routing Structure

```
/ (Root)
├── /register - Registration page
├── /login - Login page
├── /dashboard - Dashboard (protected)
├── /applications - Applications list (protected)
├── /applications/new - New application form (protected)
└── /applications/:id/edit - Edit application form (protected)
```

## Material UI Usage

### Theme Configuration
- Custom color palette
- Typography settings
- Component styling

### Components Used
- AppBar: Top navigation
- Toolbar: Navigation bar content
- Button: Action buttons
- TextField: Form inputs
- Paper: Card containers
- Grid: Layout system
- Table: Data display
- Dialog: Modal forms
- Snackbar: Toast notifications
- Alert: Error/success messages

## Development Guidelines

1. Keep components focused and reusable
2. Use TypeScript strictly (no `any` types)
3. Separate concerns (services, components, utilities)
4. Always show loading states
5. Provide meaningful error messages
6. Validate all user inputs
7. Handle edge cases gracefully
8. Use proper naming conventions

## Best Practices

### Component Development
- Functional components with hooks
- Prop drilling minimized
- Memoization for performance
- Proper cleanup in useEffect

### State Management
- Keep state as local as possible
- Use custom hooks for reusable logic
- Minimize re-renders with useMemo/useCallback

### Error Handling
- Display user-friendly error messages
- Log errors to console for debugging
- Never expose sensitive information

### Performance
- Code splitting with React.lazy()
- Image optimization
- Minimize API calls
- Use pagination for large lists

## Testing Recommendations

### Unit Tests
- Component rendering tests
- Hook behavior tests
- Service function tests

### Integration Tests
- User flow tests
- API integration tests
- Form submission tests

### E2E Tests
- Full user journey tests
- Cross-browser compatibility
- Performance testing

## Environment Configuration

### Development
```
API_BASE_URL=http://localhost:8080/api
```

### Production
```
API_BASE_URL=https://api.skillbridge.com
```

## Browser Support

- Chrome (latest)
- Edge (latest)
- Firefox (latest)
- Safari (latest)

## Accessibility

- Proper ARIA labels
- Keyboard navigation support
- Color contrast compliance
- Screen reader support
