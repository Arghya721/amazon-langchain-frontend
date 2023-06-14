'use client';
import React, { useState } from 'react';
import { Grid, Textarea, Col, Row } from '@nextui-org/react';
import { SendButton } from "./SendButton";
import { SendIcon } from "./SendIcon";
import { motion } from 'framer-motion';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
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

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    setIsSubmitted(true);
    setIsLoading(true); // set loading state to true
    onSubmit();

    const amazonLink = await getAmazonLink(inputValue);

    const amazonData = await getAmazonData(amazonLink.amazon_link);

    setAmazonData(amazonData);

    setIsLoading(false); // set loading state to false
  };

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
      <Grid justify='center' style={{
        position: "relative",
        top: '10vh'
      }}>

        <Grid.Container justify="center" style={{
          position: "relative",
          paddingLeft: "50px",
          paddingRight: "50px",
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

          {!isLoading && amazonData?.map((item) => (
            <Grid xs={12} sm={4} style={{
              paddingTop: "50px",
              paddingBottom: "50px",
              paddingLeft: "25px",
              paddingRight: "25px",
            }}>
              <AmazonCard productTitle={item.productTitle} image_url={item.image_url} productLink={item.productLink} productPrice={item.productPrice} />
            </Grid>
          ))}
        </Grid.Container>

      </Grid>
    </>
  );
};
