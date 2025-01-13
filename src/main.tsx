import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import './index.css';
import { ReactFlowProvider } from '@xyflow/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlowProvider>
        <App />
      </ReactFlowProvider>
    </div>
  </React.StrictMode>
);
