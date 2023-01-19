import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialInputs = { name: "", email: "", password: "" };
  const [formInputs, setFormInputs] = useState(initialInputs);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormInputs({ ...formInputs, [name]: value });
  };

  const sendRequest = async (type = "signin") => {
    const res = await axios
      .post(`https://backend-blog-app7.onrender.com/api/user/${type}`, {
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
    setFormErrors(validate(formInputs));
    setIsSubmit(true);
    //sendRequest();

    if (isSignUp) {
      sendRequest("signup")
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"))
        .then((data) => console.log(data));
    } else {
      sendRequest()
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"))
        .then((data) => console.log(data));
    }
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formInputs);
    }
  }, [formErrors]);

  const validate = (formInputs) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!formInputs.name) {
      errors.name = "Name is required !";
    }

    if (!formInputs.email) {
      errors.email = "Email is required !";
    } else if (!regex.test(formInputs.email)) {
      errors.email = "This is not a valid email format";
    }

    if (!formInputs.password) {
      errors.password = "Password is required !";
    } else if (formInputs.password.length < 6) {
      errors.password = "Password must be more than 6 characters !";
    } else if (formInputs.password.length > 12) {
      errors.password = "Password can not exceed more than 12 characters !";
    }

    return errors;
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
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
          sx={{
            boxShadow: "5px 5px 10px #ccc",
          ":hover": { boxShadow: "10px 10px 20px #ccc" }
          }}
        >

          <Typography padding={3} textAlign="center" variant="h2">
            {isSignUp ? "Signup" : "Signin "}
          </Typography>
          {isSignUp && (
            <>
              <TextField
                onChange={handleChange}
                value={formInputs.name}
                name="name"
                placeholder="Name"
                margin="normal"
                sx={{ borderRadius: 2, boxShadow: "2px 2px 4px #ccc" }}
              />
              <p Style="color:red;">{formErrors.name}</p>
            </>
          )}
          <TextField
            onChange={handleChange}
            value={formInputs.email}
            name="email"
            placeholder="Email"
            margin="normal"
            sx={{ borderRadius: 2, boxShadow: "2px 2px 4px #ccc" }}
          />
          <p Style="color:red;">{formErrors.email}</p>

          <TextField
            type="password"
            onChange={handleChange}
            value={formInputs.password}
            name="password"
            placeholder="Password"
            margin="normal"
            sx={{ borderRadius: 2, boxShadow: "2px 2px 4px #ccc" }}
          />
          <p Style="color:red;">{formErrors.password}</p>

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
