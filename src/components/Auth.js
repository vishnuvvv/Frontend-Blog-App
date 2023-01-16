import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialInputs = { name: "", email: "", password: "" };
  const [formInputs, setFormInputs] = useState(initialInputs);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormInputs({ ...formInputs, [name]: value });
  };

  const sendRequest = async (type = "signin") => {
    const res = await axios
      .post(`http://localhost:5000/api/user/${type}`, {
        name: formInputs.name,
        email: formInputs.email,
        password: formInputs.password,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    console.log(data);
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formInputs);
    //sendRequest();

    if (isSignUp) {
      sendRequest("signup")
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"))
        .then((data) => console.log(data));
    } else {
      sendRequest().then((data)=>localStorage.setItem("userId",data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"))
        .then((data) => console.log(data));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth="300px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
        >
          <Typography padding={3} textAlign="center" variant="h2">
            {isSignUp ? "Signup" : "Signin "}
          </Typography>
          {isSignUp && (
            <TextField
              onChange={handleChange}
              value={formInputs.name}
              name="name"
              placeholder="Name"
              margin="normal"
              sx={{ borderRadius: 2, boxShadow: "2px 2px 4px #ccc" }}
            />
          )}
          <TextField
            onChange={handleChange}
            value={formInputs.email}
            name="email"
            placeholder="Email"
            margin="normal"
            sx={{ borderRadius: 2, boxShadow: "2px 2px 4px #ccc" }}
          />
          <TextField
            type="password"
            onChange={handleChange}
            value={formInputs.password}
            name="password"
            placeholder="Password"
            margin="normal"
            sx={{ borderRadius: 2, boxShadow: "2px 2px 4px #ccc" }}
          />
          <Button
            sx={{
              borderRadius: 2,
              marginTop: 3,
              boxShadow: "10px 10px 20px #ccc",
            }}
            color="warning"
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
          <Button onClick={() => setIsSignUp(!isSignUp)}>
            Change TO {isSignUp ? "Signin" : "Signup !!"}
          </Button>
        </Box>
      </form>
    </div>
  );
};
export default Auth;
