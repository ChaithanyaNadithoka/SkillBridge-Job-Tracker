import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';
import ProtectedRoute from './components/ProtectedRoute';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ApplicationsListPage from './pages/ApplicationsListPage';
import ApplicationFormPage from './pages/ApplicationFormPage';
import { authService } from './services/authService';

const App: React.FC = () => {
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [snackbarSeverity, setSnackbarSeverity] = React.useState<'success' | 'error'>('success');

    const isLoggedIn = !!authService.getToken();

    const showSnackbar = (message: string, severity: 'success' | 'error' = 'success') => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/register" element={<RegisterPage onSuccess={() => showSnackbar('Registration successful')} />} />
                    <Route path="/login" element={<LoginPage onSuccess={() => showSnackbar('Login successful')} />} />
                    
                    <Route element={<ProtectedRoute />}>
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/applications" element={<ApplicationsListPage />} />
                        <Route path="/applications/new" element={<ApplicationFormPage />} />
                        <Route path="/applications/:id/edit" element={<ApplicationFormPage />} />
                    </Route>

                    <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
                </Routes>

                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </div>
        </Router>
    );
};

export default App;
