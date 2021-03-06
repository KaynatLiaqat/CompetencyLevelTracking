import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import axios from "axios";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link to="/" style={{ textDecoration: "none" }}>
        Personal Competency Tracking{"   "}
      </Link>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function UpdateUP(props) {
  const classes = useStyles();
  const [userInfo, setUserInfo] = useState({
    ID: "",
    Key: "",
    IDD: localStorage.getItem("userID")
  });
  const onClick = e => {
    e.preventDefault();
    console.log(userInfo);
    axios.post("/updateup", userInfo);
    localStorage.setItem("userID", userInfo.ID);
    props.history.push("/userdashboard");
  };

  useEffect(() => {
    if (userInfo.ID === "") {
      axios
        .post("/getuser", { ID: localStorage.getItem("userID") })
        .then(res => {
          setUserInfo({ ...userInfo, ID: res.data.ID, Key: res.data.Key });
        })
        .catch(error => console.log(error));
    }
  });
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Typography variant="h5">
          <h4 className="display-6">Update Username or Passowrd </h4>
        </Typography>
        <br></br>
        <br></br>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="ID"
            label={"ID: " + userInfo.ID}
            name="ID"
            autoComplete="ID"
            autoFocus
            onChange={e => setUserInfo({ ...userInfo, ID: e.target.value })}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Key"
            label="Key"
            type="Key"
            id="Key"
            autoComplete="current-Key"
            onChange={e => setUserInfo({ ...userInfo, Key: e.target.value })}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="secondary" />}
            label="Remember me"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onClick}
          >
            Update
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
