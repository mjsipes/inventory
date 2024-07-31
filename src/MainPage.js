import { useEffect, useState } from 'react';
import AddItem from './AddItem';
import './App.css';
import ItemsDisplay from './ItemsDisplay';
import SearchBar from './SearchBar';

function MainPage() {
  const [filters, setFilters] = useState({
    name: '',
    price: '',
    type: '',
    brand: '',
  });
  const [data, setData] = useState({ items: [] });
  const updateFilters = (searchParams) => {
    setFilters(searchParams);
  };

  //--------------------------------------------------------------------------------------------------------------------------

  // // getting from json server
  // useEffect(() => {
  //   fetch("http://localhost:3000/items")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Fetch result:", data);
  //       setData({ items: data });
  //     });
  // }, []);

  //-------------------------------------------------------------------------------

  // getting from sqlite server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/items');
        const data = await response.json();
        console.log('Fetch result:', data);
        setData({ items: data });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  //--------------------------------------------------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------------------------------------------------

  // const deleteItem = (item) => {
  //   const items = data["items"];
  //   const requestOptions = {
  //     method: "DELETE",
  //   };

  //   fetch(`http://localhost:3000/items/${item.id}`, requestOptions)
  //     .then((response) => {
  //       if (response.ok) {
  //         // If the delete request is successful, remove the item from the local state
  //         const updatedItems = items.filter((i) => i.id !== item.id);
  //         setData({ items: updatedItems });
  //       } else {
  //         throw new Error("Failed to delete item");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error deleting item:", error);
  //     });
  // };

  //-------------------------------------------------------------------------------

  const deleteItem = (item) => {
    const items = data['items'];
    fetch(`http://localhost:3001/items/${item.id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          const idx = items.indexOf(item);
          items.splice(idx, 1);
          setData({ items: items });
        }
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
      });
  };

  //--------------------------------------------------------------------------------------------------------------------------

  const addItemToData = (item) => {
    let items = data['items'];
    item.id = items.length;

    //--------------------------------------------------------------------------------------------------------------------------

    // // adding to json-server
    // const requestOptions = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(item),
    // };
    // fetch("http://localhost:3000/items", requestOptions)
    //   .then((response) => response.json())
    //   .then((data) => console.log(data));

    //-------------------------------------------------------------------------------

    //adding to sqlite
    const requestOptions2 = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    };
    fetch('http://localhost:3001/items', requestOptions2)
      .then((response) => response.json())
      .then((data) => console.log(data));

    //--------------------------------------------------------------------------------------------------------------------------

    items.push(item);
    setData({ items: items });
    console.log(data);
  };

  const filterData = (data) => {
    const filteredData = [];
    if (
      filters.name === '' &&
      filters.price === '' &&
      filters.type === '' &&
      filters.brand === ''
    ) {
      return data;
    }
    for (const item of data) {
      if (filters.name !== '' && item.name !== filters.name) {
        continue;
      }
      if (filters.price !== '' && item.price > filters.price) {
        continue;
      }
      if (filters.type !== '' && item.type !== filters.type) {
        continue;
      }
      if (filters.brand !== '' && item.brand !== filters.brand) {
        continue;
      }
      filteredData.push(item);
    }
    return filteredData;
  };

  return (
    <div className="container">
      <div className="row mt-3">
        <SearchBar updateSearchParams={updateFilters} />
      </div>
      <div className="row mt-3">
        <ItemsDisplay
          deleteItem={deleteItem}
          items={filterData(data['items'])}
        />
      </div>
      <div className="row mt-3">
        <AddItem addItem={addItemToData} />
      </div>
    </div>
  );
}

export default MainPage;
