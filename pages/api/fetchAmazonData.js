export default async function getAmazonData(link) {

    // get headers 
    const url = process.env.NEXT_PUBLIC_API_URL + "/get-amazon-page-data";

    const payload = {
        "amazon_link" : link
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
} 