export default function CarRow({ car, onEdit, onDelete, username }) {
  const isOwner = username && car.userId === username;

  return (
    <div className="car-card">
      <img
        src={`https://placehold.co/600x400?text=${encodeURIComponent(car.name)}`}
        alt={car.name}
      />
      <div className="car-details">
        <h3>{car.name}</h3>
        <div className="car-stats">
          <p><strong>Model:</strong> {car.model || 'Unknown'}</p>
          <p><strong>Price:</strong> ${car.price}</p>
          <p><strong>Status:</strong> {car.stocked ? 'In Stock' : 'Out of Stock'}</p>
        </div>

        {isOwner && (
          <div style={{ marginTop: '1rem', display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button className="btn" onClick={() => onEdit(car)}>Edit</button>
            <button className="btn" onClick={() => onDelete(car.id)} style={{ background: '#ff4757' }}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
}