import './App.css';
import React from 'react';
import './components/CameraModal/CameraModal'
import CameraModal from './components/CameraModal/CameraModal';
import CameraComponent from './components/CameraComponent/CameraComponent';


function App() {

  return (
    <div className="App">
      <div>
        <CameraModal/>
        <CameraComponent/>
      </div>
    </div>
  );
}

export default App;
