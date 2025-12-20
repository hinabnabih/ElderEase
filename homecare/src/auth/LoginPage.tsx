import React, { useState } from 'react';
import { Card, Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await login({ username, password });
            navigate('/');
        } catch (err) {
            console.error(err);
            setError('Incorrect username or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container fluid className="bg-light min-vh-100 d-flex align-items-center">
            <Row className="w-100 justify-content-center">
                <Col md={6} lg={4}>
                    <Card className="shadow">
                        <Card.Body className="p-4">
                            <div className="text-center mb-4">
                                <h2>ElderEase</h2>
                                <p className="text-muted">Log in</p>
                            </div>

                            {error && <Alert variant="danger">{error}</Alert>}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Username *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        disabled={loading}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Password *</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        disabled={loading}
                                    />
                                </Form.Group>

                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="w-100 mb-3"
                                    disabled={loading}
                                >
                                    {loading ? 'Loading...' : 'Log in'}
                                </Button>
                            </Form>

                            <div className="text-center mt-3">
                                <p className="mb-1">Don't have an account?</p>
                                <Button
                                    variant="link"
                                    onClick={() => navigate('/register')}
                                    disabled={loading}
                                    className="mt-0"
                                >
                                    REGISTER NOW
                                </Button>
                            </div>

                            <Card className="mt-3 bg-light">
                                <Card.Body className="py-2">
                                    <small className="text-muted">
                                        <strong>Get started:</strong><br/>
                                        • Log in to book appointmens<br/>
                                        • Log in to add an availableday<br/>
                                        • Or create a new account
                                    </small>
                                </Card.Body>
                            </Card>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginPage;
