function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

// map to century and age
var personCenturyAndAge = ancestry.map(function(person){
 var century = Math.ceil(person.died / 100);
  var age = person.died - person.born
  return [century, age];
});

var groups = {};

personCenturyAndAge.forEach(function(person, index){
  var groupName = person[0]
  if (groupName in groups)
    groups[groupName].push(person[1]);
  else
    groups[groupName] = [person[1]];
})

for (var group in groups){
 console.log(group + ": " + Math.floor(average(groups[group]))); 
}

console.log(groups);
                       

// average per century

// Your code here.

// → 16: 43.5
//   17: 51.2
//   18: 52.8
//   19: 54.8
//   20: 84.7
//   21: 94

// Run code here in the context of Chapter 6

function rowHeights(rows){
 return rows.map(function(row){
  return row.reduce(function(max, cell){
   return Math.max(max, cell.minHeight()); 
  }, 0);
 });
}

function colWidths(rows){
 return rows[0].map(function(_,i){
  return rows.reduce(function(max, row){
   return Math.max(max, row[i].minWidth());
  }, 0);
 });
}

function drawTable(rows){
 var heights = rowHeights(rows);
  var widths = colWidths(rows);
  
  function drawLine(blocks, lineNo){
   return blocks.map(function(block){
    return block[lineNo]; 
   }).join(" ");
  }
  
  function drawRow(row, rowNum){
   var blocks = row.map(function(cell, colNum){
    return cell.draw(widths[colNum], heights[rowNum]); 
   });
    
    return blocks[0].map(function(_,lineNo){
      return drawLine(blocks, lineNo);
    }).join("\n");
  }
  
  return rows.map(drawRow).join("\n");
}

//------------------------

function repeat(string, times){
 var result = "";
 for (var i = 0; i < times; i++)
   result += string;
  return result;
}

function TextCell(text) {
 this.text = text.split("\n"); 
}
TextCell.prototype.minWidth = function() {
 return this.text.reduce(function(width, line){
  return Math.max(width, line.length); 
 }, 0);
};
TextCell.prototype.minHeight = function(){
 return this.text.length;
};
TextCell.prototype.draw = function (width, height){
 var result = [];
  for (var i = 0; i < height; i++){
   var line = this.text[i] || "";
   result.push(line + repeat(" ", width - line.length));
  }
  return result;
};

//--------------

var rows = [];
for (var i = 0; i < 5; i++) {
   var row = [];
   for (var j = 0; j < 5; j++) {
     if ((j + i) % 2 == 0)
       row.push(new TextCell("##"));
     else
       row.push(new TextCell("  "));
   }
   rows.push(row);
}
console.log(drawTable(rows));

// ----------------------------------------------

function UnderlinedCell(inner) {
  this.inner = inner;
}
UnderlinedCell.prototype.minWidth = function() {
  return this.inner.minWidth();
};
UnderlinedCell.prototype.minHeight = function() {
  return this.inner.minHeight() + 1;
};
UnderlinedCell.prototype.draw = function(width, height) {
  return this.inner.draw(width, height - 1)
    .concat([repeat("-", width)]);
};

//---------------

function dataTable(data) {
  var keys = Object.keys(data[0]);
  var headers = keys.map(function(name) {
    return new UnderlinedCell(new TextCell(name));
  });
  var body = data.map(function(row) {
    return keys.map(function(name) {
      return new TextCell(String(row[name]));
    });
  });
  return [headers].concat(body);
}

console.log(drawTable(dataTable(MOUNTAINS)));

console.log(dataTable(MOUNTAINS));

// Run code here in the context of Chapter 6

function Vector (x, y){
 this.x = x; 
 this.y = y;
}
Vector.prototype.plus = function(inputVector){
  return new Vector(this.x + inputVector.x, this.y + inputVector.y)
};
Vector.prototype.minus = function(inputVector){
  return new Vector(this.x - inputVector.x, this.y - inputVector.y)
};

console.log(new Vector(1,2));
// → Vector{x: 1, y: 2}
console.log(new Vector(1, 2).plus(new Vector(2, 3)));
// → Vector{x: 3, y: 5}
console.log(new Vector(1, 2).minus(new Vector(2, 3)));
// → Vector{x: -1, y: -1}
console.log(new Vector(3, 4).length);
// → 5


// Your code here.

function StretchCell(inner, width, height){
 this.inner = inner; 
 this.width = width;
 this.height = height;
};

StretchCell.prototype.minWidth = function(){
  return Math.max(this.inner.minWidth(), this.width); 
};

StretchCell.prototype.minHeight = function(){
  return Math.max(this.inner.minHeight(), this.height); 
};

StretchCell.prototype.draw = function (width, height){
  return this.inner.draw(width, height)
};

var sc = new StretchCell(new TextCell("abc"), 1, 2);
console.log(sc.minWidth());
// → 3
console.log(sc.minHeight());
// → 2
console.log(sc.draw(3, 2));
// → ["abc", "   "]



// Run code here in the context of Chapter 7

// Run code here in the context of Chapter 7

var plan = ["############################",
            "#      #    #      o      ##",
            "#                          #",
            "#          #####           #",
            "##         #   #    ##     #",
            "###           ##     #     #",
            "#           ###      #     #",
            "#   ####                   #",
            "#   ##       o             #",
            "# o  #         o       ### #",
            "#    #                     #",
            "############################"];

//---------

function Vector (x, y){
 this.x = x; 
 this.y = y;
}
Vector.prototype.plus = function(inputVector){
  return new Vector(this.x + inputVector.x, this.y + inputVector.y)
};
Vector.prototype.minus = function(inputVector){
  return new Vector(this.x - inputVector.x, this.y - inputVector.y)
};

//------------

var gridSample = ["top left",    "top middle",    "top right",
            "bottom left", "bottom middle", "bottom right"];

//--------------

function Grid(width, height){
 this.space = new Array(width * height);
 this.width = width;
 this.height = height;
}
Grid.prototype.isInside = function(vector) {
 return vector.x >= 0 && vector.x < this.width &&
   		vector.y >= 0 && vector.y < this.height;
};
Grid.prototype.get = function(vector) {
  return this.space[vector.x + this.width * vector.y]
};
Grid.prototype.set = function(vector, value) {
  this.space[vector.x + this.width * vector.y] = value;
};
Grid.prototype.forEach = function(f, context){
  for (var y = 0; y < this.height; y++) {
   for (var x = 0; x < this.width; x++) {
    var value = this.space[x + y * this.width];
    if (value != null)
      f.call(context, value, new Vector(x, y));
   }
  }
};

//---------------

var directions = {
  "n":  new Vector( 0, -1),
  "ne": new Vector( 1, -1),
  "e":  new Vector( 1,  0),
  "se": new Vector( 1,  1),
  "s":  new Vector( 0,  1),
  "sw": new Vector(-1,  1),
  "w":  new Vector(-1,  0),
  "nw": new Vector(-1, -1)
};

function randomElement(array){
 return array[Math.floor(Math.random() * array.length)]; 
}

var directionNames = "n ne e se s sw w nw".split(" ");

console.log(directionNames);

function BouncingCritter(){
 this.direction = randomElement(directionNames); 
};
BouncingCritter.prototype.act = function(view){
  if (view.look(this.direction) != " ")
    this.direction = view.find(" ") || "s";
  return {type: "move", direction: this.direction};
};

//--------------

function elementFromChar(legend, ch){
 if (ch == " ")
   return null;
  var element = new legend[ch]();
  element.originChar = ch;
  return element
}

//-----------------

function World(map, legend){
 var grid = new Grid(map[0].length, map.length);
 this.grid = grid;
 this.legend = legend;
  
 map.forEach(function(line, y){
  for (var x = 0; x < line.length; x++)
    grid.set(new Vector(x, y),
             elementFromChar(legend, line[x]));
 });
}

function charFromElement(element){
 if (element == null)
   return " ";
  else
    return element.originChar;
}

World.prototype.toString = function(){
 var output = "";
 for (var y = 0; y < this.grid.height; y++){
  for (var x = 0; x < this.grid.width; x++){
   var element = this.grid.get(new Vector(x, y));
   output += charFromElement(element);
  }
   output += "\n";
 }
  return output;
};
World.prototype.turn = function(){
 var acted = [];
 this.grid.forEach(function(critter, vector){
  if (critter.act && acted.indexOf(critter) == -1) {
   acted.push(critter);
   this.letAct(critter, vector);
  }
 }, this);
};
World.prototype.letAct = function(critter, vector) {
 var action = critter.act(new View(this, vector));
  if (action && action.type == "move") {
   var dest = this.checkDestination(action, vector);
    if (dest && this.grid.get(dest) == null) {
     this.grid.set(vector, null);
     this.grid.set(dest, critter);
    }
  }
};
World.prototype.checkDestination = function(action, vector){
 if (directions.hasOwnProperty(action.direction)){
  var dest = vector.plus(directions[action.direction]);
  if (this.grid.isInside(dest))
    return dest;
 }
};

function Wall() {}

//----------------------

function View(world, vector){
 this.world = world;
 this.vector = vector;
}
View.prototype.find = function(ch){
 var found = this.findAll(ch);
  if (found.length == 0)
    return null;
  return randomElement(found);
};
View.prototype.findAll = function(ch){
  var found = [];
  for (var dir in directions)
   if (this.look(dir) == ch)
    found.push(dir);
   return found;
};
View.prototype.look = function(dir){
 var target = this.vector.plus(directions[dir]);
 if (this.world.grid.isInside(target))
   return charFromElement(this.world.grid.get(target));
  else
    return "#";
};

//--------------

var world2 = new World(plan,
                      {"#": Wall,
                       "o": BouncingCritter});

animateWorld(world2);

//-----------------

function dirPlus(dir, n){
 var index = directionNames.indexOf(dir);
  return directionNames[(index + n + 8) % 8];
}

function WallFollower(){
 this.dir = "s"; 
}

WallFollower.prototype.act = function(view){
 var start = this.dir;
  if (view.look(dirPlus(this.dir, -3)) != " ")
    start = this.dir = dirPlus(this.dir, -2);
  while (view.look(this.dir) != " "){
   this.dir = dirPlus(this.dir, 1);
   if (this.dir == start) break;
  }
  return {type: "move", direction: this.dir};
};

//--------------

animateWorld(new World(
  ["############",
   "#     #    #",
   "#   ~    ~ #",
   "#  ##      #",
   "#  ##  o####",
   "#          #",
   "############"],
  {"#": Wall,
   "~": WallFollower,
   "o": BouncingCritter}
));

//----------------

function LifelikeWorld(map, legend){
 World.call(this, map, legend); 
}
LifelikeWorld.prototype = Object.create(World.prototype);

var actionTypes = Object.create(null);

LifelikeWorld.prototype.letAct = function(critter, vector){
 var action = critter.act(new View(this, vector));
 var handled = action &&
     action.type in actionTypes &&
     actionTypes[action.type].call(this, critter,
                                   vector, action);
  if (!handled) {
   critter.energy -= 0.2;
   if (critter.energy <= 0)
     this.grid.set(vector, null);
  }
};

actionTypes.grow = function(critter){
 critter.energy += 0.5;
 return true;
};

actionTypes.move = function (critter, vector, action) {
 var dest = this.checkDestination(action, vector);
 if (dest == null ||
     critter.energy <= 1 ||
     this.grid.get(dest) != null)
   return false
  critter.energy -= 1;
  this.grid.set(vector, null);
  this.grid.set(dest, critter);
  return true;
};

actionTypes.eat = function(critter, vector, action){
 var dest = this.checkDestination(action, vector);
 var atDest = dest != null && this.grid.get(dest);
 if (!atDest || atDest.energy == null)
   return false;
  critter.energy += atDest.energy;
  this.grid.set(dest, null);
  return true;
};

actionTypes.reproduce = function(critter, vector, action){
 var baby = elementFromChar(this.legend,
                            critter.originChar);
  var dest = this.checkDestination(action, vector);
  if (dest == null ||
      critter.energy <= 2 * baby.energy ||
      this.grid.get(dest) != null)
    return false;
  critter.energy -= 2 * baby.energy;
  this.grid.set(dest, baby);
  return true;
};

//-------------

function Plant() {
 this.energy = 3 + Math.random() * 4; 
}
Plant.prototype.act = function(view){
 if (this.energy > 15) {
  var space = view.find(" ");
   if (space)
     return {type: "reproduce", direction: space}
 }
  if (this.energy < 20)
    return {type: "grow"};
};

//------------

function PlantEater() {
 this.energy = 20; 
}
PlantEater.prototype.act = function(view) {
 var space = view.find(" ");
  if (this.energy > 60 && space)
    return {type: "reproduce", direction: space};
  var plant = view.find("*");
  if (plant)
    return {type: "eat", direction: plant};
  if (space)
    return {type:"move", direction: space};
};

//--------------

var valley = new LifelikeWorld(
  ["############################",
   "#####                 ######",
   "##   ***                **##",
   "#   *##**         **  O  *##",
   "#    ***     O    ##**    *#",
   "#       O         ##***    #",
   "#                 ##**     #",
   "#   O       #*             #",
   "#*          #**       O    #",
   "#***        ##**    O    **#",
   "##****     ###***       *###",
   "############################"],
  {"#": Wall,
   "O": PlantEater,
   "*": Plant}
);

animateWorld(valley);

//---------------
