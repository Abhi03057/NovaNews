import './App.css';
import LoadingBar from "react-top-loading-bar";
import React, { useState } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import { HashRouter as Router, Route, Routes } from "react-router-dom";


const App = () => {
  const pagesize = 15;
  const [progress, setProgress] = useState(0);

  return (
    <div>
      <Router>
        <NavBar />
        <LoadingBar color="#f11946" progress={progress} />
        <Routes>
          <Route exact path="/business" element={<News setProgress={setProgress} key="business" pagesize={pagesize} country="us" category="business" />} />
          <Route exact path="/entertainment" element={<News setProgress={setProgress} key="entertainment" pagesize={pagesize} country="us" category="entertainment" />} />
          <Route exact path="/general" element={<News setProgress={setProgress} key="general" pagesize={pagesize} country="us" category="general" />} />
          <Route exact path="/health" element={<News setProgress={setProgress} key="health" pagesize={pagesize} country="us" category="health" />} />
          <Route exact path="/science" element={<News setProgress={setProgress} key="science" pagesize={pagesize} country="us" category="science" />} />
          <Route exact path="/sports" element={<News setProgress={setProgress} key="sports" pagesize={pagesize} country="us" category="sports" />} />
          <Route exact path="/technology" element={<News setProgress={setProgress} key="technology" pagesize={pagesize} country="us" category="technology" />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
