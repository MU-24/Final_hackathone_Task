import { BrowserRouter , Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import Board from "./components/Board.jsx";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
import Home from "./components/Home.jsx";

const App = () => (
  <AuthProvider>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/board" element={<Board />} />
      </Routes>
 
  </AuthProvider>
);

export default App;
