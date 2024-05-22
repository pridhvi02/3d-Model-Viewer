import React, { useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('model', file);

    try {
      await axios.post('http://localhost:5000/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      });
      alert('File uploaded successfully');
      setUploadProgress(0); // Reset progress bar after upload
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file');
      setUploadProgress(0); // Reset progress bar in case of error
    }
  };

  return (
    <div>
      <label htmlFor="file-upload" className="custom-file-upload">
        Choose file
      </label>
      <input id="file-upload" type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {uploadProgress > 0 && (
        <div className="progress-bar">
          <div className="progress" style={{ width: `${uploadProgress}%` }}>
            {uploadProgress}%
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
