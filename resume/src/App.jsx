import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Analyzer from "./pages/Analyzer";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./main.css";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analyzer" element={<Analyzer />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}











// Software developer with experience in Python, Flask, APIs, databases, Git, and backend systems.
