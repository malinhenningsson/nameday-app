/**
 * Fetch data from abalin API
 * 
 */

 // Get data by search of name
const getNamedayByName = async (name, country) => {
    const response = await fetch(`https://api.abalin.net/getdate?name=${name}&country=${country}`);

    if (!response.ok) {
        throw new Error(`Request not ok, status code returned was: ${response.status}`);
    }

    const data = await response.json();
    return data;
}

 // Get data by search of date
 const getNamedayByDate = async (month, day, country) => {
    const response = await fetch(`https://api.abalin.net/namedays?country=${country}&month=${month}&day=${day}`);

    if (!response.ok) {
        throw new Error(`Request not ok, status code returned was: ${response.status}`);
    }

    const data = await response.json();
    return data;
}

getNamedayByName('Malin', 'se');
getNamedayByDate('12', '10', 'se');