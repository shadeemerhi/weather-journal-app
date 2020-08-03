// Personal API Key for OpenWeatherMap API
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&appid=02eeb440d2c88907ac4d58e8cc4b16a4';

// Creating JS Date object for the current date
let dateObj = new Date ();
let currentDate = `${dateObj.getMonth()}/${dateObj.getDate()}/${dateObj.getFullYear()} at 
                    ${dateObj.getHours()}:${dateObj.getMinutes()}`;


// Event listener to add function to existing HTML DOM element
const inputButton = document.getElementById('generate');
inputButton.addEventListener('click', performAction);

/* Function called by event listener */
function performAction () {
    // 1. Get the weather data from the API, then,
    // 2. POST the data to the server, then,
    // 3. update the UI with a GET request to server
    const city = document.getElementById('city').value;
    const feelings = document.getElementById('feelings').value;

    getWeatherData(baseURL, city, apiKey)
    .then(function(data) {
        postData('/addData', {
            temperature: data.main.temp,
            date: currentDate,
            userResponse: feelings
        })
    })
    .then(
        updateUI()
    )
}

/* Function to GET Web API Data*/
const getWeatherData = async (baseURL, city, apiKey) => {

    const response = await fetch(baseURL+city+apiKey);
    try {
        const data = await response.json();
        return data;
    } catch(error) {
        console.log('error', error);
    }
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {

            'Content-Type': 'application/json',
        },            
    })
    try {
        const newData = response.json();
        return newData;
    } catch(error) {
        console.log('error', error);
    }
}


/* Function to GET Project Data */
const updateUI = async () => {

    // GET REQUEST to the server
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = allData[0].date;
        document.getElementById('temp').innerHTML = allData[0].temperature;
        document.getElementById('content').innerHTML = allData[0].userResponse;

    }catch(error) {
        console.log('error', error);
    }
}