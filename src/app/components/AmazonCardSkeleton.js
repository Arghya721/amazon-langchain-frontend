import { Card, Text } from '@nextui-org/react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'


export const AmazonCardSkeleton = () => {
  return (
    <Card
      flex
      direction="row"
      justify="space-between"
      align="center"
      css={{ mw: "500px" }}
    >
      <SkeletonTheme color="#f0f0f0" highlightColor="#e0e0e0" style={{
        paddingTop: "25px",
      }}> {/* Customize the colors as needed */}
        <Skeleton width={150} height={150} style={{
            borderRadius: "50px",
        }} />
        <Card.Body>
          <Text h3>
            <Skeleton width="80%" />
          </Text>
          <Text h4>
            <Skeleton width="60%" />
          </Text>
          <Skeleton width="50%" />
        </Card.Body>
      </SkeletonTheme>
    </Card>
  );
};
