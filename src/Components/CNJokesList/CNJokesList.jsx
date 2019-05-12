import React, { Component } from "react";
import axios from "axios";
import CNJokeItem from "../CNJokeItem/CNJokeItem.jsx";
class CNJokesList extends Component {
  state = {
    CNJokesList: [],
    CNJokesFav: [],
    toggleFav: true
  };

  constructor() {
    super();
    this.CNJokesList = [];
    this.favJokes = [];
    this.interval = null;
  }

  componentDidMount() {
    if (JSON.parse(localStorage.getItem("favourites")) !== null) {
      this.favJokes = JSON.parse(localStorage.getItem("favourites"));
      this.setState({ CNJokesFav: this.favJokes });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-6">
            <button
              className="btn btn-outline-primary mr-sm-2 mb-sm-3"
              onClick={() => this.fetchJokes()}
            >
              Get Jokes
            </button>
          </div>
          <div className="col-6">
            <button className="btn btn-secondary" onClick={this.handleToggle}>
              Toggle Jokes
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col jokes">
            <h2> Chuck Norris Jokes</h2>
            {this.getCNItems()}
          </div>
          <div className="col favourites">
            <h2>Favourite Jokes</h2>
            {this.getFavItems()}
          </div>
        </div>
      </div>
    );
  }

  fetchJokes = () => {
    this.getResponse(
      "CNJokesList",
      "http://api.icndb.com/jokes/random/10"
    ).then(response => this.setState({ CNJokesList: response.data.value }));
  };

  getResponse = async (property, url) => {
    return await axios.get(url);
  };

  getCNItems() {
    return (
      <ul>
        {this.state.CNJokesList.map(jokeItem => (
          <li key={jokeItem.id} className="col-12">
            <CNJokeItem
              item={jokeItem}
              onSetFavourite={this.handleFavourites}
              showFavourites
            />
          </li>
        ))}
      </ul>
    );
  }

  getFavItems() {
    return (
      <ul>
        {this.state.CNJokesFav.map(jokeItem => (
          <li key={jokeItem.id} className="col-12">
            <CNJokeItem
              item={jokeItem}
              onDelete={this.handleDelete}
              showDelete
            />
          </li>
        ))}
      </ul>
    );
  }

  handleFavourites = joke => {
    if (this.favJokes.indexOf(joke) === -1 && this.favJokes.length !== 10) {
      this.favJokes.push(joke);
    }
    localStorage.setItem("favourites", JSON.stringify(this.favJokes));
    this.setState({ CNJokesFav: this.favJokes });
  };

  handleDelete = joke => {
    if (this.favJokes.indexOf(joke) !== -1) {
      const index = this.favJokes.indexOf(joke);
      this.favJokes.splice(index, 1);
    }
    localStorage.setItem("favourites", JSON.stringify(this.favJokes));
    this.setState({ CNJokesFav: this.favJokes });
  };

  handleToggle = () => {
    console.log(this.state.toggleFav);
    this.setState({ toggleFav: !this.state.toggleFav });
    if (this.state.toggleFav) {
      this.interval = setInterval(() => {
        this.getResponse(
          "CNJokesFav",
          "http://api.icndb.com/jokes/random/1"
        ).then(response => this.handleFavourites(response.data.value[0]));
      }, 5000);
    } else {
      clearInterval(this.interval);
    }
  };
}

export default CNJokesList;
