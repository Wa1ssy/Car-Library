export default function SearchBar(){
    return(
        <form>
            <input type="text" placeholder="Search..." />
            <label>
                <input type="checkbox"/>
                {' '}
                Only show cars in stock
            </label>
        </form>
    );
}