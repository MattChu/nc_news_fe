import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Grid, Button } from "@mui/material";

export const Header = () => {
  return (
    <AppBar sx={{ mt: 1, mb: 2, position: "sticky" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "inherit",
            textAlign: { xs: "left" },
          }}
        >
          News 4 U Direct
        </Typography>
        <Grid container sx={{ justifyContent: "flex-end" }}>
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
