import { BrowserRouter, Routes, Route } from "react-router-dom";

import Favicon from "./helpers/favicon";
import Home from "./pages/home";

function App() {
  return (
    <BrowserRouter>
      <Favicon />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
