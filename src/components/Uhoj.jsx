import { Link } from "react-router";

export const Uhoj = () => {
  return (
    <section className="uhoj">
      <h3>Oh No!</h3>
      <p>The page you are looking for doesn't exist </p>
      <Link to="/articles">Click here to view all Articles</Link>
      <Link to="/topics">Click here to view all Topics</Link>
    </section>
  );
};
