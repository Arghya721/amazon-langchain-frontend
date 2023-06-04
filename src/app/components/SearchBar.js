'use-client'
import React, { useState } from 'react';
import { Grid, Input, Loading } from '@nextui-org/react';
import { SendButton } from "./SendButton";
import { SendIcon } from "./SendIcon";
import getAmazonLink from "../../../pages/api/fetchAIData"

export const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const [amazonLink, setAmazonLink] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    setAmazonLink("");
    setLoading(true);
    const link = await getAmazonLink(inputValue);
    setAmazonLink(link.amazon_link);
    setLoading(false);
  };

  return (
    <>


      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "75vh",
      }}>
        {loading && <Loading type="points" />}

        {amazonLink !== "" && (
          <a href={amazonLink} target="_blank">
            Amazon Link
          </a>
        )}
      </div>



      <Grid justify='center' style={{
        position: "fixed",
        bottom: 50,
        left: "50%",
        transform: "translateX(-50%)",
      }}>
        <Input
          clearable
          width="50rem"
          // size="xl" 
          contentRightStyling={false}
          placeholder="Type your message..."
          value={inputValue}
          onChange={handleChange}
          contentRight={
            <SendButton onClick={handleSubmit}>
              <SendIcon />
            </SendButton>
          }
        />
      </Grid>
    </>
  )
};