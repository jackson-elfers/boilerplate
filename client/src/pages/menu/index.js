import React from "react";
import { Menu } from "../../components";
import { routes } from "../../config";
import { connect } from "../../redux";

class Main extends React.Component {
  menu() {
    return [
      [
        "Home",
        () => {
          this.props.history.push(routes.Home);
        }
      ],
      [
        "Account",
        () => {
          this.props.history.push(routes.Account);
        }
      ],
      [
        "Logout",
        () => {
          this.props.history.push(routes.Logout);
        }
      ]
    ];
  }

  render() {
    return (
      <div>
        <h1>Menu</h1>
        <hr />
        <Menu data={this.menu()} />
      </div>
    );
  }
}

export default connect(Main);
