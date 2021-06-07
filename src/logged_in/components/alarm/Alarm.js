import React, { useEffect } from "react";
import PropTypes from "prop-types";

function Alarm(props) {
  const {
    selectAlarm
    // pushMessageToSnackbar,
  } = props;

  useEffect(() => {
    selectAlarm();
  }, [selectAlarm]);

  return <div>Alarm</div>;
}

Alarm.propTypes = {
  selectAlarm: PropTypes.func.isRequired
  // pushMessageToSnackbar: PropTypes.func
};

export default Alarm;
