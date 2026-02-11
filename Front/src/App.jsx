import "./App.css";
import { Route, Routes } from "react-router-dom";
import PropertyAdsPage from "@/pages/PropertyAdsPage";

const linkClassName = ({ isActive }) =>
  `rounded-md px-3 py-2 text-sm font-medium ${
    isActive
      ? "bg-blue-600 text-white"
      : "border border-gray-300 text-gray-700 hover:bg-gray-100"
  }`;

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PropertyAdsPage />} />
      </Routes>
    </>
  );
}

export default App;
