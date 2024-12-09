import { BrowserRouter, Routes, Route } from "react-router-dom";

import Favicon from "./helpers/favicon";

import Home from "./pages/home";
import NotFound from "./pages/404";

import Navbar from './layouts/navbar';  

function App() {  
  return (
    <BrowserRouter>
      <Favicon />
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
