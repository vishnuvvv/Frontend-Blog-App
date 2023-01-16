import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStyles } from "./utils";

const Blog = ({ title, description, imageURL, userName, isUser, id }) => {
  const navigate = useNavigate();
  const classes = useStyles();

  const handleEdit = (e) => {
    e.preventDefault();
    console.log(id)
    navigate(`/myBlogs/${id}`);//will move into blog detail page 
  };

  const deleteRequest = async() => {
   const res = axios.delete(`http://localhost:5000/api/blog/${id}`).catch(err=>console.log(err))
   const data = await res.data
   return data
  }

  const handleDelete = (e) => {
    deleteRequest().then(()=>navigate("/")).then(()=>navigate("/blogs"))
  };

  return (
    <div>
      {" "}
      <Card
        sx={{
          width: "40%",
          margin: "auto",
          mt: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": { boxShadow: "10px 10px 20px #ccc" },
        }}
      >
        {isUser && (
          <Box display="flex">
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              <CreateIcon color="primary" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteOutlineIcon color="error" />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={

            <Avatar className={classes.font} sx={{ bgcolor: "lightblue" }} aria-label="recipe">
              {userName}
            </Avatar>
          }
          title={title}
          subheader="September 14, 2016"
        />
        <CardMedia
          component="img"
          height="194"
          image={imageURL}
          alt="Paella dish"
        />
        <CardContent>
          <hr />
          <br />
          <Typography className={classes.font} variant="body2" color="text.secondary">
            <b>
              {userName} {": "}
            </b>
            {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Blog;
