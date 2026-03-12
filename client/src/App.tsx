import { Routes, Route } from "react-router";
import "./App.css";
import "./css/generals.scss";
import AddProject from "./pages/add-project/add-project";
import MasterLayout from "./layouts/master.layout";
import Home from "./pages/home/home";
import MyProjects from "./pages/home/my-projects/my-projects";
import MyColleagues from "./pages/home/my-colleagues/my-colleagues";
import SingleProject from "./pages/single-project/single-project";
import NotFound from "./pages/404/404";
import MyClients from "./pages/home/my-clients/my-clients";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Logout from "./pages/logout/logout";
import { useAuthContext } from "./hooks/useAuthContext";
function App() {
  const { token } = useAuthContext();

  if (!token)
    return (
      <Routes>
        <Route element={<MasterLayout token={token} />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    );

  return (
    <Routes>
      <Route element={<MasterLayout token={token} />}>
        <Route path="/" element={<Home />}>
          <Route index element={<MyProjects />} />
          <Route path="/my-projects" element={<MyProjects />} />
          <Route path="/my-colleagues" element={<MyColleagues />} />
          <Route path="/my-clients" element={<MyClients />} />
        </Route>
        <Route path="/new-project" element={<AddProject />} />
        <Route path="/project/:projectId" element={<SingleProject />} />
        <Route path="/project/edit/:projectId" element={<AddProject />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
