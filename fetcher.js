const fs = require("fs");
const request = require('request');

// It should take two command line arguments:

// a URL
// a local file path
const args = process.argv.slice(2);
const url = args[0];
const filePath = args[1];
let fileBody ='';

console.log(args);

request(url, (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
  fileBody = String(body);

  fs.writeFile(filePath, fileBody, (error) => {
    if (error) {
      // Handle error
      console.log("Failed to write to file");
      return;
    }
    // Success!
    console.log("Successfully wrote to file");
  });
});

//t should download the resource at the URL to the local path on your machine

// Upon completion, it should print out a message like Downloaded and saved 1235 bytes to ./index.html.


// I.e. node fetcher.js http://www.example.edu/ ./index.html
// Downloaded and saved 3261 bytes to ./index.html