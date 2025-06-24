import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export const TopicRedirect = () => {
  const { topic } = useParams();
  return <Navigate to={`/articles?topic=${topic}`} />;
};
