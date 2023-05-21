import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/Login/Login";
import Home from "./views/Home/Home";
import Role from "./views/Roles/Role";
import User from "./views/User/User";
import Mine from "./views/User/Mine";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />}>
          <Route path="/home/role" element={<Role />} />
          <Route path="/home/user" element={<User />} />
          <Route path="/home/mine" element={<Mine />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
