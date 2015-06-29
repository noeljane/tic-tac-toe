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


//create player objects, so that in the future, players can type in their names and make a name association in-game.
var player1 = {id: 'p1', name: 'Player 1'};
var player2 = {id: 'p2', name: 'Player 2'};

var winner = null;
var loser = null;

//html for "X" and "O" (from font-awesome icons)
var xMark = '<i class="fa fa-times xmark"></i>';
var oMark = '<i class="fa fa-circle-o omark"></i>';

//start with player1's turn
var whoseTurn = player1;
console.log(whoseTurn.name + "'s turn.");

//set clear button
var clearBtn = document.querySelector('#btn-clear-board');


//make a move
function playMove(){
	if(!this.classList.contains('played')){
		markPlayed(this, whoseTurn);
	}
}


//square is played
function markPlayed(what,who) {
	what.p = who.id;
	what.className = 'played by ';
	what.className += who.id;

	if(who == player1) {
		what.innerHTML = xMark;
	} else {
		what.innerHTML = oMark;
	}

	//add 1 to number of plays:
	plays ++;

	checkForWinner();
}



function checkForWinner() {
	//check rows
	if((squares[0].p == squares[1].p && squares[0].p == squares[2].p) || (squares[3].p == squares[4].p && squares[3].p == squares[5].p) || squares[6].p == squares[7].p && squares[6].p == squares[8].p) {
		announceWinner(whoseTurn);
	}
	//check columns
	else if((squares[0].p == squares[3].p && squares[0].p == squares[6].p) || (squares[1].p == squares[4].p && squares[1].p == squares[7].p) || (squares[2].p == squares[5].p && squares[2].p == squares[8].p)) {
		announceWinner(whoseTurn);
	}
	//check diagonals
	else if((squares[0].p == squares[4].p && squares[0].p == squares[8].p) || (squares[2].p == squares[4].p && squares[2].p == squares[6].p)) {
		announceWinner(whoseTurn);
	}
	//check cats cradle
	else if(plays == gridCount) {
		announceTie();
	}
	else {
		if(whoseTurn == player1) {
			whoseTurn = player2;
		} else {
			whoseTurn = player1;
		}
		console.log(whoseTurn.name + "'s turn.");
	}
}

//Announce Winner
function announceWinner(player) {
	winner = player;
	h1.textContent = (winner.name + ' wins!');

	//set loser:
	if(winner == player1) {
		loser = player2;
	} else {
		loser = player1;
	}

	for(i = 0; i < squares.length; i ++) {
		if(squares[i].classList.contains(winner.id)){
			squares[i].firstChild.className += ' winner';
			//console.log(squares[i].firstChild);
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




//lock the board
function lockBoard(){
	for(var i = 0; i < gridCount; i ++) {
		squares[i].removeEventListener('click', playMove);
	}
	clearBtn.className = 'cta';
	board.className += 'locked';
}

//clear board, reset
function initTicTacToe() {

	//reset h1 to default gameName text:
	h1.textContent = gameName;

	//remove 'locked' class:
	board.className = "";

	//stop animation class from clear button:
	clearBtn.className = "";

	for(var i = 0; i < gridCount; i ++) {
		//reset board and square classes to ""
		squares[i].className = "";
		squares[i].innerHTML = "";
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
