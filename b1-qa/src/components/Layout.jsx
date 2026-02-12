import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f9fafb', color: '#1f2937' }}>
            <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e5e7eb', padding: '1rem 2rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
                <nav style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4f46e5', textDecoration: 'none' }}>
                        B1 Speaking Q&A
                    </Link>
                    <div>
                        <Link to="/" style={{ color: '#4b5563', textDecoration: 'none', fontWeight: '500' }}>Home</Link>
                    </div>
                </nav>
            </header>
            <main style={{ flex: 1, maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '2rem' }}>
                <Outlet />
            </main>
            <footer style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e5e7eb', padding: '1rem 2rem', textAlign: 'center', color: '#6b7280' }}>
                <p>&copy; {new Date().getFullYear()} B1 Speaking Practice. Developed with logic and care.</p>
            </footer>
        </div>
    );
};

export default Layout;
