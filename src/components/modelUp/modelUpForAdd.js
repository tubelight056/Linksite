import React, { useState } from "react";
import "./modelUp.css";
import exitIcon from "./exitIcon.svg";
const ModelUpForAdd = (props) => {
  const [link, setLink] = useState();

  const [placeHolder, setPlaceHolder] = useState();
  return (
    <div className="body">
      <div className="outerModelUpScreen">
        <img
          className="modeulUpExitIcon"
          src={exitIcon}
          alt="exit"
          onClick={() => {
            props.onReturnCallBack();
          }}
        />
        <div className="innerModelUpScreen">
          <div className="eachBox">
            <h3 className="questionLabel">Link Name:</h3>
            <input
              type="text"
              onChange={(e) => {
                setPlaceHolder(e.target.value);
              }}
              placeholder="Type Link name"
            />
          </div>
          <div className="eachBox">
            <h3 className="questionLabel">Link:</h3>
            <input
              type="url"
              onChange={(e) => {
                setLink(e.target.value);
              }}
              placeholder="Paste your Link Here"
            />
          </div>

          <input
            type="button"
            value="Submit"
            className="modelButton"
            onClick={() => {
              if (
                link !== undefined &&
                link !== "" &&
                placeHolder !== "" &&
                placeHolder !== undefined
              ) {
                props.onSubmitCallBack({ link, placeHolder });
              } else {
                props.onErrorCallBack("All fields are required");
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ModelUpForAdd;
