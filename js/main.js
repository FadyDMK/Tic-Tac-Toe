var game = {
    gameBoard: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    player1: {
        name: "Harry Potter",
        token: 1,
        Score: 0,
    },


    player2: {
        name: "Master Chief",
        token: 2,
        Score: 0,

    },



    currentPlayer: null,

    cells: document.querySelectorAll('.cell'),
    scores: document.querySelector('.score'),
    message: document.querySelector('.message'),

    start: function () {
        this.currentPlayer = this.player1;
        // this.setNames();
        this.scores.textContent = `${this.player1.name} 0 - 0 ${this.player2.name}`
        this.bind();
    },

    //sets the player names
    setNames: function () {
        this.player1.name = prompt("Please enter the first player's name", "Harry Potter");
        this.player2.name = prompt("Please enter the second player's name", "Master Chief");
    },

    resetGame: function () {
        this.gameBoard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        this.cells.forEach((cell)=>{
            cell.textContent = '';
        })
    },

    checkWin: function () {
        for (i = 0; i < 3; i++) {
            if ((this.gameBoard[i][0] === this.gameBoard[i][1] && this.gameBoard[i][0] === this.gameBoard[i][2] && this.gameBoard[i][0] != 0)
                || (this.gameBoard[0][i] === this.gameBoard[1][i] && this.gameBoard[0][i] === this.gameBoard[2][i] && this.gameBoard[0][i] != 0)) { return true };
        }
        if ((this.gameBoard[0][0] === this.gameBoard[1][1] && this.gameBoard[0][0] === this.gameBoard[2][2] && this.gameBoard[0][0] != 0)
            || (this.gameBoard[0][2] === this.gameBoard[1][1] && this.gameBoard[0][2] === this.gameBoard[2][0] && this.gameBoard[2][0] != 0)) { return true; };


        return false;
    },
    checkStalemate: function () {

        if (!this.gameBoard[0].some(e => e === 0) && !this.gameBoard[1].some(e => e === 0) && !this.gameBoard[2].some(e => e === 0)) {
            return true
        }
        return false;
    },

    playRound: function () {
        if (this.checkWin()) {
            this.changeTurn();
            this.message.textContent = `${this.currentPlayer.name} wins`;
            this.currentPlayer.Score += 1;
            this.scores.textContent = `${this.player1.name} ${this.player1.Score} - ${this.player2.Score} ${this.player2.name}`;
            this.resetGame();
            this.bind();
        }
        if (this.checkStalemate()) {
            this.message.textContent = 'it\'s a draw ';
            this.resetGame();
            this.bind();
        }
    },

    //switches the player turn
    changeTurn: function () {
        if (this.currentPlayer === this.player1) { this.currentPlayer = this.player2; }
        else if (this.currentPlayer === this.player2) { this.currentPlayer = this.player1; }
    },


    //binds the divs to an event listener
    bind: function () {
        var text;
        var row;
        var column;

        this.cells.forEach((e) => {
            const onClick = myFunction.bind(this);
            function myFunction() {
                text = (this.currentPlayer === this.player1) ? 'X' : 'O';
                e.textContent = text;
                if (parseInt(e.dataset.rank) <= 3) { row = 0 }
                else if (parseInt(e.dataset.rank) >= 4 && parseInt(e.dataset.rank) <= 6) { row = 1 }
                else if (parseInt(e.dataset.rank) >= 7) { row = 2 }

                if ((parseInt(e.dataset.rank) - 1) % 3 === 0) { column = 0 }
                else if ((parseInt(e.dataset.rank) - 2) % 3 === 0) { column = 1 }
                else if ((parseInt(e.dataset.rank) - 3) % 3 === 0) { column = 2 };


                this.gameBoard[row][column] = this.currentPlayer.token;
                this.changeTurn();
                console.log(this.gameBoard);
                e.removeEventListener('click', onClick);
                this.playRound();
            }
            e.addEventListener('click', onClick);
        })

    },



};

game.start();