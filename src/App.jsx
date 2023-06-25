import './App.css';
import React from 'react';
import './components/CameraModal/CameraModal'
import CameraModal1 from './components/CameraModal1';
// import CameraModal from './components/CameraModal/CameraModal';
// import CameraComponent from './components/CameraComponent/CameraComponent';
// import CameraModal1 from './components/CameraModal/CameraModal';


function App() {

  return (
    <div className="App">
      <div>
        {/* <CameraModal/> */}
        <CameraModal1/>
      </div>
    </div>
  );
}

export default App;
