import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import "./setupTests";

import App from "./App.js";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("App Components", () => {
  it("Click on login button in header opens Modal  ", () => {
    const wrapper = shallow(<App />);
    const header = wrapper.find("Header");
    header.simulate("onLogin", wrapper.setState({ showModal: true }));
    expect(wrapper.state().showModal).toEqual(true);
  });
});
