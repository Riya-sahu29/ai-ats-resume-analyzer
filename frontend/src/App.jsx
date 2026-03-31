import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Analyzer from "./pages/Analyzer";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Chat from "./pages/Chat";
import "./main.css";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analyze" element={<Analyzer />} />
        <Route path="/chat" element={<Chat />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}













