import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function MicAnimation() {
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    let audioContext;
    let analyser;
    let dataArray;
    let source;
    let rafId;

    const handleMicStream = (stream) => {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      microphone.connect(analyser);
      analyser.fftSize = 32;
      dataArray = new Uint8Array(analyser.frequencyBinCount);
      updateAnimation();
    };

    const updateAnimation = () => {
      analyser.getByteFrequencyData(dataArray);

      const average = getAverageVolume(dataArray);

      setIsListening(average > 0);

      rafId = requestAnimationFrame(updateAnimation);
    };

    const getAverageVolume = (array) => {
      let values = 0;
      const length = array.length;

      for (let i = 0; i < length; i++) {
        values += array[i];
      }

      return values / length;
    };

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(handleMicStream)
      .catch((error) => {
        console.error('Error accessing microphone:', error);
      });

    return () => {
      cancelAnimationFrame(rafId);
      if (audioContext) {
        audioContext.close();
      }
    };
  }, []);

  return (
    <motion.div
      style={{
        width: 100,
        height: 100,
        borderRadius: '50%',
        backgroundColor: isListening ? '#ff0000' : '#cccccc',
      }}
      animate={{ scale: isListening ? 1.1 : 1 }}
      transition={{ duration: 0.3 }}
    />
  );
}

export default MicAnimation;
