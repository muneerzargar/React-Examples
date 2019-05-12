import React, { Component } from "react";
import "./App.css";
import Header from "./Components/Header/Header.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import Modal from "./Components/Modal/Modal.jsx";
import CNJokesList from "./Components/CNJokesList/CNJokesList.jsx";

class App extends Component {
  state = {
    showModal: false,
    showError: false,
    showLoggedIn: true,
    usernameValue: "",
    pwdValue: ""
  };
  render() {
    return (
      <div className="App">
        <Header
          showLogin={this.state.showLoggedIn}
          onLogin={() => {
            this.setState({ showModal: true });
          }}
          onLogout={this.handleLogout}
        />
        <Modal
          show={this.state.showModal}
          onSubmit={this.handleSubmit}
          error={this.state.showError}
        >
          <form>
            <div className="form-group">
              <label className="col-form-label">
                <div className="mb-sm-1"> User name: </div>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.usernameValue}
                  id="username"
                  onChange={this.handleChange}
                />
              </label>
            </div>
            <div className="form-group">
              <label className="col-form-label">
                <div className="mb-sm-1"> Password: </div>
                <input
                  type="password"
                  className="form-control"
                  minLength="3"
                  maxLength="32"
                  value={this.state.pwdValue}
                  id="pwd"
                  onChange={this.handleChange}
                />
              </label>
            </div>
          </form>
        </Modal>
        <main role="main" className="mt-8">
          <CNJokesList />
        </main>

        <Footer />
      </div>
    );
  }

  handleLogin = () => {
    console.log("login ");
    this.setState({ showModal: true });
  };

  handleLogout = () => {
    console.log("logout ");
  };

  handleSubmit = () => {
    console.log("hello submit");

    console.log(this.state.pwdValue, this.state.usernameValue);
    const pwdStr = this.state.pwdValue;
    const pattern = new RegExp(/^[a-z][^il]+$/);
    if (pattern.test(pwdStr) === true) {
      console.log("2 tests passed ");
      this.setState({ showModal: false });
    }
  };

  handleChange = event => {
    if (event.target.id === "username") {
      this.setState({ usernameValue: event.target.value });
    } else if (event.target.id === "pwd") {
      this.setState({ pwdValue: event.target.value });
    }
  };
}

export default App;
