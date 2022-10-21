/**
 * Page Fetcher
 *
 * App that downloads a file from a url
 */

const fs = require("fs");
const request = require('request');

// Validate URL
let validateURL = (url) => {
  if (!url) {
    throw Error("No url provided! Please provide a valid url as the first argument");
  }
  let result;

  try {
    result = new URL(url);
  } catch (_) {
    throw Error("Not a valid URL");
  }

  if (result.protocol === "http:" || result.protocol === "https:") {
    return String(result.href);
  }
};

// Check for existing file of same name
const doesFileExist = (filePath) => {
  fs.access(filePath, fs.F_OK, (err) => {
    if (err) {
      // File does not exist - that's what we want so exit
      return;
    }

    // If file exists, throw an error
    throw Error("File already exists!");
  });
};

// Accept command line arguments
const args = process.argv.slice(2);

// Store these values into variables
const url = validateURL(args[0]);
const filePath = args[1];

// Check if file exists
doesFileExist(args[1]);

// Variables to set from the file to be downloaded
// String of the html we grab from the URL
let fileBody = '';

// The file size in bytes
let fileSize = 0;

// Request the file from the url provided
request(url, (error, response, body) => {
  if (error !== null) {
    throw Error(error);
  } else {
    // Grab the html from the URL and store it
    fileBody = body;

    // Calculate the size based on number of characters in file
    fileSize = fileBody.length;

    // Create our file on local machine
    fs.writeFile(filePath, fileBody, (error) => {
      if (error) {
        throw Error("Failed to write to file");
      }
      console.log(`Downloaded and saved ${fileSize} bytes to ${filePath}`);
    });
  }
});
