import { Route, Routes } from "react-router";
import { ArticleList } from "./components/ArticleList";
import { Article } from "./components/Article";
import { Home } from "./components/Home";
import { Topics } from "./components/Topics";
import { TopicRedirect } from "./components/TopicRedirect";
import { Container } from "@mui/material";
import { Header } from "./components/Header";

function App() {
  return (
    <Container msx={{ m: 0 }}>
      <Header />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/home"} element={<Home />} />
        <Route path={"/articles"} element={<ArticleList />} />
        <Route path={"/articles/:article_id"} element={<Article />} />
        <Route path={"/topics"} element={<Topics />} />
        <Route path={"/topics/:topic"} element={<TopicRedirect />} />
      </Routes>
    </Container>
  );
}

export default App;
