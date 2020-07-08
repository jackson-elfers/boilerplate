import React from "react";
import { Menu, LoggedIn } from "../../components";
import { routes } from "../../config";
import { connect } from "../../redux";

class Main extends React.Component {
  menu() {
    return [
      [
        "Update Username",
        () => {
          this.props.history.push(routes.UpdateUsername);
        }
      ],
      [
        "Update Password",
        () => {
          this.props.history.push(routes.UpdatePassword);
        }
      ],
      [
        "Delete Account",
        () => {
          this.props.history.push(routes.Unregister);
        }
      ]
    ];
  }

  render() {
    return (
      <div>
        <LoggedIn />
        <h1>Account</h1>
        <hr />
        <Menu data={this.menu()} />
      </div>
    );
  }
}

export default connect(Main);
