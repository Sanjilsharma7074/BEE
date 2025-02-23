const http = require("http");
const fs = require("fs");
const qs = require("querystring");
const server = http.createServer((req, res) => {
    let { method } = req;

    if (method == "GET") {
        //get request handling
        if (req.url === "/") {
            getIndexPage(req, res)
        } else if (req.url === "/allstudent") {
            getAllStudentPage(req, res)
        } else if (req.url === "/data") {
            getData(req, res)
        } else if (req.url === "/contact") {
            getContactPage(req, res)
        } else{
            //error handlings
            console.log(req.url);  
            res.writeHead(404);
            res.end("Not Found");
        }
    }
       // post method handling and // Store the user data in a file 
    else {
        if (req.url === "/contact") {
            storeContacts(req,res)
        }
        else {
            res.writeHead(404);
            res.end("Not Found in post request");
        }

    }
});

server.listen(3001,() => {
    console.log("Server listening on port 3001");
});

const getIndexPage = (req, res) => {
    console.log("inside / route and Get request");
    fs.readFile("index.html", "utf8", (err, data) => {
      if (err) {
        console.log(err);
        res.writeHead(500);
        res.end("Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
}

function getAllStudentPage (req, res) {
    fs.readFile("allstudent.html", "utf8", (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end("Server Error");
      } else {
        console.log("sending allstudent.html file");
        res.end(data);
      }
    });
}

function getData(req, res) {
    fs.readFile("User.json", "utf8", (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end("Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(data);
      }
    });
}

function getContactPage(req, res) {
    fs.readFile("contact.html", "utf8", (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end("Server Error");
      } else {
        console.log("sending contact.html file");
        res.end(data);
      }
    });
}

function storeContacts (req, res) {
    console.log("inside /contact route and post request");
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
      console.log("Received chunk:", chunk.toString());
    });
    req.on("end", () => {
      console.log("Complete body received:", body);
      let readdata = fs.readFileSync("User.json", "utf-8"); //data stored in string type

      if (!readdata) {
        // if file is empty add an empty array
        fs.writeFileSync("User.json", JSON.stringify([]));
      } else {
        // if file has already some data
        let users = JSON.parse(readdata);
        console.log(users, 111);

        let convertedbody = qs.decode(body);
        users.push(convertedbody);
        console.log(convertedbody, 222);

        fs.writeFile("User.json", JSON.stringify(users), (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("User data inserted successfully");
          }
        });
      }

      // Send success.html as the response
      fs.readFile("success.html", "utf8", (err, data) => {
        if (err) {
          console.log(err);
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Server Error");
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(data);
        }
      });
    });
}
