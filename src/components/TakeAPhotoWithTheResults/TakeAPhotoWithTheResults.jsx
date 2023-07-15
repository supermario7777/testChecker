import React, { useRef, useState } from 'react';
import './styles.css'
import Tesseract from 'tesseract.js';

export default function TakeAPhotoWithTheTextResults({textResult1, setTextResult1}) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isModalOpen2, setIsModalOpen2] = useState(false)
    const [capturedImage, setCapturedImage] = useState(null); // to take a photo with the correct answers
    const [selectedImage, setSelectedImage] = useState(null);
    const [facingMode, setFacingMode] = useState('user');

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
    }

    const handleUpload = () => {
        convertImageToText(selectedImage)
    }

    const convertImageToText = async (image)=>{
        try {
            const { data: { text } } = await Tesseract.recognize(image, 'eng');
            setTextResult1(text)
        } catch (error) {
            console.error('Error in OCR:', error);
        }
    }

    // open the modal window by clicking on the "open" button
    const OpenModal = () => {
        setIsModalOpen2(true);
        openCamera();
    }

    // to set required width and height depending on device camera parameters
    const setMaxWidthAndHeight = () => {
        if (videoRef.current) {
            videoRef.current.style.maxWidth = '60%';
            videoRef.current.style.maxHeight = '60%';
        }
    };

    // close the modal window and run closeCamera() func
    const CloseModal = () => {
        setCapturedImage(null)
        setIsModalOpen2(false)
        closeCamera()
        const videoElement = videoRef.current;
        if (videoElement && videoElement.srcObject) {
            videoRef.current.pause();
        }
    }

    // open the camera a start a videostream
    const openCamera = async () => {
        try {
            const constraints = { video: { facingMode: 'environment' }, audio: false };
            let videoStream = await navigator.mediaDevices.getUserMedia(constraints);
    
            if (videoRef.current) {
              videoRef.current.srcObject = videoStream;
              videoRef.current.play();
            }
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
            if(facingMode === "user"){
                setFacingMode("environment")
                const mainCameraStream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: facingMode },
                });
                // Replace the current camera stream with the main camera stream
                videoRef.current.srcObject = mainCameraStream;
                // Stop and release the resources of the previous camera stream
                tracks[0].stop();
            } else {
                setFacingMode("user")
                const mainCameraStream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: facingMode },
                });
                // Replace the current camera stream with the main camera stream
                videoRef.current.srcObject = mainCameraStream;
                // Stop and release the resources of the previous camera stream
                tracks[0].stop();
            }
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

        processImage(imageSrc)
        setCapturedImage(imageSrc)
    };

    // to convert the image to text using tesseract js libriary and save the text in textResult variable
    const processImage = async (imageData) => {
        try {
            const { data: { text } } = await Tesseract.recognize(imageData, 'eng');
            setTextResult1(text)
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
            {!isModalOpen2 && <button onClick={OpenModal}>Take a photo with the student results</button>}
            {isModalOpen2 && (
                <div className='modal-window' style={{ border: '5px solid orange' }}>
                    <div className='modal-btns'>
                        <button onClick={() => capturePhoto()}>Capture</button>
                        <button onClick={() => switchToMainCamera()}>Switch Camera</button>
                        <button onClick={() => resetPhoto()}>Reset</button>
                        <button onClick={() => CloseModal()}>Close</button>
                    </div>
                    <div>
                        <input type="file" accept="image/*" onChange={handleImageUpload} name='Upload' />
                        <button onClick={handleUpload}>Convert</button>
                    </div>
                    <div className='video-div'>
                        {capturedImage ? (
                            <img src={capturedImage} alt="Captured" />
                        ) : (
                            <video ref={videoRef} onLoadedMetadata={setMaxWidthAndHeight} autoPlay></video>
                        )}
                        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
                    </div>
                    <p>{textResult1}</p>
                </div>
            )}
        </div>
    )
}
