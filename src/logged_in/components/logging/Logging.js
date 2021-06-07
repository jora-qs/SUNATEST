import React, { useEffect } from "react";
import PropTypes from "prop-types";

function Logging(props) {
  const {
    selectLogging
    // pushMessageToSnackbar,
  } = props;

  useEffect(() => {
    selectLogging();
  }, [selectLogging]);

  return <div>Logging</div>;
}

Logging.propTypes = {
  selectLogging: PropTypes.func.isRequired
  // pushMessageToSnackbar: PropTypes.func
};

export default Logging;
