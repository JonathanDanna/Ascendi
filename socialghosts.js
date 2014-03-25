var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var W = canvas.width;
var H = canvas.height;

var gameState = "start";

//bg velocity
var vx = 0;
var newGhostSpeed = 2;

//top scores
var score1 = 0;
var score2 = 0;
var score3 = 0;
var scoreCounter = 0;
var scoreIncrement = 0.01;

// score
score = 0;

//object images
var orangeWall = new Image();
orangeWall.src = 'http://thisiswhereiputmystuff.com/jonathan/GhostGame/wall1.png';
var redWall = new Image();
redWall.src = 'http://thisiswhereiputmystuff.com/jonathan/GhostGame/wall2.png';
var grayWall = new Image();
grayWall.src = 'http://thisiswhereiputmystuff.com/jonathan/GhostGame/wall3.png';


var floorImage = new Image();
floorImage.src = floorImageRand();
var floor1Image = new Image();
floor1Image.src = floorImageRand();
var floor2Image = new Image();
floor2Image.src = floorImageRand();
var floor3Image = new Image();
floor3Image.src = floorImageRand();

var ghostImage = new Image();
ghostImage.src = 'http://thisiswhereiputmystuff.com/jonathan/GhostGame/Ghost.png';
var vignette = new Image();
vignette.src = 'http://thisiswhereiputmystuff.com/jonathan/GhostGame/vignette.png';
var startImage = new Image();
startImage.src = 'http://thisiswhereiputmystuff.com/jonathan/GhostGame/StartButton.png';
var chairImage = new Image();
chairImage.src = 'http://thisiswhereiputmystuff.com/jonathan/GhostGame/chair.png';
var gooImage = new Image();
gooImage.src = 'http://thisiswhereiputmystuff.com/jonathan/GhostGame/ghostGoo.png';

//empty objects, you draw an image on their position
var ghost = {
    speed: 5,
    x: W / 2,
    y: H / 2,
};

function floorImageRand() {
    var floorSwitcher = Math.floor(Math.random() * 5);
    var newFloorImage;
    switch (floorSwitcher) {
    case 1:
        newFloorImage = 'http://thisiswhereiputmystuff.com/jonathan/GhostGame/beam1Block.png';
        break;
    case 2:
        newFloorImage = 'http://thisiswhereiputmystuff.com/jonathan/GhostGame/beam2Blocks.png';
        break;
    case 3:
        newFloorImage = 'http://thisiswhereiputmystuff.com/jonathan/GhostGame/beam3Blocks.png';
        break;
    case 4:
        newFloorImage = 'http://thisiswhereiputmystuff.com/jonathan/GhostGame/beam.png';
        break;
    }
    return newFloorImage;
}


//movement listeners
var keysDown = {};
window.addEventListener('keydown', function (e) {
    keysDown[e.keyCode] = true;
});
window.addEventListener('keyup', function (e) {
    delete keysDown[e.keyCode];
});


function update() {
    if (ghost.x < 0) {
        ghost.x = 0;
    }
    if (ghost.x + ghostImage.width >= canvas.width) {
        ghost.x = canvas.width - ghostImage.width;
    }
    if (ghost.y < 0) {
        ghost.y = 0;
    }
    if (ghost.y + (ghostImage.height / 2) >= canvas.height) {
        //this is where the lose scenario goes
        ghost.y = canvas.height - (ghostImage.height / 2);
        scoreCounter++;
        gameState = "lose";
        ghost.x = W / 2;
        ghost.y = H / 2;
    }
    if (gameState == "play") {
        score += scoreIncrement;
    }
}

function render() {

    if (gameState == "start") {
        var startButton = {
            width: 100,
            height: 50,
            x: 100,
            y: 480,
        }

        ctx.clearRect(0, 0, W, H);
        ctx.drawImage(grayWall, 0, ((orangeWall.height) + floorImage.height));
        ctx.drawImage(floor1Image, 0, (orangeWall.height));
        ctx.drawImage(orangeWall, 0, 0);
        ctx.drawImage(startImage, startButton.x, startButton.y);
        ctx.drawImage(vignette, 0, 0);

        document.getElementById("canvas").addEventListener("click", function () {
            gameState = "play";
        }, false);

    }

    if (gameState == "play") {
        ctx.clearRect(0, 0, W, H);
        ctx.fillRect(0, 0, 600, 700);

        var wall = {
            height: 450,
            width: 600
        }

        var floor = {
            height: 38,
            width: 600
        }

        var firstFloor = {
            x: 0,
            y: (wall.height) + Math.abs(vx)
        }

        var secondFloor = {
            x: 0,
            y: -(floor.height) + Math.abs(vx)
        }

        var thirdFloor = {
            x: 0,
            y: -((wall.height + (floor.height * 2) - Math.abs(vx)))
        }

        var fourthFloor = {
            x: 0,
            y: -(((wall.height * 2) + (floor.height * 3) - Math.abs(vx)))
        }

        //pre-render before new walls
        ctx.drawImage(grayWall, 0, ((orangeWall.height) + floorImage.height) + Math.abs(vx));
        ctx.drawImage(floor1Image, 0, firstFloor.y);
        //start new walls
        ctx.drawImage(orangeWall, 0, -vx);;
        ctx.drawImage(floor2Image, 0, secondFloor.y);
        ctx.drawImage(redWall, 0, -((orangeWall.height + floorImage.height) - Math.abs(vx)));
        ctx.drawImage(floor3Image, 0, thirdFloor.y);
        ctx.drawImage(grayWall, 0, -((redWall.height * 2) + (floorImage.height * 2) - Math.abs(vx)));
        ctx.drawImage(floor1Image, 0, fourthFloor.y);
        ctx.drawImage(orangeWall, 0, -((grayWall.height * 3) + (floorImage.height * 3) - Math.abs(vx)));

        //drawing an image at the location of empty object "ghost"
        ctx.drawImage(ghostImage, ghost.x, ghost.y);

        //Draw the score
        ctx.font = '25pt Helvetica';
        ctx.fillStyle = '#FFF';
        ctx.fillText('score: ' + Math.round(score), (W / 8), 50);

        //draw the vignette.  do this last so it appears on top!
        ctx.drawImage(vignette, 0, 0);

        if (Math.abs(vx) > ((orangeWall.height * 3) + (floorImage.height * 3))) {
            vx = 0;
        }

        vx -= Math.round(score) / 2;
        newGhostSpeed = Math.round(score) / 2;


        //Ghost movements
        if (newGhostSpeed > 3) {
            if (37 in keysDown) {
                ghost.x -= (newGhostSpeed * 1.5);
            }
            if (38 in keysDown) {
                ghost.y -= (newGhostSpeed * 1.5);
            }
            if (39 in keysDown) {
                ghost.x += (newGhostSpeed * 1.5);
            }
            if (40 in keysDown) {
                ghost.y += (newGhostSpeed * 1.5);
            } else {
                //default ghost velocity
                ghost.y = ghost.y + newGhostSpeed;
            }
        } else {
            if (37 in keysDown) {
                ghost.x -= 5;
            }
            if (38 in keysDown) {
                ghost.y -= 5;
            }
            if (39 in keysDown) {
                ghost.x += 5;
            }
            if (40 in keysDown) {
                ghost.y += 5;
            } else {
                //default ghost velocity
                ghost.y = ghost.y + newGhostSpeed;
            }
        }
    }

    if (gameState == "lose") {
        ctx.clearRect(0, 0, W, H);
        ctx.drawImage(grayWall, 0, ((orangeWall.height) + floorImage.height));
        ctx.drawImage(floorImage, 0, (orangeWall.height));
        ctx.drawImage(orangeWall, 0, 0);
        ctx.drawImage(vignette, 0, 0);


        if (scoreCounter == 1) {
            score1 = Math.round(score);
            newRound();
        }
        if (scoreCounter == 2) {
            score2 = Math.round(score);
            newRound();
        }
        if (scoreCounter == 3) {
            score3 = Math.round(score);
            newRound();
        }
        if (scoreCounter > 3) {
            score1 = 0;
            score2 = 0;
            score3 = 0;
            scoreCounter = 1;
            newRound();
        }



        ctx.font = '25pt Helvetica';
        ctx.fillStyle = '#FFF';
        ctx.fillText("Score 1:  " + Math.round(score1), (W / 3), 100);
        ctx.fillText("Score 2:  " + Math.round(score2), (W / 3), 200);
        ctx.fillText("Score 3:  " + Math.round(score3), (W / 3), 300);
    }
}

function newRound() {
    if (gameState != "play") {
        document.getElementById("canvas").addEventListener("click", function () {
            gameState = "play";
            ghost.x = W / 2;
            ghost.y = H / 2;
            score = 0;
            vx = 0;
        }, false);
    }
}


function run() {
    update((Date.now() - time) / 1000);
    render((Date.now() - time) / 1000);
    time = Date.now();
}

var time = Date.now();
setInterval(run, 10);