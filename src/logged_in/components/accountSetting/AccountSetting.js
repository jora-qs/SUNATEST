import React, { useEffect } from "react";
import PropTypes from "prop-types";

function AccountSetting(props) {
  const {
    selectAccountSetting
    // pushMessageToSnackbar,
  } = props;

  useEffect(() => {
    selectAccountSetting();
  }, [selectAccountSetting]);

  return <div>AccountSetting</div>;
}

AccountSetting.propTypes = {
  selectAccountSetting: PropTypes.func.isRequired
  // pushMessageToSnackbar: PropTypes.func
};

export default AccountSetting;
