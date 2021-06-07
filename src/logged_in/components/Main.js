import React, { memo, useCallback, useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Paper, withStyles, Grid, Button } from "@material-ui/core";
import Routing from "./Routing";
import NavBar from "./navigation/NavBar";
// import ConsecutiveSnackbarMessages from "../../shared/components/ConsecutiveSnackbarMessages";
import smoothScrollTop from "../../shared/functions/smoothScrollTop";
// import persons from "../dummy_data/persons";
// import LazyLoadAddBalanceDialog from "./dashboard/LazyLoadAddBalanceDialog";
import SubscriptionTable from "../../shared/components/SubscriptionTable";
// import PositionTable from "./PositionTable";
// import SubscriptionInfo from "./SubscriptionInfo";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  getHistoryPosition,
  getTimer,
  getAccounts,
  getSymbols,
  getStrategies,
  selectTimer
} from "./ServerInfo";

const styles = (theme) => ({
  main: {
    marginTop: theme.spacing(3),
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    [theme.breakpoints.up("xs")]: {
      marginLeft: theme.spacing(32)
    },

    [theme.breakpoints.down("xs")]: {
      marginLeft: theme.spacing(3)
    }
  },
  tableTop: {
    marginTop: theme.spacing(0)
    // width: "max-content"
  }
});

function Main(props) {
  const { classes } = props;
  const [selectedTab, setSelectedTab] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [Hide, setHide] = useState(true);

  const HideSymbolTable = () => {
    setHide(!Hide);
  };
  const headername = [
    { id: "Symbol", Label: "Symbol" },
    { id: "P", Label: "P" },
    { id: "O", Label: "O" },
    { id: "A", Label: "A" },
    { id: "Spread", Label: "Spread" },
    { id: "Bid", Label: "Bid" },
    { id: "Ask", Label: "Ask" }
  ];

  const fetchRandomTransactions = useCallback(() => {
    const transactions = [];
    const iterations = 32;

    for (let i = 0; i < iterations; i += 1) {
      const transaction = {
        // id: i,
        Symbol: "EURUSD",
        P: 1,
        O: 2,
        A: 3,
        Spread: 0.1111,
        Bid: 1.1111,
        Ask: 1.2222
      };

      transactions.push(transaction);
    }
    transactions.reverse();
    setTransactions(transactions);
  }, [setTransactions]);

  const selectDashboard = useCallback(() => {
    smoothScrollTop();
    document.title = "Suna - Dashboard";
    setSelectedTab("Dashboard");
  }, [setSelectedTab]);

  const selectPosition = useCallback(() => {
    smoothScrollTop();
    document.title = "Suna - Position";
    setSelectedTab("Position");
  }, [setSelectedTab]);

  const selectTradeSetting = useCallback(() => {
    smoothScrollTop();
    document.title = "Suna - TradeSetting";
    setSelectedTab("TradeSetting");
  }, [setSelectedTab]);

  const selectOrders = useCallback(() => {
    smoothScrollTop();
    document.title = "Suna - Orders";
    setSelectedTab("Orders");
  }, [setSelectedTab]);

  const selectAlarm = useCallback(() => {
    smoothScrollTop();
    document.title = "Suna - Alarm";
    setSelectedTab("Alarm");
  }, [setSelectedTab]);

  const selectHistory = useCallback(() => {
    smoothScrollTop();
    document.title = "Suna - History";
    setSelectedTab("History");
  }, [setSelectedTab]);

  const selectAnalyse = useCallback(() => {
    smoothScrollTop();
    document.title = "Suna - Analyse";
    setSelectedTab("Analyse");
  }, [setSelectedTab]);
  const selectAccountSetting = useCallback(() => {
    smoothScrollTop();
    document.title = "Suna - AccountSetting";
    setSelectedTab("AccountSetting");
  }, [setSelectedTab]);
  const selectLogging = useCallback(() => {
    smoothScrollTop();
    document.title = "Suna - Logging";
    setSelectedTab("Logging");
  }, [setSelectedTab]);

  useEffect(() => {
    fetchRandomTransactions();
  }, [
    fetchRandomTransactions,
  ]);

  // const strategy = useSelector(selectStrategies);
  const timer = useSelector(selectTimer);

  const dispatch = useDispatch();

  // const baseURL = "http://10.10.11.160:5001";
  const baseURL = "https://85.214.145.102:5001";

  useEffect(() => {
    clearInterval(timer);
    const interval = setInterval(() => {
      let historyPos = [];
      let transaction = [];
      // console.log(baseURL + `/api/History`);
      axios.get(baseURL + `/api/History`).then((res) => {
        // axios.get(`https://jsonplaceholder.typicode.com/users`).then((res) => {
        historyPos = res.data;
        // console.log("++++");
        for (let i = 0; i < historyPos.length; i++) {
          let sym = historyPos[i].symbolName;
          // console.log(sym);
          let find = false;
          for (let j = 0; j < transaction.length; j++) {
            if (sym == transaction[j]) {
              find = true;
              break;
            }
          }
          if (find == false) transaction.push(sym);
        }
        dispatch(getHistoryPosition(historyPos));
        dispatch(getSymbols(transaction));
      });
      let acccounts = [];
      axios.get(baseURL + `/api/Main/Accounts`).then((res) => {
        // axios.get(`https://jsonplaceholder.typicode.com/users`).then((res) => {
        acccounts = res.data;
        dispatch(getAccounts(acccounts));
      });

      let strategies = [];
      axios.get(baseURL + `/api/Main/Strategies`).then((res) => {
        // axios.get(`https://jsonplaceholder.typicode.com/users`).then((res) => {
        strategies = res.data;
        dispatch(getStrategies(strategies));
      });
    }, 5000);
    dispatch(getTimer(interval));
  }, []);

  // console.log("++++", selectedTab);

  return (
    // <Provider store={store}>
    <Fragment>
      <NavBar selectedTab={selectedTab} />

      <main className={classNames(classes.main)}>
        <div>
          <Button
            color="secondary"
            size="large"
            classes={{ text: classes.menuButtonText }}
            onClick={HideSymbolTable}
            variant="outlined"
          >
            Symbol
          </Button>
          {/* <h1> {information[1]}</h1> */}
          <Grid container spacing={5} className={classNames(classes.tableTop)}>
            {!Hide && (
              <Grid item xs={12} md={3}>
                <Paper>
                  <SubscriptionTable
                    transactions={transactions}
                    tableMaxheight={2000}
                    initialRows={20}
                    headername={headername}
                  />
                </Paper>
              </Grid>
            )}

            <Grid item xs={12} md={12 - (Hide ? 0 : 3)}>
              <Routing
                // strategyInfo={strategyInfo}
                // accounts={accounts}
                // symbols={symbols}
                selectDashboard={selectDashboard}
                selectTradeSetting={selectTradeSetting}
                selectPosition={selectPosition}
                selectOrders={selectOrders}
                selectAlarm={selectAlarm}
                selectHistory={selectHistory}
                selectAnalyse={selectAnalyse}
                selectAccountSetting={selectAccountSetting}
                selectLogging={selectLogging}
              />
            </Grid>
          </Grid>
          {/* dashboard */}
        </div>
      </main>
    </Fragment>
    // </Provider>
  );
}

Main.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(memo(Main));
