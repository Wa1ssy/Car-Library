import { useState, Component, useEffect } from 'react'
import './App.css'
import FilterableCarsTable from "./components/car/filterableCarsTable.jsx";
import Login from "./components/auth/Login.jsx";
import Register from "./components/auth/Register.jsx";
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h1>Something went wrong.</h1>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo && this.state.errorInfo.componentStack}
                    </details>
                </div>
            );
        }

        return this.props.children;
    }
}

function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [username, setUsername] = useState(localStorage.getItem('username'));

    const saveToken = (userToken, userName) => {
        localStorage.setItem('token', userToken);
        localStorage.setItem('username', userName);
        setToken(userToken);
        setUsername(userName);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setToken(null);
        setUsername(null);
    };

    return (
        <ErrorBoundary>
            <BrowserRouter>
                <div className="app-container">
                    <nav>
                        {token ? (
                            <>
                                <Link to="/">Home</Link>
                                <span>Welcome, {username}</span>
                                <button className="btn" onClick={logout} style={{ padding: '8px 20px', fontSize: '0.9rem' }}>Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login">Login</Link>
                                <Link to="/register">Register</Link>
                            </>
                        )}
                    </nav>
                    <h1>Car library</h1>
                    <Routes>
                        <Route path="/" element={token ? <FilterableCarsTable token={token} username={username} /> : <Navigate to="/login" />} />
                        <Route path="/login" element={<Login setToken={saveToken} />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </ErrorBoundary>
    )
}

export default App