function ItemsDisplay(props){

    const showItem = (item) => {
        return(
            <div>
                <p> Id: {item.id}</p>
                <p> name: {item.name}</p>
                <p> price: {item.price}</p>
                <p> type: {item.type}</p>
                <p> brand: {item.brand}</p>
            </div>
        );
    }
    return(
        <div>
            {props.items.map(showItem)}
        </div>
    );
}
export default ItemsDisplay