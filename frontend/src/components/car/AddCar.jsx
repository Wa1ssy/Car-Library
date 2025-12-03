import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddCar({ onCarAdded, initialCar }) {
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

            if (initialCar) {
                await axios.put(`${url}/${initialCar.id}`, carData);
            } else {
                await axios.post(url, carData);
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
        <div className="add-car-form" style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
            <h3>{initialCar ? 'Edit Car' : 'Add New Car'}</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            style={{ marginLeft: '10px' }}
                        />
                    </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>
                        Model:
                        <input
                            type="text"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            style={{ marginLeft: '10px' }}
                        />
                    </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>
                        Price:
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            style={{ marginLeft: '10px' }}
                        />
                    </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>
                        Release Date:
                        <input
                            type="date"
                            value={releaseDate}
                            onChange={(e) => setReleaseDate(e.target.value)}
                            style={{ marginLeft: '10px' }}
                        />
                    </label>
                </div>
                <button type="submit">{initialCar ? 'Update Car' : 'Add Car'}</button>
                {initialCar && <button type="button" onClick={() => onCarAdded()} style={{ marginLeft: '10px' }}>Cancel</button>}
            </form>
        </div>
    );
}
