import { Route, Routes } from "react-router-dom";
import { Dashboard, Login } from "./pages";

function App() {
  return (
    <Routes>
      <Route element={<Login />} path="/auth/login" />
      <Route element={<Dashboard />} path="*" />
    </Routes>
  );
}

export default App;
