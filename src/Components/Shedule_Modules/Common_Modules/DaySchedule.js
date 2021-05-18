import React, { useState, useEffect } from "react";
import "../../../Assets/Styles/Common/common.scss";

const DaySchedule = ({ item, teacher }) => {
  const typeView = () => {
    switch (item.Type) {
      case "lection":
        return "Лекция";
      case "pr_gr1":
        return "Пр. - 1 подгр.";
      case "pr_gr2":
        return "Пр. - 2 подгр.";
      default:
        break;
    }
  };
  return (
    <>
      <div className="page_item_disabled">
        <div className="page_item_descr">
          <p>{item.Time}</p>
        </div>
      </div>
      <div className="page_item_disabled">
        <div className="page_item_descr">
          <p>{item.Object}</p>
        </div>
      </div>

      {!teacher ? (
        <div className="page_item_disabled">
          <div className="page_item_descr">
            <p>{item.Group_number}</p>
          </div>
        </div>
      ) : (
        <div className="page_item_disabled">
          <div className="page_item_descr">
            <p>
              {item.Teacher.split(" ")[1] + " "}
              {item.Teacher.split(" ")[0].split("")[0]}.
              {item.Teacher.split(" ")[2].split("")[0]}.
            </p>
          </div>
        </div>
      )}

      <div className="page_item_disabled">
        <div className="page_item_descr">
          <p>{item.build_number + "к " + item.Room}</p>
        </div>
      </div>
      <div className="page_item_disabled">
        <div className="page_item_descr">
          <p>{typeView()}</p>
        </div>
      </div>
    </>
  );
};
export default DaySchedule;
