import { Route, Routes } from "react-router";
import { ArticleList } from "./components/ArticleList";
import { ArticlePage } from "./components/ArticlePage";
import "./index.css";

function App() {
  return (
    <>
      <Routes>
        <Route path={"/articles"} element={<ArticleList />} />
        <Route path={"/articles/:article_id"} element={<ArticlePage />} />
      </Routes>
    </>
  );
}

export default App;
