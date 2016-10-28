"use strict";
var allPuppies = {};
var id = 1;

function returnAllPuppies(){
  return allPuppies;
}

function Puppy(name,age){
  this.name = name;
  this.age = age;
  this.id = id;
  id++;
}

function addToArray(puppy){
  allPuppies[puppy.name] = puppy;
}

module.exports = {
  Puppy,
  returnAllPuppies,
  addToArray
};
