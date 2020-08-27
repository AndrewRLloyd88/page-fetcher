
// Implement a small command line node app called fetcher.js which should take a URL as a command-line argument as well as a local file path and download the resource to the specified path.

//taking in 2 args from the command line
const url = process.argv[2];
console.log(url)
const filePath = process.argv[3];

// Use the request library to make the HTTP request
// Use Node's fs module to write the file
const request = require('request');
const fs = require('fs');


const makeRequest = function(url, callback) {
//make the request passing in our URL and have a callback on standby dependent on the success of the request
request(`${url}`, (error, response, body) => {
  //if there are no errors retrieving the data
  if(!error){
    callback(body, filePath)
  } else {
    //console.log the error - maybe change the way we output this later?
    console.log(error);
  }
  //we dont need these console logs
  // console.error('error:', error); // Print the error if one occurred
  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  // console.log('body:', body); // Print the HTML for the Google homepage.
});
}


//helperfile to handle printing our data once the data has been retrieved
const printHTMLToFile = function (data, filePath){
  console.log("we are now in printHTMLToFile")
  //write the file to our filepath using the body we got from makeRequests request
  fs.writeFile(filePath, data, error => {
    //if everything went ok writing file
    if (!error) {
      fs.stat(url, (error, stats) => {
        if(!error){
          console.log(`Downloaded and saved ${stats.size} bytes to ${filePath}`)
        }
      })
    } else {
      return console.log(error);
    }
// console.log(filePath);
// console.log(data);
})
};

// Upon completion, it should print out a message like Downloaded and saved 1235 bytes to ./index.html.

// > node fetcher.js http://www.example.edu/ ./index.html
// Downloaded and saved 3261 bytes to ./index.html

// Use the callback based approach we've been learning so far
// Do not use the pipe function
// Do not use synchronous functions (see warning below)

//allows us to run the program with the initial process.argv args
console.log(makeRequest(url, printHTMLToFile))
