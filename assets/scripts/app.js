/**
 * Name day app
 * 
 */

// Getting value from input-fields in HTML
const searchResultEl = document.querySelector('#search-results');


// Output search result in HTML
const renderSearchResultName = (data, country) => {
    console.log(data);
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
    console.log(data);
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


// Get user search when pushing submit
document.querySelector('#search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.querySelector('#name').value;
    const country = document.querySelector('#country').value;
    const month = Number(document.querySelector('#month').value);
    const day = Number(document.querySelector('#day').value);

    // Search by name
    if (name.length > 0 && (month > 0 && day > 0)) {
        // Create div with error, filled in both country and date
        searchResultEl.innerHTML += `<div class="alert alert-warning mt-4">You selected both country and date. Please try again with only one alternative.</div>`;
        
        // Reset page
        document.querySelector('#name').value = '';
        document.querySelector('#country').value = ''; 
        document.querySelector('#month').value = 0;
        document.querySelector('#day').value = '';
    } else if (name.length > 0) {
        getNamedayByName(name, country)
        .then(response => {
            handleSearchResultName(response);
         })
        .catch(err => {
            alert(err);
         })
    
         document.querySelector('#name').value = '';
         document.querySelector('#country').value = '';

    } else if (month > 0 && day > 0) {
        getNamedayByDate(month, day, country)
       .then(response => {
           handleSearchResultDate(response, country);
        })
       .catch(err => {
           alert(err);
        })
    
        document.querySelector('#month').value = 0;
        document.querySelector('#day').value = '';
        document.querySelector('#country').value = '';

    } else {
        alert('You did something wrong');
    }

})

// Make it only possible to fill out either name or date


// Fetch API through same function but just exchange parts of the URL in template-string?


// Create reset function for page