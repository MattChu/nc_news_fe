import { useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";

import { AppBar, Toolbar, Typography, Grid, Button, Avatar } from "@mui/material";

export const Header = () => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  return (
    <AppBar sx={{ mt: 0, mb: 1, position: "sticky", borderRadius: 0, boxShadow: 10 }}>
      <Toolbar>
        <Typography
          component="h1"
          variant="h1"
          to="/"
          sx={{
            fontSize: 20,
            flexGrow: 1,
            textDecoration: "none",
            color: "inherit",
            textAlign: { xs: "left" },
          }}
        >
          <strong>News 4 U Direct</strong>
        </Typography>
        <Grid container sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
          <Button color="inherit" component={Link} to="/articles">
            Articles
          </Button>
          <Button color="inherit" component={Link} to="/topics">
            Topics
          </Button>
          <Button color="inherit" component={Link} to="/Login">
            Login
            <Avatar
              sx={{ display: "flex", alignContent: "center", width: 24, m: 1, height: 24, bgcolor: "white" }}
              alt={`Avatar Image for ${loggedInUser?.username}`}
              src={`${loggedInUser?.avatar_url}`}
              title={`Currently logged in as ${loggedInUser.name}`}
            />
          </Button>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
