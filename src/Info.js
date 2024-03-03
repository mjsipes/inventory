// function Info(){
//     const title = "this is my title";
//     const showtitle = true;
  
//     return (<div>
//       <h1>
//         {showtitle? title : "No title"}
//       </h1>
//       <p>Manage your stuff.</p>
//       <p>ay yo! what r thoososoeeeee burhhhhhhhhhhh</p>
//     </div>)
//   }

  
//   export default Info

import React from "react";
import PropTypes from "prop-types";


class Info extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            count: 0,
            title: "Hello",
        };
        console.log(props);
    }

    buttonPressed(){
        this.setState({
            count: this.state.count + 1,
        });
    }



    render(){
        return (
            <div>
                <p>Count: {this.state.count}</p>
                <button onClick={()=>this.buttonPressed()}>Click me!</button>
            </div>
        )
    }
}

Info.defaultProps = {
    title: "default",
};

Info.propTypes = {
    title: PropTypes.string
}

export default Info