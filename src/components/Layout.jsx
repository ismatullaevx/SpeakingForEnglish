import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'var(--background)',
            color: 'var(--text-main)'
        }}>
            <header style={{
                backgroundColor: 'var(--card-bg)',
                borderBottom: '1px solid var(--border)',
                padding: '1.25rem 2rem',
                boxShadow: 'var(--shadow-sm)',
                position: 'sticky',
                top: 0,
                zIndex: 10
            }}>
                <nav style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Link to="/" style={{
                        fontSize: '1.5rem',
                        fontWeight: '800',
                        color: 'var(--primary)',
                        textDecoration: 'none',
                        letterSpacing: '-0.025em'
                    }}>
                        Speaking
                    </Link>
                    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                        <Link to="/" style={{
                            color: 'var(--text-main)',
                            textDecoration: 'none',
                            fontWeight: '600',
                            fontSize: '0.875rem'
                        }}>
                            Practice
                        </Link>

                        {isAuthenticated ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                <span style={{
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    color: 'var(--text-muted)'
                                }}>
                                    Hi, {user.name}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        borderRadius: '0.5rem',
                                        border: '1px solid var(--border)',
                                        background: 'white',
                                        fontSize: '0.875rem',
                                        fontWeight: '600',
                                        color: 'var(--danger)'
                                    }}
                                >
                                    Log Out
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                style={{
                                    padding: '0.5rem 1.25rem',
                                    borderRadius: '0.5rem',
                                    background: 'var(--primary)',
                                    color: 'white',
                                    textDecoration: 'none',
                                    fontSize: '0.875rem',
                                    fontWeight: '600'
                                }}
                            >
                                Sign In
                            </Link>
                        )}
                    </div>
                </nav>
            </header>
            <main style={{ flex: 1, width: '100%' }}>
                <Outlet />
            </main>
            <footer style={{
                backgroundColor: 'var(--card-bg)',
                borderTop: '1px solid var(--border)',
                padding: '3rem 2rem',
                textAlign: 'center',
                color: 'var(--text-muted)'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <p style={{ fontWeight: '600', color: 'var(--text-main)', marginBottom: '0.5rem' }}>Speaking Practice</p>
                    <p style={{ fontSize: '0.875rem' }}>&copy; {new Date().getFullYear()} Designed for excellence in English speaking.</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
