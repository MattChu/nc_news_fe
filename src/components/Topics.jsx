import { useState, useEffect } from "react";
import { fetchTopics } from "../utils/fetchTopics";
import { Link } from "react-router";

export const Topics = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const asyncGetTopics = async () => {
      const { topics } = await fetchTopics();
      setTopics([...topics]);
    };

    asyncGetTopics();
  }, []);

  return (
    <section className="topiclist">
      <h2>Topics</h2>
      {topics.map((topics) => (
        <section key={topics.slug} className="topiccard">
          <Link to={`/topics/${topics.slug}`}>{topics.slug}</Link>
        </section>
      ))}
    </section>
  );
};
