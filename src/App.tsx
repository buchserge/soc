import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Message } from "./components/Message/Message";
import { Register } from "./components/Register/Register";
import { Login } from "./components/Login/Login";

import { Comment } from "./components/Comment/Comment";
import { NotFound } from "./components/NotFound/NotFound";
import { Home } from "./components/Home/Home";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/messages/:page?" element={<Message />} />
          <Route path="/comments/:messageId/" element={<Comment />} />
          <Route path="/reg" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
