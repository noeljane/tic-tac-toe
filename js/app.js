var board = document.querySelectorAll('.grid-unit');

function someFunction(){
	console.log(this);
}

for(i = 0; i < board.length; i ++) {
	board[i].addEventListener('click', someFunction);
}