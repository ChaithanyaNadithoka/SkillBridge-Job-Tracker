import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { applicationService } from '../services/applicationService';

const ApplicationFormPage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [companyName, setCompanyName] = useState('');
    const [jobRole, setJobRole] = useState('');
    const [status, setStatus] = useState('APPLIED');
    const [appliedDate, setAppliedDate] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            setLoading(true);
            const data = { companyName, jobRole, status, appliedDate };

            if (id) {
                await applicationService.updateApplication(parseInt(id), data);
            } else {
                await applicationService.createApplication(data);
            }

            navigate('/applications');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Operation failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <Container maxWidth="sm">
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h4" sx={{ mb: 3 }}>
                        {id ? 'Edit Application' : 'Add Application'}
                    </Typography>

                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Company Name"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Job Role"
                            value={jobRole}
                            onChange={(e) => setJobRole(e.target.value)}
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Status"
                            select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            margin="normal"
                            required
                            SelectProps={{ native: true }}
                        >
                            <option value="APPLIED">Applied</option>
                            <option value="INTERVIEWING">Interviewing</option>
                            <option value="OFFERED">Offered</option>
                            <option value="REJECTED">Rejected</option>
                        </TextField>
                        <TextField
                            fullWidth
                            label="Applied Date"
                            type="date"
                            value={appliedDate}
                            onChange={(e) => setAppliedDate(e.target.value)}
                            margin="normal"
                            required
                            InputLabelProps={{ shrink: true }}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3 }}
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save'}
                        </Button>
                    </form>
                </Paper>
            </Container>
        </Layout>
    );
};

export default ApplicationFormPage;
