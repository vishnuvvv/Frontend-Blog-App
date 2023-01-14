import { AppBar, Button, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authActions } from "../store";

const Header = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
 
  return (
    <div>
      <AppBar
        position="sticky"
        sx={{
          background:
            "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(255,132,0,1) 100%)",
        }}
      >
        <Toolbar>
          <Typography variant="h4" color="grey">
            Blog app
          </Typography>
          <Box display="flex" marginLeft="auto" marginRight="auto">
            {isLoggedIn && (
              <Tabs
                textColor="Inherit"
                value={value}
                onChange={(e, val) => setValue(val)}
              >
                <Tab LinkComponent={Link} to="/blogs" label="AllBlogs" />
                <Tab LinkComponent={Link} to="/myBlogs" label="MyBlogs" />
              </Tabs>
            )}
          </Box>
          <Box display="flex" marginLeft="auto">
            {!isLoggedIn && (
              <>
                {" "}
                <Button
                  LinkComponent={Link}
                  to="/auth"
                  variant="contained"
                  sx={{ margin: 1, borderRadius: 10 }}
                  color="warning"
                >
                  Login
                </Button>
                <Button
                  LinkComponent={Link}
                  to="/auth"
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
                to="/auth"
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
