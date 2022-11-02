fetch(`https://countries.trevorblades.com/`, {
    method: `POST`,
    headers: {
        "content-Type": "application/json"
    },
    body: JSON.stringify({
        query:
            `query {
                continents {
                    name
                    code
            }
        }`
    })
}).then(res => res.json()).then(data => console.log(data.data))