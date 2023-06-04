export default async function getAmazonLink(prompt) {
    const api = 'https://3yxjdyhkbvyau7opi54dt6zonu0tpwrq.lambda-url.us-east-1.on.aws/amazon';

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