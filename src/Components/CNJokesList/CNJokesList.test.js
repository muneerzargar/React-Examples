import React from "react";
import { shallow } from "enzyme";
import "../../setupTests";

import axios from "axios";
import CNJokesList from "./CNJokesList.jsx";
import CNJokeItem from "../CNJokeItem/CNJokeItem.jsx";

jest.mock("axios");

describe("CNJokesList Components", () => {
  describe('When "get jokes" button is clicked ', () => {
    const jokes = [
      {
        id: 1,
        joke: "hello"
      },
      {
        id: 2,
        joke: "foo"
      },
      {
        id: 3,
        joke: "baz"
      }
    ];

    it("Should fetch jokes", () => {
      const getSpy = jest.spyOn(axios, "get");
      const wrapper = shallow(<CNJokesList />);
      const fetchJoke = wrapper.find("button.btn-outline-primary");
      fetchJoke.simulate("click");
      expect(getSpy).toBeCalled();
    });

    it("Should display jokes", () => {
      const wrapper = shallow(<CNJokesList />);
      const fetchJoke = wrapper.find("button.btn-outline-primary");
      fetchJoke.simulate("click", wrapper.setState({ CNJokesList: jokes }));
      expect(wrapper.find("CNJokeItem")).toHaveLength(3);
    });
  });
});
