import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../../config";

class Main extends React.Component {
  render() {
    return (
      <div>
        <h1>Home</h1>
        <hr />
        <img src={`${process.env.REACT_APP_API}/images/bonfire.gif`} />
      </div>
    );
  }
}
export default Main;
