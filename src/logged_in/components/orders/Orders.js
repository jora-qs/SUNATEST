import React, {  useEffect } from "react";
import PropTypes from "prop-types";

function Orders(props) {
  const {
    selectOrders
    // pushMessageToSnackbar,
  } = props;

  useEffect(() => {
    selectOrders();
  }, [selectOrders]);

  return <div>Orders</div>;
}

Orders.propTypes = {
  selectOrders: PropTypes.func.isRequired
  // pushMessageToSnackbar: PropTypes.func
};

export default Orders;
