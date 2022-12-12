import CreateUserPage from "./pages/CreateUserPage";
import DetailUserPage from "./pages/DetailUserPage";
import ListUserPage from "./pages/ListUserPage";
import { Routes, Route } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import Loading from "./components/pages/Loading";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ListUserPage />} />
      <Route path="/createuser" element={<CreateUserPage />} />
      <Route path="/detailuser" element={<DetailUserPage />} />
      <Route path="/detailuser/:id" element={<DetailUserPage />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
