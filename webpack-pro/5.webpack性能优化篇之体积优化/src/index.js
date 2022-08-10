import img from "../images/1.jpg";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

console.log(1111222);
class Search extends React.Component {
    render() {
        return (
            <div>
                Search Text change WDR
                <img src={img} />
            </div>
        );
    }
}

ReactDOM.render(<Search />, document.getElementById("root"));