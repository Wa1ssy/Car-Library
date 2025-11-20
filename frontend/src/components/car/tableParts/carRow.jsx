export default function CarRow({car}) {
    return (
      <tr>
          <td>{car.name}</td>
          <td>{car.price}</td>
          <td></td>
      </tr>
    );
}