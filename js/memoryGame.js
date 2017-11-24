var memory_array = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;
var counter = 0;
var numOfStars = 3;
var timer_is_on = 0;
var myVar = 0;
var x = document.createElement("IMG");
//Shuffle cards
Array.prototype.memory_tile_shuffle = function() {
    var i = this.length,
        j, temp;
    while (--i > 0) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}
//Setup new game board and display cards
function newBoard() {
    tiles_flipped = 0;
    moves = 0;
    var output = '';


    document.getElementById("moves").innerHTML = 0;
    document.getElementById("myImg").innerHTML = " "
    document.getElementById("theEnd").innerHTML = " ";
    document.getElementById("startOver").innerHTML = " ";
    memory_array.memory_tile_shuffle();
    for (var i = 0; i < memory_array.length; i++) {
        output += '<div id="tile_' + i + '" onclick="memoryFlipTile(this,\'' + memory_array[i] + '\')"></div>';
    }
    document.getElementById('game_board').innerHTML = output;
    displayStars(numOfStars);

}



//Count moves
function countMoves() {
    document.getElementById("moves").innerHTML = add();

}

var add = (function() {


    return function() {
        counter++;
        return counter;
    }

})();

//Restart game
function reset() {
    counter = 0;
    document.getElementById("moves").innerHTML = 0;
    resetTime();
    newBoard();

}
//Check on how many moves are made and convert it to a score
function checkStars() {
    var currentStars;
    if (counter > 25) {
        currentStars = 1;
    } else if (counter >= 19 && counter < 25) {
        currentStars = 2;
    } else {
        currentStars = 3;
    }

    if (currentStars !== numOfStars) {
        displayStars(currentStars);
    }

}


//Display score
function displayStars(stars) {
    var num = stars;
    var x = document.createElement("IMG");
    document.getElementById("myImg").innerHTML = " ";
    if (num > 0 && num < 2) {
        x.setAttribute("src", "img/starLarge.svg");
    } else if (num > 1 && num < 3) {
        x.setAttribute("src", "img/2starLarge.svg");

    } else {
        x.setAttribute("src", "img/3starLarge.svg");

    }

    document.getElementById("myImg").appendChild(x);

}

//End game, display game over message and score
function gameOver() {
    var x = document.createTextNode(" GAME OVER");
    var t = document.createTextNode(" Click Restart to start over ");
    document.getElementById("theEnd").appendChild(x);
    document.getElementById("startOver").appendChild(t);
    stopCount();
    checkStars();
}


//Timer
function timedCount() {
    var startTime = new Date().getTime();
    myVar = setInterval(function() {

        var now = new Date().getTime();

        // Find the time elapsed between now and start
        var elapsed = now - startTime;

        // Calculate minutes and seconds
        let minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((elapsed % (1000 * 60)) / 1000);

        // Add starting 0 if seconds < 10
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        var currentTime = minutes + ':' + seconds;
        document.getElementById("clock").innerHTML = currentTime;
    }, 1000);
}

//Start timer
function startTimer() {
    if (!timer_is_on) {
        timer_is_on = 1;
        timedCount();

    }

}

//Stop timer
function stopCount() {
    clearInterval(myVar);
}

//Reset timer
function resetTime() {
    var currentTime = "0:00";
    document.getElementById("clock").innerHTML = currentTime;
    clearInterval(myVar);
    myVar = 0;
    timer_is_on = 0;

}
//New game board when page loaded
window.addEventListener(newBoard());

//Flip tiles and look for a match
function memoryFlipTile(tile, val) {
    //Start timer when the first tile is flipped
    startTimer();
    //As long as no more than 2 cards are flipped, show value of cards
    if (tile.innerHTML == "" && memory_values.length < 2) {
        tile.style.background = '#FFF';
        tile.innerHTML = val;

        if (memory_values.length == 0) {
            memory_values.push(val);
            memory_tile_ids.push(tile.id);

        } else if (memory_values.length == 1) {
            memory_values.push(val);
            memory_tile_ids.push(tile.id);
            //If a match don't flipp back and show value, count moves and display current score
            if (memory_values[0] == memory_values[1]) {
                tiles_flipped += 2;
                memory_values = [];
                memory_tile_ids = [];
                countMoves();
                checkStars();
                //All tiles flipped, end game and display score
                if (tiles_flipped == memory_array.length) {


                    checkStars();
                    gameOver();



                }
                //No match flip tiles over, calculate moves and show current score
            } else {
                function flip2Back() {
                    var tile_1 = document.getElementById(memory_tile_ids[0]);
                    var tile_2 = document.getElementById(memory_tile_ids[1]);

                    tile_1.style.background = '#2e3d49 no-repeat';
                    tile_1.innerHTML = "";
                    tile_2.style.background = '#2e3d49 no-repeat';
                    tile_2.innerHTML = "";
                    memory_values = [];
                    memory_tile_ids = [];
                    countMoves();
                    checkStars();

                }

                setTimeout(flip2Back, 700);

            }
        }
    }
}