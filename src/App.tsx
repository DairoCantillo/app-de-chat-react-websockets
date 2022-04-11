import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";

const App = () => {
  return (
    <div className="container bg-red-800">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/" element={<Welcome />} />
      </Routes>
    </div>
  );
};

export default App;
