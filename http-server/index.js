const http = require("http");
const fs = require("fs");
const { register } = require("module");
const argv = require('minimist')(process.argv.slice(2));

const port = argv.port || 5000; 

let homeContent = "";
let projectContent = "";
let registrationContent="";

fs.readFile("home.html", "utf-8", (err, home) => {
  if (err) {
    throw err;
  }
  homeContent = home;
});

fs.readFile("project.html","utf-8", (err, project) => {
  if (err) {
    throw err;
  }
  projectContent = project;
});
fs.readFile("registration.html","utf-8", (err, register) => {
    if (err) {
      throw err;
    }
    registrationContent = register;
  });
http
  .createServer((request, response) => {
    let url = request.url;
    response.writeHeader(200, { "Content-Type": "text/html" });
    switch (url) {
      case "/project":
        response.write(projectContent);
        response.end();
        break;
        case "/registration":
            response.write(registrationContent);
            response.end();
            break;
      default:
        response.write(homeContent);
        response.end();
        break;
    }
  })
  .listen(port);

// //const express = require('express');


// const app = express();



