import { Box, LinearProgress } from "@mui/material";

export const Loader = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <LinearProgress sx={{ width: "60%" }} />
    </Box>
  );
};
