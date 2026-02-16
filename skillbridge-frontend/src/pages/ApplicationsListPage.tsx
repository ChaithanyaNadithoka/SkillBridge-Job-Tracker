import React, { useEffect, useState } from 'react';
import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Button,
    Box,
    Typography,
    CircularProgress,
    TablePagination,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { applicationService } from '../services/applicationService';
import { JobApplication } from '../types';

const ApplicationsListPage: React.FC = () => {
    const navigate = useNavigate();
    const [applications, setApplications] = useState<JobApplication[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        fetchApplications();
    }, [page, rowsPerPage]);

    const fetchApplications = async () => {
        try {
            setLoading(true);
            const data = await applicationService.getApplications(page, rowsPerPage);
            setApplications(data.content || []);
        } catch (error) {
            console.error('Failed to fetch applications', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure?')) {
            try {
                await applicationService.deleteApplication(id);
                fetchApplications();
            } catch (error) {
                console.error('Failed to delete application', error);
            }
        }
    };

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    if (loading) {
        return <Layout><CircularProgress /></Layout>;
    }

    return (
        <Layout>
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h3">Applications</Typography>
                    <Button variant="contained" onClick={() => navigate('/applications/new')}>
                        Add Application
                    </Button>
                </Box>

                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Company</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Applied Date</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {applications.map((app) => (
                                <TableRow key={app.id}>
                                    <TableCell>{app.companyName}</TableCell>
                                    <TableCell>{app.jobRole}</TableCell>
                                    <TableCell>{app.status}</TableCell>
                                    <TableCell>{app.appliedDate}</TableCell>
                                    <TableCell>
                                        <Button size="small" onClick={() => navigate(`/applications/${app.id}/edit`)}>
                                            Edit
                                        </Button>
                                        <Button size="small" color="error" onClick={() => handleDelete(app.id)}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={applications.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Container>
        </Layout>
    );
};

export default ApplicationsListPage;
