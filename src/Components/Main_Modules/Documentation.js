import React, { useState } from "react";
import "../../Assets/Styles/Common/common.scss";
import "../../Assets/Styles/Avant-garde/documentation.scss";
import arrowRightIcon from "../../Assets/Media/arrow-right-s-fill.png";
import arrowDownIcon from "../../Assets/Media/arrow-down-s-fill.png";
import SelectController from "./ItemSelectController/SelectController";
const Documentation = () => {
  const [userSelect, setUserSelect] = useState("");
  const userClick = (e) => {
    e.target.getAttribute("data-item-value")
      ? setUserSelect(e.target.getAttribute("data-item-value"))
      : setUserSelect(
          e.target.parentElement.parentElement.getAttribute("data-item-value")
        );
  };
  const userSelectReset = (e) => {
    setUserSelect("");
  };
  return (
    <div className="container">
      <div className="content_holder">
        <div className="vertical_items_holder">
          {userSelect ? (
            <>
              <button className="brandButton" onClick={userSelectReset}>
                Вернуться
              </button>
              <SelectController select={userSelect} />
            </>
          ) : (
            <>
              <div
                className="vertical_item"
                data-item-value="about"
                onClick={userClick}
              >
                <div className="vert_hor_item_img_holder">
                  <img
                    src={arrowRightIcon}
                    alt="#"
                    className="vert_hor_item_img"
                  ></img>
                </div>
                <div className="vert_hor_item_desc">
                  <h5 className="brand-h5 ">Основная задача данного проекта</h5>
                </div>
              </div>
              <div
                className="vertical_item"
                data-item-value="manual"
                onClick={userClick}
              >
                <div className="vert_hor_item_img_holder">
                  <img
                    src={arrowRightIcon}
                    alt="#"
                    className="vert_hor_item_img"
                  ></img>
                </div>
                <div className="vert_hor_item_desc">
                  <h5 className="brand-h5 ">Руководство пользователя</h5>
                </div>
              </div>
              <div
                className="vertical_item"
                data-item-value="feedback"
                onClick={userClick}
              >
                <div className="vert_hor_item_img_holder">
                  <img
                    src={arrowRightIcon}
                    alt="#"
                    className="vert_hor_item_img"
                  ></img>
                </div>
                <div className="vert_hor_item_desc">
                  <h5 className="brand-h5 ">Форма обратной связи</h5>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Documentation;
