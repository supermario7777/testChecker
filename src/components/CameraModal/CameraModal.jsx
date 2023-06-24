import React, { useState } from 'react';
import Modal from 'react-modal';
import Webcam from 'react-webcam';
import './styles.css';
import { saveAs } from 'file-saver';


const CameraModal = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const webcamRef = React.useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);


    const handleCapture = () => {
        const imageSrc = webcamRef.current.getScreenshot();      
        // Convert the base64 image data to a Blob object
        const blobData = dataURLtoBlob(imageSrc);      
        // Save the Blob object as a file
        saveAs(blobData, 'captured_image.png');
    };
      

    // Function to open the modal
    const openModal = () => {
        setModalIsOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setModalIsOpen(false);
    };

    const capturePicture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc);
    };

    const resetPicture = () => {
        setCapturedImage(null);
    }

    function dataURLtoBlob(dataURL) {
        const byteString = atob(dataURL.split(',')[1]);
        const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uintArray = new Uint8Array(arrayBuffer);
      
        for (let i = 0; i < byteString.length; i++) {
          uintArray[i] = byteString.charCodeAt(i);
        }
      
        return new Blob([arrayBuffer], { type: mimeString });
    }
      

    return (
        <div>
            <div className='buttons'>
                <button onClick={openModal} >Take a Photo with correct answers</button>
                <button onClick={openModal}>Take a Testing Results</button>
                <button>Show the Results</button>
            </div>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Camera Modal">
                <div className='btns'>
                    <button onClick={capturePicture}>Capture</button>
                    <button onClick={resetPicture}>Reset</button>
                    <button onClick={handleCapture}>Save</button>
                    <button onClick={closeModal}>Close</button>
                </div>
                <div className='webcam'>
                    <Webcam ref={webcamRef}/>
                </div>
            </Modal>
        </div>
    );
}

export default CameraModal;
