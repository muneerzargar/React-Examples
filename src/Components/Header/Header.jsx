import React from "react";

const Header = props => {
  return (
    <nav className="navbar fixed-top navbar-dark bg-dark padding-20 flex-column flex-md-row bd-navbar">
      <div className="container">
        <a className="navbar-brand" href="#">
          CN-Jokes
        </a>
        <div>{getAppBtn(props)}</div>
      </div>
    </nav>
  );
};

const getAppBtn = propObj => {
  return propObj.showLogin
    ? loginBtn(propObj.onLogin)
    : logoutBtn(propObj.onLogout);
};

const loginBtn = onLogin => {
  return (
    <button className="btn btn-outline-success mr-sm-2" onClick={onLogin}>
      Login
    </button>
  );
};

const logoutBtn = onLogout => {
  return (
    <button className="btn btn-outline-warning my-2 my-sm-0" onClick={onLogout}>
      Logout
    </button>
  );
};

export default Header;
