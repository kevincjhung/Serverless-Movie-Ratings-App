/**
 * This code is used to seed the database of the project with movie data from a CSV file. 
 * It reads the CSV file, parses its content into JSON objects, and then sends each movie 
 * entry as a POST request to an API endpoint 
 * (https://kutu61dwp5.execute-api.ca-central-1.amazonaws.com/movies). 
 * Before sending, it converts certain fields to appropriate data types (e.g., converting strings to numbers). 
 * The code also handles potential errors during the process and introduces a delay between 
 * requests to prevent throttling.
 */

// Imports
const fs = require('fs');
const Papa = require('papaparse');
const axios = require('axios');



// Function to read the CSV file and parse it into JSON objects
async function parseCSVToJSON(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const parsedData = Papa.parse(fileContent, {
    header: true,
    skipEmptyLines: true,
  });

  const jsonData = parsedData.data;

  const apiEndpoint = 'https://kutu61dwp5.execute-api.ca-central-1.amazonaws.com/movies';

  let listOfGenres = [];

  for (let i = 0; i < 50; i++) {
    const row = jsonData[i];
    const emptyFields = Object.keys(row).filter((key) => !row[key].trim());
    if (emptyFields.length > 0) {
      console.log(`Row ${i + 1}: Empty fields - ${emptyFields.join(', ')}`);
    }

    // Convert specific fields to numbers
    row.Year = parseInt(row.Year);
    row.RuntimeMinutes = parseInt(row.RuntimeMinutes);
    row.Rating = parseFloat(row.Rating);
    row.Votes = parseInt(row.Votes);
    row.RevenueMillions = parseFloat(row.RevenueMillions);
    row.Metascore = parseInt(row.Metascore);

    try {
      // Make the POST request using Axios
      const response = await axios.post(apiEndpoint, row, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(`Row ${i + 1} successfully sent to the server.`);
      console.log('Server response:', response.data);

      // check if genre is already in the listOfGenres
      if (listOfGenres.indexOf(row.Genre) === -1) {
        listOfGenres.push(row.Genre);
      }
    } catch (error) {
      console.error(`Error sending row ${i + 1} to the server:`, error.message);
    }

    // Introduce a delay, to prevent throttling
    await new Promise((resolve) => setTimeout(resolve, 75));
  }

  return jsonData;
}



const filePath = 'movie.csv';
parseCSVToJSON(filePath);

