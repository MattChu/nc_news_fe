import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchTopics } from "../utils/fetchTopics";

export const QueryProvider = () => {
  const [topics, setTopics] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const topic = searchParams.get("topic") ?? "";
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
    <section className="fitler">
      <label htmlFor="sort">Sort by:</label>
      <select
        onChange={(e) => setSearchParams({ order, topic, sort_by: e.target.value })}
        id="sort"
        name="sort"
        value={sort_by}
      >
        <option value="created_at">Created At</option>
        <option value="votes">Votes</option>
        <option value="comment_count">Comment Count</option>
      </select>

      <label htmlFor="order">Order:</label>
      <select
        onChange={(e) => setSearchParams({ topic, sort_by, order: e.target.value })}
        id="order"
        name="order"
        value={order}
      >
        <option value="DESC">Descending</option>
        <option value="ASC">Ascending</option>
      </select>

      <label htmlFor="topic">Topic:</label>
      <select
        onChange={(e) => setSearchParams({ sort_by, order, topic: e.target.value })}
        id="topic"
        name="topic"
        value={topic}
      >
        <option value="">All</option>
        {topics.map((topic) => (
          <option key={topic.slug} value={topic.slug}>
            {topic.slug}
          </option>
        ))}
      </select>
    </section>
  );
};
