$(document).ready(function () {
    //canvas variables
    var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');
    var canW = canvas.width;
    var canH = canvas.height;

    var gameState = "start";

    //score counting
    var score = 0;
    var score1 = 0;
    var score2 = 0;
    var score3 = 0;
    var scoreCounter = 0;
    var scoreIncrement = 0.005;

    var movingFloor = -((canH) + (canH / 2));
    var movingFloor2 = -(canH);
    var velocity = 300;
    var delta = 0;
    var lastTime = (new Date()).getTime();
    var currentTime = 0;
    var speedCap = 900;

    var pos1 = canW / 4;
    var pos2 = canW / 2;
    var pos3 = (canW / 4) * 3;

    //extra variables for the cloud background
    var scrollSpeed = 0;

    //images are drawn onto the location of these variables.
    var ghost = {
        x: pos2,
        y: pos1,
    }
    var floor1 = {
        x: 0,
        y: -50
    }
    var floor2 = {
        x: 0,
        y: -50
    }
    var floor3 = {
        x: 0,
        y: -50
    }
    var floor4 = {
        x: 0,
        y: -50
    }
    var floor5 = {
        x: 0,
        y: -50
    }
    var floor6 = {
        x: 0,
        y: -50
    }
    var floor7 = {
        x: 0,
        y: -50
    }
    var floor8 = {
        x: 0,
        y: -50
    }
    var line = {
        x: 446,
        y: 0
    }

    //seed the variables with a random number.
    var floorSwitcher = Math.floor(Math.random() * 5);
    var floorSwitcher2 = Math.floor(Math.random() * 5);

    //object images
    var orangeWall = new Image();
    orangeWall.src = 'images/wall1.png';
    var redWall = new Image();
    redWall.src = 'images/wall2.png';
    var grayWall = new Image();
    grayWall.src = 'images/wall3.png';

    var floor1Image = new Image();
    floor1Image.src = 'images/cloud1.png';
    var floor2Image = new Image();
    floor2Image.src = 'images/cloud2.png';
    var floor3Image = new Image();
    floor3Image.src = 'images/cloud3.png';
    var floor4Image = new Image();
    floor4Image.src = 'images/cloud4.png';

    var ghostImage = new Image();
    ghostImage.src = 'images/Ghostbird.png';
    var ghostUp = new Image();
    ghostUp.src = 'images/GhostBird_up.png';
    var ghostLeft = new Image();
    ghostLeft.src = 'images/GhostBird_left.png';
    var ghostRight = new Image();
    ghostRight.src = 'images/GhostBird_right.png';
    var vignette = new Image();
    vignette.src = 'images/vignette_new.png';
    var startImage = new Image();
    startImage.src = 'images/StartButton.png';

    var lineImage = new Image();
    lineImage.src = 'images/line.png';

    var background = new Image();
    background.src = 'images/cloudBkrnd.png';

    //movement listeners
    var keysDown = {};
    window.addEventListener('keydown', function (e) {
        keysDown[e.keyCode] = true;
    });
    window.addEventListener('keyup', function (e) {
        delete keysDown[e.keyCode];
    });

    function render() {
        if (gameState == "start") {
            /*var startButton = {
                width: 100,
                height: 50,
                x: 100,
                y: 480,
            }*/

            ctx.fillStyle = '#B8B8B8';
            ctx.clearRect(0, 0, canW, canH);
            ctx.fillRect(0, 0, canW, canH);
            ctx.fillStyle = 'eeeeee';
            ctx.strokeStyle = 'black';
            ctx.font = 'bold 80px helvetica';
            ctx.fillText('Ascendi', (canW / 4), (canH / 4));
            ctx.strokeText('Ascendi', (canW / 4), (canH / 4));
            ctx.drawImage(background, scrollSpeed, 0);
            ctx.drawImage(background, background.width - Math.abs(scrollSpeed), 0);
            ctx.font = 'bold 30px helvetica';
            ctx.fillText('ENTER or SPACE to start', (canW / 5), (canH - 160));
            ctx.strokeText('ENTER or SPACE to start', (canW / 5), (canH - 160));
            ctx.fillText('WASD or ARROW KEYS to move', (canW / 8), (canH - 100));
            ctx.strokeText('WASD or ARROW KEYS to move', (canW / 8), (canH - 100));
            //ctx.drawImage(startImage, startButton.x, startButton.y);
            ctx.drawImage(vignette, 0, 0);

            //enter key or space starts the game
            if ((13 in keysDown) || (32 in keysDown)) {
                newRound();
            }
        }

        if (gameState == "play") {
            currentTime = (new Date()).getTime();
            delta = (currentTime - lastTime) / 1000;


            ctx.clearRect(0, 0, canW, canH);
            ctx.fillStyle = '#B8B8B8';
            ctx.fillRect(0, 0, canW, canH);

            ctx.drawImage(background, scrollSpeed, 0);
            ctx.drawImage(background, background.width - Math.abs(scrollSpeed), 0);

            //draw the vignette.
            ctx.drawImage(vignette, 0, 0);

            //draw the floors in a static location. floorX.y will be changed by the switches.
            ctx.drawImage(floor1Image, floor1.x, floor1.y);
            ctx.drawImage(floor2Image, floor2.x, floor2.y);
            ctx.drawImage(floor3Image, floor3.x, floor3.y);
            ctx.drawImage(floor4Image, floor4.x, floor4.y);
            ctx.drawImage(floor1Image, floor5.x, floor5.y);
            ctx.drawImage(floor2Image, floor6.x, floor6.y);
            ctx.drawImage(floor3Image, floor7.x, floor7.y);
            ctx.drawImage(floor4Image, floor8.x, floor8.y);

            //switches to change which floor is being used based on the random variables.
            switch (floorSwitcher) {
            case 1:
                floor1.y = movingFloor;
                break;
            case 2:
                floor2.y = movingFloor;
                break;
            case 3:
                floor3.y = movingFloor;
                break;
            case 4:
                floor4.y = movingFloor;
                break;
            case 5:
                floor1.y = movingFloor;
                break;
            }
            switch (floorSwitcher2) {
            case 1:
                floor5.y = movingFloor2;
                break;
            case 2:
                floor6.y = movingFloor2;
                break;
            case 3:
                floor7.y = movingFloor2;
                break;
            case 4:
                floor8.y = movingFloor2;
                break;
            case 5:
                floor5.y = movingFloor2;
                break;
            }

            //choose new random variables and reset the floor positions to the top.
            if (movingFloor >= canH) {
                floorSwitcher = Math.floor(Math.random() * 5);
                movingFloor = -floor1Image.height;
            }
            if (movingFloor2 >= canH) {
                floorSwitcher2 = Math.floor(Math.random() * 5);
                movingFloor2 = -floor1Image.height;
            }

            //speed controls
            if (score < 20) {
                movingFloor += (velocity * delta) / 2;
                movingFloor2 += (velocity * delta) / 2;
                console.log("slow");
            } else if ((score > 20) && (score < 30)) {
                movingFloor += (velocity * delta) / 1.8;
                movingFloor2 += (velocity * delta) / 1.8;
                console.log("medium");
            } else if ((score > 30) && (score < 50)) {
                movingFloor += (velocity * delta) / 1.6;
                movingFloor2 += (velocity * delta) / 1.6;
                console.log("fast");
            } else if (score > 50) {
                movingFloor += (velocity * delta) / 1.4;
                movingFloor2 += (velocity * delta) / 1.4;
                console.log("fastest");
            }

            //speed cap
            velocity += (Math.floor(Math.round(score) * delta)) + .1;
            if (velocity >= speedCap) {
                velocity = speedCap;
            }


            /*ctx.drawImage(lineImage, pos1, line.y);
                ctx.drawImage(lineImage, pos2, line.y);
                ctx.drawImage(lineImage, pos3, line.y);*/

            //debugging text displays with fancy fonts
            ctx.font = '25pt Helvetica';
            ctx.fillStyle = '#000';
            //ctx.fillText('ghost.x: ' + Math.floor(Math.round(ghost.x)), (canW / 4), 150);
            ctx.fillText('score: ' + Math.round(score), (canW / 8), 50);
            //ctx.fillText('velocity: ' + Math.floor(Math.round(velocity)), (canW / 2), 200);
            ctx.fillStyle = '#B8B8B8';

            if ((38 in keysDown) || (87 in keysDown)) {
                //drawing an image at the location of empty object "ghost"
                ctx.drawImage(ghostUp, ghost.x, ghost.y);
            } else if ((37 in keysDown) || (65 in keysDown)) {
                ctx.drawImage(ghostLeft, ghost.x, ghost.y);
            } else if ((39 in keysDown) || (68 in keysDown)) {
                ctx.drawImage(ghostRight, ghost.x, ghost.y);
            } else {
                //drawing an image at the location of empty object "ghost"
                ctx.drawImage(ghostImage, ghost.x, ghost.y);
            }

            //Ghost movements
            //A or left arrow
            if ((37 in keysDown) || (65 in keysDown)) {
                ghost.x -= (velocity * delta) * 1.2;
            }
            //W or up arrow
            if ((38 in keysDown) || (87 in keysDown)) {
                if (((ghost.y < (floor1.y + floor1Image.height) && (ghost.y > floor1.y) && (ghost.x > pos1)) || (ghost.y < (floor5.y + floor1Image.height) && (ghost.y > floor5.y)) && (ghost.x > pos1)) || (((ghost.y < (floor2.y + floor1Image.height) && (ghost.y > floor2.y)) && (ghost.x > pos2)) || (ghost.y < (floor2.y + floor1Image.height) && (ghost.y > floor2.y)) && (ghost.x < pos1) || ((ghost.y < (floor6.y + floor1Image.height) && (ghost.y > floor6.y)) && (ghost.x > pos2)) || (ghost.y < (floor6.y + floor1Image.height) && (ghost.y > floor6.y)) && (ghost.x < pos1)) || (((ghost.y < (floor3.y + floor1Image.height) && (ghost.y > floor3.y)) && (ghost.x > pos3)) || (ghost.y < (floor3.y + floor1Image.height) && (ghost.y > floor3.y)) && (ghost.x < pos2) || ((ghost.y < (floor7.y + floor1Image.height) && (ghost.y > floor7.y)) && (ghost.x > pos3)) || (ghost.y < (floor7.y + floor1Image.height) && (ghost.y > floor7.y)) && (ghost.x < pos2)) || ((ghost.y < (floor4.y + floor1Image.height) && (ghost.y > floor4.y) && (ghost.x < pos3)) || (ghost.y < (floor8.y + floor1Image.height) && (ghost.y > floor8.y)) && (ghost.x < pos3))) {
                    //ctx.fillStyle = 'red';
                    // ctx.fillText("collided", 100, 100);
                } else {
                    ghost.y -= (velocity * delta) * 1.2;
                }
            }
            //D or right arrow
            if ((39 in keysDown) || (68 in keysDown)) {
                ghost.x += (velocity * delta) * 1.2;
            }
            //S or down arrow
            if ((40 in keysDown) || (83 in keysDown)) {
                ghost.y += (velocity * delta) * 1.4;
            } else {
                if (((ghost.y < (floor1.y + floor1Image.height) && (ghost.y > floor1.y) && (ghost.x > pos1)) || (ghost.y < (floor5.y + floor1Image.height) && (ghost.y > floor5.y)) && (ghost.x > pos1)) || (((ghost.y < (floor2.y + floor1Image.height) && (ghost.y > floor2.y)) && (ghost.x > pos2)) || (ghost.y < (floor2.y + floor1Image.height) && (ghost.y > floor2.y)) && (ghost.x < pos1) || ((ghost.y < (floor6.y + floor1Image.height) && (ghost.y > floor6.y)) && (ghost.x > pos2)) || (ghost.y < (floor6.y + floor1Image.height) && (ghost.y > floor6.y)) && (ghost.x < pos1)) || (((ghost.y < (floor3.y + floor1Image.height) && (ghost.y > floor3.y)) && (ghost.x > pos3)) || (ghost.y < (floor3.y + floor1Image.height) && (ghost.y > floor3.y)) && (ghost.x < pos2) || ((ghost.y < (floor7.y + floor1Image.height) && (ghost.y > floor7.y)) && (ghost.x > pos3)) || (ghost.y < (floor7.y + floor1Image.height) && (ghost.y > floor7.y)) && (ghost.x < pos2)) || ((ghost.y < (floor4.y + floor1Image.height) && (ghost.y > floor4.y) && (ghost.x < pos3)) || (ghost.y < (floor8.y + floor1Image.height) && (ghost.y > floor8.y)) && (ghost.x < pos3))) {
                    ghost.y += (velocity * delta) * 1.2;
                    // ctx.fillStyle = 'red';
                    //ctx.fillText("collided", 100, 100);
                }
            }

            //colissions with boundaries of canvas
            if (ghost.x < 0) {
                ghost.x = 0;
            }
            if (ghost.x + ghostImage.width >= canW) {
                ghost.x = canW - ghostImage.width;
            }
            if (ghost.y < 0) {
                ghost.y = 0;
            }
            if (ghost.y + (ghostImage.height / 2) >= canvas.height) {
                //this is where the lose scenario goes
                ghost.y = canvas.height - (ghostImage.height / 2);
                scoreCounter++;
                gameState = "lose";
                ghost.x = canW / 2;
                ghost.y = canH / 4;
                velocity = 300;
                movingFloor = -((canH * 2) + (canH / 2));
                movingFloor2 = -(canH * 3);
            }

            /*if (movingFloor == movingFloor2) {
                ctx.fillStyle = '#000';
                ctx.fillText("TIME TO DIE", (canW / 3), movingFloor + 100);
            }*/

            score += scoreIncrement;
            lastTime = currentTime;
            ctx.fillStyle = '#fff';
        }

        if (gameState == "lose") {
            ctx.clearRect(0, 0, canW, canH);
            ctx.fillStyle = '#B8B8B8';
            ctx.fillRect(0, 0, canW, canH);
            ctx.drawImage(background, scrollSpeed, 0);
            ctx.drawImage(background, background.width - Math.abs(scrollSpeed), 0);
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
            ctx.fillStyle = '#fff';
            ctx.fillText("Score 1:  " + Math.round(score1), (canW / 3), 100);
            ctx.fillText("Score 2:  " + Math.round(score2), (canW / 3), 200);
            ctx.fillText("Score 3:  " + Math.round(score3), (canW / 3), 300);

            ctx.font = '15pt Helvetica';
            ctx.fillStyle = '#333';
            ctx.fillText("Credits: ", (canW / 2) - 50, 500);
            ctx.fillText("Jonathan Danna: Programming, Concept & Final graphics", (canW / 10), 525);
            ctx.fillText("Bryan Beasman, Paul Singh, Nick Hurley:", (canW / 10), 550);
            ctx.fillText("Concept & Concept Art", (canW / 3), 575);
        }

        if (Math.abs(scrollSpeed) > background.width) {
            scrollSpeed = 0;
        }
        scrollSpeed -= .2;
    }

    function newRound() {
        if (gameState != "play") {
            // enter or space
            if ((13 in keysDown) || (32 in keysDown)) {
                gameState = "play";
                ghost.x = canW / 2;
                ghost.y = canH / 4;
                score = 0;
                velocity = 300;
            }
        }
    }

    setInterval(render, 1);
    render();
});