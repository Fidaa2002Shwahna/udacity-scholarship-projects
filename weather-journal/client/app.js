// Your OpenWeatherMap API key, including the 'units=imperial' parameter
const apiKey = "ceb0a654175f69e70ed0d1ac7d9eb5e9&units=imperial";
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='; // Base URL for fetching weather data

document.getElementById('generate').addEventListener('click', performAction);

async function performAction(e) {
    const zip = document.getElementById('zip').value; // Get the zip code from input
    const feelings = document.getElementById('feelings').value; // Get the feelings input

    // Check if the zip code is provided
    if (zip === '') {
        alert('Please enter a zip code.');
        return;
    }

    try {
        // Fetch weather data using zip code and API key
        const data = await getWeatherData(baseURL, zip, apiKey);
        if (data && data.main) {
            // Post the weather data and feelings to the server
            await postData('/add', { 
                date: new Date().toLocaleDateString(),
                temp: data.main.temp,
                feel: feelings
            });
            // Update the UI with the latest data
            await updateUI();
        } else {
            alert('Invalid zip code or no weather data found.');
        }
    } catch (error) {
        console.error("Error in performAction:", error);
    }
}

// Function to fetch weather data from OpenWeatherMap API
const getWeatherData = async (baseURL, zip, key) => {
    try {
        const response = await fetch(`${baseURL}${zip}&appid=${key}`);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Failed to fetch weather data');
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
        console.log("Error:", error);
    }
}

// Function to POST data to the server
const postData = async (url = '', data = {}) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },       
            body: JSON.stringify(data), 
        });

        if (!response.ok) {
            throw new Error('Failed to post data');
        }

        const newData = await response.json();
        console.log("Server response:", newData);
        return newData;
    } catch (error) {
        console.log("Error:", error);
    }
}

// Function to update the UI with the latest project data
const updateUI = async () => {
    try {
        const request = await fetch('/all');
        const allData = await request.json();

        if (allData) {
            document.getElementById('date').innerHTML = `Date: ${allData.date}`;
            document.getElementById('temp').innerHTML = `Temperature: ${Math.round(allData.temp)}°F`;
            document.getElementById('content').innerHTML = `Feelings: ${allData.feel}`;
        } else {
            throw new Error('No data found');
        }
    } catch (error) {
        console.log("Error:", error);
    }
}
