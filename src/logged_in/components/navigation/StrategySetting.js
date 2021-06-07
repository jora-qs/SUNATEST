import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Button,
  ThemeProvider,
  withStyles,
  createMuiTheme
} from "@material-ui/core";

import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import TextField from "@material-ui/core/TextField";
import { green } from "@material-ui/core/colors";
import { useSelector } from "react-redux";
import {
  selectStrategies
} from "../ServerInfo";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // maxWidth: 200,
    // backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 300
  },
  margin: {
    margin: theme.spacing(2)
  },
  ListItemClass: {
    // backgroundColor: "blue",
    "&.Mui-selected": {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    }
  }
}));

function StrategySetting(props) {
  // const { accounts, symbols } = props;
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const strategyInfo = useSelector(selectStrategies);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div>
      <Grid container spacing={5}>
        <Grid item xs={12} md={4}>
          <Paper>
            <List className={classes.root}>
              {strategyInfo.map((strategy) => {
                if (strategy.indexOf("SSR") === 0) {
                  return (
                    <ListItem
                      button
                      selected={selectedIndex === strategy}
                      onClick={(event) =>
                        handleListItemClick(event, strategy)
                      }
                      className={classes.ListItemClass}
                    >
                      <ListItemText primary={strategy} />
                    </ListItem>
                  );
                }
              })}
            </List>
          </Paper>

          <form className={classes.root} noValidate>
            <ThemeProvider theme={"primary"}>
              <TextField
                className={classes.margin}
                label="SSR Strategy Name"
                id="mui-theme-provider-ssr-input"
                style={{ width: 300 }}
              />
            </ThemeProvider>
            <Button
              variant="contained"
              color="secondary"
              style={{ marginTop: 25 }}
            >
              Add
            </Button>
          </form>

          <Paper>
            <List className={classes.root}>
              {strategyInfo.map((strategy) => {
                if (strategy.indexOf("SBTM") === 0) {
                  return (
                    <ListItem
                      button
                      selected={selectedIndex === strategy}
                      onClick={(event) =>
                        handleListItemClick(event, strategy)
                      }
                      className={classes.ListItemClass}
                    >
                      <ListItemText primary={strategy} />
                    </ListItem>
                  );
                }
              })}
            </List>
          </Paper>
          <form className={classes.root} noValidate>
            <ThemeProvider theme={"primary"}>
              <TextField
                className={classes.margin}
                label="SBTM Strategy Name"
                id="mui-theme-provider-sbtm-input"
                style={{ width: 300 }}
              />
            </ThemeProvider>
            <Button
              variant="contained"
              color="secondary"
              style={{ marginTop: 25 }}
            >
              Add
            </Button>
          </form>
        </Grid>
        <Grid item xs={12} md={4}>
          Strategy2
        </Grid>
        <Grid item xs={12} md={4}>
          Strategy3
        </Grid>
      </Grid>
    </div>
  );
}

export default StrategySetting;
