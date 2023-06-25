import React, { useRef, useState, useEffect } from 'react';
import './styles.css'

export default function MyCamera() {
    const videoRef = useRef(null);
    // console.log(videoRef)

    const [isModalOpen, setIsModalOpen] = useState(false)

    const OpenModal = () => {
        setIsModalOpen(true);
        openCamera();
        updateVideoSize();
    }


    const openCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    };

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

    const closeCamera = () => {
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

    const updateVideoSize = () => {
        const videoElement = videoRef.current;
        if (videoElement) {
            videoElement.width = "100%"; // Установите ширину видеопотока равной ширине экрана
            videoElement.height = 'auto'; // Установите высоту видеопотока равной высоте экрана
        }
    };

    useEffect(() => {
        updateVideoSize();
        window.addEventListener('resize', updateVideoSize); // Обновление размеров видеопотока при изменении размера окна

        return () => {
            window.removeEventListener('resize', updateVideoSize); // Удаление обработчика события при размонтировании компонента
        };
    }, []);



    const CloseModal = () => {
        setIsModalOpen(false)
        closeCamera()
    }


    return (
        <div>
            {!isModalOpen && <button onClick={OpenModal}>Open Modal Window</button>}
            {isModalOpen && (
                <div className='modal-window' style={{ border: '5px solid green' }}>
                    <div className='modal-btns'>
                        <button onClick={CloseModal}>Close Modal</button>
                        <button onClick={switchToMainCamera}>Swtich Camera</button>
                    </div>
                    <video ref={videoRef} autoPlay></video>
                </div>
            )}
        </div>
    )
}
