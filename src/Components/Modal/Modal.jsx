import React from "react";

const Modal = props => {
  if (!props.show) {
    return null;
  }
  return (
    <div className="login-modal-backdrop">
      <div className="login-modal-content ">
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
    <div className="mb-2 alert alert-danger" role="alert">
      please fill all details correctly !
    </div>
  ) : null;
};

export default Modal;
