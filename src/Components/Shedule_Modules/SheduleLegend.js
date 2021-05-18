import React from "react";
import "../../Assets/Styles/Avant-garde/schedules.scss";
const SheduleLegend = () => {
  return (
    <>
      <div className="page_item_wide_disabled">
        <div className="page_item_descr text_start">
          <p>
            <span className="colorLegend _weekly"></span>- еженедельные
          </p>
          <p>
            <span className="colorLegend _odd"></span>- по нечётным неделям
          </p>
          <p>
            <span className="colorLegend _even"></span>- по чётным неделям
          </p>
        </div>
      </div>
    </>
  );
};

export default SheduleLegend;
