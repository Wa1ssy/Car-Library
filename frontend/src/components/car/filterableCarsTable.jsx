import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from "../common/searchBar.jsx";
import CarsTable from "./carsTable.jsx";
import AddCar from "./AddCar.jsx";

export default function FilterableCarsTable({ token, username }) {
    const [cars, setCars] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [inStockOnly, setInStockOnly] = useState(false);
    const [showAddCar, setShowAddCar] = useState(false);
    const [editingCar, setEditingCar] = useState(null);

    const fetchCars = async () => {
        try {
            const response = await axios.get((import.meta.env.VITE_BACKEND_URL || "http://localhost:8000") + "/api/v1/cars");
            setCars(response.data);
        } catch (error) {
            console.error("Failed to fetch Cars:", error);
        }
    };

    useEffect(() => {
        fetchCars();
    }, []);

    const handleCarAdded = () => {
        fetchCars();
        setShowAddCar(false);
        setEditingCar(null);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this car?")) {
            try {
                await axios.delete((import.meta.env.VITE_BACKEND_URL || "http://localhost:8000") + `/api/v1/cars/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchCars();
            } catch (error) {
                console.error("Failed to delete car:", error);
            }
        }
    };

    const handleEdit = (car) => {
        setEditingCar(car);
        setShowAddCar(true);
    };

    const filteredCars = cars.filter((car) => {
        if (!car || !car.name || typeof car.name !== 'string' || car.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
            return false;
        }
        if (inStockOnly && !car.stocked) {
            return false;
        }
        return true;
    });

    return (
        <div>
            {token && (
                <button
                    className="btn"
                    onClick={() => {
                        setShowAddCar(!showAddCar);
                        setEditingCar(null);
                    }}
                    style={{ marginBottom: '20px' }}
                >
                    {showAddCar ? 'Cancel' : 'Add New Car'}
                </button>
            )}

            {showAddCar && <AddCar onCarAdded={handleCarAdded} initialCar={editingCar} token={token} />}

            <SearchBar
                filterText={filterText}
                inStockOnly={inStockOnly}
                onFilterTextChange={setFilterText}
                onInStockChange={setInStockOnly}
            />
            <CarsTable
                cars={filteredCars}
                onEdit={handleEdit}
                onDelete={handleDelete}
                username={username}
            />
        </div>
    );
}