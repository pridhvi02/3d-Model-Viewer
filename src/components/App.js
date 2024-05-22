import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import Dashboard from './Dashboard';
import ModelViewer from './ModelViewer';
import '../App.css';

const socket = io('http://localhost:5000');

const App = () => {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);

  useEffect(() => {
    // Fetch initial list of models
    const fetchModels = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/models');
        setModels(response.data);
      } catch (error) {
        console.error('Error fetching models:', error);
      }
    };
    fetchModels();

    // Listen for real-time updates
    socket.on('newModel', (newModel) => {
      setModels((prevModels) => [...prevModels, newModel]);
    });

    // Clean up the effect
    return () => socket.off('newModel');
  }, []);

  return (
    <div className="container">
      <h1>3D Model Viewer</h1>
      <Dashboard />
      <div>
        <h2>Available Models</h2>
        <ul>
          {models.map((model) => (
            <li key={model._id} onClick={() => setSelectedModel(model)}>
              {model.name}
            </li>
          ))}
        </ul>
      </div>
      {selectedModel && (
        <ModelViewer url={`data:model/gltf-binary;base64,${btoa(
          new Uint8Array(selectedModel.data.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        )}`} />
      )}
    </div>
  );
};

export default App;
