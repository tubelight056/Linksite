import axios from "axios";
import React, { useEffect, useState } from "react";
import Collectioncard from "../../components/collectioncard/CollectionCard";
import "./Home.css";
import AddIcon from "./addIcon.ico";
import { useHistory } from "react-router";
import config from "../../config";

const Home = (props) => {
  const history = useHistory();
  const params = props.match.params;
  const [collectionList, setcollectionList] = useState([]);
  const [errorMessage, seterrorMessage] = useState(null);
  const [newCollection, setNewCollection] = useState("");
  const email = sessionStorage.getItem("email");

  const onErrorHandler = (data) => {
    seterrorMessage(data);
    setTimeout(() => {
      seterrorMessage(null);
    }, [5000]);
  };
  const getCollectionListHandler = async () => {
    await axios
      .post(config.API_URL + "/user/getcollectionlist", {
        id: params.id,
        email: email,
      })
      .then(async (data) => {
        if (data.data.status) {
          setcollectionList([...data.data.collections]);
        } else {
          onErrorHandler(data.data.statusMessage);
        }
      })
      .catch((err) => {
        onErrorHandler("Something went wrong , please try again");
      });
  };
  const onSelectHandler = (data) => {
    history.push(`/collection/${data.id}`);
  };
  const onCreateHandler = async () => {
    if (newCollection === "") {
      onErrorHandler("Enter a Valid Collection Name");
    } else {
      await axios
        .post(config.API_URL + "/collection/createcollection", {
          id: params.id,
          email: email,
          collectionName: newCollection,
        })
        .then(async (data) => {
          if (data.data.status) {
            getCollectionListHandler();
            setNewCollection("");
          } else {
            onErrorHandler(data.data.statusMessage);
          }
        })
        .catch((err) => {
          onErrorHandler("Something went wrong , please try again");
        });
    }
  };
  const onDeleteHandler = async (data) => {
    await axios
      .post(config.API_URL + "/collection/deletecollection", {
        id: params.id,
        email: email,
        collectionId: data.id,
      })
      .then(async (data) => {
        if (data.data.status) {
          getCollectionListHandler();
        } else {
          onErrorHandler(data.data.statusMessage);
        }
      })
      .catch((err) => {
        onErrorHandler("Something went wrong , please try again");
      });
  };
  useEffect(() => {
    getCollectionListHandler();
  });
  return (
    <div className="homeOuterScreen">
      <div className="homeInnerScreen">
        <h1 className="welcomeh1">Welcome Prem ,Here your Collections</h1>
        {collectionList !== [] &&
          collectionList.map((data) => (
            <Collectioncard
              key={data._id}
              collectionName={data.collectionName}
              id={data._id}
              onDeleteCallBack={(data) => {
                onDeleteHandler(data);
              }}
              onSelectCallBack={(data) => {
                onSelectHandler(data);
              }}
            />
          ))}
        <div className="outerBoxAddContainer">
          <div className="addCollection">
            <input
              className="homeInput"
              type="text"
              name="Collection"
              placeholder="Add Collection"
              value={newCollection}
              onChange={(e) => {
                setNewCollection(e.target.value);
              }}
            />
            <img
              src={AddIcon}
              alt="add button"
              className="HomeAddIcon"
              onClick={() => {
                onCreateHandler();
              }}
            />
          </div>
        </div>
      </div>
      {errorMessage !== null && (
        <h1 className="errorMessageH1Home">{`${errorMessage}`}</h1>
      )}
    </div>
  );
};

export default Home;
