import './App.css';
import React from 'react';
// import './components/CameraModal/CameraModal'
// import CameraModal from './components/CameraModal/CameraModal';
import MyCamera from './components/MyCamera/MyCamera';


function App() {

  return (
    <div className="App">
      <div>
        {/* <CameraModal/> */}
        <MyCamera/>
      </div>
    </div>
  );
}

export default App;
