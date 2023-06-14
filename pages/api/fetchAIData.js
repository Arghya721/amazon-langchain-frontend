export default async function getAmazonLink(prompt) {
    console.log(process.env.NEXT_PUBLIC_API_URL)

    const api = process.env.NEXT_PUBLIC_API_URL + '/amazon';

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
