import React, { useState } from "react";
import "./modelUp.css";
import exitIcon from "./exitIcon.svg";
const ModelUpForUpdate = (props) => {
  const [collectionName, setCollectionName] = useState(props.collectionName);
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
            <h3 className="questionLabel">Edit Collection Name:</h3>
            <input
              type="text"
              onChange={(e) => {
                setCollectionName(e.target.value);
              }}
              placeholder={props.collectionName}
            />
          </div>
          <input
            type="button"
            value="Submit"
            className="modelButton"
            onClick={() => {
              if (collectionName !== "") {
                props.onSubmitCallBack(collectionName);
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

export default ModelUpForUpdate;
