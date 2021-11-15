import React, { useState } from "react";
import "./Login.css";
const Login = (props) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [missValue, setMissValue] = useState([]);

  const validemail = new RegExp(
    "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
  );

  const onSubmitHandler = () => {
    if (password === "" && !missValue.includes(2)) {
      props.errorCallBack("Password is missing");
      setMissValue([...missValue, 2]);
    }
    if (email === "" && !missValue.includes(1)) {
      setMissValue([...missValue, 1]);
      props.errorCallBack("Email is missing");
    } else if (!validemail.test(email)) {
      props.errorCallBack("Enter a valid E-mail");
      setMissValue([...missValue, 1]);
    }
    if (missValue.length === 0) {
      setemail(email.toLowerCase());
      props.callBack({ email, password });
    }
  };
  return (
    <div className="louterContainer">
      <div className="linnerContainer">
        <h1 className="loginh1">Login</h1>
        <div className="leachItem">
          <h1 className="lemailLabel">
            E-mail:
            {missValue.includes(1) && (
              <div className="lbandge">
                <div className="lpulser"></div>
              </div>
            )}
          </h1>
          <input
            className="lemailInput Input"
            onChange={(e) => {
              setemail(e.target.value);
            }}
            required
            onClick={() => {
              setMissValue(missValue.filter((item) => item !== 1));
            }}
            type="email"
            placeholder={"Type your email"}
          />
        </div>
        <div className="leachItem">
          <h1 className="lpasswordLabel">
            Password:
            {missValue.includes(2) && (
              <div className="lbandge">
                <div className="lpulser"></div>
              </div>
            )}
          </h1>
          <input
            className="passwordInput Input"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            onClick={(e) => {
              setMissValue(missValue.filter((item) => item !== 2));
            }}
            required
            type="password"
            placeholder={"Type your password"}
          />
        </div>
        <input
          className="LoginButton lbutton"
          type="button"
          value="Go in"
          onClick={() => onSubmitHandler()}
        />
      </div>
    </div>
  );
};

export default Login;
