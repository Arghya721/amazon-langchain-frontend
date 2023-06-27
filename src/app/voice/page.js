'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function HomePage() {
  const [showText, setShowText] = useState(false);

  const speak = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.onstart = () => {
      setShowText(true);
    };

    // utterance.onend = () => {
    //   setShowText(false);
    // };

    synth.speak(utterance);
  };

  const handleButtonClick = () => {
    speak('Welcome to Amazon GPT. Describe a product you want to buy and I will find it for you.');

  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <AnimatePresence>
        {!showText && (
          <motion.button
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              borderRadius: '50%',
              width: 200,
              height: 200,
              backgroundColor: '#ff0000',
              color: '#ffffff',
              fontSize: 20,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={handleButtonClick}
          >
            Press Me
          </motion.button>
        )}

        {showText && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              fontSize: 24,
              textAlign: 'center',
            }}
          >
            Welcome to Amazon GPT. Describe a product you want to buy and I will find it for you.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default HomePage;
