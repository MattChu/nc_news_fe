import { UserContext } from "../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { fetchUsers } from "../utils/fetchUsers";
import { Grid, Typography, Card, Stack, CardActionArea, CardMedia, CardContent, Box, Divider } from "@mui/material";

export const Users = () => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [isErr, setIsErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const asyncGetUsers = async () => {
      setIsErr(false);
      setIsLoading(true);
      try {
        const { users } = await fetchUsers();
        setUsers(users);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setIsErr(true);
      }
    };

    asyncGetUsers();
  }, []);

  const handleUserClick = (user) => {
    setLoggedInUser(user);
  };

  return (
    <Stack>
      <Grid
        sx={{
          p: 1,
          flexGrow: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Typography variant={"h2"} textAlign={"center"}>
          Users
        </Typography>
      </Grid>
      <Grid
        container
        spacing={4}
        sx={{
          justifyContent: "center",
          alignItems: "flex-start",
          mt: 0,
          mr: 0.5,
        }}
      >
        {users.map((user) => (
          <Card
            key={user.username}
            sx={{ width: 320, boxShadow: 4, display: "flex", justifyContent: "center", alignContent: "center" }}
          >
            <CardActionArea
              onClick={() => handleUserClick(user)}
              sx={{ maxWidth: 320, padding: 2, display: "flex", justifyContent: "center" }}
            >
              <CardMedia
                sx={{ height: 100, width: 100, boxShadow: 4 }}
                image={user.avatar_url}
                title={user.username}
                alt={`Avatar for User ${user.username}`}
              />

              <CardContent>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body1" sx={{ textTransform: "capitalize", textAlign: "center" }}>
                    {user.username}
                  </Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ my: 1 }}>
                  <Typography variant="body2" size="small" sx={{ my: 0, color: "text.secondary", textAlign: "center" }}>
                    Click to login as {user.username}
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Grid>
    </Stack>
  );
};
