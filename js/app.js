//   - As a user, i want to be able to select a box within the grid with my chosen piece of either Noughts or Crosses
// * Element - buttonElements - target using tag name "button" or class ".button"
// * Event - click
// * Execution - getPlayerChoice()
//  > should take this button value and initialise this to a variable representing the player choice
//  > get the random computer choice 
//  >> create an array of available coihces from the squares available using a dynamic array? (unsure of current options to achieve this)
// >>assign computer choice (random index) to a variable named computerChoice

// - As a user, I want visual feedback on both my choices and those made by the computer as the game progresses, to know that my inputs have been registered.
// * Highlight the clicked button and place eiher a Nought or Cross inside
// > Predefine a class called highlight for when the button is clicked
// > Predefine a class called () for input of player/ computer choice
// > Optionally add a class for win or lose, highlighting the winning elements/ grids 
// >> optionally add another class called draw, for when neither player or computer has won and no choices remain 
// > On click of the button, add the appropriate classes 

// - As a user I want a clear indicator of what choices have been made so far, to best plan my next move.
// > requires a function named turn(X or O) to keep track of whose turn it is and to store the variables of previous turns
// >>these choices will need to remain until the game is complete, achieved by either player or computer winning the game or a draw once there are no choices left and neither have won 
// > 

// - As a user, I want an option to clear the board and play again
// Click a choice button to clear board and play again 
  
  
  



/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
]



/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;
let winner;
let tie;


/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.getElementById('message');
const resetBtnEl = document.getElementById('reset');
console.log(squareEls);
console.log(messageEl);


/*-------------------------------- Functions --------------------------------*/
init();

function init() {
    // console.log( 'init function called');
    board = ['', '', '', '', '', '', '',  '', ''];

    turn = 'X';

    winner = false;

    tie = false;

    resetHighlight();

    render ();

}

function render(){
   updateBoard();
   updateMessage();
}

function updateBoard() {
    board.forEach((value, index) => {
        const square = squareEls[index];
        square.textContent = value;
    });
}

function updateMessage() {
    if (winner) {
        messageEl.textContent = `${turn} wins!`;
    } else if (tie) {
        messageEl.textContent = `It's a tie!`;
    } else {
        messageEl.textContent = `It's ${turn}'s turn`;
    }
}


function handleClick (evt) {
const squareIndex = parseInt(evt.target.id);

if (board[squareIndex] !== '' || winner) return;

placePiece(squareIndex);
checkForWinner();
checkForTie();
switchPlayerTurn();
render();
}

function placePiece(index) {

    board[index] = turn;

}

function checkForWinner() {
    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            winner = true;
            highlightWinningCombo(combo);
            return;
        }
    }
    winner = false;
}

function checkForTie() {
if (winner) return;
tie= board.every(cell => cell !== '');
}


function switchPlayerTurn() {
if (winner) return;
turn = turn === 'X' ? 'O' : 'X';
}

function highlightWinningCombo(combo) {
    combo.forEach(square => {
        squareEls[square].classList.add('winning-square');
    })
}

function resetHighlight() {
    squareEls.forEach(square => {
        square.classList.remove('winning-square');
    });
}
/*----------------------------- Event Listeners -----------------------------*/
 
squareEls.forEach(square => {
    square.addEventListener('click', handleClick);
});

resetBtnEl.addEventListener('click', init);