import { useState } from "react";

function AddItem(props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");

  const addItemButtonPressed = () => {
    props.addItem({
      name: name,
      price: price,
      type: type,
      brand: brand,
    });
    setName("");
    setPrice("");
    setType("");
    setBrand("");
  };

  return (
    <div className="container">
      <div>
        <h2>add a item</h2>
      </div>
      <div className="row">
        <label htmlFor="name-field">Name: </label>
        <input
          id="name-field"
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="price-field">Price: </label>
        <input
          id="price-field"
          type="text"
          className="form-control"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <label htmlFor="type-field">Type: </label>
        <input
          id="type-field"
          type="text"
          className="form-control"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <label htmlFor="brand-field">Brand: </label>
        <input
          id="brand-field"
          type="text"
          className="form-control"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
      </div>
      <div className="row mt-3">
        <button
          type="button"
          className=" col-4 btn btn-primary"
          onClick={addItemButtonPressed}
        >
          Add Item
        </button>
      </div>
    </div>
  );
}
export default AddItem;
