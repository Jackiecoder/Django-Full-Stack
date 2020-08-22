var player1 = prompt("Player One: Enter your name, you will be Blue");
var player1Color = 'rgb(86, 151, 255)';

var player2 = prompt("Player Two: Enter your name, you will be Red");
var player2Color = 'rgb(255, 0, 0)';

var game_on = true;
var table = $('table tr');


function reportWin(rowNum, colNum){
  console.log("You won start at this row, col");
  console.log(rowNum);
  console.log(colNum);
}

// change color
function changeColor(rowIndex, colIndex, color){
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css("background-color", color);
}
function reportColor(rowIndex, colIndex){
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css("background-color");
}

// check bottom
function checkBottom(colIndex){
  var colorReport = reportColor(5, colIndex);
  for (var row = 5; row > -1; row--){
    colorReport = reportColor(row, colIndex);
    if (colorReport === 'rgb(128, 128, 128)'){
      // check gray
      return row;
    }
  }
}

// check four connection
function colorMatchCheck(one, two, three, four){
  return (one === two && one === three && one === four && one !== 'rgb(128, 128, 128)' && one !== undefined);
}

function horizontalWinCheck(){
  for (var row = 0; row < 6; row++){
    for (var col = 0; col < 4; col++){
      botton1Color = reportColor(row, col);
      botton2Color = reportColor(row, col + 1);
      botton3Color = reportColor(row, col + 2);
      botton4Color = reportColor(row, col + 3);
      if (colorMatchCheck(botton1Color, botton2Color, botton3Color, botton4Color)){
        reportWin(row, col);
        return true;
      }else {
        continue;
      }
    }
  }
}

function verticalWinCheck(){
  for (var row = 0; row < 3; row++){
    for (var col = 0; col < 7; col++){
      botton1Color = reportColor(row, col);
      botton2Color = reportColor(row + 1, col);
      botton3Color = reportColor(row + 2, col);
      botton4Color = reportColor(row + 3, col);
      if (colorMatchCheck(botton1Color, botton2Color, botton3Color, botton4Color)){
        reportWin(row, col);
        return true;
      }else {
        continue;
      }
    }
  }
}

function diagonalWinCheck(){
  for (var row = 0; row < 3; row++){
    for (var col = 0; col < 4; col++){
      botton1Color = reportColor(row, col);
      botton2Color = reportColor(row + 1, col + 1);
      botton3Color = reportColor(row + 2, col + 2);
      botton4Color = reportColor(row + 3, col + 3);
      if (colorMatchCheck(botton1Color, botton2Color, botton3Color, botton4Color)){
        reportWin(row, col);
        return true;
      }else {
        continue;
      }
    }
  }
}

// Start with player 1
var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;

$('h3').text(currentName + " it is your turn, pick a column to drop in!")

$(".board button").on('click', function(){
  var col = $(this).closest('td').index();
  var bottomRow = checkBottom(col);
  changeColor(bottomRow, col, currentColor);
  if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()){
    $('h1').text(currentName + ", you have won!");
    $('h3').fadeOut('fast');
    $('h2').fadeOut('fast');
  }
  currentPlayer = currentPlayer * -1;
  if (currentPlayer === 1){
    currentName = player1;
    currentColor = player1Color;
  }else{
    currentName = player2;
    currentColor = player2Color;
  }
  $('h3').text(currentName + " it is your turn!")
})
