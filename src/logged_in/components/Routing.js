import React, { memo } from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import Dashboard from "./dashboard/Dashboard";
import TradeSetting from "./tradeSetting/TradeSetting";
import Position from "./position/Position";
import Orders from "./orders/Orders";
import Alarm from "./alarm/Alarm";
import AccountSetting from "./accountSetting/AccountSetting";
import History from "./history/History";
import Analyse from "./analyse/Analyse";
import Logging from "./logging/Logging";
import StrategySetting from "./navigation/StrategySetting";
// import Subscription from "./subscription/Subscription";
import PropsRoute from "../../shared/components/PropsRoute";

const styles = (theme) => ({
  wrapper: {
    marginRight: theme.spacing(3),
    width: "auto",
    [theme.breakpoints.up("xs")]: {
      // width: "95%",
      // marginLeft:"auto",
      // marginRight:"auto",
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
      // width: "90%"
      // marginLeft: "auto",
      // marginRight: "auto"
    },
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
      // width: "82.5%"
      // marginLeft: "auto",
      // marginRight: "auto"
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
      // width: "70%"
      // marginLeft: "auto",
      // marginRight: "auto"
    }
  }
});

function Routing(props) {
  const {
    classes,

    accounts,
    symbols,
    // EmojiTextArea,
    // ImageCropper,
    // Dropzone,
    // DateTimePicker,
    // pushMessageToSnackbar,
    // posts,
    // transactions,
    // toggleAccountActivation,
    // CardChart,
    // statistics,
    // targets,
    // setTargets,
    // setPosts,
    // isAccountActivated,
    selectDashboard,
    selectTradeSetting,
    selectPosition,
    selectOrders,
    selectAlarm,
    selectHistory,
    selectAnalyse,
    selectAccountSetting,
    selectLogging
    // selectSubscription,
    // openAddBalanceDialog
  } = props;
  return (
    <div className={classes.wrapper}>
      <Switch>
        <PropsRoute
          path="/c/position"
          component={Position}
          selectPosition={selectPosition}
        />
        <PropsRoute
          path="/c/navigation/StrategySetting"
          component={StrategySetting}
        />
        <PropsRoute
          path="/c/tradeSetting"
          component={TradeSetting}
          selectTradeSetting={selectTradeSetting}
        />
        <PropsRoute
          path="/c/orders"
          component={Orders}
          selectOrders={selectOrders}
        />
        <PropsRoute
          path="/c/alarm"
          component={Alarm}
          selectAlarm={selectAlarm}
        />
        <PropsRoute
          path="/c/history"
          component={History}
          selectHistory={selectHistory}
        />
        <PropsRoute
          path="/c/analyse"
          component={Analyse}
          selectAnalyse={selectAnalyse}
        />
        <PropsRoute
          path="/c/accountSetting"
          component={AccountSetting}
          selectAccountSetting={selectAccountSetting}
        />
        <PropsRoute
          path="/c/logging"
          component={Logging}
          selectLogging={selectLogging}
        />

        <PropsRoute
          path=""
          component={Dashboard}
          selectDashboard={selectDashboard}
        />
      </Switch>
    </div>
  );
}

Routing.propTypes = {
  classes: PropTypes.object.isRequired,
  selectDashboard: PropTypes.func.isRequired,
  selectPosition: PropTypes.func.isRequired,
  selectTradeSetting: PropTypes.func.isRequired,
  selectOrders: PropTypes.func.isRequired,
  selectAlarm: PropTypes.func.isRequired,
  selectHistory: PropTypes.func.isRequired,
  selectAnalyse: PropTypes.func.isRequired,
  selectAccountSetting: PropTypes.func.isRequired,
  selectLogging: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(memo(Routing));
