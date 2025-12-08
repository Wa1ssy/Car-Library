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
        <div className="auth-container">
            <h2>Profile</h2>
            {message && <div style={{ color: 'green', marginBottom: '1rem' }}>{message}</div>}
            {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

            <form onSubmit={handlePasswordChange}>
                <div className="form-group">
                    <label>New Password</label>
                    <input
                        type="password"
                        placeholder="New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Update Password</button>
            </form>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', justifyContent: 'center' }}>
                <button
                    onClick={onLogout}
                    style={{ background: '#666', width: '20%', padding: '10px 20px' }}
                    type="button"
                >
                    Logout
                </button>
                <button
                    onClick={handleDeleteAccount}
                    style={{ background: '#ff4757', width: '20%', padding: '10px 20px' }}
                    type="button"
                >
                    Delete Account
                </button>
            </div>
        </div>
    );
}
