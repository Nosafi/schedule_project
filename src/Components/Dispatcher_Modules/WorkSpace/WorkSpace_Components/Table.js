import { Select } from "@material-ui/core";
import { findByDisplayValue } from "@testing-library/dom";
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import nconf from "../../../../CONFIG.json";
import {
  onSaveButton,
  loadDataForAdmin,
} from "../../../../Redux/admin-actions";

import "../../../../Assets/Styles/Back-garde/table.scss";

const TableModule = (props) => {
  console.log(props);

  const [isAddGroupInTable, setisAddGroupInTable] = useState(false);
  const [opt, setOpt] = useState(<option value="1">1</option>);

  const dispatch = useDispatch();
  let updates_data = [];

  useEffect(() => {
    loadDataToTable();
  });

  const inDay = 8,
    rowNum = inDay * 6 + 1;
  let data = "";
  let lesson = 0,
    idS = 0;

  function createTable(massive, isNew) {
    let str = "";

    for (let j = 0; j < massive.length; j++) {
      let group_num =
        props.all_data.groups[
          props.all_data.groups
            .map(function (e) {
              return e.group_id;
            })
            .indexOf(Number(massive[j]))
        ].group_number;

      str += "<table class=table_" + massive[j] + "><tbody>";

      for (let i = 0; i < rowNum; i++) {
        str += "<tr>";
        let less_num = lesson - inDay * Math.floor(lesson / inDay);

        if (i % inDay == 0) {
          data = massive[j] + "_" + Math.ceil(lesson / inDay) + "_" + inDay;
        } else {
          data = massive[j] + "_" + Math.ceil(lesson / inDay) + "_" + less_num;
        }
        if (i == 0) {
          str +=
            "<td  data-connection='' data-lesson='data'>" + group_num + "</td>";
        } else {
          if (i % inDay == 0) {
            str +=
              "<td data-connection='' class='bop _last_in_day' data-lesson='" +
              data +
              "'>" +
              isNewGroup(isNew, data) +
              "</td>";
          } else {
            str +=
              "<td data-connection='' class='bop _last_in_day' data-lesson='" +
              data +
              "'>" +
              isNewGroup(isNew, data) +
              "</td>";
          }
        }
        str += "</tr>";
        lesson++;
      }
      str += "</tbody></table>";
      lesson = 0;
    }
    return {
      __html: str,
    };
  }

  function isNewGroup(new_g, danniye) {
    console.log(danniye);
    let str_btn = "<button  data-toadd='" + danniye + "'>+</button>";
    if (new_g) {
      return str_btn;
    } else {
      return "";
    }
  }

  function selectChange(id) {
    let index = updates_data
      .map(function (e) {
        return e.id;
      })
      .indexOf(Number(id));

    updates_data[index].update = true;

    console.log("On update:");
    console.log(updates_data);
  }

  function buildingChange(id) {
    console.log("Here: ", id);
    let allSelects = document.querySelectorAll(".table_select"),
      needSelect,
      value = "",
      filtered_mass = [],
      str = "";
    for (let i = 0; i < allSelects.length; i++) {
      if (allSelects[i].getAttribute("data-lesson") == id + "_room")
        needSelect = allSelects[i];
      if (allSelects[i].getAttribute("data-lesson") == id + "_building")
        value = allSelects[i].value;
    }
    filtered_mass = props.all_data.rooms.filter((item) => {
      if (item.audience_address == value) return item;
    });

    filtered_mass.map((item) => {
      str +=
        "<option value='" +
        item.audience_number +
        "'>" +
        item.audience_number +
        "</option>";
    });
    needSelect.innerHTML = str;
    roomChange(id);
  }

  function roomChange(id) {
    console.log("here");
    let allSelects = document.querySelectorAll(".table_select"),
      room_value = "",
      building_value = "";

    for (let i = 0; i < allSelects.length; i++) {
      if (allSelects[i].getAttribute("data-lesson") == id + "_room")
        room_value = allSelects[i].value;
      if (allSelects[i].getAttribute("data-lesson") == id + "_building")
        building_value = allSelects[i].value;
    }
    let selectedRoom = props.all_data.rooms.filter((item) => {
      if (
        item.audience_number == room_value &&
        item.audience_address == building_value
      )
        return item;
    });

    let dives = document.querySelectorAll(".room_id_value");

    for (let i = 0; i < dives.length; i++) {
      if (dives[i].getAttribute("data-value").split("_")[0] == id) {
        dives[i].setAttribute(
          "data-value",
          id + "_" + selectedRoom[0].audience_id
        );
      }
    }
  }

  function select_Generator(les_id, type, id, building) {
    let str =
      "<select class='table_select' data-lesson='" + les_id + "_" + type + "'>";
    switch (type) {
      case "less_type":
        props.all_data.repeatability.map((item) => {
          str += "<option ";
          if (item.repeat_id == id) str += "selected ";
          str +=
            "value='" +
            item.repeat_id +
            "'>" +
            item.repeat_detail +
            "</option>";
        });
        break;
      case "object":
        props.all_data.disciplines.map((item) => {
          str += "<option ";
          if (item.subject_id == id) str += "selected ";
          str +=
            "value='" +
            item.subject_id +
            "'>" +
            item.subject_name +
            "</option>";
        });
        break;
      case "teacher":
        props.all_data.teachers.map((item) => {
          str += "<option ";
          if (item.teach_id == id) str += "selected ";
          str +=
            "value='" +
            item.teach_id +
            "'>" +
            item.teach_lastName +
            " " +
            item.teach_firstName +
            " " +
            item.teach_patronymic +
            "</option>";
        });
        break;
      case "room":
        props.all_data.rooms.map((item) => {
          if (item.audience_address == building) {
            str += "<option ";
            if (item.sch_audience == id) str += "selected ";
            str +=
              "value='" +
              item.audience_number +
              "'>" +
              item.audience_number +
              "</option>";
          }
        });
        break;
      case "time":
        props.all_data.lesson_time.map((item) => {
          str += "<option ";
          if (item.time_id == id) str += "selected ";
          str +=
            "value='" +
            item.time_id +
            "'>" +
            item.time_start +
            "-" +
            item.time_end +
            "</option>";
        });
        break;
      case "weekdetail":
        props.all_data.repeatability.map((item) => {
          str += "<option ";
          if (item.repeat_id == id) str += "selected ";
          str +=
            "value='" +
            item.repeat_id +
            "'>" +
            item.repeat_detail +
            "</option>";
        });
        break;
      case "building":
        props.all_data.rooms.map((item) => {
          str += "<option ";
          if (item.audience_id == id) str += "selected ";
          str +=
            "value='" +
            item.audience_id +
            "'> к. " +
            item.audience_address +
            "</option>";
        });
        break;
      default:
        str += "";
    }
    str += "</select>";
    return str;
  }

  function loadDataToTable() {
    for (let j = 0; j < props.group_mass.length; j++) {
      let Bops = document.querySelectorAll(
        ".table_" + props.group_mass[j] + " .bop"
      );
      let day_index = 0,
        isFirst = true;

      for (let i = 0; i < Bops.length; i++) {
        if (Bops[i].className != "bop _height") {
          let bop_data = Bops[i].getAttribute("data-lesson");
          bop_data = bop_data.split("_");

          let less_in_this_day = props.data.filter((item) => {
            day_index = item.sch_day;

            if (
              day_index == bop_data[1] &&
              item.sch_group == props.group_mass[j]
            )
              return item;
          });

          if (bop_data[2] - 1 < less_in_this_day.length) {
            updates_data.push({
              id: less_in_this_day[bop_data[2] - 1].sch_id,
              group: less_in_this_day[bop_data[2] - 1].sch_group,
              day: bop_data[1],
              update: false,
            });
            Bops[i].setAttribute(
              "data-lesson-id",
              less_in_this_day[bop_data[2] - 1].sch_id
            );
            Bops[i].innerHTML =
              "<div class='bop_inner'>" +
              select_Generator(
                Bops[i].getAttribute("data-lesson-id"),
                "time",
                props.all_data.lesson_time[
                  props.all_data.lesson_time
                    .map(function (e) {
                      return e.time_id;
                    })
                    .indexOf(less_in_this_day[bop_data[2] - 1].sch_time)
                ].time_id
              ) +
              select_Generator(
                Bops[i].getAttribute("data-lesson-id"),
                "weekdetail",
                props.all_data.repeatability[
                  props.all_data.repeatability
                    .map(function (e) {
                      return e.repeat_id;
                    })
                    .indexOf(
                      less_in_this_day[bop_data[2] - 1].sch_repeatability
                    )
                ].repeat_detail
              ) +
              "</div>" +
              "<div class='bop_inner'>" +
              select_Generator(
                less_in_this_day[bop_data[2] - 1].sch_id,
                "object",
                less_in_this_day[bop_data[2] - 1].sch_subject
              ) +
              "</div>" +
              "<div class='bop_inner'>" +
              select_Generator(
                less_in_this_day[bop_data[2] - 1].sch_id,
                "teacher",
                less_in_this_day[bop_data[2] - 1].sch_teacher
              ) +
              "</div>" +
              "<div class='bop_inner'><div class='room_id_value' data-value='" +
              less_in_this_day[bop_data[2] - 1].sch_id +
              "_" +
              less_in_this_day[bop_data[2] - 1].sch_audience +
              "'>" +
              select_Generator(
                less_in_this_day[bop_data[2] - 1].sch_id,
                "building",
                props.all_data.rooms[
                  props.all_data.rooms
                    .map(function (e) {
                      return e.audience_id;
                    })
                    .indexOf(less_in_this_day[bop_data[2] - 1].sch_audience)
                ].audience_address
              ) +
              select_Generator(
                less_in_this_day[bop_data[2] - 1].sch_id,
                "room",

                props.all_data.rooms[
                  props.all_data.rooms
                    .map(function (e) {
                      return e.audience_id;
                    })
                    .indexOf(less_in_this_day[bop_data[2] - 1].sch_audience)
                ].Room_id,
                props.all_data.rooms[
                  props.all_data.rooms
                    .map(function (e) {
                      return e.audience_id;
                    })
                    .indexOf(less_in_this_day[bop_data[2] - 1].sch_audience)
                ].audience_address
              ) +
              "</div>" +
              select_Generator(
                less_in_this_day[bop_data[2] - 1].sch_id,
                "less_type",
                less_in_this_day[bop_data[2] - 1].sch_subject_type
              ) +
              "</div>";
            idS = less_in_this_day[bop_data[2] - 1].sch_id;
          } else {
            updates_data.push({
              id: "",
              group: "",
              day: "",
              update: false,
            });
            if (isFirst == true) {
              Bops[i].innerHTML =
                "<button class='addNewLessBtn' data-toadd='" +
                bop_data[0] +
                "_" +
                bop_data[1] +
                "_" +
                bop_data[2] +
                "'>+</button>";
            } else {
              Bops[i].innerHTML = "";
            }
          }
        }
      }

      addBntsFunct();

      let selectes = document.querySelectorAll(".table_select");
      for (let i = 0; i < selectes.length; i++) {
        let attribute = selectes[i].getAttribute("data-lesson").split("_");

        switch (attribute[1]) {
          case "building":
            selectes[i].onchange = () => {
              buildingChange(attribute[0]);
            };
            break;
          case "room":
            selectes[i].onchange = () => {
              roomChange(attribute[0]);
              selectChange(attribute[0]);
            };
            break;
          default:
            selectes[i].onchange = () => {
              selectChange(attribute[0]);
            };
            break;
        }
      }
    }
  }

  function addBntsFunct() {
    let addNewBtns = document.querySelectorAll(".addNewLessBtn");
    for (let i = 0; i < addNewBtns.length; i++) {
      let newBtn_data = addNewBtns[i].getAttribute("data-toadd"),
        splited_data = newBtn_data.split("_");
      addNewBtns[i].onclick = () => {
        onAddLessonBtn(splited_data[0], splited_data[1], newBtn_data);
      };
    }
  }

  function onAddLessonBtn(group_num, day, what_find) {
    let idMass = [];
    let bops = document.querySelectorAll(".bop");
    bops.forEach((bop) => {
      let curr_id = bop.getAttribute("data-lesson-id");
      if (curr_id != null) idMass.push(Number(curr_id));
    });

    let max = props.all_data.schedule[0].sch_id;
    for (let i = 1; i < props.all_data.schedule.length; i++)
      if (props.all_data.schedule[i].sch_id > max)
        max = props.all_data.schedule[i].sch_id;
    idS = ++max;

    for (let i = 1; i < updates_data.length; i++)
      if (updates_data[i].id > max) max = updates_data[i].id;
    idS = ++max;

    bops.forEach((bop) => {
      if (bop.getAttribute("data-lesson") == what_find) {
        bop.setAttribute("data-lesson-id", idS);
        bop.innerHTML =
          "<div class='bop_inner'>" +
          select_Generator(idS, "time", 0) +
          select_Generator(idS, "weekdetail", 0) +
          "</div>" +
          "<div class='bop_inner'>" +
          select_Generator(idS, "object", 0) +
          "</div>" +
          "<div class='bop_inner'>" +
          select_Generator(idS, "teacher", 0) +
          "</div>" +
          "<div class='bop_inner'><div class='room_id_value' data-value='" +
          idS +
          "_" +
          0 +
          "'>" +
          select_Generator(idS, "building", 0) +
          select_Generator(idS, "room", 0) +
          "</div>" +
          select_Generator(idS, "less_type", 0) +
          "</div>";
        updates_data.push({
          id: idS,
          group: group_num,
          day: day,
          update: true,
        });
      }

      let selectes = document.querySelectorAll(".table_select");
      for (let i = 0; i < selectes.length; i++) {
        let attribute = selectes[i].getAttribute("data-lesson").split("_");
        switch (attribute[1]) {
          case "building":
            selectes[i].onchange = () => {
              buildingChange(attribute[0]);
            };
            break;
          case "room":
            selectes[i].onchange = () => {
              roomChange(attribute[0]);
              selectChange(attribute[0]);
            };
            break;
          default:
            selectes[i].onchange = () => {
              selectChange(attribute[0]);
            };
            break;
        }
      }
    });
  }

  function takeDataFromSelect(mass, type) {
    for (let i = 0; i, mass.length; i++) {
      if (mass[i].type == type) return mass[i].select.value;
    }
  }

  function onSafeBtn() {
    updates_data.map((item) => {
      let room_id = "";
      let good_selectes = [];
      if (item.update == true) {
        let selectes = document.querySelectorAll(".table_select");
        for (let i = 0; i < selectes.length; i++) {
          let attribute = selectes[i].getAttribute("data-lesson").split("_");
          if (attribute[0] == item.id)
            good_selectes.push({
              select: selectes[i],
              type: attribute[1],
            });
        }

        let dives = document.querySelectorAll(".room_id_value");
        for (let i = 0; i < dives.length; i++) {
          if (dives[i].getAttribute("data-value").split("_")[0] == item.id) {
            room_id = dives[i].getAttribute("data-value").split("_")[1];
          }
        }

        let table_id = props.all_data.list_of_names
          .map(function (e) {
            return e.title_name;
          })
          .indexOf(props.table_name);

        let data_detail = props.all_data.schedule.filter((one_less) => {
          if (one_less.sch_id == item.id) {
            return one_less;
          }
        });

        let new_data = {
          id: { sch_id: item.id },
          data: {
            sch_id: item.id,
            sch_repeatability: 3, /// нужно добавить
            sch_table_title: props.all_data.list_of_names[table_id].title_id,
            sch_time: Number(takeDataFromSelect(good_selectes, "time")),
            sch_subject: Number(takeDataFromSelect(good_selectes, "object")),
            sch_subject_type: Number(takeDataFromSelect(good_selectes, "less")),
            sch_teacher: Number(takeDataFromSelect(good_selectes, "teacher")),
            sch_group: item.group,
            sch_day: data_detail[0].sch_day,
            sch_audience: Number(room_id),
          },
        };

        dispatch(onSaveButton(new_data));
        console.log(new_data);
        item.update = false;

        dispatch(loadDataForAdmin());
        document.location.replace("/workspace");
        alert("Изменения сохранены!");
      }
    });
  }

  function onPreAddGroup() {
    let updated = false;

    updates_data.map((item) => {
      if (item.update == true) {
        updated = true;
      }
    });

    if (updated == true) {
      alert("Сохраните внесённые изменения!");
    } else {
      setisAddGroupInTable(true);
      fullGroupSelect();
    }
  }

  function onAddGroup(group_num) {
    let wrapper = document.querySelector(".table_in_tableWorker");

    wrapper.innerHTML += createTable([Number(group_num)], true).__html;
    addBntsFunct();
  }

  function fullGroupSelect() {
    let curr_opt = [];
    props.all_data.groups.map((item) => {
      curr_opt.push(<option value={item.group_id}>{item.group_number}</option>);
    });
    setOpt(curr_opt);
  }

  return (
    <div className="table_in_tableWorker_wrapper">
      <h2>
        Расписание {props.table_name}, семестр {props.semestr}
      </h2>
      <h3>
        <button
          onClick={() => {
            onPreAddGroup();
          }}
        >
          Добавить группу
        </button>
      </h3>
      {isAddGroupInTable ? (
        <div>
          Выберите группу:
          <select className="tableGroupsSelect">{opt}</select>
          <button
            onClick={() => {
              onAddGroup(document.querySelector(".tableGroupsSelect").value);
              setisAddGroupInTable(false);
            }}
          >
            Добавить
          </button>
        </div>
      ) : null}
      <div
        className="table_in_tableWorker"
        dangerouslySetInnerHTML={createTable(props.group_mass, false)}
      ></div>
      <button
        onClick={() => {
          onSafeBtn();
        }}
      >
        Сохранить
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    all_data: state.admin.data,
  };
};

export default connect(mapStateToProps, null)(TableModule);
