import React from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const cursorStyle = {
  cursor: "pointer"
};

const CNJokeItem = ({
  item,
  showFavourites,
  showDelete,
  onSetFavourite,
  onDelete
}) => {
  const CNItem = item;
  CNItem.favouriteFlag = showFavourites;
  CNItem.deleteFlag = showDelete;

  return (
    <div>
      <div className="row">
        <div className="col-10">
          <p>{item.joke}</p>
        </div>
        <div className="col-2">
          {showBtns(onSetFavourite, onDelete, CNItem)}
        </div>
      </div>
    </div>
  );
};

const showBtns = (onSetFavourite, onDelete, item) => {
  //TODO: This can be improved..
  let result;

  if (item.favouriteFlag) {
    result = favBtn(onSetFavourite, item);
  }
  if (item.deleteFlag) {
    result = deleteBtn(onDelete, item);
  }

  return result;
};

const favBtn = (onSetFavourite, jokeItem) => {
  return (
    <div
      role="button"
      className="col-6"
      style={cursorStyle}
      onClick={() => {
        onSetFavourite(jokeItem);
      }}
    >
      <FontAwesomeIcon icon={faStar} />
    </div>
  );
};

const deleteBtn = (onDelete, jokeItem) => {
  return (
    <div
      role="button"
      className="col-6"
      style={cursorStyle}
      onClick={() => {
        onDelete(jokeItem);
      }}
    >
      <FontAwesomeIcon icon={faTrash} />
    </div>
  );
};

export default CNJokeItem;
