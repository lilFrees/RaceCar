import "./App.css";
import { Route, Routes } from "react-router-dom";
import Garage from "./pages/Garage/Garage";
import Winners from "./pages/Winners/Winners";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Garage />}></Route>
        <Route path="/winners" element={<Winners />}></Route>
      </Routes>
    </>
  );
}

export default App;
