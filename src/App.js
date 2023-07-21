import React from 'react'
import Navbar from './components/Navbar';
import News2Fc from './components/News2Fc';
import {
  BrowserRouter as Router,
  Routes, //Switch updated to Routes in latest version of react-router-dom
  Route,
} from "react-router-dom";

function App() {
    return(
      <Router>
          <Navbar/>
          <Routes>
              <Route path="/" element={<News2Fc key="general" pageSize={8} category="general" country="in"/>} />
              <Route path="/sports" element={<News2Fc key="sports" pageSize={8} category="sports" country="in"/>} />
              <Route path="/general" element={<News2Fc key="general" pageSize={8} category="general" country="in"/>} />
              <Route path="/business" element={<News2Fc key="business" pageSize={8} category="business" country="in"/>} />
              <Route path="/science" element={<News2Fc key="science" pageSize={8} category="science" country="in"/>} />
              <Route path="/entertainment" element={<News2Fc key="entertainment" pageSize={8} category="entertainment" country="in"/>} />
              <Route path="/technology" element={<News2Fc key="technology" pageSize={8} category="technology" country="in"/>} />
              <Route path="/health" element={<News2Fc key="" pageSize={8} category="health" country="in"/>} />
          </Routes>
          
      </Router>
    );
  }

export default App;
