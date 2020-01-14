/**
 * Name day app
 * 
 */

// Getting value from input-fields in HTML
const searchResultEl = document.querySelector('#search-results');


// Output search result in HTML
const renderSearchResultName = (data, country) => {
    searchResultEl.innerHTML += `
        <div class="col">
            <div class="card bg-light text-dark mt-4">
                <div class="card-body text-center">
                    <h5 class="card-title">Name: ${data.name}</h5>
                    <p class="card-text">Date: ${data.day}/${data.month}</p>
                    <p class="card-text">Country: ${country}</p>
                </div>
             </div>
            </div>
    `;
}

const renderSearchResultDate = (data, country) => {
    searchResultEl.innerHTML += `
        <div class="col">
            <div class="card bg-light text-dark mt-4">
                <div class="card-body text-center">
                    <h5 class="card-title">Name(s): ${data.namedays[country]}</h5>
                    <p class="card-text">Date: ${data.dates.day}/${data.dates.month}</p>
                    <p class="card-text">Country: ${country}</p>
                </div>
             </div>
            </div>
    `;
}

const renderSearchResultTimezone = (data, country, timezone) => {
    searchResultEl.innerHTML += `
    <div class="col">
        <div class="card bg-light text-dark mt-4">
            <div class="card-body text-center">
                <h5 class="card-title">Todays name: ${data.namedays[country]}</h5>
                <p class="card-text">Timezone: ${timezone}</p>
                <p class="card-text">Country: ${country}</p>
            </div>
         </div>
        </div>
`;
}

// Function that handles search-result
const handleSearchResultName = data => {
    searchResultEl.innerHTML = '';
    data.results.forEach(name => {
        renderSearchResultName(name, data[ 'country name' ]);
    });
}

const handleSearchResultDate = (data, country) => {
    searchResultEl.innerHTML = '';
    data.data.forEach(date => {
        renderSearchResultDate(date, country);
    })
}

const handleSearchResultTimezone = (data, country, timezone) => {
    searchResultEl.innerHTML = '';
    data.data.forEach(date => {
        renderSearchResultTimezone(date, country, timezone);
    })
}

const emptyValueInForm = () => {
    document.querySelector('#name').value = '';
    document.querySelector('#country').value = ''; 
    document.querySelector('#month').value = 0;
    document.querySelector('#day').value = '';
    document.querySelector('#timezone').value = '';

}

const renderErrorMessage = () => {
    searchResultEl.innerHTML = `<div class="alert alert-warning mt-4">Something went wrong, please try again.</div>`;
}

// Get user search when pushing submit
document.querySelector('#search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.querySelector('#name').value;
    const country = document.querySelector('#country').value;
    const month = Number(document.querySelector('#month').value);
    const day = Number(document.querySelector('#day').value);
    const timezone = document.querySelector('#timezone').value;


    // Search by name
    if (name && (month && day) || name && timezone || (month && day) && timezone) {
        // Create div with error, filled in both country and date
        searchResultEl.innerHTML += `<div class="alert alert-warning mt-4">You selected too many values. Please try again with only one search-alternative, in addition to the required one.</div>`;
        
    } else if (name) { // testa om name = true istället
        getNamedayByName(name, country)
        .then(response => {
            handleSearchResultName(response);
        })
        .catch(err => {
            // Lägg in felmeddelande / status kod (se abalin API)
            // Skapa rednerErrorMessage
            renderErrorMessage(err);
         })   
    } else if (month && day) { // testa om month = true och date = true
        getNamedayByDate(month, day, country)
       .then(response => {
           handleSearchResultDate(response, country);
        })
       .catch(err => {
            // Lägg in felmeddelande / status kod (se abalin API)
            // Skapa rednerErrorMessage
           renderErrorMessage(err);
        })
    } else if (timezone) {
        getNamedayByTimezone(timezone, country)
        .then(response => {
            handleSearchResultTimezone(response, country, timezone);
        })
        .catch(err => {
            renderErrorMessage(err);
        })
    } else {
        searchResultEl.innerHTML = `<div class="alert alert-warning mt-4">Something went wrong. Please try again.</div>`;
    }

    emptyValueInForm();
})

// Reset page
document.querySelector('#search-form').addEventListener('reset', function(e) {
    searchResultEl.innerHTML = '';
})
