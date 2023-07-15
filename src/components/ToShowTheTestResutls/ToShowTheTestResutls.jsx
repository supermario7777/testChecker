import React from 'react'
// import TakeAPhotoWithCorrectAnswers from '../TakeAPhotoWithCorrectAnswers/TakeAPhotoWithCorrectAnswers'
// import TakeAPhotoWithTheTextResults from '../TakeAPhotoWithTheResults/TakeAPhotoWithTheResults'
import { performComparison } from './PerformComparison'

const ToShowTheTestResutls = ({textResult, textResult1}) => {

    const result = performComparison(textResult, textResult1)

  return (
    <div>
        <p>{result}</p>
    </div>
  )
}

export default ToShowTheTestResutls;
