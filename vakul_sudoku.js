var board = [[0,0,0,   2,6,0,   7,0,1],
             [6,8,0,   0,7,0,   0,9,0], 
             [1,9,0,   0,0,4,   5,0,0], 

             [8,2,0,   1,0,0,   0,4,0],
             [0,0,4,   6,0,2,   9,0,0],
             [0,5,0,   0,0,3,   0,2,8],

             [0,0,9,   3,0,0,   0,7,4],
             [0,4,0,   0,5,0,   0,3,6],
             [7,0,3,   0,1,8,   0,0,0]];

var saveEmptyPositions = function(board) {
  // Create an array to save the positions
  var emptyPositions = [];
  

  // Check every square in the puzzle for a zero
  for(var i = 0; i < board.length; i++) {
    for(var j = 0; j < board[i].length; j++) {
      // If a zero is found, so that position
      if(board[i][j] === 0) {
        emptyPositions.push([i, j]);
      }
    }
  }
  console.log(emptyPositions);
  // Return the positions
  return emptyPositions;
};

var checkRow = function(board, row, value) {
  // Iterate through every value in the row
  for(var i = 0; i < board[row].length; i++) {
    // If a match is found, return false
    if(board[row][i] === value) {
      return false;
    }
  }
  console.log(board,row,value);
  // If no match was found, return true
  return true;
};

var checkColumn = function(board, column, value) {
  // Iterate through each value in the column
  for(var i = 0; i < board.length; i++) {
    // If a match is found, return false
    if(board[i][column] === value) {
      return false;
    }
  }
  // If no match was found, return true
  return true;
};

var check3x3Square = function(board, column, row, value) {
  // Save the upper left corner
  var columnCorner = 0,
      rowCorner = 0,
      squareSize = 3;

  // Find the left-most column
  while(column >= columnCorner + squareSize) {
    columnCorner += squareSize;
  }

  // Find the upper-most row
  while(row >= rowCorner + squareSize) {
    rowCorner += squareSize;
  }

  // Iterate through each row
  for(var i = rowCorner; i < rowCorner + squareSize; i++) {
    // Iterate through each column
    for(var j = columnCorner; j < columnCorner + squareSize; j++) {
      // Return false is a match is found
      if(board[i][j] === value) {        
        return false;
      }
    }
  }
  // If no match was found, return true
  return true;
};

var checkValue = function(board, column, row, value) {
  if(checkRow(board, row, value) &&
    checkColumn(board, column, value) &&
    check3x3Square(board, column, row, value)) {
    return true;
  } else {
    return false;
  }
};

var solvePuzzle = function(board, emptyPositions) {
  // Variables to track our position in the solver
  var limit = 9,
      i, row, column, value, found;
  for(i = 0; i < emptyPositions.length;) {
    row = emptyPositions[i][0];
    column = emptyPositions[i][1];
    // Try the next value
    value = board[row][column] + 1;
    // Was a valid number found?
    found = false;
    // Keep trying new values until either the limit
    // was reached or a valid value was found
    while(!found && value <= limit) {
      // If a valid value is found, marked found to true,
      // set the position to the value, and move to the
      // next position
      if(checkValue(board, column, row, value)) {
        found = true;
        board[row][column] = value;
        i++;
      } 
      // Otherwise, try the next value
      else {
        value++;
      }
    }
    // If no valid value was found and the limit was
    // reached, move back to the previous position
    if(!found) {
      board[row][column] = 0;
      i--;
    }
  }

  // A solution was found! Log it
 /* board.forEach(function(row) {
    console.log(row.join());
  });*/

  // return the solution
  return board;
};

var emptyPositions = saveEmptyPositions(board);
console.log(solvePuzzle(board, emptyPositions));
//console.log(saveEmptyPositions)
