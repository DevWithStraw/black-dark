import { BrowserRouter, Routes, Route } from "react-router-dom";

import Favicon from "./helpers/favicon";
import Home from "./pages/home";
import NotFound from "./pages/404";

function App() {  
  return (
    <BrowserRouter>
      <Favicon />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
