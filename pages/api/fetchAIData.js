export default async function getAmazonLink(prompt) {
    const api = 'http://127.0.0.1:5000/amazon';

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
