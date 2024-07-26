import React from "react";
import {
    BrowserRouter, // hmm what's that hmmm
    Routes,
    Route,
} from "react-router-dom";
import Post from "./pages/post";
import Get from "./pages/get";
 
function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route exact path="/" element={<Post />} />
          <Route exact path="/finddata" element={<Get />} />
      </Routes>
    </BrowserRouter>
  );
}
 
export default App;