import React, { useRef, useState } from 'react';
import './styles.css'
import Tesseract from 'tesseract.js';

export default function TakeAPhotoWithTheTextResults() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [capturedImage, setCapturedImage] = useState(null); // to take a photo with the student answers
    const [textResult, setTextResult] = useState("");

    // open the modal window by clicking on the "open" button
    const OpenModal = () => {
        setIsModalOpen(true);
        openCamera();
    }

    // to set required width and height depending on device camera parameters
    const setMaxWidthAndHeight = () => {
        if (videoRef.current) {
            videoRef.current.style.maxWidth = '100%';
            videoRef.current.style.maxHeight = '100%';
        }
    };

    // close the modal window and run closeCamera() func
    const CloseModal = () => {
        setCapturedImage(null)
        setIsModalOpen(false)
        closeCamera()
        const videoElement = videoRef.current;
        if (videoElement && videoElement.srcObject) {
            videoRef.current.pause();
        }
    }

    // open the camera a start a videostream
    const openCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
            videoRef.current.play();
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    };

    // close the camera by clicking on "close" button and stop the video stream
    const closeCamera = async () => {
        const videoElement = videoRef.current;
        if (videoElement && videoElement.srcObject) {
            const stream = videoElement.srcObject;
            const tracks = stream.getTracks();

            tracks.forEach((track) => {
                track.stop(); // to stop the videostream
            });

            videoElement.srcObject = null; // clearing the videostream
        }
    };

    // change camera view from frontal camera to main
    const switchToMainCamera = async () => {
        const stream = videoRef.current.srcObject;
        if (!stream) return;

        const tracks = stream.getVideoTracks();
        if (tracks.length > 0) {
            const mainCameraStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' },
            });
            // Replace the current camera stream with the main camera stream
            videoRef.current.srcObject = mainCameraStream;
            // Stop and release the resources of the previous camera stream
            tracks[0].stop();
        }
    };

    // to capture photo and run processImage func with the imageSrc method
    const capturePhoto = () => {
        const videoElement = videoRef.current;
        const canvasElement = canvasRef.current;

        canvasElement.width = videoElement.videoWidth;
        canvasElement.height = videoElement.videoHeight;

        const context = canvasElement.getContext('2d');
        context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
        const imageSrc = canvasElement.toDataURL('image/png');
        console.log(typeof (imageSrc))

        processImage(imageSrc)
        setCapturedImage(imageSrc)
    };

    // to convert the image to text using tesseract js libriary and save the text in textResult variable
    const processImage = async (imageData) => {
        try {
            const { data: { text } } = await Tesseract.recognize(imageData, 'eng');
            setTextResult(text)
            console.log(textResult)
        } catch (error) {
            console.error('Error in OCR:', error);
        }
    };

    // to reset the captured image
    const resetPhoto = () => {
        setCapturedImage(null)
        openCamera()
    }

    return (
        <div>
            {!isModalOpen && <button onClick={OpenModal}>Take a photo with the student results</button>}
            {isModalOpen && (
                <div className='modal-window' style={{ border: '5px solid orange' }}>
                    <div className='modal-btns'>
                        <button onClick={() => capturePhoto()}>Capture</button>
                        <button onClick={() => switchToMainCamera()}>Switch Camera</button>
                        <button onClick={() => resetPhoto()}>Reset</button>
                        <button onClick={() => CloseModal()}>Close</button>
                    </div>
                    <div className='video-div'>
                        {capturedImage ? (
                            <img src={capturedImage} alt="Captured" />
                        ) : (
                            <video ref={videoRef} onLoadedMetadata={setMaxWidthAndHeight} autoPlay></video>
                        )}
                        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
                    </div>
                    <p>{textResult}</p>
                </div>
            )}
        </div>
    )
}
