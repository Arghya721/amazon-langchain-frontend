'use client';
import React, { useState, useEffect } from 'react';
import { useSpeechContext, SpeechProvider } from '@speechly/react-client';
import { motion, AnimatePresence } from 'framer-motion';
import { BsFillPauseCircleFill } from 'react-icons/bs';
import { Grid, Avatar, Textarea } from '@nextui-org/react';
import { SendButton } from "../components/SendButton";
import { SendIcon } from "../components/SendIcon";
import Mic from '../components/Mic';
import PauseButton from '../components/PauseButton';

const appId = '24b82a9e-c271-4d06-8e73-c2852b198de2';


function HomePage() {
  return (
    <SpeechProvider
      appId={appId}
    // debug
    // logSegments
    >
      <HomePageContent />
    </SpeechProvider>
  );
}

function HomePageContent() {
  const [showText, setShowText] = useState(false);
  const [showMicAnimation, setShowMicAnimation] = useState(false);
  const { segment, listening, attachMicrophone, start, stop , stopTranscript } = useSpeechContext();
  const [transcripts, setTranscripts] = useState([])
  const [tentative, setTentative] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMicClicked, setIsMicClicked] = useState(false);




  const speak = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);


    utterance.onstart = () => {
      setShowText(true);
    };

    utterance.onend = () => {
      setShowText(false);
      setShowMicAnimation(true);
    };

    synth.speak(utterance);
  };

  const handleButtonClick = () => {
    speak('Welcome to Amazon GPT. Describe a product you want to buy and I will find it for you.');
  };

  // useEffect(() => {
  //   console.log(listening)
  //   const handleListening = async () => {
  //     if (listening && showMicAnimation == true) {
  //       await stop();

  //     } else if (!listening && showMicAnimation === true) {
  //       await attachMicrophone();
  //       await start();
  //     }
  //   }
  //   handleListening();
  // }, [showMicAnimation]);



  useEffect(() => {
    if (segment) {
      const transcript = segment.words.map((word) => word.value).join(' ');
      setTentative(transcript);
      if (segment.isFinal) {
        setTentative('');
        setTranscripts((current) => [...current, segment]);
      }
    }
  }, [segment]);

  useEffect(() => {
    if (showMicAnimation) {
      const timeout = setTimeout(() => {
        // setShowMicAnimation(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [showMicAnimation]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    console.log("tentative ", tentative)
    console.log("transcripts ", transcripts)
  }, [tentative, transcripts])

  const handlePauseClick = async () => {
    setShowMicAnimation(false);
    await stop();
    console.log("paused");
  };

  const handleSubmit = async () => {
    setIsSubmitted(true);
    console.log("submitted");
  }

  const handleActivateClick = async () => {
    if (isMicClicked == true) {
      setIsMicClicked(false);
      await stop();
      console.log("paused");
    } else {
      setIsMicClicked(true);
      console.log("clicked");
      await attachMicrophone();
      await start();
    }
  }



  return (
    <>
      <Grid justify='center'>
        <motion.div
          initial={{ top: '75vh' }}
          animate={{ top: isSubmitted ? '5vh' : '75vh' }}
          transition={{ duration: 0.5 }}
          style={{
            position: "relative",
            left: "50%",
            transform: "translateX(-50%)",
            paddingLeft: "50px",
            paddingRight: "50px",
          }}


        >
          <div style={{ position: 'relative' }}>
            <Textarea
              bordered
              color="secondary"
              initialValue={tentative}
              rows={2}
              width="100%"
              readOnly
              style={{ paddingRight: 40 }}
              onChange={handleChange}
            />
            <div style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)' }}>
              <Avatar
                squared
                icon={isMicClicked == true ? <PauseButton /> : <Mic />}
                onClick={handleActivateClick}
              />

            </div>
          </div>
        </motion.div>
      </Grid>
    </>
  );
}
export default HomePage;
