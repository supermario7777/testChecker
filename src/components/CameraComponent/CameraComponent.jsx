import React, { useRef } from 'react';

const CameraComponent = () => {
  const videoRef = useRef(null);

  const startCamera = async (facingMode) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facingMode },
      });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const switchCamera = () => {
    const activeStream = videoRef.current.srcObject;
    if (activeStream) {
      activeStream.getTracks().forEach((track) => track.stop());
    }

    const currentFacingMode = videoRef.current.facingMode;
    const newFacingMode = currentFacingMode === 'user' ? 'environment' : 'user';
    startCamera(newFacingMode);
  };

  return (
    <div>
      <video ref={videoRef} autoPlay></video>
      <button onClick={switchCamera}>Switch Camera</button>
    </div>
  );
};

export default CameraComponent;
