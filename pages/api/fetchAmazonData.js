export default async function getAmazonData(amazonAIData , page) {

    // get headers 
    const url = process.env.NEXT_PUBLIC_API_URL + "/get-amazon-page-data";

    if (page === 0) {
        page = 1;
    }

    amazonAIData.page = page;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(amazonAIData),
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
} 