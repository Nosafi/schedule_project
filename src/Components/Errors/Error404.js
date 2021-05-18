import React from "react";
import "../../Assets/Styles/Common/common.scss";
import "../../Assets/Styles/Middle-garde/Error.scss";
import errorImg from "../../Assets/Media/alert-triangle.svg";
const Error404 = () => {
  return (
    <div className="container">
      <div className="content_holder">
        <div className="vertical_items_holder">
          <div className="vertical_item_center_column ">
            <div className="error_img_holder">
              <img src={errorImg} alt="#" className="vert_hor_item_img" />
            </div>
            <div className="vert_hor_item_descs">
              <h5 className="error-h5">Ссылка недействительна!</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Error404;
