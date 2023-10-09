'use client';
import React, { useState, useEffect } from 'react';
import { useSpeechContext, SpeechProvider } from '@speechly/react-client';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid, Avatar, Textarea, Pagination } from '@nextui-org/react';
import Mic from '../components/Mic';
import PauseButton from '../components/PauseButton';
// import AISearch from '../../../pages/api/aiSearch';
import getAmazonLink from '../../../pages/api/fetchAIData';
import getAmazonData from '../../../pages/api/fetchAmazonData';
import { AmazonCard } from '../components/AmazonCard';
import { AmazonCardSkeleton } from '../components/AmazonCardSkeleton';
import { ChatOpenAI } from "langchain/chat_models/openai";
import { ConversationBufferWindowMemory } from 'langchain/chains/conversation/memory';
import { Tool } from 'langchain/agents';
import { initialize_agent } from 'langchain/agents';
import { search_text as searchAgent } from 'langchain/agents';
import { AgentType } from 'langchain/agents';






const appId = process.env.NEXT_PUBLIC_SPEECHLY_APP_ID;


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
  const { segment, listening, attachMicrophone, start, stop } = useSpeechContext();
  const [transcripts, setTranscripts] = useState([])
  const [tentative, setTentative] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMicClicked, setIsMicClicked] = useState(false);
  const [userPrompt, setUserPrompt] = useState('');
  const [amazonData, setAmazonData] = useState(null);
  const [page, setPage] = useState(0);
  const [amazonAIData, setAmazonAIData] = useState({});
  const [isLoading, setIsLoading] = useState(false); // create loading state

  const turbo_llm = new ChatOpenAI({
    engine: "davinci",
    temperature: 0.9,
    max_tokens: 150,
    openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });

  const amazonTool = new Tool({
    name: "amazon",
    func: searchAmazon,
    description: "Searches Amazon for a product. Input should be lower_price, upper_price, search_string, company_name"
  })

  const tools = [amazonTool];

  const memory = new ConversationBufferWindowMemory({
    memory_size: 10,
  });
    

  const conversationalAgent = initialize_agent({
    agent: AgentType.CONVERSATIONAL_REACT_DESCRIPTION,
    tools: tools,
    llm: turbo_llm,
    verbose: true,
    max_iterations: 3,
    early_stopping_method: 'generate',
    memory: memory
  });

  const searchAmazon = (lower_price, upper_price, search_string, company_name) => {
    
  }



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
    const loadPage = async () => {

      setIsSubmitted(true);
      setIsLoading(true); // set loading state to true

      setAmazonData(null);

      let amazonData = await getAmazonData(amazonAIData, page);

      while (amazonData.length === 0) {
        amazonData = await getAmazonData(amazonAIData, page);
        if (amazonData.status_code === 204) {
          break;
        }
      }

      setAmazonData(amazonData);

      setIsLoading(false); // set loading state to false
    }

    if (page !== 0)
      loadPage();

  }, [page, amazonAIData]);

  // useEffect(() => {
  //   console.log("tentative ", tentative)
  //   console.log("transcripts ", transcripts)
  // }, [tentative, transcripts])

  const handleSubmit = async () => {
    setIsSubmitted(true);
    console.log("submitted");
    // const answer = await AISearch(userPrompt);
    // console.log("answer ", answer);
    setIsLoading(true); // set loading state to true
    setAmazonData(null);

    const amazonAI = await getAmazonLink(tentative);
    setAmazonAIData(amazonAI);

    setPage(1);

    let amazonData = await getAmazonData(amazonAI, 1);

    while (amazonData.length === 0) {
      amazonData = await getAmazonData(amazonAI, 1);
      if (amazonData.status_code === 204) {
        break;
      }
    }

    setAmazonData(amazonData);

    setIsLoading(false); // set loading state to false
  }

  const handleActivateClick = async () => {
    if (isMicClicked == true) {
      setIsMicClicked(false);
      await stop();
      setUserPrompt(tentative);
      await handleSubmit();
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
              initialValue={tentative === '' ? userPrompt : tentative}
              rows={2}
              width="100%"
              readOnly
              style={{ paddingRight: 40 }}
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

      {amazonData?.status_code === 204 &&
        <Grid justify='center' style={{
          position: "relative",
          top: '10vh'
        }}>
          <Text size="$3xl" h3 style={{
            textAlign: 'center'
          }}>Sorry, we couldn&apos;t find any product for your search.</Text>
        </Grid>
      }


      <Grid justify='center' style={{
        position: "relative",
        top: '10vh'
      }}>

        <Grid.Container justify="center" css={{
          position: "relative",
          "@xs": {
            paddingLeft: "25px",
            paddingRight: "25px",
          },
          "@sm": {
            paddingLeft: "50px",
            paddingRight: "50px",
          },
          "@md": {
            paddingLeft: "100px",
            paddingRight: "100px",
          },
        }}>
          {isLoading && (
            <>
              {[...Array(9)].map((_, index) => (
                <Grid xs={12} sm={4} key={index} style={{
                  paddingTop: "50px",
                  paddingBottom: "50px",
                  paddingLeft: "25px",
                  paddingRight: "25px",
                }}>
                  <AmazonCardSkeleton />
                </Grid>
              ))}
            </>
          )}

          {!isLoading && amazonData?.status_code !== 204 && amazonData?.map((item) => (
            <Grid xsMax={12} sm={6} md={4} key={amazonData.asin} style={{
              paddingTop: "50px",
              paddingBottom: "50px",
              paddingLeft: "35px",
              paddingRight: "35px",
            }}>
              <AmazonCard productTitle={item.productTitle} image_url={item.image_url} productLink={item.productLink} productPrice={item.productPrice} productRating={item.productRating} productReviewCount={item.productReviewCount} />
            </Grid>
          ))}
        </Grid.Container>

      </Grid>

      {/* Footer section */}
      {amazonData?.status_code !== 204 && amazonData?.length > 0 &&
        <Grid.Container justify='center' style={{
          position: 'fixed',
          bottom: 0,
          width: '100%',
          backgroundColor: 'rgb(128,128,128 , 0.5)',
          padding: '10px 0',
          left: 0,
        }}>
          <Pagination total={20} initialPage={page} shadow loop onChange={(e) => setPage(e)} />
        </Grid.Container>
      }
    </>
  );
}
export default HomePage;
