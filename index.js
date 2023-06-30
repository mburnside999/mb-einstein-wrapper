const express = require("express");
const path = require("path");
const request = require("request-promise");

const PORT = process.env.PORT || 5000;

var jwt = require("jsonwebtoken");
//var cert = process.env.PEM;
var cert = process.env.MB_PEM;
var username = process.env.MB_ACCOUNT_ID;

// get private key

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.set("port", process.env.PORT || 5000);

app.get("/", function (req, resp) {
  resp.render("pages/index");
});

app.get("/getaccesstoken", function (req, resp) {
  var token = jwt.sign(
    {
      sub: username,
      aud: "https://api.einstein.ai/v2/oauth2/token",
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    cert,
    { algorithm: "RS256" }
  );
  console.log(token);

  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
    },
    form: {
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      scope: "offline",
      assertion: token,
    },
    uri: "https://api.einstein.ai/v2/oauth2/token",
    json: true,
    // JSON stringifies the body automatically
  };

  request(options)
    .then(function (response) {
      console.log(response);
      resp.setHeader("Content-Type", "application/json");
      resp.send(response);
      //Handle the response
    })
    .catch(function (err) {
      console.log(err);
    });

  //response.render('pages/einstein');
});

app.listen(app.get("port"), function () {
  console.log(`Listening on ${PORT}`);
});
