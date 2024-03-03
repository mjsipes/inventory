import { useState } from 'react';

function ButtonState(){
    const [title, setTitle] = useState("");
    const [count, setCount] = useState(0);
    // var count = 0;
    
  
    const updateTitleClicked = () => {
      setTitle("We now havea title!")
    };
    const updateCounterClicked = () => {
      setCount(count+1);
      // count = count + 1;
      console.log(count);
    };
  
    return(
      <div>
        <p>Title: {title}</p>
        <p>Counter: {count}</p>
        <button onClick={updateTitleClicked}>Update Title</button>
        <button onClick={updateCounterClicked}>Update Button</button>
      </div>
  
    );
  }

export default ButtonState