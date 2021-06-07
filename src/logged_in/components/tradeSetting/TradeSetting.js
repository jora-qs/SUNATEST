import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";

function TradeSetting(props) {
  const {
    selectTradeSetting
    // pushMessageToSnackbar,
  } = props;

  useEffect(() => {
    selectTradeSetting();
  }, [selectTradeSetting]);

  return <div>TradeSetting</div>;
}

TradeSetting.propTypes = {
  selectTradeSetting: PropTypes.func.isRequired
  // pushMessageToSnackbar: PropTypes.func
};

export default TradeSetting;
