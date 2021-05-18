import React, { useState, useEffect } from "react";
import DaySchedule from "../Common_Modules/DaySchedule";
import nconf from "../../../CONFIG.json";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { showDayFilter } from "../../../Redux/actions";
const SheduleTableByTeacher = ({ filtered_day }) => {
  let searched_time = [];
  const dispatch = useDispatch();
  let pr = [];
  const [selectedIndex, setSelectedIndex] = useState();

  const dayValidation = (e) => {
    if (Number(e.target.getAttribute("data-index")) !== 6) {
      setSelectedIndex(Number(e.target.getAttribute("data-index")) + 1);
      dispatch(showDayFilter(Number(e.target.getAttribute("data-index")) + 1));
    }
  };
  const scheduleRender = () => {
    const timeValidator = (array, time) => {
      return array.indexOf(time);
    };
    searched_time = [];
    return filtered_day
      ? filtered_day.map((item, index) => {
          if (
            item.Type !== "lection" &&
            timeValidator(searched_time, item.Time) === -1
          ) {
            for (let i = 0; i < filtered_day.length; i++) {
              if (
                filtered_day[i].Time === item.Time &&
                filtered_day[i].Type !== "lection" &&
                filtered_day[i].Type !== item.Type
              ) {
                searched_time.push(item.Time);
                return (
                  <div className={"list_holder no_space"}>
                    <div
                      key={filtered_day[i] + Date.now() + i}
                      className={
                        "vertical_item_disabled _" + filtered_day[i].week
                      }
                    >
                      <DaySchedule item={filtered_day[i]} teacher={false} />
                    </div>
                    <div
                      key={item}
                      className={"vertical_item_disabled _" + item.week}
                    >
                      <DaySchedule item={item} teacher={false} />
                    </div>
                  </div>
                );
              }
            }
          }
          if (
            item.Type === "pr_gr1" &&
            timeValidator(searched_time, item.Time) === -1
          ) {
            return (
              <div className={"list_holder no_space"}>
                <div
                  key={item}
                  className={"vertical_item_disabled _" + item.week}
                >
                  <DaySchedule item={item} teacher={false} />
                </div>
                <div
                  key={Date.now() + index}
                  className={"vertical_item_disabled"}
                >
                  <div className="page_item"></div>
                </div>
              </div>
            );
          }
          if (
            item.Type === "pr_gr2" &&
            timeValidator(searched_time, item.Time) === -1
          ) {
            console.log(searched_time);
            return (
              <div className={"list_holder no_space"}>
                <div
                  key={Date.now() + index}
                  className={"vertical_item_disabled"}
                >
                  <div className="page_item"></div>
                </div>
                <div
                  key={item}
                  className={"vertical_item_disabled _" + item.week}
                >
                  <DaySchedule item={item} teacher={false} />
                </div>
              </div>
            );
          }
          if (item.Type === "lection") {
            return (
              <div
                key={index}
                className={"vertical_item_disabled _" + item.week}
              >
                <DaySchedule item={item} teacher={false} />
              </div>
            );
          }
        })
      : false;
  };

  return (
    <div className="container">
      <div className="content_holder">
        <div className="vertical_items_holder">
          {nconf.days.map((item, index) => (
            <div
              key={item + index}
              className="vertical_item"
              onClick={dayValidation}
              data-index={index}
            >
              {item}
            </div>
          ))}
        </div>
        {filtered_day.length !== 0 ? (
          <div
            className={filtered_day.map((item, index) => {
              return item.Day.toString().includes(selectedIndex)
                ? "vertical_items_holder"
                : "";
            })}
          >
            <div className="vertical_item_disabled">
              <div className="page_item_disabled">
                <div className="page_item_descr _weight-600">
                  <p>Время занятия</p>
                </div>
              </div>
              <div className="page_item_disabled">
                <div className="page_item_descr _weight-600">
                  <p>Предмет</p>
                </div>
              </div>

              <div className="page_item_disabled">
                <div className="page_item_descr _weight-600">
                  <p>Учебная группа</p>
                </div>
              </div>
              <div className="page_item_disabled">
                <div className="page_item_descr _weight-600">
                  <p>Местонахождение</p>
                </div>
              </div>
              <div className="page_item_disabled">
                <div className="page_item_descr _weight-600">
                  <p>Тип занятия</p>
                </div>
              </div>
            </div>

            {scheduleRender()}
          </div>
        ) : (
          false
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    filtered_day: state.shedule.filteredByDayShedule,
  };
};
export default connect(mapStateToProps, null)(SheduleTableByTeacher);
