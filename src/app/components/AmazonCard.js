'use client';
import { Card, Text, Image } from '@nextui-org/react';

export const AmazonCard = (props) => {
  return (
    <Card
      flex
      direction="row"
      justify="space-between"
      align="center"
      css={{ mw: "500px" }}
      shadow
      isPressable
      isHoverable
      variant="bordered"
    >
      <Image src={props.image_url} width={150} height={150} fit="cover" alt={props.productTitle} />
      <Card.Body >
        <Text h3 style={{
          paddingLeft: "25px",
          paddingRight: "25px",
        }}>
          {props.productTitle}
        </Text>
        <Text h4 style={{
          paddingLeft: "25px",
          paddingRight: "25px",
        }}>₹{props.productPrice}</Text>
          <a href={props.productLink} target="_blank" style={{
            paddingLeft: "25px",
            paddingRight: "25px",
          }}>
            Buy Now
          </a>
      </Card.Body>
    </Card>
  );
};
