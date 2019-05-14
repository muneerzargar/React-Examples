import React from "react";
import { shallow, mount } from "enzyme";
import "../../setupTests";

import axios from "axios";
import CNJokesList from "./CNJokesList.jsx";

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

    it("Click on favourite button sets the value in favourites", () => {
      const wrapper = mount(<CNJokesList />);
      const buttons = wrapper.find("button");
      const fetchJoke = buttons.at(0);
      fetchJoke.simulate("click", wrapper.setState({ CNJokesList: jokes }));
      const item = wrapper.find("CNJokeItem");
      item
        .at(0)
        .props()
        .onSetFavourite(jokes[0]);
      expect(wrapper.state().CNJokesFav).toHaveLength(1);
    });
  });

  describe("When delete button is clicked in favourites", () => {
    it("Should delete the entry from the favourites", () => {
      const wrapper = mount(<CNJokesList />);
      const favJokesList = wrapper.state().CNJokesFav.slice();
      const item = wrapper.find("CNJokeItem");
      item
        .at(0)
        .props()
        .onDelete(favJokesList[0]);
      expect(wrapper.state().CNJokesFav).toHaveLength(0);
    });
  });
});
