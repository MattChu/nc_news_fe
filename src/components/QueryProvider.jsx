import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchTopics } from "../utils/fetchTopics";
import { FormControl, InputLabel, Select, MenuItem, Container, Typography } from "@mui/material";

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
    <Container sx={{ margin: 0 }}>
      <FormControl margin="normal" variant="outlined" size="small" sx={{ maxWidth: 300 }}>
        <InputLabel id="sort_by">Sort By:</InputLabel>
        <Select
          onChange={(e) => setSearchParams({ order, topic, sort_by: e.target.value })}
          id="sort_by"
          name="sort"
          value={sort_by}
          label="sort_By"
        >
          <MenuItem value="created_at">Created At</MenuItem>
          <MenuItem value="votes">Votes</MenuItem>
          <MenuItem value="comment_count">Comment Count</MenuItem>
        </Select>
      </FormControl>
      <FormControl margin="normal" variant="outlined" size="small" sx={{ maxWidth: 300 }}>
        <InputLabel id="order">Order:</InputLabel>
        <Select
          onChange={(e) => setSearchParams({ topic, sort_by, order: e.target.value })}
          id="order"
          name="order"
          value={order}
          label="order"
        >
          <MenuItem value="DESC">Descending</MenuItem>
          <MenuItem value="ASC">Ascending</MenuItem>
        </Select>
      </FormControl>
      <FormControl margin="normal" variant="outlined" size="small" sx={{ maxWidth: 300 }}>
        <InputLabel id="topic">Topic:</InputLabel>
        <Select
          onChange={(e) => setSearchParams({ sort_by, order, topic: e.target.value })}
          id="topic"
          name="topic"
          value={topic}
          label="topic"
        >
          <MenuItem value="All">All</MenuItem>
          {topics.map((topic) => (
            <MenuItem key={topic.slug} value={topic.slug}>
              <Typography sx={{ textTransform: "capitalize" }}>{topic.slug}</Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Container>
  );
};
