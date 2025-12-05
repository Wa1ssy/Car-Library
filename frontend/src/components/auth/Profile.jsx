import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Profile({ token, username, onLogout }) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            await axios.put(
                (import.meta.env.VITE_BACKEND_URL || "http://localhost:8000") + `/api/v1/users/${username}`,
                { password },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMessage("Password updated successfully");
            setPassword('');
            setConfirmPassword('');
        } catch (err) {
            console.error(err);
            setError("Failed to update password");
        }
    };

    const handleDeleteAccount = async () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            try {
                await axios.delete(
                    (import.meta.env.VITE_BACKEND_URL || "http://localhost:8000") + `/api/v1/users/${username}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                onLogout();
                navigate('/login');
            } catch (err) {
                console.error(err);
                setError("Failed to delete account");
            }
        }
    };

    return (
        <div className="form-card" style={{ maxWidth: '600px', marginTop: '4rem' }}>
            <h2 style={{ textAlign: 'center', color: '#5a3f9e', marginBottom: '2rem' }}>User Profile</h2>

            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <div style={{
                    width: '100px',
                    height: '100px',
                    background: '#e0e0e0',
                    borderRadius: '50%',
                    margin: '0 auto 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3rem'
                }}>
                    👤
                </div>
                <h3>{username}</h3>
            </div>

            <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ marginBottom: '1rem', color: '#555' }}>Change Password</h4>
                {message && <p style={{ color: 'green', marginBottom: '1rem' }}>{message}</p>}
                {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

                <form onSubmit={handlePasswordChange}>
                    <div className="form-group">
                        <label>New Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirm New Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn" style={{ width: '100%' }}>Update Password</button>
                </form>
            </div>

            <div style={{ borderTop: '1px solid #eee', paddingTop: '2rem' }}>
                <h4 style={{ marginBottom: '1rem', color: '#555' }}>Danger Zone</h4>
                <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                    <button
                        onClick={onLogout}
                        className="btn"
                        style={{ background: '#666' }}
                    >
                        Logout
                    </button>
                    <button
                        onClick={handleDeleteAccount}
                        className="btn"
                        style={{ background: '#ff4757' }}
                    >
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
}
