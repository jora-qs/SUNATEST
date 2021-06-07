import React, { Fragment, useRef, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
// import MenuItem from "@material-ui/core/MenuItem";
// import Menu from "@material-ui/core/Menu";
import {
  AppBar,
  Toolbar,
  Typography,
  MenuItem,
  Drawer,
  List,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Hidden,
  Menu,
  Box,
  withStyles,
  isWidthUp,
  withWidth,
  Button
} from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";

import ImageIcon from "@material-ui/icons/Image";
//import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import MenuIcon from "@material-ui/icons/Menu";
import BuildIcon from "@material-ui/icons/Build";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

import NavigationDrawer from "../../../shared/components/NavigationDrawer";
import AttachFileIcon from "@material-ui/icons/AttachFile";
// import {Menu,MenuItem} from "@material-ui/core";

import AlarmIcon from "@material-ui/icons/Alarm";
import HistoryIcon from "@material-ui/icons/History";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import MessageIcon from "@material-ui/icons/Message";

import { useSelector, useDispatch } from "react-redux";
import {
  selectStrategies,
  getFilterStrategy
} from "../ServerInfo";

const styles = (theme) => ({
  appBar: {
    boxShadow: theme.shadows[6],
    backgroundColor: theme.palette.common.white,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      marginLeft: 0
    }
  },
  appBarToolbar: {
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    },
    [theme.breakpoints.up("md")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3)
    },
    [theme.breakpoints.up("lg")]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4)
    }
  },
  accountAvatar: {
    backgroundColor: theme.palette.secondary.main,
    height: 24,
    width: 24,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      marginLeft: theme.spacing(1.5),
      marginRight: theme.spacing(1.5)
    }
  },
  drawerPaper: {
    height: "100%vh",
    whiteSpace: "nowrap",
    border: 0,
    width: theme.spacing(7),
    overflowX: "hidden",
    marginTop: theme.spacing(8.2),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(29)
    },
    backgroundColor: theme.palette.common.black
  },
  smBordered: {
    [theme.breakpoints.down("xs")]: {
      borderRadius: "50% !important"
    }
  },
  menuLink: {
    textDecoration: "none",
    color: theme.palette.text.primary
  },
  iconListItem: {
    width: "auto",
    borderRadius: theme.shape.borderRadius,
    paddingTop: 11,
    paddingBottom: 11,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  textPrimary: {
    color: theme.palette.primary.main
  },
  textSecondary: {
    color: theme.palette.secondary.main
  },
  mobileItemSelected: {
    backgroundColor: `${theme.palette.primary.main} !important`
  },
  brandText: {
    fontFamily: "'Baloo Bhaijaan', cursive",
    fontWeight: 400
    // paddingLeft: theme.spacing(5)
  },
  username: {
    paddingLeft: 0,
    paddingRight: theme.spacing(2)
  },
  justifyCenter: {
    justifyContent: "center"
  },
  permanentDrawerListItem: {
    justifyContent: "center",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  menuButtonText: {
    fontSize: theme.typography.body1.fontSize,
    fontWeight: theme.typography.h6.fontWeight
  },
  noDecoration: {
    textDecoration: "none !important"
  }
});

function NavBar(props) {
  // const { selectedTab, messages, classes, width, openAddBalanceDialog } = props;
  const { selectedTab, width, classes } = props;
  // console.log("++++", selectedTab);
  // Will be use to make website more accessible by screen readers
  const links = useRef([]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  // const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);

  const openMobileDrawer = useCallback(() => {
    setIsMobileOpen(true);
  }, [setIsMobileOpen]);

  const closeMobileDrawer = useCallback(() => {
    setIsMobileOpen(false);
  }, [setIsMobileOpen]);

  const [strategyid, setStrategyid] = React.useState("");

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleItemClick = (value) => {
    setAnchorEl(null);
    setStrategyid(value);
    dispatch(getFilterStrategy(value));
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };

  const menuItems = [
    {
      link: "/c/dashboard",
      name: "Dashboard",
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <DashboardIcon
            className={
              selectedTab === "Dashboard" ? classes.textPrimary : "text-white"
            }
            fontSize="small"
          />
        ),
        mobile: <DashboardIcon className="text-white" />
      }
    },

    {
      link: "/c/tradeSetting",
      name: "Trade Setting",
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <BuildIcon
            className={
              selectedTab === "TradeSetting"
                ? classes.textPrimary
                : "text-white"
            }
            fontSize="small"
          />
        ),
        mobile: <BuildIcon className="text-white" />
      }
    },

    {
      link: "/c/position",
      name: "Position",
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <ImageIcon
            className={
              selectedTab === "Position" ? classes.textPrimary : "text-white"
            }
            fontSize="small"
          />
        ),
        mobile: <ImageIcon className="text-white" />
      }
    },

    {
      link: "/c/orders",
      name: "Orders",
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <AttachFileIcon
            className={
              selectedTab === "Orders" ? classes.textPrimary : "text-white"
            }
            fontSize="small"
          />
        ),
        mobile: <AttachFileIcon className="text-white" />
      }
    },

    {
      link: "/c/alarm",
      name: "Alarm",
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <AlarmIcon
            className={
              selectedTab === "Alarm" ? classes.textPrimary : "text-white"
            }
            fontSize="small"
          />
        ),
        mobile: <AlarmIcon className="text-white" />
      }
    },
    {
      link: "/c/history",
      name: "History",
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <HistoryIcon
            className={
              selectedTab === "History" ? classes.textPrimary : "text-white"
            }
            fontSize="small"
          />
        ),
        mobile: <HistoryIcon className="text-white" />
      }
    },
    {
      link: "/c/analyse",
      name: "Analyse",
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <EqualizerIcon
            className={
              selectedTab === "Analyse" ? classes.textPrimary : "text-white"
            }
            fontSize="small"
          />
        ),
        mobile: <EqualizerIcon className="text-white" />
      }
    },
    {
      link: "/c/accountSetting",
      name: "AccountSetting",
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <SupervisorAccountIcon
            className={
              selectedTab === "AccountSetting"
                ? classes.textPrimary
                : "text-white"
            }
            fontSize="small"
          />
        ),
        mobile: <SupervisorAccountIcon className="text-white" />
      }
    },
    {
      link: "/c/logging",
      name: "Logging",
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <MessageIcon
            className={
              selectedTab === "Logging" ? classes.textPrimary : "text-white"
            }
            fontSize="small"
          />
        ),
        mobile: <MessageIcon className="text-white" />
      }
    },
    // {
    //   link: "/c/subscription",
    //   name: "Subscription",
    //   onClick: closeMobileDrawer,
    //   icon: {
    //     desktop: (
    //       <AccountBalanceIcon
    //         className={
    //           selectedTab === "Subscription"
    //             ? classes.textPrimary
    //             : "text-white"
    //         }
    //         fontSize="small"
    //       />
    //     ),
    //     mobile: <AccountBalanceIcon className="text-white" />
    //   }
    // },
    {
      link: "/",
      name: "Logout",
      icon: {
        desktop: (
          <PowerSettingsNewIcon className="text-white" fontSize="small" />
        ),
        mobile: <PowerSettingsNewIcon className="text-white" />
      }
    }
  ];

  const strategyInfo = useSelector(selectStrategies);
  const dispatch = useDispatch();

  return (
    <Fragment>
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar className={classes.appBarToolbar}>
          {/* SUNA and name */}
          <Box display="flex" alignItems="center" style={{ width: 1500 }}>
            <Hidden smUp>
              <Box mr={1}>
                <IconButton
                  aria-label="Open Navigation"
                  onClick={openMobileDrawer}
                  color="primary"
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            </Hidden>
            <Hidden xsDown>
              <Typography
                variant="h3"
                className={classes.brandText}
                display="inline"
                color="primary"
              >
                Suna
              </Typography>
            </Hidden>

            <Typography
              variant="h4"
              className={classes.brandText}
              display="inline"
              color="secondary"
              style={{ marginLeft: 50 }}
            >
              {strategyid}
            </Typography>
          </Box>

          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            width="100%"
          >
            {isWidthUp("sm", width) && (
              <ListItem
                disableGutters
                className={classNames(classes.iconListItem, classes.smBordered)}
                mr={5}
              >
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                  color="secondary"
                  size="large"
                  classes={{ text: classes.menuButtonText }}
                >
                  Change Strategy
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
                  <MenuItem value="" onClick={() => handleItemClick("")}>
                    <em>None</em>
                  </MenuItem>

                  {strategyInfo.map((strategy) => {
                    return (
                      <MenuItem
                        onClick={() => handleItemClick(strategy)}
                      >
                        {strategy}
                      </MenuItem>
                    );
                  })}
                </Menu>
              </ListItem>
            )}
            {/* {isWidthUp("sm", width) && (  ////////////////////////  Strategy Setting ///////////////////////////////
              <ListItem
                disableGutters
                className={classNames(classes.iconListItem, classes.smBordered)}
              >
                <Link
                  to="/c/navigation/strategysetting"
                  className={classes.noDecoration}
                  pl={100}
                >
                  <Button
                    color="secondary"
                    size="large"
                    classes={{ text: classes.menuButtonText }}
                  >
                    Strategy Setting
                  </Button>
                </Link>
              </ListItem>
            )} */}
          </Box>
        </Toolbar>
      </AppBar>
      <Hidden xsDown>
        <Drawer //  both drawers can be combined into one for performance
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
          open={false}
        >
          <List>
            {menuItems.map((element, index) => (
              <Link
                to={element.link}
                className={classes.menuLink}
                onClick={element.onClick}
                key={index}
                ref={(node) => {
                  links.current[index] = node;
                }}
              >
                {/* <Tooltip
                  title={element.name}
                  placement="right"
                  key={element.name}
                > */}
                <ListItem
                  selected={selectedTab === element.name}
                  button
                  divider={index !== menuItems.length - 1}
                  className={classes.permanentDrawerListItem}
                  onClick={() => {
                    links.current[index].click();
                  }}
                  aria-label={
                    element.name === "Logout"
                      ? "Logout"
                      : `Go to ${element.name}`
                  }
                >
                  <ListItemIcon className={classes.justifyCenter}>
                    {element.icon.desktop}
                  </ListItemIcon>
                  <ListItemText className="text-white" primary={element.name} />
                </ListItem>
                {/* </Tooltip> */}
              </Link>
            ))}
          </List>
        </Drawer>
      </Hidden>
      <NavigationDrawer
        menuItems={menuItems.map((element) => ({
          link: element.link,
          name: element.name,
          icon: element.icon.mobile,
          onClick: element.onClick
        }))}
        anchor="left"
        open={isMobileOpen}
        selectedItem={selectedTab}
        onClose={closeMobileDrawer}
      />
    </Fragment>
  );
}

NavBar.propTypes = {
  // messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedTab: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
  // openAddBalanceDialog: PropTypes.func.isRequired
};

export default withWidth()(withStyles(styles, { withTheme: true })(NavBar));
