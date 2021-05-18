import React, { useState, useEffect } from "react";
import AlertImg from "../../../Assets/Media/alert-triangle.svg";
const Alert = ({ error, noChange }) => {
  const [hidden, setHidden] = useState(false);
  const [error_info, setErrorInfo] = useState("");
  useEffect(() => {
    switch (error) {
      case "noChange":
        setErrorInfo("Ничего не было изменено!");
        break;
      default:
        setErrorInfo("Была совершена ошибка!");
        break;
    }
  }, []);
  return noChange ? (
    <div className="alert">
      <img className="error_img" src={AlertImg} alt="#" />
      <p className="error_descr">{error_info}</p>
    </div>
  ) : (
    false
  );
};
export default Alert;
