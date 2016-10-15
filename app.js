"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var ejs = require("ejs");
var url = require('url');
var app = express();
var PORT = 8000;

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({ extended:true }));

var puppies = [];

app.get("/",function(req,res){
    if(puppies.length > 0){
      puppies.forEach(function(element){
        console.log(`name ${element.name} age ${element.age}`);
    //   res.send(`<li>name ${element.name}</li>
    //         <li>age ${element.age}</li>`
    // );
    });
    res.send(puppies);
  }else{
    res.send("<h1>you have no puppies</h1>");
  }
});

app.get("/puppies/new",function(req,res){
    res.render("index");
});

app.get("/puppies",function(req,res){
    var query = req.query;
    puppies.push({});
    let currentIndex = puppies.length - 1;
    puppies[currentIndex].name = query.name;
    puppies[currentIndex].age = query.age;
    puppies[currentIndex].id = currentIndex + 1;
    console.log(puppies);
    res.redirect("/puppies/new");
});

app.post("/puppies", function(req,res){
    console.log("name " + req.body.name);
    console.log("age " + req.body.age);
    var addName = req.body.name;
    var addAge = req.body.age;
    puppies.push({});
    var currentObject = puppies[puppies.length - 1];
    currentObject.name = addName;
    currentObject.age = addAge;
    currentObject.id = puppies.length;
    console.log(puppies);
    res.redirect("/puppies/new");
});

app.get("/puppies/:id",function(req, res){
    var dogsID = req.params.id;
    console.log(puppies[dogsID - 1].name + " " + puppies[dogsID - 1].age);
    res.send(puppies[dogsID - 1]);//"name " + puppies[dogsID - 1].name + " age " + puppies[dogsID - 1].age);
});

app.get("/contact",function(req, res){
    res.render("contact");
});

app.get("/about",function(req, res){
  res.render("about");
});


app.listen(PORT, function(){
  console.log("listening for call to " + PORT);
});

module.exports = {
  app,
  puppies
};
