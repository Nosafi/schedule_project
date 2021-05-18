import React from "react";
import GroupSearcher from "../../Shedule_Modules/Group_Modules/GroupSearcher.js";
import { connect } from "react-redux";
import GroupSchedule from "../../Shedule_Modules/Group_Modules/SheduleTableByGroup";
import GroupsTable from "../../Dispatcher_Modules/Selection/All_Data/GroupsTable";
import FacultyTable from "../../Dispatcher_Modules/Selection/All_Data/FacultyTable";
import TeachersTable from "../../Dispatcher_Modules/Selection/All_Data/TeachersTable";
import RoomsTable from "../../Dispatcher_Modules/Selection/All_Data/RoomsTable";
import SpecialtiesTable from "../../Dispatcher_Modules/Selection/All_Data/SpecialtiesTable";
import ObjectsTable from "../../Dispatcher_Modules/Selection/All_Data/ObjectsTable";
import BuildingTable from "../../Dispatcher_Modules/Selection/All_Data/BuildingsTable";
import TeacherSearcher from "../../Shedule_Modules/Teacher_Modules/TeacherSearcher";
import TeacherSchedule from "../../Shedule_Modules/Teacher_Modules/SheduleTableByTeacher";
const SelectController = ({ shedule, isFiltered, select, setIndex }) => {
  switch (select) {
    case "groups_table":
      return <GroupsTable modal={setIndex} />;
    case "teachers_table":
      return <TeachersTable modal={setIndex} />;
    case "faculties_table":
      return <FacultyTable modal={setIndex} />;
    case "rooms_table":
      return <RoomsTable modal={setIndex} />;
    case "specialties_table":
      return <SpecialtiesTable modal={setIndex} />;
    case "objects_table":
      return <ObjectsTable modal={setIndex} />;
    case "building_table":
      return <BuildingTable modal={setIndex} />;
    case "about":
      return <div>{select}</div>;
    case "manual":
      return <div>{select}</div>;
    case "feedback":
      return <div>{select}</div>;
    default:
      return <div>f</div>;
  }
};
const mapStateToProps = (state) => {
  return {
    shedule: state.shedule,
  };
};
export default connect(mapStateToProps, null)(SelectController);
