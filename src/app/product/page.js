'use-client';
import { useRouter } from 'next/navigation';
import { AmazonCard } from "../components/AmazonCard";

export default function Product() {
    const router = useRouter();
    const amazonData = JSON.parse(router.query.inputValue);
    return (
        <Grid.Container justify="center" >
            Hello
        {/* {amazonData?.map((item) => (
            <Grid xs={12} md={4} sm={4} xl={4} style={{
              padding: "1px 1px 1px 1px",
              margin: "10px", // Add margin for spacing
            }}
            key={item.asin}
            justify="center">
              <AmazonCard
                key={item.asin}
                image_url={item.image_url}
                productTitle={item.productTitle}
                productPrice={item.productPrice}
              />
            </Grid>
          ))
        } */}
      </Grid.Container>
    )
}