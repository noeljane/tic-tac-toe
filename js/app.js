var gameName = 'Tic Tac Toe!';

var body = document.querySelector('body');
var h1 = document.querySelector('h1');
var board = document.querySelector('#board');

//generate divs
for(i = 0; i < 9; i ++){
	board.innerHTML += '<div></div>';
}


//create player objects, so that in the future, players can type in their names and make a name association in-game.
var player1 = {id: 'p1', name: 'Player 1'};
var player2 = {id: 'p2', name: 'Player 2'};

//html for "X" and "O" (from font-awesome icons)
var xMark = '<i class="fa fa-times"></i>';
var oMark = '<i class="fa fa-circle-o"></i>';

//start with player1's turn
var whoseTurn = player1;

//set clear button
var clearBtn = document.querySelector('#clear');

//build the board grid collection
var squares = document.querySelectorAll('#board div');
var gridCount = squares.length;

//square is played
function markPlayed(what,who) {
	what.p = who.id;
	what.className = 'played by ';
	what.className += who.id;
}

//lock the board
function lockBoard(){
	for(var i = 0; i < gridCount; i ++) {
		squares[i].removeEventListener('click', playMove);
	}
	clearBtn.className = 'cta';
}

//Announce Winner
function announceWinner(player) {
	//console.log(player + ' is the winner!');
	h1.innerText = (player + ' wins!');
	lockBoard();
}

//Announce Tie
function announceTie() {
	h1.innerText = ("Tie game!");
	lockBoard();
}

function checkForWinner() {
	//check rows
	if((squares[0].p == squares[1].p && squares[0].p == squares[2].p) || (squares[3].p == squares[4].p && squares[3].p == squares[5].p) || squares[6].p == squares[7].p && squares[6].p == squares[8].p) {
		announceWinner(whoseTurn.name);
	}
	//check columns
	else if((squares[0].p == squares[3].p && squares[0].p == squares[6].p) || (squares[1].p == squares[4].p && squares[1].p == squares[7].p) || (squares[2].p == squares[5].p && squares[2].p == squares[8].p)) {
		announceWinner(whoseTurn.name);
	}
	//check diagonals
	else if((squares[0].p == squares[4].p && squares[0].p == squares[8].p) || (squares[2].p == squares[4].p && squares[2].p == squares[6].p)) {
		announceWinner(whoseTurn.name);
	}
	//check cats cradle
	else if(plays == gridCount) {
		announceTie();
	}
}

//make a move
function playMove(){
	if(!this.classList.contains('played')){
		markPlayed(this, whoseTurn);
		//add 1 to number of plays:
		plays ++;
		checkForWinner();
		if(whoseTurn == player1) {
			this.innerHTML = xMark;
			whoseTurn = player2;
		} else {
			this.innerHTML = oMark;
			whoseTurn = player1;
		}
	}
}

//clear board, reset
function initTicTacToe() {
	for(var i = 0; i < gridCount; i ++) {
		//reset h1 to default gameName text:
		h1.innerText = gameName;
		//reset board and square classes to ""
		squares[i].className = "";
		squares[i].innerHTML = "";
		//stop animation class from clear button:
		clearBtn.className = "";
		//add click listeners to all squares:
		squares[i].addEventListener('click', playMove);
		//make sure none of the board[i].p are equivalent:
		squares[i].p = i;
	}
	plays = 0;
	whoseTurn = player1;

	clearBtn.addEventListener('click', initTicTacToe);
}

initTicTacToe();

function addPlayerName(){
	player1.name = inputPlayerName.value;
	console.log(player1.name);
}
var inputPlayerName = document.querySelector('#input-player-name');


var submitPlayerName = document.querySelector('#submit-player-name');
submitPlayerName.addEventListener('click',addPlayerName);
