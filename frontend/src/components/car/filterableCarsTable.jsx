import SearchBar from "../common/searchBar.jsx";
import CarsTable from "./carsTable.jsx"

export default function FilterableCarsTable() {
    return (
        <div>
            <SearchBar />
            <CarsTable />
        </div>
    );
}