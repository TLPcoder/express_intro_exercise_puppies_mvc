"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const url = require('url');
const app = express();
const PORT = 8000;
const Puppy = require("./models/puppy").Puppy;
const addPuppy = require("./models/puppy").addToArray;
const allPuppies = require("./models/puppy").returnAllPuppies;
const routes = require("./routes/routers");

// var trevor = new Puppy("trevor","35");
// var brandon = new Puppy("brandon", 8);
// console.log(brandon);
// addPuppy(brandon);
// addPuppy(trevor);
// console.log(allPuppies());


app.set("view engine","ejs");

app.use(bodyParser.urlencoded({ extended:true }));

//var puppies = [];

app.get("/",function(req,res){
    //if(allPuppies() > 0){
    res.send(allPuppies());
  // }else{
  //   res.send("<h1>you have no puppies</h1>");
  //}
});

app.get("/puppies/new",function(req,res){
    res.render("index");
});

app.get("/puppies",function(req,res){
    var query = req.query;
    let newPuppy = new Puppy(query.name, query.age);
    addPuppy(newPuppy);
    // puppies.push({});
    // let currentIndex = puppies.length - 1;
    // puppies[currentIndex].name = query.name;
    // puppies[currentIndex].age = query.age;
    // puppies[currentIndex].id = currentIndex + 1;
    res.redirect("/puppies/new");
});

app.post("/puppies", function(req,res){
    var addName = req.body.name;
    var addAge = req.body.age;
    let newPuppy = new Puppy(addName, addAge);
    addPuppy(newPuppy);
    // puppies.push({});
    // var currentObject = puppies[puppies.length - 1];
    // currentObject.name = addName;
    // currentObject.age = addAge;
    // currentObject.id = puppies.length;
    res.redirect("/puppies/new");
});

app.get("/puppies/:id",function(req, res){
    var dogsID = req.params.id;
    if(dogsID){
      for(let key in allPuppies()){
        console.log("should be puppies id", allPuppies()[key].id, "actuall puppies ID", dogsID);
        console.log('for in loop', Number(dogsID) === allPuppies()[key].id);
        if(Number(dogsID) === allPuppies()[key].id){
          res.send(allPuppies()[key]);
        }
      }
      res.sendStatus(400);
    }

    //res.send(puppies[dogsID - 1]);//"name " + puppies[dogsID - 1].name + " age " + puppies[dogsID - 1].age);
});

// app.get("/contact",function(req, res){
//     res.render("contact");
// });
app.use("/contact", routes.contact);

app.use("/about", routes.about);

// app.get("/about",function(req, res){
//   res.render("about");
// });


app.listen(PORT, function(){
  console.log("listening for call to " + PORT);
});

module.exports = {
  app,
  //puppies
  allPuppies
};
