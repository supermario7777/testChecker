import React, { useRef, useState } from 'react';
import './styles.css'

export default function TakeAPhotoWithTheAnswers() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [capturedImage1, setCapturedImage1] = useState(null); // to take a photo with the correct answers
    // const [capturedImage2, setCapturedImage2] = useState(null);  // to take a photo with student test results

    // open the modal window by clicking on the "open" button
    const OpenModal = () => {
        setIsModalOpen(true);
        openCamera();
    }

    // close the modal window and run closeCamera() func
    const CloseModal = () => {
        setCapturedImage1(null)
        setIsModalOpen(false)        
        closeCamera()
        const videoElement = videoRef.current;
        if (videoElement && videoElement.srcObject){
            videoRef.current.pause();
        }
    }

    // open the camera a start a videostream
    const openCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: {width: 250, height: 250} });
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

    const capturePhoto = () => {
        const videoElement = videoRef.current;
        const canvasElement = canvasRef.current;

        canvasElement.width = videoElement.videoWidth;
        canvasElement.height = videoElement.videoHeight;

        const context = canvasElement.getContext('2d');
        context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

        const imageSrc = canvasElement.toDataURL();
        setCapturedImage1(imageSrc);
    };

    const resetPhoto = () => {
        setCapturedImage1(null)
        openCamera()
    }


    // const updateVideoSize = () => {
    //     const videoElement = videoRef.current;
    //     if (videoElement) {
    //         videoElement.width = "100%"; // Установите ширину видеопотока равной ширине экрана
    //         videoElement.height = 'auto'; // Установите высоту видеопотока равной высоте экрана
    //     }
    // };

    // useEffect(() => {
    //     updateVideoSize();
    //     window.addEventListener('resize', updateVideoSize); // Обновление размеров видеопотока при изменении размера окна

    //     return () => {
    //         window.removeEventListener('resize', updateVideoSize); // Удаление обработчика события при размонтировании компонента
    //     };
    // }, []);

    // const takeAPhoto = () => {
    //     const videoElement = videoRef.current;
    //     const canvasElement = canvasRef.current;

    //     if (videoElement && canvasElement) {
    //         const canvasContext = canvasElement.getContext('2d');
    //         canvasContext.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

    //         const imageDataURL = canvasElement.toDataURL(); // Получение изображения в формате base64
    //         setCapturedImage1(imageDataURL)
    //     }
    // };

    return (
        <div>
            {!isModalOpen && <button onClick={OpenModal}>Open Modal Window</button>}
            {isModalOpen && (
                <div className='modal-window' style={{ border: '5px solid orange' }}>
                    <div className='modal-btns'>
                        <button onClick={() => capturePhoto()}>Take a photo</button>
                        <button onClick={() => switchToMainCamera()}>Swtich Camera</button>
                        <button onClick={() => resetPhoto()}>Reset</button>
                        <button onClick={() => CloseModal()}>Close Modal</button>
                    </div>
                    <div className='video-div'>
                        {capturedImage1 ? (
                            <img src={capturedImage1} alt="Captured" />
                        ) : (
                            <video ref={videoRef} autoPlay></video>
                        )}
                        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
                        {/* <video ref={videoRef} autoPlay></video>
                        <canvas ref={canvasRef}></canvas> */}
                    </div>
                </div>
            )}
        </div>
    )
}
