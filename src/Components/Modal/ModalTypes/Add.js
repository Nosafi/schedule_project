import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { createNewData } from "../../../Redux/admin-actions";
import FacultyOperations from "../../Dispatcher_Modules/Selection_operations/FacultyOperations";
import SpetialityOperation from "../../Dispatcher_Modules/Selection_operations/SpetialityOperations";
import RoomOperation from "../../Dispatcher_Modules/Selection_operations/RoomOperations";
import GroupsOperations from "../../Dispatcher_Modules/Selection_operations/GroupsOperations";
import ObjectOperations from "../../Dispatcher_Modules/Selection_operations/ObjectOperations";
import BuildingOperations from "../../Dispatcher_Modules/Selection_operations/BuildingOperations";
const Add = (props) => {
  const dispatch = useDispatch();

  if (props.option === "groups_table")
    return (
      <div className="modal_body">
        <div className="modal_header">
          <div className="modal_header_item_title">
            <span className="modalTitle">
              Добавление в таблицу "Учебные группы"
            </span>
          </div>
          <div className="modal_header_item_close">
            <span
              className="modalTitle"
              className="close"
              onClick={props.close}
            >
              Закрыть
            </span>
          </div>
        </div>
        <GroupsOperations close={props.close} />
      </div>
    );

  if (props.option === "objects_table")
    return (
      <div className="modal_body">
        <div className="modal_header">
          <div className="modal_header_item_title">
            <span className="modalTitle">Добавление в таблицу "Предметы"</span>
          </div>
          <div className="modal_header_item_close">
            <span
              className="modalTitle"
              className="close"
              onClick={props.close}
            >
              Закрыть
            </span>
          </div>
        </div>
        <ObjectOperations close={props.close} />
      </div>
    );
  if (props.option === "building_table")
    return (
      <div className="modal_body">
        <div className="modal_header">
          <div className="modal_header_item_title">
            <span className="modalTitle">
              Добавление в таблицу "Здания и адреса"
            </span>
          </div>
          <div className="modal_header_item_close">
            <span
              className="modalTitle"
              className="close"
              onClick={props.close}
            >
              Закрыть
            </span>
          </div>
        </div>
        <BuildingOperations close={props.close} />
      </div>
    );
  if (props.option === "specialties_table")
    return (
      <div className="modal_body">
        <div className="modal_header">
          <div className="modal_header_item_title">
            <span className="modalTitle">
              Добавление в таблицу "Специальности"
            </span>
          </div>
          <div className="modal_header_item_close">
            <span
              className="modalTitle"
              className="close"
              onClick={props.close}
            >
              Закрыть
            </span>
          </div>
        </div>
        <SpetialityOperation close={props.close} />
      </div>
    );
  if (props.option === "faculties_table")
    return (
      <div className="modal_body">
        <div className="modal_header">
          <div className="modal_header_item_title">
            <span className="modalTitle">
              Добавление в таблицу "Факультеты"
            </span>
          </div>
          <div className="modal_header_item_close">
            <span
              className="modalTitle"
              className="close"
              onClick={props.close}
            >
              Закрыть
            </span>
          </div>
        </div>
        <FacultyOperations close={props.close} />
      </div>
    );
  if (props.option === "rooms_table")
    return (
      <div className="modal_body">
        <div className="modal_header">
          <div className="modal_header_item_title">
            <span className="modalTitle">Добавление в таблицу "Аудитории"</span>
          </div>
          <div className="modal_header_item_close">
            <span
              className="modalTitle"
              className="close"
              onClick={props.close}
            >
              Закрыть
            </span>
          </div>
        </div>
        <RoomOperation close={props.close} />
      </div>
    );
};

const mapStateToProps = (state) => {
  return {
    all_data: state.admin.data,
  };
};

export default connect(mapStateToProps, null)(Add);
