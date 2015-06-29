var gameName = 'Tic Tac Toe!';

var body = document.querySelector('body');
var h1 = document.querySelector('h1');
var board = document.querySelector('#board');

//generate divs
for(i = 0; i < 9; i ++){
	board.innerHTML += '<div></div>';
}

//build the board grid collection
var squares = document.querySelectorAll('#board div');
var gridCount = squares.length;

//create player objects, with id and name properties.
var player1 = {id: 'p1', name: 'Player 1'};
var player2 = {id: 'p2', name: 'Player 2'};

//html for "X" and "O" (from font-awesome icons) assigned as properties of the player objects
player1.marker = '<i class="fa fa-times xmark"></i>';
player2.marker = '<i class="fa fa-circle-o omark"></i>';

//create empty winner / loser objects for use in announceWinner()
var winner = null;
var loser = null;


//start with player1's turn
var whoseTurn = player1;

//set clear button
var clearBtn = document.querySelector('#btn-clear-board');


//make a move
function playMove(){
	if(!this.classList.contains('played')){
		markPlayed(this, whoseTurn);
	}
	if(plays == 1) {
		clearBtn.addEventListener('click', initTicTacToe);
		clearBtn.className = 'btn-clear-active';
	}
}


//square is played
function markPlayed(what,who) {
	//assign the current player's id as the p property of the square that was just played
	what.p = who.id;

	//add HTML class accordingly
	what.className = 'played by ';
	what.className += who.id;

	//add an 'X' or 'O' to the square
	if(who == player1) {
		what.innerHTML = player1.marker;
	} else {
		what.innerHTML = player2.marker;
	}

	//add 1 to number of plays:
	plays ++;

	checkForWinner();
}



function checkForWinner() {
	//check rows for a winner
	if((squares[0].p == squares[1].p && squares[0].p == squares[2].p) || (squares[3].p == squares[4].p && squares[3].p == squares[5].p) || squares[6].p == squares[7].p && squares[6].p == squares[8].p) {
		announceWinner(whoseTurn);
	}
	//check columns for a winner
	else if((squares[0].p == squares[3].p && squares[0].p == squares[6].p) || (squares[1].p == squares[4].p && squares[1].p == squares[7].p) || (squares[2].p == squares[5].p && squares[2].p == squares[8].p)) {
		announceWinner(whoseTurn);
	}
	//check diagonals for a winner
	else if((squares[0].p == squares[4].p && squares[0].p == squares[8].p) || (squares[2].p == squares[4].p && squares[2].p == squares[6].p)) {
		announceWinner(whoseTurn);
	}
	//check for tie game
	else if(plays == gridCount) {
		announceTie();
	}
	//toggle player turn if the game should keep going
	else {
		if(whoseTurn == player1) {
			whoseTurn = player2;
		} else {
			whoseTurn = player1;
		}
	}
}

//Announce Winner
function announceWinner(player) {
	//Change #title to read winning player
	winner = player;
	h1.textContent = (winner.name + ' wins!');

	//set loser:
	if(winner == player1) {
		loser = player2;
	} else {
		loser = player1;
	}

	//Loop through square divs and attach winner/loser classes to each
	for(i = 0; i < squares.length; i ++) {
		if(squares[i].classList.contains(winner.id)){
			squares[i].firstChild.className += ' winner';
		} else if(squares[i].classList.contains(loser.id)) {
			squares[i].firstChild.className += ' loser';
		}
	}
	lockBoard();
}

//Announce Tie
function announceTie() {
	h1.textContent = ("Tie game!");
	lockBoard();
}

//Lock the board
function lockBoard(){
	for(var i = 0; i < gridCount; i ++) {
		squares[i].removeEventListener('click', playMove);
	}
	clearBtn.className = 'cta';
	board.className += 'locked';
}

//Clear board, reset
function initTicTacToe() {

	//reset h1 to default gameName text:
	h1.textContent = gameName;

	//remove 'locked' class:
	board.className = "";

	//stop animation class from clear button:
	clearBtn.className = "btn-clear-inactive";

	//reset board and square classes to ""
	for(var i = 0; i < gridCount; i ++) {
		squares[i].className = "";
		squares[i].innerHTML = "";
		//add click listeners to all squares:
		squares[i].addEventListener('click', playMove);
		//make sure none of the board[i].p are equivalent:
		squares[i].p = i;
	}

	//Reset play count, player turn to Player 1, and reset clear btn
	plays = 0;
	whoseTurn = player1;
}

initTicTacToe();
