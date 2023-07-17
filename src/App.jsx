import './App.css';
import React from 'react';
import TakeAPhotoWithCorrectAnswers from './components/TakeAPhotoWithCorrectAnswers/TakeAPhotoWithCorrectAnswers';
import TakeAPhotoWithTheAnswers from './components/TakeAPhotoWithTheResults/TakeAPhotoWithTheResults';
import ToShowTheTestResutls from './components/ToShowTheTestResutls/ToShowTheTestResutls';
import { useState } from 'react';


function App() {

  const [textResult, setTextResult] = useState("");
  const [textResult1, setTextResult1] = useState("");


  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpen2, setIsModalOpen2] = useState(false)
  const [isModalOpen3, setIsModalOpen3] = useState(false)

  

  return (
    <div className="App">
      <div>
        <TakeAPhotoWithCorrectAnswers  textResult={textResult} setTextResult={setTextResult} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
      </div>
      <div>
        <TakeAPhotoWithTheAnswers textResult1={textResult1} setTextResult1={setTextResult1} isModalOpen2={isModalOpen2} setIsModalOpen2={setIsModalOpen2} />
      </div>
      <div>
        <ToShowTheTestResutls textResult={textResult} textResult1={textResult1} isModalOpen3={isModalOpen3} setIsModalOpen3={setIsModalOpen3} />
      </div>
    </div>
  );
}

export default App;
