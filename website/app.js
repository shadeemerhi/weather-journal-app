// Personal API Key for OpenWeatherMap API
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
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
    let city = document.getElementById('city').value;
    let feelings = document.getElementById('feelings').value;
    console.log('Check 1');

    getWeatherData(baseURL, city, apiKey)
    .then(function(data) {
        console.log('Check 3 - After API Call');
        postData('/addData', {
            temperature: Math.round(data.main.temp-273),
            date: currentDate,
            userResponse: feelings
        })
        console.log('Here is the date: ' + currentDate);
        console.log(data.main.temp);
    })
    .then(function() {
        updateUI();
    })
}

/* Function to GET Web API Data*/
const getWeatherData = async (baseURL, city, apiKey) => {

    const response = await fetch(baseURL+city+apiKey);
    console.log('Check 2 - Inside API call');
    try {
        const data = await response.json();
        console.log(data);
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
        body: JSON.stringify(data),          
    });

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
    console.log('Check 4 - Inside UI Update');
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        console.log(allData);
        document.getElementById('temp').innerHTML = `${allData.temperature} C`;
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('content').innerHTML = allData.userResponse;

    }catch(error) {
        console.log('error', error);
    }
    console.log('Check 5 - After GET');
}