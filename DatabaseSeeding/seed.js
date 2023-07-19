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

  // Assuming the API endpoint is 'https://kutu61dwp5.execute-api.ca-central-1.amazonaws.com/movies'
  const apiEndpoint = 'https://kutu61dwp5.execute-api.ca-central-1.amazonaws.com/movies';

  for (let i = 496; i < jsonData.length; i++) {
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
    } catch (error) {
      console.error(`Error sending row ${i + 1} to the server:`, error.message);
    }

    // Introduce a 1-second delay before sending the next request
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  return jsonData;
}

// Sample usage
const filePath = 'movie.csv';
parseCSVToJSON(filePath);
