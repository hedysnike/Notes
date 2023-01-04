import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./home";
import Archive from "./pages/Archive";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="archive"  element={<Archive />}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
