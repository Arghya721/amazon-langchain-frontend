'use client';
import { Card, Text, Image, Grid, Button, styled } from '@nextui-org/react';

export const AmazonCard = (props) => {

  const shortenTitle = (title) => {
    if (title.length > 50) {
      return title.substring(0, 50) + "...";
    }
    return title;
  };



  return (
    <Card
      flex
      direction="row"
      justify="space-between"
      align="center"
      css={{
        mw: "500px",
        height: "300px"
      }}
      shadow
      isPressable
      isHoverable
      variant="bordered"
    >
      <Grid.Container gap={2} style={{ height: "100%" }}>
        <Grid xs={6} md={6} style={{ height: "100%" }}>
          <Image
            containerCss={{
              "@md": {
              top: "5rem",
              margin: "0px"
              },
              "@sm": {
                top: "3rem",
                margin: "0px"
              },
            // objectPosition: "center",
            // filter: "brightness(1) invert(20%)", 
            }}
            css={{
               // Remove white background by inverting the image colors
            }}
            autoResize
            src={props.image_url}
            width={150}
            height={150}
            fit="cover"
            justify="center"
            alt={props.productTitle}
          />
        </Grid>
        <Grid xs={6} md={6} style={{ height: "100%", flexDirection: "column", textAlign: "left" }}>
          <Text h4 style={{ marginBottom: "10px" }}>{shortenTitle(props.productTitle)}</Text>
          <Text h4>₹{props.productPrice}</Text>
          <Button auto color="primary" onClick={() => window.open(props.productLink, "_blank")}>
            Buy Now
          </Button>
        </Grid>
      </Grid.Container>
    </Card>

  );
};
