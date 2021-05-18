import React, { useState, useEffect } from "react";

import CONFIG from "../../CONFIG.json";
import SchedulesWrapper from "../Shedule_Modules/SchedulesWrapper.js";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Box } from "@material-ui/core";
const ScheduleView = ({ filteredSchedule }) => {
  const [groupUp, setGroupUp] = useState();

  useEffect(() => {
    setGroupUp(
      CONFIG.days.map((day, index) =>
        filteredSchedule.map((item) => (day === item.day ? item : false))
      )
    );
  }, [setGroupUp, filteredSchedule]);

  return (
    <Box>
      {filteredSchedule.length !== 0 ? (
        <Box>
          <Box>{groupUp ? <SchedulesWrapper data={groupUp} /> : false}</Box>
        </Box>
      ) : (
        <Redirect to="/" />
      )}
    </Box>
  );
};
const mapStateToProps = (state) => {
  return {
    filteredSchedule: state.schedule.filteredSchedule,
  };
};
export default connect(mapStateToProps, null)(ScheduleView);
