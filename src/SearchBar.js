import { useState } from 'react';

function SearchBar(props) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState();
  const [type, setType] = useState('');
  const [brand, setBrand] = useState('');

  const searchButtonPressed = () => {
    props.updateSearchParams({
      name: name,
      price: price,
      type: type,
      brand: brand,
    });
    setName('');
    setPrice('');
    setType('');
    setBrand('');
  };

  return (
    <div className="container">
      <div>
        <h2>search for an item</h2>
      </div>
      <div className="row">
        <div className="col">
          <label htmlFor="name-field">Name: </label>
          <input
            id="name-field"
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="col">
          <label htmlFor="price-field">Price: </label>
          <input
            id="price-field"
            type="text"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="col">
          <label htmlFor="type-field">Type: </label>
          <input
            id="type-field"
            type="text"
            className="form-control"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <div className="col">
          <label htmlFor="brand-field">Brand: </label>
          <input
            id="brand-field"
            type="text"
            className="form-control"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-4"></div>

        <button
          type="button"
          className="col-4 btn btn-primary"
          onClick={searchButtonPressed}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
