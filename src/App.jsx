import { Route, Routes } from "react-router";
import { ArticleList } from "./components/ArticleList";
import { Article } from "./components/Article";
import { Home } from "./components/Home";
import { Topics } from "./components/Topics";
import { TopicRedirect } from "./components/TopicRedirect";
import { Header } from "./components/Header";
import { Container } from "@mui/material";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/home"} element={<Home />} />
        <Route path={"/articles"} element={<ArticleList />} />
        <Route path={"/articles/:article_id"} element={<Article />} />
        <Route path={"/topics"} element={<Topics />} />
        <Route path={"/topics/:topic"} element={<TopicRedirect />} />
      </Routes>
    </>
  );
}

export default App;
