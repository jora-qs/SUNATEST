import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Paper, withStyles } from "@material-ui/core";
import SubscriptionTable from "../../../shared/components/SubscriptionTable";
// import PositionTable from "./PositionTable";
// import SubscriptionInfo from "./SubscriptionInfo";
import { Grid, Button } from "@material-ui/core";

const styles = {
  divider: {
    backgroundColor: "rgba(0, 0, 0, 0.26)"
  }
};

function Dashboard(props) {
  const { classes, selectDashboard } = props;

  const [Hide, setHide] = useState(false);
  const [positions, setPositions] = useState([]);
  const [orders, setOrders] = useState([]);

  const HideSymbolTable = () => {
    setHide(!Hide);
  };

  const fetchRandomTransactions = useCallback(() => {
    const transactions1 = [];
    const transactions2 = [];
    const iterations = 32;

    for (let i = 0; i < iterations; i += 1) {
      const transaction1 = {
        No: i + 1,
        Account: 123456,
        StrategyNo: 1,
        PositionID: 456789,
        Symbol: "EURUSD",
        Volumn: 0.1,
        Direction: "Buy",
        EntryPrice: 1.1111,
        TP: 1.1222,
        SL: 1.1,
        OpenTime: "2021.05.06 00:00"
      };

      const transaction2 = {
        No: i + 1,
        Account: 123456,
        StrategyNo: 1,
        OrderID: 456789,
        Symbol: "EURUSD",
        Volumn: 0.1,
        Direction: "Buy",
        SupportLine: 1.1111,
        TP: 1.1222,
        SL: 1.1,
        Status: "BuyStop",
        StartTime: "2021.05.06 00:00",
        EndTime: "2021.05.06 01:00",
        PositionID: 123789
      };

      transactions1.push(transaction1);
      transactions2.push(transaction2);
    }
    // transactions.reverse();
    setPositions(transactions1);
    setOrders(transactions2);
  }, [setPositions, setOrders]);

  // const headernameSymbol = {
  //   head: ["Symbol", "P", "O", "A", "Spread", "Bid", "Ask"]
  // };
  const headername1 = [
    "No",
    "Account",
    "StrategyNo",
    "PositionID",
    "Symbol",
    "Volumn",
    "Direction",
    "EntryPrice",
    "TP",
    "SL",
    "OpenTime"
  ];
  const headername2 = [
    "No",
    "Account",
    "StrategyNo",
    "OrderID",
    "Symbol",
    "Volumn",
    "Direction",
    "SupportLine",
    "TP",
    "SL",
    "Status",
    "StartTime",
    "EndTime",
    "PositionID"
  ];

  useEffect(selectDashboard, [selectDashboard]);
  useEffect(() => {
    fetchRandomTransactions();
  }, [fetchRandomTransactions]);

  return (
    <div>
      <h3>Position</h3>
      <Paper>
        <SubscriptionTable
          transactions={positions}
          tableMaxheight={400}
          initialRows={5}
          headername={headername1}
        />
      </Paper>
      <h3>Order</h3>
      <Paper>
        <SubscriptionTable
          transactions={orders}
          tableMaxheight={400}
          initialRows={5}
          headername={headername2}
        />
      </Paper>
    </div>
  );
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  // transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectDashboard: PropTypes.func.isRequired
  // openAddBalanceDialog: PropTypes.func.isRequired
};

export default withStyles(styles)(Dashboard);
