import React, { useState, useCallback, useRef, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withRouter } from "react-router-dom";
import {
  TextField,
  Button,
  Checkbox,
  Typography,
  FormControlLabel,
  withStyles
} from "@material-ui/core";
import FormDialog from "../../../shared/components/FormDialog";
import HighlightedInformation from "../../../shared/components/HighlightedInformation";
import ButtonCircularProgress from "../../../shared/components/ButtonCircularProgress";
import VisibilityPasswordTextField from "../../../shared/components/VisibilityPasswordTextField";
import axios from "axios";

var apiBaseUrl = "http://localhost:4000/api/";

const styles = (theme) => ({
  forgotPassword: {
    marginTop: theme.spacing(2),
    color: theme.palette.primary.main,
    cursor: "pointer",
    "&:enabled:hover": {
      color: theme.palette.primary.dark
    },
    "&:enabled:focus": {
      color: theme.palette.primary.dark
    }
  },
  disabledText: {
    cursor: "auto",
    color: theme.palette.text.disabled
  },
  formControlLabel: {
    marginRight: 0
  }
});

function LoginDialog(props) {
  const {
    setStatus,
    history,
    classes,
    onClose,
    openChangePasswordDialog,
    status
  } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const loginEmail = useRef();
  const loginPassword = useRef();
  var isLogin = -1;

  const login = useCallback(() => {
    setIsLoading(true);
    setStatus(null);

    // console.log("===", isLogin);

    if (isLogin === 2) {
      setTimeout(() => {
        setStatus("invalidEmail");
        setIsLoading(false);
      }, 1500);
    } else if (isLogin === 3) {
      setTimeout(() => {
        setStatus("invalidPassword");
        setIsLoading(false);
      }, 1500);
    } else if (isLogin === 1) {
      setTimeout(() => {
        history.push("/c/dashboard");
      }, 150);
    }
  }, [setIsLoading, history, setStatus, isLogin]);

  function requestLogin() {
    var payload = {
      userid: loginEmail.current.value,
      password: loginPassword.current.value
    };
    axios
      .post(apiBaseUrl + "login", payload)
      .then(function (response) {
        console.log(response);
        if (response.data.code === 200) {
          console.log("Login successfull");
          isLogin = 1;
        } else if (response.data.code === 204) {
          console.log("Username password do not match");
          isLogin = 2;
        } else {
          console.log("Username does not exists");
          isLogin = 3;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Fragment>
      <FormDialog
        open
        onClose={onClose}
        loading={isLoading}
        onFormSubmit={(e) => {
          e.preventDefault();
          //requestLogin();
          isLogin = 1;
          login();
        }}
        hideBackdrop
        headline="Login"
        content={
          <Fragment>
            <TextField
              variant="outlined"
              margin="normal"
              error={status === "invalidEmail"}
              required
              fullWidth
              label="Email Address"
              inputRef={loginEmail}
              autoFocus
              autoComplete="off"
              type="email"
              onChange={() => {
                if (status === "invalidEmail") {
                  setStatus(null);
                }
              }}
              helperText={
                status === "invalidEmail" &&
                "This email address isn't associated with an account."
              }
              FormHelperTextProps={{ error: true }}
            />
            <VisibilityPasswordTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={status === "invalidPassword"}
              label="Password"
              inputRef={loginPassword}
              autoComplete="off"
              onChange={() => {
                if (status === "invalidPassword") {
                  setStatus(null);
                }
              }}
              helperText={
                status === "invalidPassword" ? (
                  <span>
                    Incorrect password. Try again, or click on{" "}
                    <b>&quot;Forgot Password?&quot;</b> to reset it.
                  </span>
                ) : (
                  ""
                )
              }
              FormHelperTextProps={{ error: true }}
              onVisibilityChange={setIsPasswordVisible}
              isVisible={isPasswordVisible}
            />
            <FormControlLabel
              className={classes.formControlLabel}
              control={<Checkbox color="primary" />}
              label={<Typography variant="body1">Remember me</Typography>}
            />
            {status === "verificationEmailSend" ? (
              <HighlightedInformation>
                We have send instructions on how to reset your password to your
                email address
              </HighlightedInformation>
            ) : (
              <HighlightedInformation>
                {/* Email is: <b>test@web.com</b>
                <br />
                Password is: <b>HaRzwc</b> */}
                Welcome!
                <br />
                Please Login!
              </HighlightedInformation>
            )}
          </Fragment>
        }
        actions={
          <Fragment>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              disabled={isLoading}
              size="large"
            >
              Login
              {isLoading && <ButtonCircularProgress />}
            </Button>
            <Typography
              align="center"
              className={classNames(
                classes.forgotPassword,
                isLoading ? classes.disabledText : null
              )}
              color="primary"
              onClick={isLoading ? null : openChangePasswordDialog}
              tabIndex={0}
              role="button"
              onKeyDown={(event) => {
                // For screenreaders listen to space and enter events
                if (
                  (!isLoading && event.keyCode === 13) ||
                  event.keyCode === 32
                ) {
                  openChangePasswordDialog();
                }
              }}
            >
              Forgot Password?
            </Typography>
          </Fragment>
        }
      />
    </Fragment>
  );
}

LoginDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  openChangePasswordDialog: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.string
};

export default withRouter(withStyles(styles)(LoginDialog));
