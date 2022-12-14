import React, { useState } from "react";
import { loginUserDispatch } from "../actions/index";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Checkbox,
  Grid,
  TextField,
  FormControlLabel,
  Paper,
  Button,
} from "@material-ui/core";
import "../App";

import './login.css'
// import  ToastContainer  from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const dispatch = useDispatch();
  const loginuserData = useSelector((state) => state.userProject.loginuser);
  console.log("loginuser deatil", loginuserData);
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [checked, setChecked] = React.useState(true);

  const [loginerr, setLoginerr] = useState();

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const login = async (e) => {
    await axios
      .post("https://project-estimator-backend.herokuapp.com/api/user/login", {
        email,
        password,
      })
      .then((res) => {
        dispatch(loginUserDispatch(res.data));

        // toast(res.data.msg);
        localStorage.setItem("security", res.data.accessToken);
        navigate("/", { replace: true });
        return <Outlet />;
        // navigate('/');
      })
      .catch((err) => {
        console.log("err===>", err.response.data.msg);
        setLoginerr(err.response.data.msg);
        // toast(err.message);
      });
  };

  return (
    <>
      <div style={{ padding: 30 }}>
        <Paper>
          <Grid
            container
            spacing={3}
            direction={"column"}
            justify={"center"}
            alignItems={"center"}
          >
            <Grid item xs={12}>
              <TextField
                label="Username"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                type={"password"}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    label={"Keep me logged in"}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                }
                label="Keep me logged in"
              />
            </Grid>
            <Grid item xs={12}>
              {loginerr ? <p className="loginerror">{loginerr}</p> : ""}
              <Button fullWidth onClick={(e) => login(e)}>
                {" "}
                Login{" "}
              </Button>
              {/* <ToastContainer /> */}
            </Grid>
          </Grid>
        </Paper>
      </div>
    </>
  );
};

export default LoginPage;
