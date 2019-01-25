// server.js


// Connection URL
const url =
  "mongodb://jonnisairio:admin123@ds026018.mlab.com:26018/testidatabase";

const dbName = "testidatabase";
const collection = "guestbookdata";
const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
var express = require("express"); // otetaan express käyttöön
var app = express();

var bodyParser = require("body-parser"); // Require the module required for using form data

app.use(bodyParser.urlencoded({ extended: true })); // for parsing application

app.set("view engine", "ejs"); // otetaan ejs käyttöön
app.use(express.static("public/index/"));
app.use(express.static(__dirname + "/views/css")); //css
app.use(express.static(__dirname + "/views/img")); // imaget

//index
app.get("/", function(req, res) {
  res.render("page/index", {
    new_heading: "Guestbook application",
    new_paragraph: "Go check and see what others wrote!"
  });
});

app.get("/addcomment", function(req, res) {
  res.render("page/addcomment");
});

app.get("/admin", function(req, res) {
  res.render("page/admin");
});

app.get("/delete", function(req, res) {
  const MongoClient = require("mongodb").MongoClient;

  var data = {
    name: req.body.name,
    email: req.body.email,
    comment: req.body.comment,
    date: new Date().toDateString()
  };

  // Use connect method to connect to the server

  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    function(err, client) {
      if (err) console.log("Tapahtui virhe!");

      const db = client.db(dbName);

      // Query can be copied from Compass
      var query = {};
      db.collection("guestbookdata")
        .find(query)
        .limit(10)
        .toArray(function(err, result) {
          if (err) throw err;
          console.log(result);

          res.render("page/delete", { data: result });
        });
      client.close();
    }
  );
});

////////////////////////////////
app.post("/delete", function(req, res) {


  ///////////////////////////////////////

  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    function(err, client) {
      if (err) console.log("Tapahtui virhe!");

      const db = client.db(dbName);
      // Insert a single document
      console.log(req.body.name);
      var query = { "name": { $in: [req.body.name] } };

      db.collection(collection).deleteOne(query, function(err, r) {
        res.redirect("/guestbook");
      });
      client.close();
    }
  );
});


app.get("/modify", function(req, res) {
  const MongoClient = require("mongodb").MongoClient;

  var data = {
    name: req.body.name,
    email: req.body.email,
    comment: req.body.comment,
    date: new Date().toDateString()
  };



  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    function(err, client) {
      if (err) console.log("Tapahtui virhe!");

      const db = client.db(dbName);

      // Query can be copied from Compass
      var query = {};
      db.collection("guestbookdata")
        .find(query)
        .limit(10)
        .toArray(function(err, result) {
          if (err) throw err;
          console.log(result);

          res.render("page/modify", { data: result });
        });
      client.close();
    }
  );
});

////////////////////////////////
app.post("/modify", function(req, res) {


  ///////////////////////////////////////

  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    function(err, client) {
      if (err) console.log("Tapahtui virhe!");

      const db = client.db(dbName);
      // Insert a single document
      console.log(req.body.name);
      var query = { "name": { $in: [req.body.name] } };

      db.collection(collection).deleteOne(query, function(err, r) {
        res.redirect("/guestbook");
      });
      client.close();
    }
  );
});

////////////////////////////////

app.get("/guestbook", function(req, res) {

  /////////////////////////
  const MongoClient = require("mongodb").MongoClient;



  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    function(err, client) {
      if (err) console.log("Tapahtui virhe!");

      const db = client.db(dbName);


      var query = {};
      db.collection("guestbookdata")
        .find(query)
        .limit(10)
        .toArray(function(err, result) {
          if (err) throw err;
          console.log(result);

          res.render("page/guestbook", { data: result });
        });
      client.close();
    }
  );
});
///////////////////////


app.post("/addcomment", function(req, res) {


  var data = {
    name: req.body.name,
    email: req.body.email,
    comment: req.body.comment,
    date: new Date().toDateString()
  };

  ///////////////////////////////////////

  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    function(err, client) {
      if (err) console.log("Tapahtui virhe!");

      const db = client.db(dbName);
      // Insert a single document

      db.collection(collection).insertOne(data, function(err, r) {
        console.log(r.insertedCount);

        res.redirect("/guestbook");

        //////////////////////////////
        console.log("it's saved!");
      });
    }
  );
});
app.listen(process.env.PORT || 8081);
console.log("App is using port 8081");
