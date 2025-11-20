import SearchBar from "../common/searchBar.jsx";
import CarsTable from "./carsTable.jsx"

export default function FilterableCarsTable({ games }) {
    return (
        <div>
            <SearchBar />
            <CarsTable cars={cars} />
        </div>
    );
}