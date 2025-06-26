import { Link } from "react-router";
import { Box, Typography } from "@mui/material";

export const Uhoj = () => {
  return (
    <Box
      sx={{
        m: 3,
        display: "flex",
        flexWrap: "none",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant={"h2"} fontSize={40}>
        Oh No!
      </Typography>
      <Typography sx={{ p: 2, textAlign: "justify" }}>The page you are looking for doesn't exist</Typography>
      <Box sx={{ p: 3 }}>
        <Link to="/articles">Click here to view all Articles</Link>
      </Box>
      <Link to="/topics">Click here to view all Topics</Link>
    </Box>
  );
};
