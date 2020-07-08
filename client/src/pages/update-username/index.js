import React from "react";
import axios from "axios";
import check from "check-types";
import { Back, LoggedIn } from "../../components";
import { routes, api } from "../../config";
import errors from "../../errors";
import { connect } from "../../redux";

class Main extends React.Component {
  async updateUsername(e) {
    e.preventDefault();
    const form = document.getElementById("formOne");
    const data = { username: form.username.value };
    try {
      errors.user.updateUsername(data);
      if (
        (await axios.get(`${process.env.REACT_APP_API}${api.user.usernameExists}/${data.username}`)).data.data
          .length !== 0
      ) {
        throw new Error(`${data.username} already exists as a username.`);
      }
      const response = await axios.put(`${process.env.REACT_APP_API}${api.user.updateUsername}`, data);
      if (response.data.error) {
        throw new Error(response.data.error.detail);
      }
      form.username.value = "";
      this.props.actions.notice.message("username updated successfully!");
    } catch (e) {
      this.props.actions.notice.message(e.message);
    }
  }

  render() {
    return (
      <div>
        <LoggedIn />
        <Back to={routes.Account} />
        <h1>Update Username</h1>
        <hr />
        <form id="formOne" onSubmit={this.updateUsername.bind(this)}>
          <input type="text" name="username" placeholder="username" />
          <input type="submit" value="update" />
        </form>
      </div>
    );
  }
}
export default connect(Main);
