import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Gallery from "./Gallery";
function App() {
  return (
  <>
  <BrowserRouter> 
        <Routes>
          <Route path="/" element={<Gallery />} />
        </Routes>
      </BrowserRouter>
      
  </>

  );
}

export default App;
