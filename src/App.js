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
    const userVal = this.state.usernameValue;
    const pwdStr = this.state.pwdValue;
    let errorFlag = false;
    console.log(pwdStr);
    if (
      this.isValid(pwdStr) &&
      pwdStr.length >= 3 &&
      userVal !== "" &&
      this.isIncreasingSequence(pwdStr)
    ) {
      //if (this.isIncreasingSequence(pwdStr)) {
      //ToDO: session Storage..
      this.setState({ showModal: false });
      //}
    } else {
      errorFlag = true;
    }
    this.setState({ showError: errorFlag });
  };
  isValid = str => {
    return !/^(?:(\w)\1+)+$/.test(str) && /^[a-z][^il0-9A-Z]+$/.test(str);
  };

  getAlphaArray = (charA, charZ, exceptVal) => {
    var a = [],
      i = charA.charCodeAt(0),
      j = charZ.charCodeAt(0);
    for (; i <= j; ++i) {
      if (!exceptVal.includes(String.fromCharCode(i))) {
        a.push(String.fromCharCode(i));
      }
    }
    return a;
  };

  isIncreasingSequence = value => {
    const valArr = value.split("");
    const validAlphaArray = this.getAlphaArray("a", "z", ["i", "o", "l"]);
    let sequenceFlag = false;
    if (value.match(/[iol]/) === null) {
      for (let i = 0; i < valArr.length - 2; i++) {
        if (
          valArr[i + 1] ===
            validAlphaArray[validAlphaArray.indexOf(valArr[i]) + 1] &&
          valArr[i + 2] ===
            validAlphaArray[validAlphaArray.indexOf(valArr[i]) + 2]
        ) {
          sequenceFlag = true;
        }
      }
    }
    return sequenceFlag;
  };
  checkSequence = pwdStr => {
    let pwdArr = pwdStr.split("");
    let sequenceFlag = false;
    for (let i = 0; i < pwdStr.length - 2; i++) {
      if (
        pwdArr[i].charCodeAt(0) - 96 === pwdArr[i + 1].charCodeAt(0) - 97 &&
        pwdArr[i + 1].charCodeAt(0) - 96 === pwdArr[i + 2].charCodeAt(0) - 97
      ) {
        sequenceFlag = true;
      }
    }
    return sequenceFlag;
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
