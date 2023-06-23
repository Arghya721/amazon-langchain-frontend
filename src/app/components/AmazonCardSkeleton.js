import { Card, Text, Grid, Button } from '@nextui-org/react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'


export const AmazonCardSkeleton = () => {
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
      <SkeletonTheme color="#f0f0f0" highlightColor="#e0e0e0" style={{
        paddingTop: "25px",
      }}>
        <Grid.Container gap={2} style={{ height: "100%" }}>
          <Grid xs={6} md={6} style={{ height: "100%" }}>
            <Skeleton width={150} height={150} style={{
              fit: "cover",
              justifyContent: "center",
              top: "4rem",
              margin: "0px",
              borderRadius: "10%",
            }} />
          </Grid>
          <Grid xs={6} md={6} style={{ height: "100%", flexDirection: "column", textAlign: "left", marginTop: "50px" }}>
            <Text h4 style={{ marginBottom: "10px" }}>
              <Skeleton width="100%" height="100%" />
            </Text>
            <Text h4><Skeleton width="100%" height="100%" /></Text>
            <Skeleton width="100%" height="150%" borderRadius="0.5rem" />
          </Grid>
        </Grid.Container>
      </SkeletonTheme>
    </Card>
  );
};
