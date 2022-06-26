import React, { useState } from 'react';
import Slider from '../components/slider'
import '../styles/App.css';

function SurveyPage() {
  const [status, setStatus] = useState<number>(5)

  return (
    <div className="App">
      {status}
      <Slider status={status} setStatus={setStatus} />
    </div>
);
}

export default SurveyPage;
