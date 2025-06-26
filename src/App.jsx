import { Route, Routes } from "react-router";
import { ArticleList } from "./components/ArticleList";
import { Article } from "./components/Article";
import { Home } from "./components/Home";
import { Topics } from "./components/Topics";
import { TopicRedirect } from "./components/TopicRedirect";
import { Header } from "./components/Header";
import { Users } from "./components/Users";
import { Container } from "@mui/material";
import { UserProvider } from "./contexts/UserContext";
import { Uhoj } from "./components/Uhoj";

function App() {
  return (
    <UserProvider>
      <Container sx={{ maxWidth: { lg: 1600 }, p: { xs: 0, sm: 1 } }}>
        <Header />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/Login"} element={<Users />} />
          <Route path={"/home"} element={<Home />} />
          <Route path={"/articles"} element={<ArticleList />} />
          <Route path={"/articles/:article_id"} element={<Article />} />
          <Route path={"/topics"} element={<Topics />} />
          <Route path={"/topics/:topic"} element={<TopicRedirect />} />
          <Route path={"/uhoj"} element={<Uhoj />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Container>
    </UserProvider>
  );
}

export default App;
