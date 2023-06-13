export default async function getAmazonData(link) {

    // get headers 
    const url = "http://127.0.0.1:5000/get-amazon-page-data";

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