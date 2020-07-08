import React from "react";
import axios from "axios";
import check from "check-types";
import { Back, LoggedIn } from "../../components";
import { routes, api } from "../../config";
import errors from "../../errors";
import { connect } from "../../redux";

class Main extends React.Component {
  async updatePassword(e) {
    e.preventDefault();
    const form = document.getElementById("formOne");
    const data = { password: form.password.value };
    try {
      errors.user.updatePassword(data);
      check.assert(data.password === form.confirm.value, "passwords don't match");
      const response = await axios.put(`${process.env.REACT_APP_API}${api.user.updatePassword}`, data);
      if (response.data.error) {
        throw new Error(response.data.error.detail);
      }
      form.password.value = "";
      form.confirm.value = "";
      this.props.actions.notice.message("password updated successfully!");
    } catch (e) {
      this.props.actions.notice.message(e.message);
    }
  }

  render() {
    return (
      <div>
        <LoggedIn />
        <Back to={routes.Account} />
        <h1>Update Password</h1>
        <hr />
        <form id="formOne" onSubmit={this.updatePassword.bind(this)}>
          <input type="password" name="password" placeholder="password" />
          <input type="password" name="confirm" placeholder="password confirm" />
          <input type="submit" value="update" />
        </form>
      </div>
    );
  }
}
export default connect(Main);
