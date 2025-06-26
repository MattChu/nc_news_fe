import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Grid, Button } from "@mui/material";

export const Header = () => {
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
        <Grid container sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button color="inherit" component={Link} to="/articles">
            Articles
          </Button>
          <Button color="inherit" component={Link} to="/topics">
            Topics
          </Button>
          <Button color="inherit" component={Link} to="/random">
            Random Article
          </Button>
          <Button color="inherit" component={Link} to="/about">
            About
          </Button>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
