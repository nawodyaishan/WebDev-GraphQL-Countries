const continentSelect = document.getElementById(`continent-select`);

fetch(`https://countries.trevorblades.com/`, {
    method: `POST`,
    headers: {
        "content-Type": "application/json"
    },
    body: JSON.stringify({
        query:
            `
    query {
        continents {
          name
          code
        }
      }
    `
    })
})
    .then(res => res.json())
    .then(data => {
        data.data.continents.forEach(continent => {
            const option = document.createElement('option')
            option.value = continent.code
            option.innerText = continent.name
            continentSelect.append(option)
        })
    })
