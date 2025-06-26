import { useState, useEffect } from "react";
import { fetchTopics } from "../utils/fetchTopics";
import { useNavigate } from "react-router";
import { Grid, Typography, Stack, Card, CardActionArea, Box, Divider } from "@mui/material";

export const Topics = () => {
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const asyncGetTopics = async () => {
      const { topics } = await fetchTopics();
      setTopics([...topics]);
    };

    asyncGetTopics();
  }, []);
  console.log(topics[0]);
  return (
    <Stack sx={{ my: 2 }} spacing={3}>
      <Typography variant={"h2"} textAlign={"center"}>
        Topics
      </Typography>
      <Grid
        container
        spacing={4}
        sx={{
          justifyContent: "center",
          alignItems: "flex-start",
          mt: 0,
        }}
      >
        {topics.map((topic) => (
          <Card key={topic.slug} sx={{ p: 0, width: 320, boxShadow: 4, display: "flex", justifyContent: "center" }}>
            <CardActionArea onClick={() => navigate(`/topics/${topic.slug}`)} sx={{ maxWidth: 320, px: 1, py: 1.5 }}>
              <Typography variant="body1" sx={{ textTransform: "capitalize" }}>
                {topic.slug}
              </Typography>

              <Divider sx={{ my: 1 }} />

              <Typography variant="body2" size="small" sx={{ color: "text.secondary" }}>
                {topic.description}
              </Typography>
            </CardActionArea>
          </Card>
        ))}
      </Grid>
    </Stack>
  );
};
