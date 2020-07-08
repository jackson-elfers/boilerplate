import React from "react";
import axios from "axios";
import check from "check-types";
import { LoggedIn } from "../../components";
import { api, routes, categories, settings } from "../../config";
import errors from "../../errors";
import { connect } from "../../redux";

function Selected(props) {
  var temp = [];
  for (var i = 0; i < props.selected.length; ++i) {
    temp.push(<button key={props.categories[props.selected[i]]}>{props.categories[props.selected[i]]}</button>);
  }
  return temp;
}

function Categories(props) {
  var temp = [];
  for (var i = 0; i < props.data.length; ++i) {
    temp.push(
      <button onClick={props.handler} data-index={i} key={props.data[i]}>
        {props.data[i]}
      </button>
    );
  }
  return temp;
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      issue: {},
      selected: []
    };
  }

  async updateIssue(e) {
    e.preventDefault();
    const form = document.getElementById("formOne");
    const data = {
      _id: this.state.issue._id,
      body: form.body.value,
      categories: this.state.selected,
      public: form.public.value === "0" ? false : true
    };
    try {
      errors.issue.update(data);
      const response = await axios.put(`${process.env.REACT_APP_API}${api.issue.update}`, data);
      if (response.data.error) {
        throw new Error(response.data.error.detail);
      }
      this.props.history.push(`${routes.ReadIssue}/${response.data.data.url_title}`);
    } catch (e) {
      this.props.actions.notice.message(e.message);
    }
  }

  selectCategory(e) {
    const index = Number(e.target.getAttribute("data-index"));
    const update = JSON.parse(JSON.stringify(this.state.selected));
    var exists = false;
    this.state.selected.map((d, i) => {
      if (index === this.state.selected[i]) {
        update.splice(i, 1);
        exists = true;
      }
    });
    if (!exists && this.state.selected.length < settings.issue.categories.max) {
      update.push(index);
    }
    this.setState({ selected: update });
  }

  async getIssue() {
    const response = await axios.get(
      `${process.env.REACT_APP_API}${api.issue.readSingleUrlTitle}/${this.props.match.params.url_title}`
    );
    if (response.data.error) {
      throw new Error(response.data.error.detail);
    } else if (response.data.data.length === 0) {
      throw new Error("issue doesn't exist");
    }
    this.setState({ issue: response.data.data[0] });
  }

  loadIssue() {
    const form = document.getElementById("formOne");
    form.body.value = this.state.issue.body;
    form.public.value = this.state.issue.public ? "1" : "0";
  }

  categoriesToIndex() {
    var temp = [];
    this.state.issue.categories.split("#").map((d, r) => {
      for (var c = 0; c < categories.length; ++c) {
        if (d === categories[c]) {
          temp.push(c);
          break;
        }
      }
    });
    return temp;
  }

  async componentDidMount() {
    try {
      await this.getIssue();
      this.loadIssue();
      this.setState({ selected: this.categoriesToIndex() });
    } catch (e) {
      this.props.actions.notice.message(e.message);
    }
  }

  render() {
    return (
      <div>
        <LoggedIn />
        <h1>Update Issue</h1>
        <hr />
        <form id="formOne" onSubmit={this.updateIssue.bind(this)}>
          <select name="public">
            <option value="0">Private</option>
            <option value="1">Public</option>
          </select>
          <textarea style={{ height: "300px" }} name="body" placeholder="What's on your mind?" />
          <input type="submit" value="update" />
        </form>
        <Selected categories={categories} selected={this.state.selected} />
        <hr />
        <p>{`Choose up to ${settings.issue.categories.max} categories...`}</p>
        <Categories handler={this.selectCategory.bind(this)} data={categories} />
      </div>
    );
  }
}
export default connect(Main);
