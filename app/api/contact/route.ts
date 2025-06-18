
export async function POST(request: Request) {
    const body = await request.json();
    
    const response = await fetch('https://mt7zrjschf.execute-api.eu-west-1.amazonaws.com/prod/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });
    
    return response;
}