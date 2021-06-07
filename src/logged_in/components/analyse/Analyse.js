import React, { useEffect } from "react";
import PropTypes from "prop-types";

function Analyse(props) {
  const {
    selectAnalyse
    // pushMessageToSnackbar,
  } = props;

  useEffect(() => {
    selectAnalyse();
  }, [selectAnalyse]);

  return <div>Analyse</div>;
}

Analyse.propTypes = {
  selectAnalyse: PropTypes.func.isRequired
  // pushMessageToSnackbar: PropTypes.func
};

export default Analyse;
