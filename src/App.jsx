import './App.css';
import React from 'react';
import TakeAPhotoWithCorrectAnswers from './components/TakeAPhotoWithCorrectAnswers/TakeAPhotoWithCorrectAnswers';
import TakeAPhotoWithTheAnswers from './components/TakeAPhotoWithTheResults/TakeAPhotoWithTheResults';
import ToShowTheTestResutls from './components/ToShowTheTestResutls/ToShowTheTestResutls';
import { useState } from 'react';


function App() {

  const [textResult, setTextResult] = useState("");
  const [textResult1, setTextResult1] = useState("");
  

  return (
    <div className="App">
      <div>
        <TakeAPhotoWithCorrectAnswers textResult={textResult} setTextResult={setTextResult}/>
      </div>
      <div>
        <TakeAPhotoWithTheAnswers textResult1={textResult1} setTextResult1={setTextResult1} />
      </div>
      <div>
        <ToShowTheTestResutls textResult={textResult} textResult1={textResult1} />
      </div>
    </div>
  );
}

export default App;
