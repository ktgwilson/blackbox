import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [scope, setScope] = useState('');
  const [result, setResult] = useState(null);

  const handleEstimate = async () => {
    const res = await axios.post('/api/estimate', { scope });
    setResult(res.data);
  };

  return (
    <div>
      <h1>BlackBox 1000x Estimator</h1>
      <textarea value={scope} onChange={e => setScope(e.target.value)} placeholder="Enter project scope..." />
      <button onClick={handleEstimate}>Estimate</button>
      {result && (
        <pre>{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  );
}

export default App;
