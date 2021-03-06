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
var puppies = require("./models/puppy").puppies;

// var trevor = new Puppy("trevor","35");
// var brandon = new Puppy("brandon", 8);
// console.log(brandon);
// addPuppy(brandon);
// addPuppy(trevor);
// console.log(allPuppies());


app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function(req, res) {
    res.send(allPuppies());
});

app.get("/puppies/new", function(req, res) {
    res.render("index");
});

app.get("/puppies", function(req, res) {
    var query = req.query;
    let newPuppy = new Puppy(query.name, query.age);
    addPuppy(newPuppy);
    res.redirect("/puppies/new");
});

app.post("/puppies", function(req, res) {
    var addName = req.body.name;
    var addAge = req.body.age;
    let newPuppy = new Puppy(addName, addAge);
    addPuppy(newPuppy);
    res.redirect("/puppies/new");
});

app.get("/puppies/:id", function(req, res) {
    var dogsID = req.params.id;
    var findPuppy = allPuppies();
    if (findPuppy.length > 0) {
        res.send(findPuppy[dogsID - 1]);
        // for (let key in allPuppies()) {
        //     if (Number(dogsID) === allPuppies()[key].id) {
        //         res.send(allPuppies()[key]);
        //     }
        // }
      }else{
        res.sendStatus(400);
    }
});

app.use("/contact", routes.contact);

app.use("/about", routes.about);


app.listen(PORT, function() {
    console.log("listening for call to " + PORT);
});

module.exports = {
    app,
    puppies,
    allPuppies
};

// function decodeMorse(morseCode){
//   //your code here
//   var splitString = morseCode.split(" ");
//   var myString = "";
//   var alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
//   var morseTable = [".-","-...","-.-.","-..",".","..-.","--.","....","..",".---","-.-",".-..","--","-.","---",".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--","--.."];
//   for(let i = 0; i < splitString.length; i++){
//     let morseIndex = morseTable.indexOf(splitString[i]);
//     let letter = alpha[morseIndex];
//     if(letter === undefined){
//      letter = " ";
//     }
//     myString += letter;
//     }
//    return myString.replace("  "," ");
//  }
