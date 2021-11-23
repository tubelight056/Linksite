import React from "react";
import "./LinkCard.css";
import DeleteIcon from "./deleteIcon.ico";

const LinkCard = (props) => {
  const onClickCallBack = () => {
    window.open(props.link);
  };
  return (
    <div
      className="outerBoxlinkCard"
      onClick={() => {
        props.access === "denied" && onClickCallBack();
      }}
    >
      <div
        className={
          "innerBoxlinkCard " + (props.access !== "granted" ? "gridview" : " ")
        }
      >
        <h1
          onClick={() => {
            onClickCallBack();
          }}
        >
          {props.placeHolder}
        </h1>
        {props.access === "granted" && (
          <img
            className="linkCardDeleteIcon"
            src={DeleteIcon}
            alt="deletebutton"
            onClick={() => {
              props.onDeleteCallBack(props.id);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default LinkCard;
