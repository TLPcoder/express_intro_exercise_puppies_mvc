"use strict";
var puppies = [];
//var id = 1;

function returnAllPuppies(){
  return puppies;
}

function Puppy(name,age){
  var id;
  if(!puppies.length){
    id = 1;
  }else{
    id = puppies.length + 1;
  }
  this.name = name;
  this.age = age;
  this.id = id;
  id++;
}

function addToArray(puppy){
  //puppies[puppy.name] = puppy;
  puppies.push(puppy);
}

module.exports = {
  Puppy,
  returnAllPuppies,
  addToArray,
  puppies
};

// function puppyArray(){
//   var puppies = [];
//   return{
//     addToArray: function(puppy){
//       puppies.push(puppy);
//     },
//     findAllPuppies: function(){
//       return puppies;
//     },
//     findOnePuppy: function(id){
//       return puppies[id - 1];
//     }
//   };
// }
