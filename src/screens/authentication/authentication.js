import React, { useState } from "react";
import Login from "../../components/Login/Login.js";
import Register from "../../components/Register/Register.js";
import { useHistory } from "react-router";
import "./authentication.css";
import axios from "axios";
import config from "../../url";

const Authentication = () => {
  const history = useHistory();
  const [typeOfAuth, setTypeOfAuth] = useState("login");
  const [errorMessage, seterrorMessage] = useState(null);
  const [MousePosition, setMousePosition] = useState({
    left: 0,
    top: 0,
  });

  const onErrorHandler = (data) => {
    seterrorMessage(data);
    setTimeout(() => {
      seterrorMessage(null);
    }, [5000]);
  };

  const onLoginHandler = async (loginData) => {
    await axios
      .post(config.API_URL + "/user/login", {
        email: loginData.email,
        password: loginData.password,
      })
      .then(async (data) => {
        if (!data.data.status) {
          onErrorHandler(data.data.statusMessage);
        } else {
          sessionStorage.setItem("email", loginData.email);
          sessionStorage.setItem("name", data.data.name);
          sessionStorage.setItem("id", data.data.id);
          history.replace(`/${data.data.name}/home/${data.data.id}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onRegisterHandler = async (Rdata) => {
    await axios
      .post(config.API_URL + "/user/register", {
        email: Rdata.email.toLowerCase(),
        password: Rdata.password,
        name: Rdata.name,
      })
      .then(async (data) => {
        if (!data.data.status) {
          onErrorHandler(data.data.statusMessage);
        } else {
          sessionStorage.setItem("email", Rdata.email.toLowerCase());
          sessionStorage.setItem("name", data.data.name);
          sessionStorage.setItem("id", data.data.id);
          history.replace(`/${data.data.name}/home/${data.data.id}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleMouseMove(ev) {
    setMousePosition({ left: ev.pageX, top: ev.pageY });
  }

  return (
    <div className="outerScreen">
      <div className="content">
        <h1 className="greetingh1">Welcome to linksite</h1>
        {typeOfAuth === "login" ? (
          <Login
            callBack={(data) => {
              onLoginHandler(data);
            }}
            errorCallBack={(data) => {
              onErrorHandler(data);
            }}
          />
        ) : (
          <Register
            callBack={(data) => {
              onRegisterHandler(data);
            }}
            errorCallBack={(data) => {
              onErrorHandler(data);
            }}
          />
        )}
        <p
          className="formswitcherp"
          onClick={() => {
            setTypeOfAuth(typeOfAuth === "login" ? "signin" : "login");
          }}
        >
          {typeOfAuth === "login"
            ? "Don't you have account? Click Me"
            : "Do you have an account? click me"}
        </p>
        {errorMessage !== null && (
          <h1 className="errorMessageH1">{`${errorMessage}`}</h1>
        )}
      </div>
      <div onMouseMove={(ev) => handleMouseMove(ev)} className="design">
        <h1 className="eascapeh1">You got a follower</h1>
        <div
          style={{
            left: MousePosition.left,
            top: MousePosition.top,
          }}
          className="circle"
        ></div>
      </div>
    </div>
  );
};

export default Authentication;
