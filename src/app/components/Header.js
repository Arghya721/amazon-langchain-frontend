'use client';
import { Grid } from '@nextui-org/react';
import { Navbar, Text } from "@nextui-org/react";

export const Header = () => {
    return (
        <Grid justify='center'>
            <Navbar>
            <Text h3 style={{
                textAlign: 'center',
            }}>Amazon Langchain Search </Text>
            </Navbar>
        </Grid>
    )
}
