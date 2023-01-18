import { AppBar, Button, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authActions } from "../store";
import { useStyles } from "./utils";

const Header = () => {
  const classes = useStyles
  const dispatch = useDispatch()
  const [value, setValue] = useState();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
 
  return (
    <div>
      <AppBar
        position="sticky"
        sx={{
          background:
            "#121212 ",
        }}
      >
        <Toolbar>
          <Typography className={classes.font} variant="h4" color="grey">
            bloGeAt
          </Typography>
          <Box display="flex" marginLeft="auto" marginRight="auto">
            {isLoggedIn && (
              <Tabs
                textColor="Inherit"
                value={value}
                onChange={(e, val) => setValue(val)}
              >
                <Tab className={classes.font} LinkComponent={Link} to="/blogs" label="AllBlogs" />
                <Tab className={classes.font} LinkComponent={Link} to="/myBlogs" label="MyBlogs" />
                <Tab className={classes.font} LinkComponent={Link} to="/blogs/add" label="Publish Blog" />
              </Tabs>
            )}
          </Box>
          <Box display="flex" marginLeft="auto">
            {!isLoggedIn && (
              <>
                {" "}
                <Button
                  
                  LinkComponent={Link}
                  to="/"
                  variant="contained"
                  sx={{ margin: 1, borderRadius: 10 }}
                  color="warning"
                >
                  Login
                </Button>
                <Button
                  LinkComponent={Link}
                  to="/"
                  variant="contained"
                  sx={{ margin: 1, borderRadius: 10 }}
                  color="warning"
                >
                  Signup
                </Button>{" "}
              </>
            )}
            {isLoggedIn && (
              <Button
                onClick={()=>dispatch(authActions.logout())}
                LinkComponent={Link}
                to="/"
                variant="contained"
                sx={{ margin: 1, borderRadius: 10 }}
                color="warning"
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
