import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Typography, CircularProgress } from '@mui/material';
import Layout from '../components/Layout';
import { dashboardService } from '../services/dashboardService';
import { DashboardStats } from '../types';

const DashboardPage: React.FC = () => {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await dashboardService.getStats();
                setStats(data);
            } catch (error) {
                console.error('Failed to fetch dashboard stats', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return <Layout><CircularProgress /></Layout>;
    }

    const StatCard: React.FC<{ title: string; value: number; color?: string }> = ({ title, value, color = '#1976d2' }) => (
        <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: color, color: 'white' }}>
            <Typography variant="body2">{title}</Typography>
            <Typography variant="h4">{value}</Typography>
        </Paper>
    );

    return (
        <Layout>
            <Container maxWidth="lg">
                <Typography variant="h3" sx={{ mb: 4 }}>Dashboard</Typography>
                
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatCard title="Total Applications" value={stats?.totalApplications || 0} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatCard title="Applied" value={stats?.appliedCount || 0} color="#2196f3" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatCard title="Interviewing" value={stats?.interviewingCount || 0} color="#ff9800" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatCard title="Offered" value={stats?.offeredCount || 0} color="#4caf50" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatCard title="Rejected" value={stats?.rejectedCount || 0} color="#f44336" />
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    );
};

export default DashboardPage;
