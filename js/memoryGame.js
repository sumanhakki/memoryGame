var memory_array = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;
var counter = 0;


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

function newBoard() {
    tiles_flipped = 0;
    moves = 0;
    var output = '';
    document.getElementById("moves").innerHTML = 0;
    document.getElementById("myImg").innerHTML = " ";
    document.getElementById("theEnd").innerHTML = " ";
    document.getElementById("doit").innerHTML = " ";
    memory_array.memory_tile_shuffle();
    for (var i = 0; i < memory_array.length; i++) {
        output += '<div id="tile_' + i + '" onclick="countMoves(), memoryFlipTile(this,\'' + memory_array[i] + '\')"></div>';
    }
    document.getElementById('game_board').innerHTML = output;
}


var add = (function() {


    return function() {
        return counter += 1;
    }

})();

function countMoves() {
    document.getElementById("moves").innerHTML = add();

}

function reset() {
    counter = 0;
    document.getElementById("moves").innerHTML = 0;
    newBoard();
}

function displayStars(num) {
    var x = document.createElement("IMG");
    if (num > 65) {
        x.setAttribute("src", "star.svg");
    } else if (num >= 19 && num < 65) {
        x.setAttribute("src", "2star.svg");

    } else {
        x.setAttribute("src", "3star.svg")
    }

    document.getElementById("myImg").appendChild(x);

}

function gameOver() {
    var x = document.createTextNode(" GAME OVER");
    var t = document.createTextNode(" Click Restart to start over ");
    document.getElementById("theEnd").appendChild(x);
    document.getElementById("doit").appendChild(t);
}

var resetButton = document.getElementById("reset");
resetButton.addEventListener(newBoard());


window.addEventListener(newBoard());


function memoryFlipTile(tile, val) {


    if (tile.innerHTML == "" && memory_values.length < 2) {
        tile.style.background = '#FFF';
        tile.innerHTML = val;

        if (memory_values.length == 0) {
            memory_values.push(val);
            memory_tile_ids.push(tile.id);

        } else if (memory_values.length == 1) {
            memory_values.push(val);
            memory_tile_ids.push(tile.id);

            if (memory_values[0] == memory_values[1]) {
                tiles_flipped += 2;
                memory_values = [];
                memory_tile_ids = [];

                if (tiles_flipped == memory_array.length) {


                    displayStars(counter);
                    gameOver();



                }
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

                }

                setTimeout(flip2Back, 700);

            }
        }
    }
}