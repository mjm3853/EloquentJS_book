// Run code here in the context of Chapter 4

function FourElementTable(topLeft, topRight, bottomLeft, bottomRight) {
  this.topLeft = topLeft;
  this.topRight = topRight;
  this.bottomLeft = bottomLeft;
  this.bottomRight = bottomRight;
  this.calculateCorrelation = function calculateCorrelation() {
    return (bottomRight * topLeft - bottomLeft * topRight)/
      Math.sqrt((bottomLeft + bottomRight) *
                (topLeft + topRight) *
                (topRight + bottomRight) *
                (topLeft + bottomLeft))
  }
  this.incrementTopLeft = function incrementTopLeft(){
    this.topLeft ++;
  }
  this.incrementTopRight = function incrementTopRight(){
    this.topRight ++;
  }
  this.incrementBottomLeft = function incrementBottomLeft(){
    this.bottomLeft ++;
  }
  this.incrementBottomRight = function incrementBottomRight(){
    this.bottomRight ++;
  }
  this.viewTable = function viewTable(){
  	return {
    	topLeft: topLeft,
      	topRight: topRight,
      bottomLeft: bottomLeft,
      bottomRight: bottomRight
    };
  }
};

var testTable = new FourElementTable(76, 9, 4, 1);

console.log("Test of calculateCorrelation. Should be 0.0685.. Outcome: " + testTable.calculateCorrelation())

testTable.incrementBottomLeft();

console.log("Test of incrementCell. Should be 5.. Outcome: " + testTable.bottomLeft)
console.log(testTable.viewTable())

function hasEvent(event, entry){
  return entry.events.indexOf(event) != -1;
}

console.log("Test of hasEvent Function. Should return false.. Outcome: " + hasEvent("pizza", JOURNAL[1]));


function tableFor(event, journal){
  var table = new FourElementTable(0, 0, 0, 0);
  for (var i = 0; i < journal.length; i++){
    var entry = journal[i], index = 0;
    if (hasEvent(event, entry)) table.incrementTopLeft();
  }
  return table;
}
                  
console.log(tableFor("pizza", JOURNAL));
