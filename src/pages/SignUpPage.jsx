import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(null); // Changed to null to store result type
    const [loading, setLoading] = useState(false);
    const { signup, signInWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleGoogleLogin = async () => {
        setError('');
        try {
            await signInWithGoogle();
        } catch (err) {
            console.error('Google signup error details:', err);
            setError('Google sign up error: ' + err.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            console.warn('Signup validation failed: Passwords do not match');
            return setError('Passwords do not match');
        }

        if (formData.password.length < 6) {
            console.warn('Signup validation failed: Password too short');
            return setError('Password must be at least 6 characters');
        }

        setLoading(true);
        try {
            console.log('Attempting signup for:', formData.email);
            const data = await signup(formData.email, formData.password, { full_name: formData.name });
            console.log('Signup response data:', data);
            
            if (!data.session) {
                console.log('Signup successful but email confirmation required');
                setSuccess('confirmation_required');
                setTimeout(() => {
                    navigate('/login');
                }, 4000); // Auto redirect to login
            } else {
                console.log('Signup successful, user automatically logged in');
                setSuccess('auto_login');
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }
        } catch (err) {
            console.error('Signup catch error details:', {
                message: err.message,
                status: err.status,
                name: err.name,
                fullError: err
            });
            if (err.message?.includes('Email not confirmed')) {
                setError('Please confirm your email address before signing in. Check your inbox for a confirmation link.');
            } else if (err.message?.includes('rate limit')) {
                setError('Too many attempts. Please wait a few minutes before trying again.');
            } else {
                setError(err.message || 'Failed to create account.');
            }
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="auth-container">
                <div className="auth-card" style={{ textAlign: 'center' }}>
                    <div style={{ 
                        width: '64px', 
                        height: '64px', 
                        background: success === 'confirmation_required' ? '#fff7ed' : '#dcfce7', 
                        borderRadius: '50%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        margin: '0 auto 1.5rem' 
                    }}>
                        {success === 'confirmation_required' ? (
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                        ) : (
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        )}
                    </div>
                    <h2>{success === 'confirmation_required' ? 'Check your email' : 'Account Created!'}</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                        {success === 'confirmation_required' 
                            ? "We've sent a confirmation link to your email address. Please click it to activate your account."
                            : 'Your account has been successfully created. You are being redirected...'}
                    </p>
                    <button 
                        onClick={() => navigate('/login')} 
                        className="auth-button" 
                        style={{ display: 'block', width: '100%', border: 'none', cursor: 'pointer', marginTop: '1rem' }}
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ marginBottom: '0.5rem' }}>Create Account</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                        Start your English learning journey today
                    </p>
                </div>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="John Doe"
                            autoComplete="name"
                        />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="name@example.com"
                            autoComplete="email"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <div className="password-input-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="••••••••"
                                autoComplete="new-password"
                            />
                            <button 
                                type="button" 
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                tabIndex="-1"
                            >
                                {showPassword ? (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                                ) : (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <div className="password-input-wrapper">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                placeholder="••••••••"
                                autoComplete="new-password"
                            />
                            <button 
                                type="button" 
                                className="password-toggle"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                tabIndex="-1"
                            >
                                {showConfirmPassword ? (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                                ) : (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                )}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>

                <div className="auth-divider">
                    <span>or continue with</span>
                </div>

                <button 
                    onClick={handleGoogleLogin} 
                    className="google-auth-button"
                    type="button"
                >
                    <svg width="20" height="20" viewBox="0 0 18 18">
                        <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
                        <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                        <path d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.712s.102-1.172.282-1.712V4.956H.957A8.996 8.996 0 0 0 0 9c0 1.497.366 2.91 1.014 4.152l2.95-2.44z" fill="#FBBC05"/>
                        <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.956L3.964 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335"/>
                    </svg>
                    Google
                </button>

                <p className="auth-footer">
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;
