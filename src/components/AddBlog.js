import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./utils";


const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

const AddBlog = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const initialValues = { title: "", description: "", imageURL: "" };
  const [formInputs, setFormInputs] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInputs({ ...formInputs, [name]: value });
  };

  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:5000/api/blog/add", {
        title: formInputs.title,
        description: formInputs.description,
        image: formInputs.imageURL,
        user: localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formInputs);
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/blogs"));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          border={3}
          borderColor="grey"
          borderRadius={10}
          boxShadow="10px 10px 20px #ccc"
          margin="auto"
          marginTop={5}
          padding={3}
          display="flex"
          flexDirection="column"
          width="80%"
        >
          <Typography
            className={classes.font}
            fontWeight="bold"
            padding={3}
            color="grey"
            variant="h2"
            textAlign="center"
          >
            Post Your Blog
          </Typography>
          <InputLabel className={classes.font} sx={labelStyles}>
            Title
          </InputLabel>
          <TextField
            className={classes.font}
            margin="auto"
            variant="outlined"
            name="title"
            onChange={handleChange}
            value={formInputs.title}
          />
          <InputLabel className={classes.font} sx={labelStyles}>
            Description
          </InputLabel>
          <TextField
            className={classes.font}
            margin="auto"
            variant="outlined"
            name="description"
            onChange={handleChange}
            value={formInputs.description}
          />
          <InputLabel className={classes.font} sx={labelStyles}>
            imageURL
          </InputLabel>
          <TextField
            className={classes.font}
            margin="auto"
            variant="outlined"
            name="imageURL"
            onChange={handleChange}
            value={formInputs.imageURL}
          />
          <Button
            sx={{ mt: 2, borderRadius: 4 }}
            variant="contained"
            color="warning"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddBlog;
