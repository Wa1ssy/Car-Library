import CarRow from "./tableParts/carRow.jsx";

export default function CarsTable({ cars, onEdit, onDelete, username }) {
  const cards = [];

  if (cars && Array.isArray(cars)) {
    cars.forEach((car) => {
      if (car && car.id) {
        cards.push(
          <CarRow
            car={car}
            key={car.id}
            onEdit={onEdit}
            onDelete={onDelete}
            username={username}
          />
        );
      }
    });
  }

  return (
    <div className="car-grid">
      {cards}
    </div>
  );
}
