export default function CarRow({ car, onEdit, onDelete }) {
  return (
    <tr>
      <td>{car.name}</td>
      <td>{car.price}</td>
      <td>
        <button onClick={() => onEdit(car)} style={{ marginRight: '5px' }}>Edit</button>
        <button onClick={() => onDelete(car.id)} style={{ color: 'red' }}>Delete</button>
      </td>
    </tr>
  );
}