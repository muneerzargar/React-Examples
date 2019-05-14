import React from "react";
import ReactDOM from "react-dom";
import { mount } from "enzyme";
import "./setupTests";

import App from "./App.js";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("App Components", () => {
  it("Click on login button in header opens Modal  ", () => {
    const wrapper = mount(<App />);
    const header = wrapper.find("Header");
    header.props().onLogin();
    expect(wrapper.state().showModal).toEqual(true);
    expect(wrapper.find("Modal").length).toEqual(1);
  });

  it("when user form is empty on submit, it should show error message ", () => {
    const wrapper = mount(<App />);
    const modal = wrapper.find("Modal");
    modal.props().onSubmit();
    expect(wrapper.state().showError).toEqual(true);
  });

  it("when user form is filled with no username, on submit it should show error message ", () => {
    const wrapper = mount(<App />);
    const modal = wrapper.find("Modal");
    const userDetails = { name: "", pwd: "aapbbqdefty" };
    wrapper.setState({ user: userDetails });
    modal.props().onSubmit();
    expect(wrapper.state().showError).toEqual(true);
    expect(wrapper.state().user.name).toEqual("");
  });

  it("when user form is filled with incorrect pwd, on submit it should show error message ", () => {
    const wrapper = mount(<App />);
    const modal = wrapper.find("Modal");
    const userDetails = { name: "one", pwd: "aabbcc" };
    wrapper.setState({ user: userDetails });
    modal.props().onSubmit();
    expect(JSON.parse(sessionStorage.getItem("showLogin"))).toEqual(null);
    expect(wrapper.state().showError).toEqual(true);
    expect(wrapper.state().showLoggedIn).toEqual(true);
  });

  it("when user form is filled with incorrect pwd, on submit it should show error message ", () => {
    const wrapper = mount(<App />);
    const modal = wrapper.find("Modal");
    const userDetails = { name: "one", pwd: "aapbbqdefty" };
    wrapper.setState({ user: userDetails });
    modal.props().onSubmit();
    expect(wrapper.state().showError).toEqual(false);
    expect(wrapper.state().showLoggedIn).toEqual(false);
    expect(JSON.parse(sessionStorage.getItem("showLogin"))).toEqual(false);
  });
});
