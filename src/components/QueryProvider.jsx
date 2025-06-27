import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { fetchTopics } from "../utils/fetchTopics";

import { FormControl, InputLabel, Select, MenuItem, Grid, Typography, Box } from "@mui/material";

export const QueryProvider = () => {
  const [topics, setTopics] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const topic = searchParams.get("topic") ?? "All";
  const sort_by = searchParams.get("sort_by") ?? "created_at";
  const order = searchParams.get("order") ?? "DESC";

  useEffect(() => {
    const asyncGetTopics = async () => {
      const { topics } = await fetchTopics();
      setTopics([...topics]);
    };

    asyncGetTopics();
  }, []);

  return (
    <>
      <Box
        sx={{
          zIndex: 1300,
          position: "sticky",
          bgcolor: "white",
          top: 84,
          alignSelf: "flex-start",
          boxShadow: 10,
          p: 1.5,
          mb: 3,
          ml: 1,
          borderRadius: 1,
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Typography variant="h3" sx={{ fontSize: 20 }}>
          Filter and Sort Results:
        </Typography>

        <Grid
          container
          sx={{
            zIndex: 1300,
            position: "sticky",
            bgcolor: "white",
            top: 84,
            alignSelf: "flex-start",
            p: 1.5,
            borderRadius: 1,
            alignItems: "center",
            justifyContent: "flex-start",
          }}
          spacing={1}
        >
          <FormControl variant="outlined" size="small" fullwidth="true" sx={{ maxWidth: 320 }}>
            <InputLabel id="sort_by">Sort By:</InputLabel>
            <Select
              onChange={(e) => setSearchParams({ order, topic, sort_by: e.target.value })}
              id="sort_by"
              name="sort"
              value={sort_by}
              label="sort_By"
              sx={{ width: { xs: 100, md: "auto" } }}
            >
              <MenuItem value="created_at">Created At</MenuItem>
              <MenuItem value="votes">Votes</MenuItem>
              <MenuItem value="comment_count">Comment Count</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" size="small" sx={{ maxWidth: 320 }}>
            <InputLabel id="order">Order:</InputLabel>
            <Select
              onChange={(e) => setSearchParams({ topic, sort_by, order: e.target.value })}
              id="order"
              name="order"
              value={order}
              label="order"
              sx={{ width: { xs: 100, md: "auto" } }}
            >
              <MenuItem value="DESC">Descending</MenuItem>
              <MenuItem value="ASC">Ascending</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" size="small" sx={{ maxWidth: 320 }}>
            <InputLabel id="topic">Topic:</InputLabel>
            <Select
              onChange={(e) => setSearchParams({ sort_by, order, topic: e.target.value })}
              id="topic"
              name="topic"
              value={topic}
              label="topic"
              sx={{ width: { xs: 100, md: "auto" } }}
            >
              <MenuItem value="All">All</MenuItem>
              {topics.map((topic) => (
                <MenuItem key={topic.slug} value={topic.slug}>
                  <Typography sx={{ textTransform: "capitalize" }}>{topic.slug}</Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Box>
    </>
  );
};
