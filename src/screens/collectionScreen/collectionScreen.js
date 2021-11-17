import React, { useState, useEffect } from "react";
import axios from "axios";
import "./collectionScreen.css";
import EditIcon from "./editIcon.svg";
import LinkCard from "../../components/LinkCard/LinkCard";
import ModelUpForAdd from "../../components/modelUp/modelUpForAdd";
import ModelUpForUpdate from "../../components/modelUp/modelUpForUpdate";
import config from "../../url";

const Collectionscreen = (props) => {
  const collectionId = props.match.params.id;
  const [name, setName] = useState();
  const [linkList, setLinkList] = useState([]);
  const [access, setAccess] = useState("denied");
  const [collectionName, setCollectionName] = useState("");
  const [viewCounts, setViewCounts] = useState(0);
  const [errorMessage, seterrorMessage] = useState(null);
  const [state, setstate] = useState(null);
  const onErrorHandler = (data) => {
    seterrorMessage(data);
    setTimeout(() => {
      seterrorMessage(null);
    }, [5000]);
  };
  const getCollectionHandler = async () => {
    await axios
      .post(config.API_URL + "/collection/getcollection", {
        collectionId: collectionId,
        ...(sessionStorage.getItem("id") && {
          id: sessionStorage.getItem("id"),
        }),
      })
      .then(async (data) => {
        if (data.data.status) {
          setAccess(data.data.access);
          setName(data.data.name);
          setCollectionName(data.data.collectionName);
          await setLinkList([...data.data.Links]);
          if (access === "granted") {
            setViewCounts(data.data.viewCounts);
          }
        } else {
          onErrorHandler(data.data.statusMessage);
        }
      })
      .catch((err) => {
        onErrorHandler("Something went wrong , please try again");
      });
  };

  const onAddingNewLinkHandler = async (props) => {
    await axios
      .post(config.API_URL + "/collection/addlink", {
        id: sessionStorage.getItem("id"),
        collectionId: collectionId,
        linkName: props.placeHolder,
        link: props.link,
      })
      .then(async (data) => {
        if (data.data.status) {
          getCollectionHandler();
        } else {
          onErrorHandler(data.data.statusMessage);
        }
      })
      .catch((err) => {
        onErrorHandler("Something went wrong , please try again");
      });
  };

  const onLinkDeleteHandler = async (props) => {
    await axios
      .post(config.API_URL + "/collection/removelink", {
        id: sessionStorage.getItem("id"),
        collectionId: collectionId,
        linkId: props,
      })
      .then(async (data) => {
        if (data.data.status) {
          getCollectionHandler();
        } else {
          onErrorHandler(data.data.statusMessage);
        }
      })
      .catch((err) => {
        onErrorHandler("Something went wrong , please try again");
      });
  };

  const onCollectionNameHandler = async (props) => {
    await axios
      .post(config.API_URL + "/collection/updatecollection", {
        id: sessionStorage.getItem("id"),
        collectionId: collectionId,
        collectionName: props,
      })
      .then(async (data) => {
        if (data.data.status) {
          getCollectionHandler();
        } else {
          onErrorHandler(data.data.statusMessage);
        }
      })
      .catch((err) => {
        onErrorHandler("Something went wrong , please try again");
      });
  };

  useEffect(() => {
    getCollectionHandler();
  });
  return (
    <div className="outerCollectionScreen">
      <div className="innerCollectionScreen">
        <h1 className="collectionNameH1">{name}</h1>
        <p className="collectionNameH4">
          {collectionName}
          {access === "granted" && (
            <img
              className="editIcon"
              src={EditIcon}
              alt="edit icon"
              onClick={() => {
                setstate("update");
              }}
            />
          )}
        </p>
        {access === "granted" && (
          <div className="infoBox">
            <button
              className="collectionButton"
              onClick={() => {
                let text = `http://localhost:3000/collection/${collectionId}`;
                navigator.clipboard.writeText(text);
                onErrorHandler("Link copied with kind");
              }}
            >
              Copy link!
            </button>
            <h4 className="countInfo">views:{viewCounts}</h4>
          </div>
        )}
        {linkList.map(function (item) {
          return (
            <LinkCard
              id={item._id}
              link={item.link}
              access={access}
              placeHolder={item.placeHolder}
              onDeleteCallBack={(props) => {
                onLinkDeleteHandler(props);
              }}
            />
          );
        })}
        {access === "granted" && (
          <div
            className="outerBoxCollectionAdd"
            onClick={() => {
              setstate("addLink");
            }}
          >
            <div className="innerBoxCollectionAdd">
              <h1>Add Link</h1>
            </div>
          </div>
        )}
        {state === "addLink" && (
          <ModelUpForAdd
            onReturnCallBack={() => {
              setstate(null);
            }}
            onSubmitCallBack={(props) => {
              onAddingNewLinkHandler(props);
              setstate(null);
            }}
            onErrorCallBack={(props) => {
              onErrorHandler(props);
            }}
          />
        )}
        {state === "update" && (
          <ModelUpForUpdate
            onReturnCallBack={() => {
              setstate(null);
            }}
            onSubmitCallBack={(props) => {
              onCollectionNameHandler(props);
              setstate(null);
            }}
            onErrorCallBack={(props) => {
              onErrorHandler(props);
            }}
          />
        )}
      </div>
      {errorMessage !== null && (
        <h1 className="errorMessageH1Collection">{`${errorMessage}`}</h1>
      )}
    </div>
  );
};

export default Collectionscreen;
