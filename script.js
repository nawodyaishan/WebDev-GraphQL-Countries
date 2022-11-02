const continentSelect = document.getElementById(`continent-select`);
const countryList = document.getElementById(`countries-list`)

continentSelect.addEventListener('change', async e => {
    const continentCode = e.target.value
    const countries = await getContinentCountries(continentCode)
    countryList.innerHTML = ''
    countries.forEach(country => {
        const element = document.createElement('div')
        element.innerText = country.name
        countryList.append(element)
    })
})


queryFetch(`
    query {
        continents {
          name
          code
        }
      }
    `)// data to html element
    .then(data => {
        data.data.continents.forEach(continent => {
            const option = document.createElement('option')
            option.value = continent.code
            option.innerText = continent.name
            continentSelect.append(option)
        })
    })


function queryFetch(query, variables) {
    return fetch(`https://countries.trevorblades.com/`, {
        method: `POST`,
        headers: {
            "content-Type": "application/json"
        },
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    })
        // to json
        .then(res => res.json())
}


function getContinentCountries(continentCode) {
    return queryFetch(`
    query getCountries($code: ID!) {
      continent(code: $code) {
        countries {
          name
        }
      }
}`, { code: continentCode }).then(data => {
        return data.data.continent.countries
    })
}