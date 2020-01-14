/**
 * Fetch data from abalin API
 * 
 */

 // Get data by search of name
const getNamedayByName = async (name, country = se) => {
    const response = await fetch(`https://api.abalin.net/getdate?name=${name}&country=${country}`);

    const data = await response.json();
    return data;
}

 // Get data by search of date
 const getNamedayByDate = async (month, day, country) => {
    const response = await fetch(`https://api.abalin.net/namedays?country=${country}&month=${month}&day=${day}`);

    const data = await response.json();
    return data;
}

// Get data by search of timezone
const getNamedayByTimezone = async (timezone, country) => {
    const response = await fetch (`https://api.abalin.net/today?timezone=${timezone}&country=${country}`);

    const data = await response.json();
    return data;
}