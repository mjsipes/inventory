import { useState} from 'react';
import './App.css';
import SearchBar from './SearchBar';
import ItemsDisplay from './ItemsDisplay';
import AddItem from './AddItem';


function App() {

  const [filters, setFilters] = useState({});
  const [data,setData] = useState({items:[]});



  const updateFilters = (searchParams) =>{
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
    .then((response) =>  response.json())
    .then((data)=> console.log(data));

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
    setData({items:items});
    console.log(data);
  }

  return (
    <div className="App">
      <SearchBar updateSearchParams={updateFilters} />
      <ItemsDisplay items={data["items"]}/>
      <AddItem addItem={addItemToData}/>
    </div>
  );
}


export default App;
