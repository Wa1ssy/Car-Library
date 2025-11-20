import ModelRow from "./tableParts/modelRow.jsx";
import CarRow from "./tableParts/carRow.jsx";

export default function CarsTable({ cars }) {
    const rows = [];
    let lastModel = null;

    cars.forEach((car) => {
        if (car.model !== lastModel) {
            rows.push(
                <ModelRow
                    model={car.model}
                    key={car.model ?? 'unknown'} />
            );
        }
        rows.push(
            <CarRow
                car={car}
                key={car.id} />
        );
        lastModel = car.model;
    });

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