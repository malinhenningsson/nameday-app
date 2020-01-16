/**
 * Name day app
 * 
 */

// Getting search-form in HTML
const searchResultEl = document.querySelector('#search-results');

// Change first letter to capital
const changeCaseFirstLetter = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

// General error message
const renderGeneralErrorMessage = () => {
    searchResultEl.innerHTML = `<div class="alert alert-warning mt-4">Something went wrong, please try again.</div>`;
}

// Error message name
const renderNameErrorMessage = (name) => {
    if (name.length < 3) {
        searchResultEl.innerHTML = `<div class="alert alert-warning mt-4">Your name doesn't have enough characters, please select a name with more than three characters.</div>`;
    } else {
        searchResultEl.innerHTML = `<div class="alert alert-warning mt-4">The name '${changeCaseFirstLetter(name)}' does not exist in selected country, please try something else.</div>`;
    }
}

// Handle search-result for timezone
const handleSearchResultTimezone = (data, country, timezone) => {
    searchResultEl.innerHTML = '';
    data.data.forEach(date => {
        renderSearchResultTimezone(date, country, timezone);
    })
}

// Output search result in HTML for name
const renderSearchResultName = (data, country) => {
    searchResultEl.innerHTML += `
        <div class="col">
            <div class="card">
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
            <div class="card">
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
            <div class="card">
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
    let nameCompare = changeCaseFirstLetter(name);

    if (data.results.length > 0) {
        let resultList = data.results.filter(item => {
            return item.name.includes(nameCompare);
        })
        if (resultList.length > 0) {
            resultList.forEach(name => {
                renderSearchResultName(name, data[ 'country name' ]);
            });
        } else {
            renderNameErrorMessage(name);
        }
    } else {
        renderNameErrorMessage(name);
    }
}

// Handle search-result for date
const handleSearchResultDate = (data, country) => {
    searchResultEl.innerHTML = '';
    data.data.forEach(date => {
        renderSearchResultDate(date, country);
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
            renderNameErrorMessage(name);
        } else {
            getNamedayByName(name, country)
            .then(response => {
                handleSearchResultName(response, name);
            })
            .catch(err => {
                renderGeneralErrorMessage();
            })   
        }
    } else if (month && day) {
        getNamedayByDate(month, day, country)
        .then(response => {
            handleSearchResultDate(response, country);
        })
        .catch(err => {
            renderGeneralErrorMessage();
        })
    } else if (timezone) {
        getNamedayByTimezone(timezone, country)
        .then(response => {
            handleSearchResultTimezone(response, country, timezone);
        })
        .catch(err => {
            renderGeneralErrorMessage();
        })
    } else {
        renderGeneralErrorMessage();
    }
    emptyValueInForm();
})

// Reset page
document.querySelector('#search-form').addEventListener('reset', function(e) {
    searchResultEl.innerHTML = '';
})