'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Grid, Textarea } from '@nextui-org/react';
import { SendButton } from "./SendButton";
import { SendIcon } from "./SendIcon";
import { motion } from 'framer-motion';

export const SearchBar = ({ onSubmit }) => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    onSubmit();

    
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
            />
            <div style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)' }}>
              <SendButton onClick={handleSubmit}>
                <SendIcon />
              </SendButton>
            </div>
          </div>
        </motion.div>
      </Grid>
    </>
  );
};
