import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ResumeUpload from "./components/ResumeUpload";
import ResultPage from "./pages/Result";
import Jobs from "./pages/Jobs";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      {/* Top Navbar */}
      <Navbar />

      {/* Main Page Content  */}
      <div className="pt-20 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<ResumeUpload />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/jobs" element={<Jobs />} />
        </Routes>
      </div>

      {/* Bottom Footer */}
      <Footer />
    </Router>
  );
}

export default App;