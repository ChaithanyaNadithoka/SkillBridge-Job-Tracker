import React from 'react';
import {
    Container,
    Box,
    Typography,
    Button,
    Grid,
    Card,
    CardContent,
    AppBar,
    Toolbar,
    Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LockIcon from '@mui/icons-material/Lock';
import SpeedIcon from '@mui/icons-material/Speed';

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <>
            {/* Navigation Bar */}
            <AppBar position="static" sx={{ mb: 4 }}>
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, fontWeight: 'bold' }}
                    >
                        🎯 SkillBridge
                    </Typography>
                    <Stack direction="row" spacing={2}>
                        <Button
                            color="inherit"
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </Button>
                        <Button
                            color="inherit"
                            variant="outlined"
                            onClick={() => navigate('/register')}
                        >
                            Register
                        </Button>
                    </Stack>
                </Toolbar>
            </AppBar>

            {/* Hero Section */}
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '60vh',
                        textAlign: 'center',
                        mb: 8,
                    }}
                >
                    <Typography
                        variant="h2"
                        component="h1"
                        sx={{
                            fontWeight: 'bold',
                            mb: 2,
                            background: 'linear-gradient(45deg, #1976d2 30%, #21cbf3 90%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Track Your Job Applications
                    </Typography>
                    <Typography
                        variant="h5"
                        color="textSecondary"
                        sx={{ mb: 4, maxWidth: 600 }}
                    >
                        Manage your job search journey with ease. Track applications,
                        schedule interviews, and land your dream job with SkillBridge.
                    </Typography>
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate('/register')}
                            sx={{
                                px: 4,
                                py: 1.5,
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                            }}
                        >
                            Get Started
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            onClick={() => navigate('/login')}
                            sx={{
                                px: 4,
                                py: 1.5,
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                            }}
                        >
                            Sign In
                        </Button>
                    </Stack>
                </Box>

                {/* Features Section */}
                <Box sx={{ mb: 8 }}>
                    <Typography
                        variant="h3"
                        component="h2"
                        sx={{
                            fontWeight: 'bold',
                            textAlign: 'center',
                            mb: 6,
                        }}
                    >
                        Why Choose SkillBridge?
                    </Typography>

                    <Grid container spacing={3}>
                        {/* Feature 1 */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: 6,
                                    },
                                }}
                            >
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <AssignmentIcon
                                        sx={{
                                            fontSize: 48,
                                            color: 'primary.main',
                                            mb: 2,
                                        }}
                                    />
                                    <Typography
                                        variant="h6"
                                        component="h3"
                                        sx={{ fontWeight: 'bold', mb: 1 }}
                                    >
                                        Easy Tracking
                                    </Typography>
                                    <Typography color="textSecondary">
                                        Keep all your job applications in one place with
                                        detailed tracking and status updates.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Feature 2 */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: 6,
                                    },
                                }}
                            >
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <TrendingUpIcon
                                        sx={{
                                            fontSize: 48,
                                            color: 'success.main',
                                            mb: 2,
                                        }}
                                    />
                                    <Typography
                                        variant="h6"
                                        component="h3"
                                        sx={{ fontWeight: 'bold', mb: 1 }}
                                    >
                                        Real-time Insights
                                    </Typography>
                                    <Typography color="textSecondary">
                                        Get instant statistics and analytics about your job
                                        search progress.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Feature 3 */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: 6,
                                    },
                                }}
                            >
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <LockIcon
                                        sx={{
                                            fontSize: 48,
                                            color: 'warning.main',
                                            mb: 2,
                                        }}
                                    />
                                    <Typography
                                        variant="h6"
                                        component="h3"
                                        sx={{ fontWeight: 'bold', mb: 1 }}
                                    >
                                        Secure & Private
                                    </Typography>
                                    <Typography color="textSecondary">
                                        Your data is protected with industry-standard
                                        encryption and security.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Feature 4 */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: 6,
                                    },
                                }}
                            >
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <SpeedIcon
                                        sx={{
                                            fontSize: 48,
                                            color: 'info.main',
                                            mb: 2,
                                        }}
                                    />
                                    <Typography
                                        variant="h6"
                                        component="h3"
                                        sx={{ fontWeight: 'bold', mb: 1 }}
                                    >
                                        Fast & Responsive
                                    </Typography>
                                    <Typography color="textSecondary">
                                        Optimized for speed with a clean, intuitive user
                                        interface.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>

                {/* CTA Section */}
                <Box
                    sx={{
                        background: 'linear-gradient(45deg, #1976d2 30%, #21cbf3 90%)',
                        color: 'white',
                        py: 6,
                        px: 4,
                        borderRadius: 2,
                        textAlign: 'center',
                        mb: 8,
                    }}
                >
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                        Ready to Get Started?
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 4 }}>
                        Join thousands of job seekers successfully managing their applications.
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        sx={{
                            bgcolor: 'white',
                            color: '#1976d2',
                            fontWeight: 'bold',
                            '&:hover': { bgcolor: '#f5f5f5' },
                            px: 4,
                            py: 1.5,
                            fontSize: '1.1rem',
                        }}
                        onClick={() => navigate('/register')}
                    >
                        Create Your Account Now
                    </Button>
                </Box>

                {/* Footer */}
                <Box
                    sx={{
                        textAlign: 'center',
                        py: 4,
                        borderTop: '1px solid #e0e0e0',
                    }}
                >
                    <Typography color="textSecondary">
                        © 2026 SkillBridge. Empowering your job search journey.
                    </Typography>
                </Box>
            </Container>
        </>
    );
};

export default HomePage;
