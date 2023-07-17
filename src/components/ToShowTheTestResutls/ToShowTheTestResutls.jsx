// import React, { useState } from 'react'
import React from 'react'
import { performComparison } from './PerformComparison'
import '../TakeAPhotoWithCorrectAnswers/styles.css' 

const ToShowTheTestResutls = ({ textResult, textResult1, isModalOpen3, setIsModalOpen3}) => {

  // const [isModalOpen3, setIsModalOpen3] = useState(false)
  const openModal = () => {
    setIsModalOpen3(true)
  }

  const closeModal = () => {
    setIsModalOpen3(false)
  }

  const result = performComparison(textResult, textResult1)



  return (
    <div>
      {!isModalOpen3 && <button className='main-button' onClick={openModal}>Show the results</button>}
      {isModalOpen3 && (
        <div className='modal-window' style={{padding: '10px 30px'}}>          
            <button className='all-buttons' onClick={() => closeModal()}>Close</button>
            <p className='result'>{result}</p>
        </div>
      )}
    </div>
  )
}

export default ToShowTheTestResutls;
