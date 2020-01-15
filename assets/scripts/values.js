/**
 * Arrays of values for conversion.
 * 
 */

const reverseCountryValue = country => {
    const countries = [
        { 
            value: 'at',
            country: 'Austria',
        },
        { 
            value: 'hr',
            country: 'Croatia',
        },
        { 
            value: 'cz',
            country: 'Czechia',
        },
        { 
            value: 'dk',
            country: 'Denmark',
        },
        { 
            value: 'fr',
            country: 'France',
        },
        { 
            value: 'fi',
            country: 'Finland',
        },
        { 
            value: 'de',
            country: 'Germany',
        },
        { 
            value: 'hu',
            country: 'Hungary',
        },
        { 
            value: 'it',
            country: 'Italy',
        },

        { 
            value: 'pl',
            country: 'Poland',
        },
        { 
            value: 'sk',
            country: 'Slovakia',
        },
        { 
            value: 'es',
            country: 'Spain',
        },
        { 
            value: 'se',
            country: 'Sweden',
        },
        {
            value: 'us',
            country: 'United States of America',
        }
    ];

    let result = countries.find(object => {
        return country === object.value;
    });

    return result.country;
}


const reverseMonthValue = month => {
    const months = [
        { 
            value: 1,
            month: 'January',
        },
        { 
            value: 2,
            month: 'February',
        },
        { 
            value: 3,
            month: 'March',
        },
        { 
            value: 4,
            month: 'April',
        },
        { 
            value: 5,
            month: 'May',
        },
        { 
            value: 6,
            month: 'June',
        },
        { 
            value: 7,
            month: 'July',
        },
        { 
            value: 8,
            month: 'August',
        },
        { 
            value: 9,
            month: 'September',
        },

        { 
            value: 10,
            month: 'October',
        },
        { 
            value: 11,
            month: 'November',
        },
        { 
            value: 12,
            month: 'December',
        }
    ];

    let result = months.find(object => {
        return month === object.value;
    });
    
    return result.month;
}