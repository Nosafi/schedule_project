import React from "react";
import Loader from "../../Assets/Media/page_loader.gif";
import "../../Assets/Styles/Common/common.scss";
const PageLoader = () => {
  return (
    <div className="loader_holder">
      <img src={Loader} alt="Page loader" className="loader" />
    </div>
  );
};

export default PageLoader;
