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
            this.setState({ showModal: true, usernameValue: "", pwdValue: "" });
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
    sessionStorage.setItem("showLogin", JSON.stringify(true));
    this.setState({ showLoggedIn: true });
  };

  handleSubmit = () => {
    const userVal = this.state.usernameValue;
    const pwdStr = this.state.pwdValue;
    let errorFlag = false;
    console.log(pwdStr);
    if (
      this.checkLowerCaseWithException(pwdStr) &&
      pwdStr.length >= 3 &&
      userVal !== "" &&
      this.checkRecurring(pwdStr)
    ) {
      //if (this.isIncreasingSequence(pwdStr)) {
      //ToDO: session Storage..
      sessionStorage.setItem("showLogin", JSON.stringify(false));
      this.setState({ showLoggedIn: false });
      this.setState({ showModal: false });
      //}
    } else {
      errorFlag = true;
    }
    this.setState({ showError: errorFlag });
  };

  checkLowerCaseWithException = str => {
    return /^[a-z][^ilo]+$/.test(str);
  };

  checkRecurring = str => {
    const letterBase = "abcdefghijklmnopqrstuvwxyz";
    const normalBase = "0123456789abcdefghijklmnop";
    const bigCheck = /012|123|234|345|456|567|678|789|89a|9ab|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop/;
    const mediumCheck = /(.)\1.*?(.)\2/;
    //const smallCheck = /[8ad]/;

    let pwdNum = parseInt(
      str.replace(/./g, ch => normalBase[letterBase.indexOf(ch)]),
      26
    );
    let newPwd = pwdNum.toString(26);

    // while (
    //   !bigCheck.test(newPwd) ||
    //   smallCheck.test(newPwd) ||
    //   !mediumCheck.test(newPwd)
    // ) {
    //   newPwd = pwdNum.toString(26);
    //   pwdNum++;
    // }
    console.log(newPwd);
    console.log(!bigCheck.test(newPwd));
    // console.log(smallCheck.test(newPwd));
    console.log(!mediumCheck.test(newPwd));

    return !bigCheck.test(newPwd) && !mediumCheck.test(newPwd);
  };
  // Using functions..

  /*getAlphaArray = (charA, charZ, exceptVal) => {
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
  };*/

  handleChange = event => {
    // TODO: Can be optimized to handle all fileds..
    if (event.target.id === "username") {
      this.setState({ usernameValue: event.target.value });
    } else if (event.target.id === "pwd") {
      this.setState({ pwdValue: event.target.value });
    }
  };
}

export default App;
