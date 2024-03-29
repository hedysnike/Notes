import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Archive from "./components/Archive";
import Labelsmap from "./pages/Labelsmap";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="archive" element={<Archive />} />
        <Route path="/Labels/:id" element={<Labelsmap />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
