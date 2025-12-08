import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddCar({ onCarAdded, initialCar, token }) {
    const [name, setName] = useState('');
    const [model, setModel] = useState('');
    const [price, setPrice] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        if (initialCar) {
            setName(initialCar.name || '');
            setModel(initialCar.model || '');
            setPrice(initialCar.price || '');

            if (initialCar.releaseDate) {
                const date = new Date(initialCar.releaseDate);
                setReleaseDate(date.toISOString().split('T')[0]);
            } else {
                setReleaseDate('');
            }
        } else {
            setName('');
            setModel('');
            setPrice('');
            setReleaseDate('');
        }
    }, [initialCar]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const url = (import.meta.env.VITE_BACKEND_URL || "http://localhost:8000") + "/api/v1/cars";
            const carData = {
                name,
                model,
                price: parseFloat(price),
                releaseDate
            };

            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            if (initialCar) {
                await axios.put(`${url}/${initialCar.id}`, carData, config);
            } else {
                await axios.post(url, carData, config);
            }


            if (!initialCar) {
                setName('');
                setModel('');
                setPrice('');
                setReleaseDate('');
            }

            if (onCarAdded) {
                onCarAdded();
            }
        } catch (err) {
            console.error("Failed to save car:", err);
            setError("Failed to save car. Please check your input.");
        }
    };

    return (
        <div className="form-card">
            <h3 style={{ color: '#5a3f9e', marginBottom: '1.5rem', textAlign: 'center' }}>
                {initialCar ? 'Edit Car' : 'Add New Car'}
            </h3>
            {error && <p style={{ color: '#ff4757', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="e.g. Tesla Model S"
                    />
                </div>
                <div className="form-group">
                    <label>Model</label>
                    <input
                        type="text"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        placeholder="e.g. Plaid"
                    />
                </div>
                <div className="form-group">
                    <label>Price ($)</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="e.g. 99000"
                    />
                </div>
                <div className="form-group">
                    <label>Release Date</label>
                    <input
                        type="date"
                        value={releaseDate}
                        onChange={(e) => setReleaseDate(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit" className="btn" style={{ width: '30%' }}>
                        {initialCar ? 'Update Car' : 'Add Car'}
                    </button>
                    {initialCar && (
                        <button
                            type="button"
                            className="btn"
                            onClick={() => onCarAdded()}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
