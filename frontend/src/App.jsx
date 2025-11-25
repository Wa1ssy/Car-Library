import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FilterableCarsTable from "./components/car/filterableCarsTable.jsx";

function App() {
    return (<>
            <h1>Car library</h1>
            <FilterableCarsTable />
        </>)
}

export default App