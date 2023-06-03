'use client';
import { Grid } from '@nextui-org/react';
import { Navbar, Text } from "@nextui-org/react";

export const Header = () => {
    return (
        <Grid justify='center'>
            
            <Text h3 style={{
                textAlign: 'center',
            }}>Amazon Langchain Search </Text>
        </Grid>
    )
}
