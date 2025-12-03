import ModelRow from "./tableParts/modelRow.jsx";
import CarRow from "./tableParts/carRow.jsx";

export default function CarsTable({ cars, onEdit, onDelete }) {
  const rows = [];
  let lastModel = null;

  if (cars && Array.isArray(cars)) {
    cars.forEach((car) => {
      if (car && car.model !== lastModel) {
        rows.push(
          <ModelRow
            model={car.model}
            key={car.model ?? `unknown_${Math.random()}`}
          />
        );
      }
      if (car && car.id) {
        rows.push(
          <CarRow
            car={car}
            key={car.id}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        );
      }
      lastModel = car ? car.model : null;
    });
  }

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
