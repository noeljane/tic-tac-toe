//it's player 1's turn
var p1Turn = true;
var plays = 0;

var clearBtn = document.querySelector('#clear');

//build the board grid collection
var board = document.querySelectorAll('#board div');
var gridCount = board.length;

//square is played
function markPlayed(what,who) {
	what.p = who;
	what.className = 'played';
	what.className += who;

	console.log(what + " was played by " + what.p);
}

//Announce Winner
function getWinner() {
	//push moves to temporary array:
/*	var playArray = [];
	for(var i = 0; i < board.length; i ++) {
		if(board[i].classList.contains('p1')) {
			playArray.push('1');
		} else {
			playArray.push('2');
		}
	}*/
}



function checkForWinner() {
	if((board[0].p == board[1].p && board[0].p == board[2].p) || (board[3].p == board[4].p && board[3].p == board[5].p) || board[6].p == board[7].p && board[6].p == board[8].p) { //check rows
		console.log('WINNER!');
	} else if((board[0].p == board[3].p && board[0].p == board[6].p) || (board[1].p == board[4].p && board[1].p == board[7].p) || (board[2].p == board[5].p && board[2].p == board[8].p)) { //check columns
		console.log('WINNER!');
	} else if((board[0].p == board[4].p && board[0].p == board[8].p) || (board[2].p == board[4].p && board[2].p == board[6].p)) { //check diagonals
		console.log('WINNER!');
	}
}

//make a move
function playMove(){
	if(!this.classList.contains('played')){
		if(p1Turn) {
			this.innerHTML = "<i class='fa fa-times'></i>";
			p1Turn = false;
			markPlayed(this, ' p1');
		} else {
			this.innerHTML = "<i class='fa fa-circle-o'></i>";
			p1Turn = true;
			markPlayed(this, ' p2');
		}

		//add 1 to plays
		plays ++;

		//check if max 
		if(plays == gridCount){
			console.log("Game Over");
			getWinner();
		} else {
			//console.log(this.classList);
		}
	}

	checkForWinner();
}

function initBoard() {
	for(var i = 0; i < board.length; i ++) {
		board[i].className = "";
		board[i].innerHTML = "";

		//add click listeners to all squares:
		board[i].addEventListener('click', playMove);
		//make sure none of the board[i].p are equivalent:
		board[i].p = i;
		
	}
	plays = 0;
	p1Turn = true;
}

clearBtn.addEventListener('click', initBoard);
initBoard();

