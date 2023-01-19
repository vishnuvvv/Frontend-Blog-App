import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

const BlogDetail = () => {
  const navigate = useNavigate()
  const [formInputs, setFormInputs] = useState();
  const [blog, setBlog] = useState();
  const id = useParams().id;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInputs({ ...formInputs, [name]: value });
  };

  const sendRequest = async () => {
    const res = await axios
      .put(`https://backend-blog-app7.onrender.com/api/blog/update/${id}`, {
        title: formInputs.title,
        description: formInputs.description,
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formInputs);
    sendRequest().then((data) => console.log(data)).then(()=>navigate("/myBlogs"));
  };

  const fetchDetails = async () => {
    const res = await axios
      .get(`https://backend-blog-app7.onrender.com/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = res.data;
    return data;
  };

  useEffect(() => {
    fetchDetails().then((data) => {
      setBlog(data.blog);
      setFormInputs({
        title: data.blog.title,
        description: data.blog.description,
      });
    });
  }, []);

  console.log(blog);
  return (
    <div>
      {formInputs && (
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
              fontWeight="bold"
              padding={3}
              color="grey"
              variant="h2"
              textAlign="center"
            >
              Post Your Blog
            </Typography>
            <InputLabel sx={labelStyles}>Title</InputLabel>
            <TextField
              margin="auto"
              variant="outlined"
              name="title"
              onChange={handleChange}
              value={formInputs.title}
            />
            <InputLabel sx={labelStyles}>Description</InputLabel>
            <TextField
              margin="auto"
              variant="outlined"
              name="description"
              onChange={handleChange}
              value={formInputs.description}
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
      )}
    </div>
  );
};

export default BlogDetail;
