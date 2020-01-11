/**
 * Name day app
 * 
 */

// Getting value from input-fields in HTML
const searchResult = document.querySelector('#search-result');

// Get user search when pushing submit
document.querySelector('#search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.querySelector('#name').value;
    const country = document.querySelector('#country').value;
    const month = Number(document.querySelector('#month').value);
    const day = Number(document.querySelector('#day').value);

    // Search by name
    if (name.length > 0) {
        console.log(name.length);
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


// Function that handles search-result

const handleSearchResultName = data => {
    console.log(data);
    console.log(data[ 'country code' ]);
    console.log(data[ 'country name' ]);

    data.results.forEach(name => {
        console.log(name.name);
        console.log(name.day);
        console.log(name.month);
    });
}

const handleSearchResultDate = (data, country) => {
    console.log(data);

    data.data.forEach(date => {
        console.log(date.dates.day, date.dates.month);
        console.log(date.namedays[country]);
    })
}

// Make it only possible to fill out either name or date

// Divide into one funtion for name and one function for date

// Output search result in HTML

// Fetch API through same function but just exchange parts of the URL in template-string?