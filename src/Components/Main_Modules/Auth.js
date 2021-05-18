import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import "../../Assets/Styles/Common/common.scss";
import "../../Assets/Styles/Avant-garde/auth.scss";
import { enterButtonClicker } from "../../Redux/admin-actions";
import { connect } from "react-redux";
const Auth = (props) => {
  const dispatch = useDispatch();
  const [login, setLogin] = useState("test");
  const [password, setPassword] = useState("test");

  const dataChanger = (e) => {
    switch (e.target.getAttribute("data-type")) {
      case "login":
        setLogin(e.target.value);
        break;
      case "pass":
        setPassword(e.target.value);
        break;
      default:
        console.log("someone help");
        break;
    }
  };

  const loginRealise = (e) => {
    e.preventDefault();
    if (login !== "" || password !== "") {
      dispatch(enterButtonClicker(login, password));
      setPassword("");
    }
  };

  return (
    <div className="container">
      <div className="auth_wrapper">
        {props.check ? (
          <Redirect to="/workspace" />
        ) : (
          <form
            onSubmit={(event) => {
              loginRealise(event);
            }}
            className="brandForm"
          >
            <h3 className="brand-h3">Авторизация</h3>
            <input
              type="text"
              className="brandInput"
              data-type="login"
              onChange={dataChanger}
              value={login}
              placeholder="Введите свой логин..."
              required
            />
            <input
              type="password"
              data-type="pass"
              className="brandInput"
              onChange={dataChanger}
              placeholder="Введите свой пароль..."
              value={password}
              required
            />
            <input type="submit" className="brandButton" value="Войти" />
          </form>
        )}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    check: state.admin.login_check,
    token: state.admin.token,
  };
};
export default connect(mapStateToProps, null)(Auth);
