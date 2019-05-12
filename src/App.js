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
    user: {}
  };

  componentDidMount() {
    if (JSON.parse(sessionStorage.getItem("showLogin")) !== null) {
      const showLogin = JSON.parse(localStorage.getItem("showLogin"));
      this.setState({ showLoggedIn: showLogin });
    }
  }
  render() {
    return (
      <div className="App">
        <Header
          showLogin={this.state.showLoggedIn}
          onLogin={() => {
            this.setState({ showModal: true, user: {} });
          }}
          onLogout={this.handleLogout}
        />
        <Modal
          show={this.state.showModal}
          onSubmit={this.handleSubmit}
          error={this.state.showError}
        >
          <div className="form-group">
            <label className="col-form-label">
              <div className="mb-sm-1"> User name: </div>
              <input
                type="text"
                className="form-control"
                value={this.state.user.name || ""}
                id="name"
                onChange={event =>
                  this.handleChange(event.target.id, event.target.value)
                }
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
                value={this.state.user.pwd || ""}
                id="pwd"
                onChange={event =>
                  this.handleChange(event.target.id, event.target.value)
                }
              />
            </label>
          </div>
        </Modal>
        <main role="main" className="mt-8">
          <CNJokesList />
        </main>

        <Footer />
      </div>
    );
  }

  handleChange = (property, value) => {
    const { user } = this.state;
    user[property] = value;
    this.setState({ user: user });
  };

  handleLogout = () => {
    sessionStorage.setItem("showLogin", JSON.stringify(true));
    this.setState({ showLoggedIn: true });
  };

  handleSubmit = () => {
    const userVal = this.state.user.name;
    const pwdStr = this.state.user.pwd;
    let errorFlag = false;
    console.log(pwdStr);
    if (
      this.checkLowerCaseWithException(pwdStr) &&
      pwdStr.length >= 3 &&
      userVal !== "" &&
      this.isIncreasingSequence(pwdStr)
    ) {
      sessionStorage.setItem("showLogin", JSON.stringify(false));
      this.setState({ showLoggedIn: false });
      this.setState({ showModal: false });
    } else {
      errorFlag = true;
    }
    this.setState({ showError: errorFlag });
  };

  checkLowerCaseWithException = str => {
    return /^[a-z][^ilo]+$/.test(str);
  };

  isIncreasingSequence = value => {
    const valArr = value.split("");
    const validAlphaArray = this.getAlphaArray("a", "z", ["i", "o", "l"]);
    let condA = false;
    let sequenceFlag = false;
    let charPairCount = 0;

    for (let i = 0; i < valArr.length - 2; i++) {
      if (
        valArr[i + 1] ===
          validAlphaArray[validAlphaArray.indexOf(valArr[i]) + 1] &&
        valArr[i + 2] ===
          validAlphaArray[validAlphaArray.indexOf(valArr[i]) + 2]
      ) {
        condA = true;
        break;
      }
    }
    if (condA) {
      for (let i = 0; i < valArr.length; i++) {
        if (
          valArr[i] === valArr[i + 1] &&
          validAlphaArray[validAlphaArray.indexOf(valArr[i]) + 1] ===
            valArr[i + 3] &&
          validAlphaArray[validAlphaArray.indexOf(valArr[i]) + 1] ===
            valArr[i + 2]
        ) {
          sequenceFlag = false;
        }
        if (
          ((valArr[i] === valArr[i + 1]) === valArr[i + 2]) ===
          valArr[i + 3]
        ) {
          charPairCount = charPairCount + 2;
        }
        if (
          valArr[i] === valArr[i + 1] &&
          valArr[i + 1] !== valArr[i + 3] &&
          valArr[i] !== valArr[i - 1]
        ) {
          charPairCount = charPairCount + 1;
        }
      }
    }
    if (charPairCount >= 2) {
      sequenceFlag = true;
    }
    return sequenceFlag;
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
}

export default App;
