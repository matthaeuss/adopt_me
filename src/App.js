import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import "./App.css";

import SearchParams from "./components/SearchParams";
import Details from "./components/Details";

function App() {
  return (
    <BrowserRouter>
      <header>
        <Link to="/">
          <h1>Adopt Me!</h1>
        </Link>
      </header>

      <Routes>
        <Route path="/" element={<SearchParams />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
