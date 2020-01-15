/**
 * Name day app
 * 
 */

// Getting search-form in HTML
const searchResultEl = document.querySelector('#search-results');

// Change first letter tó capital
const changeCaseFirstLetter = (name) => {
    if(typeof name === 'string') {
            return name.charAt(0).toUpperCase() + name.slice(1);
    }
    return null;
}

// Output search result in HTML for name
const renderSearchResultName = (data, country) => {
    searchResultEl.innerHTML += `
        <div class="col">
            <div class="card bg-light text-dark mt-4">
                <div class="card-body text-center">
                    <h2 class="card-title">${data.name}</h5>
                    <p class="card-text">Date: ${data.day} ${reverseMonthValue(data.month)}</p>
                    <p class="card-text">Country: ${country}</p>
                </div>
             </div>
            </div>
    `;
}

// Output search result in HTML for date
const renderSearchResultDate = (data, country) => {
    searchResultEl.innerHTML += `
        <div class="col">
            <div class="card bg-light text-dark mt-4">
                <div class="card-body text-center">
                    <h2 class="card-title">${data.namedays[country]}</h5>
                    <p class="card-text">Date: ${data.dates.day} ${reverseMonthValue(data.dates.month)}</p>
                    <p class="card-text">Country: ${reverseCountryValue(country)}</p>
                </div>
             </div>
            </div>
    `;
}

// Output search result in HTML for timeszone
const renderSearchResultTimezone = (data, country, timezone) => {
    searchResultEl.innerHTML += `
    <div class="col">
        <div class="card bg-light text-dark mt-4">
            <div class="card-body text-center">
                <h2 class="card-title">Happy name day: ${data.namedays[country]}!</h5>
                <p class="card-text">Date: ${data.dates.day} ${reverseMonthValue(data.dates.month)}</p>
                <p class="card-text">Timezone: ${timezone}</p>
                <p class="card-text">Country: ${reverseCountryValue(country)}</p>
            </div>
         </div>
        </div>
`;
}

// Handle search-result for name
const handleSearchResultName = (data, name) => {
    searchResultEl.innerHTML = '';
    if (data.results.length > 0) {
        data.results.forEach(name => {
            renderSearchResultName(name, data[ 'country name' ]);
        });
    } else {
        searchResultEl.innerHTML = `<div class="alert alert-warning mt-4">The name '${name}' does not exist in selected country, please try something else.</div>`;
    }
}

// Handle search-result for date
const handleSearchResultDate = (data, country) => {
    searchResultEl.innerHTML = '';
    data.data.forEach(date => {
        renderSearchResultDate(date, country);
    })
}

// Handle search-result for timezone
const handleSearchResultTimezone = (data, country, timezone) => {
    searchResultEl.innerHTML = '';
    data.data.forEach(date => {
        renderSearchResultTimezone(date, country, timezone);
    })
}

// Empty form
const emptyValueInForm = () => {
    document.querySelector('#name').value = '';
    document.querySelector('#country').value = ''; 
    document.querySelector('#month').value = 0;
    document.querySelector('#day').value = '';
    document.querySelector('#timezone').value = '';
}

// Error message
const renderErrorMessage = () => {
    searchResultEl.innerHTML = `<div class="alert alert-warning mt-4">Something went wrong, please try again.</div>`;
}

// Get user search when submitting
document.querySelector('#search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.querySelector('#name').value;
    const country = document.querySelector('#country').value;
    const month = Number(document.querySelector('#month').value);
    const day = Number(document.querySelector('#day').value);
    const timezone = document.querySelector('#timezone').value;

    if (name && (month && day) || name && timezone || (month && day) && timezone) {
        searchResultEl.innerHTML = `<div class="alert alert-warning mt-4">You selected too many values. Please try again with only one search-alternative, in addition to the required one.</div>`;
    } else if (name) {
        if (name.length < 3) {
            searchResultEl.innerHTML = `<div class="alert alert-warning mt-4">Your name doesn't have enough characters, please select a name with more than three characters.</div>`;
        } else {
            getNamedayByName(name, country)
            .then(response => {
                handleSearchResultName(response, name);
            })
            .catch(err => {
                renderErrorMessage(err);
            })   
        }
    } else if (month && day) {
        getNamedayByDate(month, day, country)
        .then(response => {
            handleSearchResultDate(response, country);
        })
        .catch(err => {
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
        renderErrorMessage();
    }
    emptyValueInForm();
})

// Reset page
document.querySelector('#search-form').addEventListener('reset', function(e) {
    searchResultEl.innerHTML = '';
})