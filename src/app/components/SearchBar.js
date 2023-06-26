'use client';
import React, { useState, useEffect } from 'react';
import { Grid, Textarea, Pagination, Text } from '@nextui-org/react';
import { SendButton } from "./SendButton";
import { SendIcon } from "./SendIcon";
import { motion } from 'framer-motion';
import 'react-loading-skeleton/dist/skeleton.css'
import { AmazonCard } from './AmazonCard';
import getAmazonLink from '../../../pages/api/fetchAIData';
import getAmazonData from '../../../pages/api/fetchAmazonData';
import { AmazonCardSkeleton } from './AmazonCardSkeleton';

export const SearchBar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // create loading state
  const [amazonData, setAmazonData] = useState(null);
  const [page, setPage] = useState(0);
  const [amazonAIData, setAmazonAIData] = useState({});

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    setIsSubmitted(true);
    setIsLoading(true); // set loading state to true
    onSubmit();

    setAmazonData(null);

    const amazonAI = await getAmazonLink(inputValue);
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
  };

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
              placeholder="Search a product"
              rows={2}
              width="100%"
              style={{ paddingRight: 40 }}
              onChange={handleChange}
            />
            <div style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)' }}>
              <SendButton onClick={handleSubmit}>
                <SendIcon />
              </SendButton>
            </div>
          </div>
        </motion.div>
      </Grid>

      {/* Data not found error section */}
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
};
