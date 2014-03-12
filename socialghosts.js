/*jslint browser:true */

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

// score
var score = 0;
var scoreIncrement = 0.01;

//object images
var wallYellow = new Image();
wallYellow.src = 'http://thisiswhereiputmystuff.com/jonathan/GhostGame/wall1.png';
var wallRedBrick = new Image();
wallRedBrick.src = 'http://thisiswhereiputmystuff.com/jonathan/GhostGame/wall2.png';
var wallGray = new Image();
wallGray.src = 'http://thisiswhereiputmystuff.com/jonathan/GhostGame/wall3.png';
var floorImage = new Image();
floorImage.src = 'http://thisiswhereiputmystuff.com/jonathan/GhostGame/beam.png';
var ghostImage = new Image();
ghostImage.src = 'http://thisiswhereiputmystuff.com/jonathan/GhostGame/Ghost.png';
var vignette = new Image();
vignette.src = 'http://thisiswhereiputmystuff.com/jonathan/GhostGame/vignette.png';
var startImage = new Image();
startImage.src = 'http://thisiswhereiputmystuff.com/jonathan/GhostGame/StartButton.png';

//empty objects, you draw an image on their position
var ghost = {
    speed: 5,
    x: W / 2,
    y: H / 2
};

//movement listeners
var keysDown = {};
window.addEventListener('keydown', function (e) {
    keysDown[e.keyCode] = true;
});
window.addEventListener('keyup', function (e) {
    delete keysDown[e.keyCode];
});

function newRound() {
    if (gameState != "play") {
        document.getElementById("canvas").addEventListener("click", function () {
            gameState = "play";
            ghost.x = W / 2;
            ghost.y = H / 2;
            score = 0;
        }, false);
    }
}




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
    window.requestAnimationFrame(render);

    if (gameState == "start") {
        var startButton = {
            width: 100,
            height: 50,
            x: 100,
            y: 480
        };

        ctx.clearRect(0, 0, W, H);
        ctx.drawImage(wallGray, 0, ((wallYellow.height) + floorImage.height));
        ctx.drawImage(floorImage, 0, (wallYellow.height));
        ctx.drawImage(wallYellow, 0, 0);
        ctx.drawImage(startImage, startButton.x, startButton.y);
        ctx.drawImage(vignette, 0, 0);

        document.getElementById("canvas").addEventListener("click", function () {
            gameState = "play";
        }, false);

    }

    if (gameState == "play") {
        ctx.clearRect(0, 0, W, H);
        ctx.fillRect(0, 0, 600, 700);
        //pre-render before new walls
        ctx.drawImage(wallGray, 0, ((wallYellow.height) + floorImage.height) + Math.abs(vx));
        ctx.drawImage(floorImage, 0, (wallYellow.height) + Math.abs(vx));
        //start new walls
        ctx.drawImage(wallYellow, 0, -vx);
        ctx.drawImage(floorImage, 0, -(floorImage.height) + Math.abs(vx));
        ctx.drawImage(wallRedBrick, 0, -((wallYellow.height + floorImage.height) - Math.abs(vx)));
        ctx.drawImage(floorImage, 0, -((wallYellow.height + (floorImage.height * 2) - Math.abs(vx))));
        ctx.drawImage(wallGray, 0, -((wallRedBrick.height * 2) + (floorImage.height * 2) - Math.abs(vx)));
        ctx.drawImage(floorImage, 0, -((wallRedBrick.height + img.height + (floorImage.height * 3) - Math.abs(vx))));
        ctx.drawImage(wallYellow, 0, -((wallGray.height * 3) + (floorImage.height * 3) - Math.abs(vx)));

        //drawing an image at the location of empty object "ghost"
        ctx.drawImage(ghostImage, ghost.x, ghost.y);

        //Draw the score
        ctx.font = '25pt Helvetica';
        ctx.fillStyle = '#FFF';
        ctx.fillText('score: ' + Math.round(score), (W / 8), 50);

        //draw the vignette.  do this last so it appears on top!
        ctx.drawImage(vignette, 0, 0);

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
    }

    if (gameState == "lose") {
        ctx.clearRect(0, 0, W, H);
        ctx.drawImage(wallGray, 0, ((wallYellow.height) + floorImage.height));
        ctx.drawImage(floorImage, 0, (wallYellow.height));
        ctx.drawImage(wallYellow, 0, 0);
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

