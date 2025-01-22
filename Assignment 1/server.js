const express = require("express");
const fs = require("fs");
const app = express();

app.use((req, res, next) => {
  console.log("Middleware 1");
  console.log("Request URL:", req.url);
  console.log("Request Method:", req.method);
  console.log("Request Time:", new Date());
  console.log("Request IP:", req.ip);
  console.log("Request Headers: ", req.headers);
  console.log("Request protocol: ", req.protocol);
  console.log("Request hostname: ", req.hostname);
  
  next();
});

app.use((req, res, next) => {
    const log = {
        timestamp: new Date(),
        ip: req.ip,
        url: req.url,
        protocol: req.protocol,
        method: req.method,
        hostname: req.hostname
    };

    const logstring= JSON.stringify(log) + '\n';

    fs.appendFile('log.txt', logstring, "utf-8", (err)=>{
        if (err){
            console.log("error in log ");
            
        }
    })
next();
  });

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/about", (req, res) => {
  res.send("About Us");
});

// http://localhost:3000/profile/2000/99d
app.get("/profile/:commentId/:Id/:name", (req, res) => {
  console.log(req.params);
  const { commentId, Id,name } = req.params;
  // res.send('print the commentId and Id');
  res.send(`Comment ID: ${req.params.commentId} and ID: ${req.params.Id} and Your Name: ${req.params.name}`);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});