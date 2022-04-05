import React, { useState } from "react";
import "./Register.css";
const Register = (props) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [name, setname] = useState("");
  const [missValue, setMissValue] = useState([]);
  const validemail = new RegExp(
    "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
  );
  const atleastOneLower = new RegExp("(?=.*[a-z])");
  const atleastOneUpper = new RegExp("(?=.*[A-Z])");
  const atleastOneSymbol = new RegExp("(?=.*[!@#$%^&*])");
  const atleastOneNumber = new RegExp("(?=.*[0-9])");
  const onSubmitHandler = () => {
    if (password === "" && !missValue.includes(2)) {
      setMissValue([...missValue, 2]);
      props.errorCallBack("Password is missing");
    } else if (!atleastOneLower.test(password) && !missValue.includes(2)) {
      setMissValue([...missValue, 2]);
      props.errorCallBack(
        "Not a strong password,hover 'Password' to know more"
      );
    } else if (!atleastOneUpper.test(password) && !missValue.includes(2)) {
      setMissValue([...missValue, 2]);
      props.errorCallBack(
        "Not a strong password,hover 'Password' to know more"
      );
    } else if (!atleastOneNumber.test(password) && !missValue.includes(2)) {
      setMissValue([...missValue, 2]);
      props.errorCallBack(
        "Not a strong password,hover 'Password' to know more"
      );
    } else if (!atleastOneSymbol.test(password) && !missValue.includes(2)) {
      setMissValue([...missValue, 2]);
      props.errorCallBack(
        "Not a strong password,hover 'Password' to know more"
      );
    } else if (password.length < 8 && !missValue.includes(2)) {
      setMissValue([...missValue, 2]);
      props.errorCallBack(
        "Not a strong password,hover 'Password' to know more"
      );
    }

    if (email === "" && !missValue.includes(3)) {
      setMissValue([...missValue, 3]);
      props.errorCallBack("Email is missing");
    } else if (!validemail.test(email) && !missValue.includes(3)) {
      props.errorCallBack("Enter a valid E-mail");
      setMissValue([...missValue, 3]);
    }

    if (name === "" && !missValue.includes(1)) {
      setMissValue([...missValue, 1]);
      props.errorCallBack("Your Name is missing");
    }

    if (missValue.length === 0) {
      setname(name.toLowerCase());
      setemail(email.toLowerCase());
      props.callBack({ name, email, password });
    }
  };
  return (
    <div className="outerContainer">
      <div className="innerContainer">
        <h1 className="registerh1">Create an account:</h1>
        <div className="eachItem">
          <h1 className="nameLabel">
            Name:
            {missValue.includes(1) && (
              <div className="bandge">
                <div className="pulser"></div>
              </div>
            )}
          </h1>

          <input
            className="nameInput Input"
            onChange={(e) => {
              setname(e.target.value);
            }}
            onClick={() => {
              setMissValue(missValue.filter((item) => item !== 1));
            }}
            required
            type="string"
            placeholder={"This is gonna be your username"}
          />
        </div>
        <div className="eachItem">
          <h1 className="emailLabel">
            E-mail:
            {missValue.includes(3) && (
              <div className="bandge">
                <div className="pulser"></div>
              </div>
            )}
          </h1>
          <input
            className="emailInput Input"
            onChange={(e) => {
              setemail(e.target.value);
            }}
            onClick={() => {
              setMissValue(missValue.filter((item) => item !== 3));
            }}
            required
            type="email"
            placeholder={"Type your email"}
          />
        </div>
        <div className="eachItem">
          <h1
            className="passwordLabel"
            title="Password must be at least eight characters long, contain lower case, uppercase, number and symbol character"
          >
            Password:
            {missValue.includes(2) && (
              <div className="bandge">
                <div className="pulser"></div>
              </div>
            )}
          </h1>
          <input
            className="passwordInput Input"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            required
            onClick={() => {
              setMissValue(missValue.filter((item) => item !== 2));
            }}
            placeholder={"It should match exactly Re-mem-ber"}
          />
        </div>
        <input
          className="LoginButton button"
          type="button"
          Value="Go in"
          onClick={() => onSubmitHandler()}
        />
      </div>
    </div>
  );
};

export default Register;
