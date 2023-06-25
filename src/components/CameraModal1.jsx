import React, { useRef } from 'react';

const CameraModal1 = () => {
  const videoRef = useRef(null);

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

  return (
    <div>
      <button onClick={openCamera}>Open Camera</button>
      <video ref={videoRef} autoPlay></video>
      <button onClick={switchToMainCamera}>Switch to Main Camera</button>
    </div>
  );
};

export default CameraModal1;
