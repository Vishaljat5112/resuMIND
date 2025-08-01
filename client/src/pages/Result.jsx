

// src/pages/Result.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import ResumeResult from '../components/ResumeResult';

const ResultPage = () => {
  const location = useLocation();
  const data = location.state;

  return (
    <div>
      <ResumeResult data={data} />
    </div>
  );
};

export default ResultPage;