import ModelRow from "./tableParts/modelRow.jsx";
import CarRow from "./tableParts/carRow.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CarsTable() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let cars = [];
    const categorizeCars = () => {
      const rows = [];
      let lastModel = null;
      cars.forEach((car) => {
        if (car.model !== lastModel) {
          rows.push(
            <ModelRow
              model={car.model}
              key={car.model ?? "unknown"}
            />
          );
        }
        rows.push(
          <CarRow
            car={car}
            key={car.id}
          />
        );
        lastModel = car.model;
      });
      setRows(rows);
    };

    const fetchCars = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/v1/cars");
        cars = response.data;
        categorizeCars();
      } catch (error) {
        console.log("Failed to fetch Cars:", error);
      }
    };

    fetchCars().then(() => console.log("Success fetching Cars"));
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
