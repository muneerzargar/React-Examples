import React from "react";

const backdropStyle = {
  position: "fixed",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "rgba(0,0,0,0.3)",
  padding: 50,
  zIndex: 1
};

const modalStyle = {
  backgroundColor: "#fff",
  borderRadius: 5,
  maxWidth: "300px",
  maxHeight: "300px",
  margin: "10rem auto",
  display: "block",
  padding: 30
};

const errorStyle = {
  color: "red"
};

const Modal = props => {
  if (!props.show) {
    return null;
  }
  return (
    <div className="backdrop" style={backdropStyle}>
      <div style={modalStyle}>
        {props.children}
        {getErrorText(props.error)}

        <div className="footer">
          <button
            className="btn btn-outline-success mr-sm-2"
            onClick={props.onSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

const getErrorText = errorFlag => {
  return errorFlag ? (
    <div className="mb-2" style={errorStyle}>
      please fill all details correctly !
    </div>
  ) : null;
};

export default Modal;
