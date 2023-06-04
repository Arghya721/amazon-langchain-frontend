export default async function getAmazonLink(prompt) {
    const api = 'https://wc59gatn5i.execute-api.us-east-1.amazonaws.com/test/amazon';

    const payload = {
        "text" : prompt
    }

    try {
        const response = await fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}