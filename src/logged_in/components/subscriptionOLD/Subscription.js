import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { List, Divider, Paper, withStyles } from "@material-ui/core";
import SubscriptionTable from "./SubscriptionTable";
import SubscriptionInfo from "./SubscriptionInfo";
import { Grid, withTheme } from "@material-ui/core";

const styles = {
  divider: {
    backgroundColor: "rgba(0, 0, 0, 0.26)"
  }
};

function Subscription(props) {
  const {
    transactions,
    classes,
    openAddBalanceDialog,
    selectSubscription
  } = props;

  useEffect(selectSubscription, [selectSubscription]);

  return (
    <Grid container >
      <Grid item xs={12} md={6}>
        <Paper>
          <List disablePadding>
            {/* <SubscriptionInfo openAddBalanceDialog={openAddBalanceDialog} /> */}
            <Divider className={classes.divider} />
            <SubscriptionTable transactions={transactions} />
          </List>
        </Paper>
      </Grid>
    </Grid>

  );
}

Subscription.propTypes = {
  classes: PropTypes.object.isRequired,
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectSubscription: PropTypes.func.isRequired,
  openAddBalanceDialog: PropTypes.func.isRequired
};

export default withStyles(styles)(Subscription);
