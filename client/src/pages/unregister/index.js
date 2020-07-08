import React from "react";
import axios from "axios";
import check from "check-types";
import { Back, LoggedIn } from "../../components";
import { routes, api } from "../../config";
import { connect } from "../../redux";

class Main extends React.Component {
  async deleteAccount(e) {
    e.preventDefault();
    const form = document.getElementById("formOne");
    try {
      check.assert(form.deleteme.value === "delete me", "please type 'delete me'");
      const response = await axios.delete(`${process.env.REACT_APP_API}${api.user.unregister}`);
      if (response.data.error) {
        throw new Error(response.data.error.detail);
      }
      this.props.actions.user.clear();
      this.props.history.push(routes.Home);
    } catch (e) {
      this.props.actions.notice.message(e.message);
    }
  }

  render() {
    return (
      <div>
        <LoggedIn />
        <Back to={routes.Account} />
        <h1>Remove Account</h1>
        <hr />
        <p>Are you sure? All your information will be removed.</p>
        <form id="formOne" onSubmit={this.deleteAccount.bind(this)}>
          <input type="text" name="deleteme" placeholder="delete me" />
          <input type="submit" value="remove account" />
        </form>
      </div>
    );
  }
}
export default connect(Main);
