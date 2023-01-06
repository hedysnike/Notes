import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Archive from "./pages/Archive";
import Labelsmap from "./pages/LabelsMap";

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
