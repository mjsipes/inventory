import { useState } from "react";
import "./App.css";
import SearchBar from "./SearchBar";
import ItemsDisplay from "./ItemsDisplay";
import AddItem from "./AddItem";

function App() {
  const [filters, setFilters] = useState({
    name: "",
    price: "",
    type: "",
    brand: "",
  });
  const [data, setData] = useState({ items: [] });

  const updateFilters = (searchParams) => {
    setFilters(searchParams);
  };

  const addItemToData = (item) => {
    let items = data["items"];
    item.id = items.length;

    // adding to json-server
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    };
    fetch("http://localhost:3000/items", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));

    //adding to sqlite pt1
    const requestOptions2 = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    };
    fetch("http://localhost:3001/items", requestOptions2)
      .then((response) => response.json())
      .then((data) => console.log(data));

    items.push(item);
    setData({ items: items });
    console.log(data);
    console.log(
      "filter name:" +
        filters.name +
        ":filter price:" +
        filters.price +
        ":filters type:" +
        filters.type +
        ":filters brand:" +
        filters.brand
    );
  };

  const filterData = (data) => {
    const filteredData = [];
    if (
      filters.name == "" &&
      filters.price == "" &&
      filters.type == "" &&
      filters.brand == ""
    ) {
      return data;
    }
    for (const item of data) {
      if (filters.name !== "" && item.name !== filters.name) {
        continue;
      }
      if (filters.price !== "" && item.price > filters.price) {
        continue;
      }
      if (filters.type !== "" && item.type !== filters.type) {
        continue;
      }
      if (filters.brand !== "" && item.brand !== filters.brand) {
        continue;
      }
      filteredData.push(item);
    }
    return filteredData;
  };

  return (
    <div className="container">
      <div className="row mt-3">
        <ItemsDisplay items={filterData(data["items"])} />
      </div>
      <div className="row mt-3">
        <SearchBar updateSearchParams={updateFilters} />
      </div>
      <div className="row mt-3">
        <AddItem addItem={addItemToData} />
      </div>
    </div>
  );
}

export default App;
