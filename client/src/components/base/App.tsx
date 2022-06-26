import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SurveyPage, ResultPage } from '../../pages'
import '../../styles/App.css';

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<SurveyPage />} />
      <Route path="result" element={<ResultPage />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
