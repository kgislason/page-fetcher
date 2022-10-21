/**
 * Page Fetcher
 *
 *
// Downloaded and saved 3261 bytes to ./index.html
 */
const fs = require("fs");
const request = require('request');

// Accept command line arguments
const args = process.argv.slice(2);

// Store these values into variables
const url = args[0];
const filePath = args[1];

// variables to set from the file to be downloaded
let fileBody = '';
let fileSize = 0;

// Request the file from the url provided
request(url, (error, response, body) => {
  if (error !== null) {
    console.log(error);
  } else {
    fileBody = String(body);
    fileSize = fileBody.length;

    fs.writeFile(filePath, fileBody, (error) => {
      if (error) {
        // Handle error
        console.log("Failed to write to file");
        return;
      }

      // Upon completion, it should print out a message like Downloaded and saved 1235 bytes to ./index.html.
      console.log(`Downloaded and saved ${fileSize} bytes to ${filePath}`);
    });
  }
});

