import React from "react";

const pStyle = {
  fontSize: "15px",
  textAlign: "center",
  color: "#fff"
};

const Footer = () => {
  return (
    <nav className="navbar fixed-bottom navbar-dark bg-dark padding-20">
      <div className="container">
        <p style={pStyle}>All Copyrights reserved © 2019</p>
      </div>
    </nav>
  );
};

export default Footer;
