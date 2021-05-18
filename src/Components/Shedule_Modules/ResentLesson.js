import React from "react";
import { store } from "../../index";
import "../../Assets/Styles/Common/common.scss";
import nconf from "../../CONFIG.json";

const ResentLesson = (props) => {
  let week = "";
  function getDate() {
    let now = new Date();
    let week = "";
    let startTimeOfCurrentYear = new Date(now.getFullYear(), 0, 1).getTime();
    let currentTime = now.getTime();
    let pastTimeOfStartCurrentYear = currentTime - startTimeOfCurrentYear;
    let hourOfMillisecs = 3600000;
    let hoursOfOneWeek = 168;
    let curr_week = Math.ceil(
      pastTimeOfStartCurrentYear / hourOfMillisecs / hoursOfOneWeek
    );

    if (curr_week % 2 !== 0) {
      week = "odd";
    } else {
      week = "even";
    }

    let minutes = now.getMinutes().toString();
    if (minutes.length < 2) {
      minutes = "0" + minutes;
    }

    let hours = now.getHours().toString();
    if (hours.length < 2) {
      hours = "0" + hours;
    }

    return {
      curr_week: week,
      curr_day: now.getDay().toString(),
      curr_hours: hours,
      curr_minutes: minutes,
    };
  }

  function turn_generator(start_data, curr_len) {
    let result = [];
    let week = "weekly";

    result[0] = {
      Day: getDate().curr_day,
      Time: "00:00-" + start_data[0],
      week,
    };
    for (let i = 1; i < start_data.length; i++) {
      if (i % 2 !== 0) {
        result.push({
          Day: getDate().curr_day,
          Time: start_data[i] + "-" + start_data[i + 1],
          week,
        });
      }
    }
    result[result.length - 1] = {
      Day: getDate().curr_day,
      Time: start_data[start_data.length - 1] + "-23:59",
      week,
    };

    console.log("Расписание перемен:");
    result.map((item) => {
      console.log(item.Time);
    });

    return what_lesson(result, "перемены");
  }

  function what_lesson(start_data, what_search) {
    let result = "",
      lessons_today = 0;
    let if_no_lessons = [];

    start_data.map((item, index) => {
      if (
        (item.week.toString() === getDate().curr_week.toString() &&
          item.Day.toString() === getDate().curr_day) ||
        (item.week.toString() === "weekly" &&
          item.Day.toString() === getDate().curr_day)
      ) {
        let times = item.Time.split("-");
        if_no_lessons.push(times[0], times[1]);
        lessons_today++;

        if (
          (getDate().curr_hours === times[1].split(":")[0] &&
            getDate().curr_minutes < times[1].split(":")[1]) ||
          (getDate().curr_hours === times[0].split(":")[0] &&
            getDate().curr_minutes > times[0].split(":")[1]) ||
          (getDate().curr_hours < times[1].split(":")[0] &&
            getDate().curr_hours > times[0].split(":")[0])
        ) {
          let lesson_end = "";

          if (getDate().curr_hours < times[1].split(":")[0]) {
            let hour_helper = times[1].split(":")[0] - getDate().curr_hours;
            lesson_end = times[1].split(":")[1] - getDate().curr_minutes;
            if (lesson_end < 0) {
              hour_helper = hour_helper - 1;
              lesson_end = 60 + lesson_end;
            }
            if (lesson_end.toString().length < 2) lesson_end = "0" + lesson_end;
            lesson_end = "0" + hour_helper + ":" + lesson_end;
          }
          if (getDate().curr_hours === times[1].split(":")[0]) {
            lesson_end = times[1].split(":")[1] - getDate().curr_minutes;
            if (lesson_end.toString().length < 2) lesson_end = "0" + lesson_end;
            lesson_end = "00:" + lesson_end;
          }

          if (what_search === "пары")
            result =
              item.Object +
              " " +
              item.Room +
              " " +
              item.build_number +
              "к. конец " +
              what_search +
              " через " +
              lesson_end;
          if (what_search === "перемены") {
            result = " конец " + what_search + " через " + lesson_end;
            if (index === 0) {
              result = "Начало пар на сегодня через " + lesson_end;
            }
            if (index === start_data.length - 1) {
              result = "На сегодня пар больше нет.";
            }
          }
        }
      }
    });

    if (result.length < 1 && what_search === "пары") {
      return turn_generator(if_no_lessons, lessons_today + 1);
    }

    if (result.length < 1 && what_search === "перемены") {
      return "В базе нету пар на сегодня.";
    }

    return result;
  }
  //!----
  switch (getDate().curr_week) {
    case "odd":
      week = "Нечёт. неделя.";
      break;
    case "even":
      week = "Чёт. неделя.";
      break;
    default:
      week = "что-то не так с неделей.";
  }

  return (
    <>
      <div className="page_item_wide_disabled _center">
        <div className="page_item_descr">
          <p>
            {nconf.days[getDate().curr_day - 1]}, {week}
          </p>
          <p>{what_lesson(store.getState().shedule.filteredShedule, "пары")}</p>
        </div>
      </div>
    </>
  );
};

export default ResentLesson;
