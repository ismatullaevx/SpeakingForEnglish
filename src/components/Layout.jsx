import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
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
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <Link to="/" style={{
                            color: 'var(--text-main)',
                            textDecoration: 'none',
                            fontWeight: '600',
                            fontSize: '0.875rem'
                        }}>
                            Practice
                        </Link>
                        <Link to="/" style={{
                            color: 'var(--text-muted)',
                            textDecoration: 'none',
                            fontWeight: '500',
                            fontSize: '0.875rem'
                        }}>
                            Units
                        </Link>
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
