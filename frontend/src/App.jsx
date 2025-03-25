import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Tasks from "./Tasks";

function App() {
  return (
    <Router>
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Tasks />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
