import './App.css';
import React from 'react';
import TakeAPhotoWithCorrectAnswers from './components/TakeAPhotoWithCorrectAnswers/TakeAPhotoWithCorrectAnswers';
import TakeAPhotoWithTheAnswers from './components/TakeAPhotoWithTheResults/TakeAPhotoWithTheResults';


function App() {

  return (
    <div className="App">
      <div>
        {/* <CameraModal/> */}
        <TakeAPhotoWithCorrectAnswers />
      </div>
      <div>
        <TakeAPhotoWithTheAnswers />
      </div>
    </div>
  );
}

export default App;
