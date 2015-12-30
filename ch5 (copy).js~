// Run code here in the context of Chapter 5

var byName = {}

ancestry.forEach(function(person){
 byName[person.name] = person; 
});

console.log(byName["Philibert Haverbeke"]);

function reduceAncestors(person, f, defaultValue){
 function valueFor(person){
  if (person == null)
    return defaultValue;
   else
     return f(person, valueFor(byName[person.mother]),
              			valueFor(byName[person.father]));
 }
  return valueFor(person);
}

function sharedDNA(person, fromMother, fromFather){
 if (person.name == "Pauwels van Haverbeke")
   return 1;
  else
    return (fromMother + fromFather) / 2;
}

var ph = byName["Philibert Haverbeke"];
console.log(reduceAncestors(ph, sharedDNA, 0) / 4);

function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

var byName = {};
ancestry.forEach(function(person) {
  byName[person.name] = person;
});

// Your code here.

var withMother = ancestry.filter(function(person){
    return byName[person.mother] != null;
});

// only checks if has mother. does not check if mother is in array.
var withMotherWrong = ancestry.filter(function(person){
    if (person.mother != null)
      return person;
});

var difference = withMother.map(function(person){
  return person.born - byName[person.mother].born;
});

console.log(ancestry.length);

console.log(withMother);
console.log(withMotherWrong);

console.log(average(difference));

// → 31.2
