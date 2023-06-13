'use-client'
import { Card , Row , Col , Spacer , Text } from '@nextui-org/react';
export const AmazonCard = (props) => {

    return (
        <Card isPressable>
  <Card.Body css={{ padding: 0 }}>
    <Card.Image
      src={props.image_url}
      objectFit="cover"
      width="50%"
      height="auto"
      alt={props.productTitle}
    />
    <Card.Footer
      isBlurred
      css={{
        position: "absolute",
        padding: "$8",
        backdropFilter: "blur(10px)",
        borderTop: "1px solid rgba(255, 255, 255, 0.2)",
        bottom: 0,
        zIndex: 1,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
      }}
    >
      <Row justify="space-between" align="top">
        <Col>
          <Text h3>{props.productTitle}</Text>
        </Col>
        <Col css={{ width: "auto" }}>
          <Text
            css={{
              color: "$accents7",
              fontWeight: "$semibold",
              fontSize: "$2xl",
              paddingLeft: "$12",
            }}
          >
            ₹ {props.productPrice}
          </Text>
        </Col>
      </Row>
      <Spacer y={1} />
    </Card.Footer>
  </Card.Body>
</Card>

    );
}

