import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { decodeJWT } from '../utils/auth';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, handleGoogleResponse } = useAuth();
    const navigate = useNavigate();
    const googleButtonRef = useRef(null);

    // IMPORTANT: Replace with your actual Google Client ID from Google Cloud Console
    const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";

    useEffect(() => {
        /* global google */
        if (window.google) {
            google.accounts.id.initialize({
                client_id: GOOGLE_CLIENT_ID,
                callback: handleGoogleLoginResponse
            });

            google.accounts.id.renderButton(
                googleButtonRef.current,
                { theme: "outline", size: "large", width: "100%" }
            );
        }
    }, [GOOGLE_CLIENT_ID]);

    const handleGoogleLoginResponse = (response) => {
        try {
            const decoded = decodeJWT(response.credential);
            if (decoded) {
                handleGoogleResponse(decoded);
                navigate('/');
            } else {
                setError('Failed to process Google login');
            }
        } catch (err) {
            setError('Google login error: ' + err.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        try {
            login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Sign In</h2>
                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="your@email.com"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="********"
                        />
                    </div>
                    <button type="submit" className="auth-button">Login</button>
                </form>

                <div className="auth-divider">
                    <span>OR</span>
                </div>

                <div ref={googleButtonRef} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}></div>

                <p className="auth-footer">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
