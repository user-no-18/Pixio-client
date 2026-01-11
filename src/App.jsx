import React, { useContext } from 'react'
import "./app.css"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Result from './pages/Result'
import BuyCredit  from './pages/BuyCredit'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import { AppContext } from './contexts/AppContext'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EnhanceImage from './pages/Image-upscalling'
import RemoveBackground from './pages/Remove-background'
import RemoveText from './pages/Remove-text'
import UncropImage from './pages/Uncrop-obj'
import ReplaceBG from './pages/Replace-bg'
import Cleanup from './pages/Cleanup'
import DocumentationSection from './components/Docs'
import Dashboard from './pages/Dashboard'






const App = () => {
  const { showLogin } = useContext(AppContext);

  return (
    <div className="min-h-screen bg-black">
      <ToastContainer position="bottom-right" />
      <Navbar />
      {showLogin && <Login />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/enhance-image" element={<EnhanceImage />} />
        <Route path="/remove-bg" element={<RemoveBackground />} />
        <Route path="/remove-text" element={<RemoveText />} />
        <Route path="/uncrop" element={<UncropImage />} />
        <Route path="/replace-bg" element={<ReplaceBG />} />
        <Route path="/cleanup" element={<Cleanup />} />
        <Route path="/buy" element={<BuyCredit />} />
        <Route path="/docs" element={<DocumentationSection />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

      <Footer />
    </div>
  );
};


export default App
// username - imagify
// user mail - imagify@gmail.com  pass - 1234

