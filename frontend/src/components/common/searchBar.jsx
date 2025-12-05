export default function SearchBar({ filterText, inStockOnly, onFilterTextChange, onInStockChange }) {
    return (
        <div style={{ margin: '2rem 0', textAlign: 'center' }}>
            <input
                id="search"
                type="text"
                placeholder="Search for cars..."
                value={filterText}
                onChange={(e) => onFilterTextChange(e.target.value)}
            />
            <div style={{ marginTop: '1rem' }}>
                <label style={{ cursor: 'pointer', fontSize: '1rem', color: '#fff', fontWeight: '500' }}>
                    <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={(e) => onInStockChange(e.target.checked)}
                        style={{ marginRight: '8px', transform: 'scale(1.2)' }}
                    />
                    Only show cars in stock
                </label>
            </div>
        </div>
    );
}