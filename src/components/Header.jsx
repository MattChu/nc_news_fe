import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { AppBar, Toolbar, Typography, Grid, Button, Avatar } from "@mui/material";
import { LocalConvenienceStoreOutlined } from "@mui/icons-material";

export const Header = () => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  console.log(loggedInUser.avatar_url);
  return (
    <AppBar sx={{ mt: 0, mb: 1, position: "sticky", borderRadius: 0, boxShadow: 10 }}>
      <Toolbar>
        <Typography
          variant="h1"
          component={Link}
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
