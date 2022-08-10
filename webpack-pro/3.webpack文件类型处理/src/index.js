import img from "../images/1.jpg";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

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
