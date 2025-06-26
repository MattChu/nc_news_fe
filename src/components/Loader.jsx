import { Container, LinearProgress } from "@mui/material";

export const Loader = () => {
  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <LinearProgress sx={{ width: "60%", mt: 3 }} />
    </Container>
  );
};
