import "../styles/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import Profile from "../components/Profile";
import {Dashboard} from "../components/Dashboard";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"  element={<Login />}/>
        <Route path="/register"  element={<Register />}/>
        <Route path="/dashboard"  element={<Dashboard />}/>
        <Route path="/profile"  element={<Profile />}/>
        
      </Routes>
    </Router>
  );
}

export default App;
