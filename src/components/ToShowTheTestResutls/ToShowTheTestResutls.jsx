import React, { useState } from 'react'
import { performComparison } from './PerformComparison'

const ToShowTheTestResutls = ({ textResult, textResult1}) => {

  const [isModalOpen3, setIsModalOpen3] = useState(false)
  const openModal = () => {
    setIsModalOpen3(true)
  }

  const closeModal = () => {
    setIsModalOpen3(false)
  }

  const result = performComparison(textResult, textResult1)



  return (
    <div>
      {!isModalOpen3 && <button onClick={openModal}>Show the results</button>}
      {isModalOpen3 && (
        <div className='modal-window' style={{ border: '5px solid orange' }}>          
            <button onClick={() => closeModal()}>Close</button>
            <p>{result}</p>
        </div>
      )}
    </div>
  )
}

export default ToShowTheTestResutls;