import React, { useState } from "react";
import "./CollectionCard.css";
import DeleteIcon from "./deleteIcon.ico";

const Collectioncard = (props) => {
  // console.log(props);
  const [collectionName, setcollectionName] = useState(props.collectionName);
  const [id, setid] = useState(props.id);
  const onClickCallBack = () => {
    props.onSelectCallBack({ collectionName, id });
  };
  return (
    <div className="outerBoxCollectionCard">
      <div className="innerBoxCollectionCard">
        <h1 onClick={() => onClickCallBack()}>{collectionName}</h1>
        <img
          className="collectionCardDeleteIcon"
          src={DeleteIcon}
          alt="deletebutton"
          onClick={() => {
            props.onDeleteCallBack({ collectionName, id });
          }}
        />
      </div>
    </div>
  );
};

export default Collectioncard;
