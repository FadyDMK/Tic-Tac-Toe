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

    start: function () {
        this.setNames();
        this.render();
        this.currentPlayer = this.player1;
        this.playRound();
    },

    //sets the player names
    setNames: function () {
        this.player1.name = prompt("Please enter the first player's name", "Harry Potter");
        this.player2.name = prompt("Please enter the second player's name", "Master Chief");
    },

    //renders the game board
    render: function () {
        this.gameBoard.forEach((array) => {
            console.log(array);
            console.log("\n");
        })
    },

    playTurn: function () {
        var choice = this.getChoice();
        let row;
        let column = parseInt(choice[1]) - 1;

        switch (choice[0].toUpperCase()) {
            case 'A':
                row = 0;
                break;
            case 'B':
                row = 1;
                break;
            case 'C':
                row = 2;
                break;
        }


        while (this.gameBoard[row][column] != 0) {
            console.log('invalid input, choose an empty cell!');
            this.playTurn();
        }

        this.gameBoard[row][column] = this.currentPlayer.token;
        this.render();
    },


    getChoice: function () {
        while (true) {
            var choice = prompt(`${this.currentPlayer.name} ,choose a row(A,B or C) and column(1,2 or 3), e.g: A1: `);
            if (['A', 'B', 'C'].includes(choice[0].toUpperCase()) && ['1', '2', '3'].includes(choice[1])) break;
        }
        return choice;

    },
    resetGame: function () {
        this.gameBoard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    },

    checkWin: function () {
        for (i = 0; i < 3; i++) {
            if ((this.gameBoard[i][0] === this.gameBoard[i][1] && this.gameBoard[i][0] === this.gameBoard[i][2] && this.gameBoard[i][0] !=0)
                || (this.gameBoard[0][i] === this.gameBoard[1][i] && this.gameBoard[0][i] === this.gameBoard[2][i] && this.gameBoard[0][i] !=0)) { return true };
        }
        if ((this.gameBoard[0][0] === this.gameBoard[1][1] && this.gameBoard[0][0] === this.gameBoard[2][2] && this.gameBoard[0][0] !=0)
            || (this.gameBoard[0][2] === this.gameBoard[1][1] && this.gameBoard[0][2] === this.gameBoard[2][0]&& this.gameBoard[2][0] !=0)) { return true; };


        return false;
    },
    checkStalemate: function () {

        if (!this.gameBoard[0].some(e => e === 0) && !this.gameBoard[1].some(e => e === 0) && !this.gameBoard[2].some(e => e === 0)) {
            return true
        }
        return false;
    },

    playRound: function () {
        while (!this.checkWin() && !this.checkStalemate()) {
            this.playTurn();
            this.changeTurn();
        }
        if (this.checkWin()) {
            this.changeTurn();
            console.log(`${this.currentPlayer.name} wins`);
            this.currentPlayer.Score +=1;
            this.resetGame();
        }
        if (this.checkStalemate()) {
            console.log('it\'s a draw ');
            this.resetGame();
        }
    },
    changeTurn: function () {
        if (this.currentPlayer === this.player1) { this.currentPlayer = this.player2; }
        else if (this.currentPlayer === this.player2) { this.currentPlayer = this.player1; }
    }



};

game.start();