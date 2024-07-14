import React, { useState } from 'react';
import UploadForm from './components/UploadForm';
import HealthChart from './components/HealthChart';

const App = () => {
  const [healthData, setHealthData] = useState([]);

  const handleUpload = (newData) => {
    setHealthData([...healthData, ...newData]);
  };

  return (
    <div>
      <h1>Health Tracker</h1>
      <UploadForm onUpload={handleUpload} />
      {healthData.length > 0 && <HealthChart healthData={healthData} />}
    </div>
  );
};

export default App;
