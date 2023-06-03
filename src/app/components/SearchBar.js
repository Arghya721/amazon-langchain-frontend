'use client';
import { Grid,Input } from '@nextui-org/react';
import { SendButton } from "./SendButton";
import { SendIcon } from "./SendIcon";

export const SearchBar = () => {
    return (
        <Grid justify='center' style={{
            position: "fixed",
            bottom: 50,
            left: "50%",
            transform: "translateX(-50%)",
          }}>
            <Input
            clearable
            width="50rem" 
            contentRightStyling={false}
            placeholder="Type your message..."
            contentRight={
              <SendButton>
                <SendIcon />
              </SendButton>
            }
          />
        </Grid>
    )
}