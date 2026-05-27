var canvas, context, ball, player, timer, interval = 1000/60;
var frictionX = 1;
var frictionY = 1;
var gravity = 0.3;

var Score = 0;
var lives = 3; 

var d = false;
var a = false;
var w = false;

canvas = document.getElementById("canvas")
context = canvas.getContext("2d")

context.font = "bold 40px Arial"
context.fillStyle = "black" 

ball = new GameObject(canvas.width/2, 200, 40, 40, "#ff0000")

// Game objects
player = new GameObject( 180, 1300, 190, 40, "#000000")  
player2 = new GameObject( 830, 1300, 190, 40, "#000000") 
player3 = new GameObject( canvas.width/2 , 1500, 190, 20, "#000000")
player3.pivotx = -95

ball.vx = 10;
ball.vy = 0;

var pegs = [];

// Peg layout
var pegConfigs = 
    [
        { x: 350, y: 350, color: "#00ff00", points: 1, bounceForce: 8 },  
        { x: 500, y: 300, color: "#ff0000", points: 2, bounceForce: 13 }, 
        { x: 650, y: 350, color: "#00ff00", points: 1, bounceForce: 8 },  

        { x: 250, y: 550, color: "#ffff00", points: 3, bounceForce: 18 }, 
        { x: 500, y: 550, color: "#ffff00", points: 3, bounceForce: 18 }, 
        { x: 750, y: 550, color: "#ffff00", points: 3, bounceForce: 18 }, 

        { x: 200, y: 750, color: "#ff0000", points: 2, bounceForce: 13 }, 
        { x: 800, y: 750, color: "#ff0000", points: 2, bounceForce: 13 },

        { x: 380, y: 1100, color: "#00ff00", points: 1, bounceForce: 8 },
        { x: 620, y: 1100, color: "#00ff00", points: 1, bounceForce: 8 }
    ];

for (var i = 0; i < pegConfigs.length; i++) 
{
    var config = pegConfigs[i];
    var peg = new GameObject(config.x, config.y, 20, 20, config.color);
    
    peg.points = config.points;
    peg.bounceForce = config.bounceForce;
    
    pegs.push(peg);
}

function rand(low, high)
{
    return Math.random() * (high - low) + low;
}

timer = setInterval(animate, interval);

function animate()
{
    context.clearRect(0, 0, canvas.width, canvas.height);

    doHandleAcceleration();
    doApplyFriction();
    doHandleGravity();
    doUpdatePosition();
    doCheckBottomBounds();

    //inputs for players 
    if (w == true) 
    { 
        player3.color = "#00ff00"; 
    } 
    if (w == false) 
    { 
        player3.color = "#000000"; 
    } 

    if (a == true) 
    {
        player.color = "#00ff00";
        player.angle = 10;
    } 
    if (a == false) 
    {
        player.color = "#000000";
        player.angle = 80;
    } 

    if (d == true) 
    {
        player2.color = "#00ff00";
        player2.angle = 170;
    } 
    if (d == false) 
    {
        player2.color = "#000000";
        player2.angle = 100;
    } 

    // Ball movement and side wall collisions
    ball.move();
    if(ball.x > canvas.width - ball.width/2) 
    {
        ball.vx *= -1;
        ball.x = canvas.width - ball.width/2;
    }
    if (ball.x < 0 + ball.width/2) 
    {
        ball.vx *= -1;
        ball.x = 0 + ball.width/2;
    }

    //boundries for player
    player.move();
    if (player.x < canvas.width/2 - 400) 
    {
        player.x = canvas.width/2 - 400;
        if (player.vx < 0) player.vx = 0;
    }
    if (player.x > canvas.width/2 + 400) 
    {
        player.x = canvas.width/2 + 400;
        if (player.vx > 0) player.vx = 0;
    }
    
    function doHandleAcceleration() 
    {

    }

    // Paddle 1 physics and hitboxes
    if (a == true) 
    {
        player.width = 190 + 40;
        player.height = 40 + 30;
    }
    if (ball.collisionCheck(player)) 
    {
        if (a == true) 
        {
            ball.vy = -18;
            ball.vx = 9; 
        } 
    }
    player.width = 190;
    player.height = 40;

    // Paddle 2 physics and hitboxes
    if (d == true) 
    {
        player2.width = 190 + 40;
        player2.height = 40 + 30;
    }
    if (ball.collisionCheck(player2)) 
    {
        if (d == true) 
        {
            ball.vy = -18;
            ball.vx = -9; 
        } 
    }
    player2.width = 190;
    player2.height = 40;

    // Jump pad collision
    if (ball.collisionCheck(player3)) 
    {
        if (w == true) 
        {
            ball.vy = -24;       
            ball.vx = rand(-8, 8); 
        } 
    }

    //Peg collision
    for (var i = 0; i < pegs.length; i++) 
    {
        var currentPeg = pegs[i];

        if (ball.collisionCheck(currentPeg)) 
        {
            ball.vx *= -1;
            ball.vy *= -1;

            ball.vx += rand(-2, 2);

            var directionY = Math.sign(ball.vy) || -1; 
            var dynamicBounce = currentPeg.bounceForce + rand(-1.5, 1.5);
            ball.vy = directionY * dynamicBounce;

            Score += currentPeg.points;
            
            ball.x += ball.vx * 1.2;
            ball.y += ball.vy * 1.2;
        }
    }

    function doHandleGravity() 
    {
        ball.vy += gravity;
    }

    function doUpdatePosition() 
    {
        ball.x += ball.vx;
        ball.y += ball.vy;
    }

    // Bottom bounds and reset handler
    function doCheckBottomBounds() 
    {
        if (ball.y > canvas.height) 
        {
            lives--; 
            
            if (lives <= 0) 
            {
                clearInterval(timer); 
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.fillText("GAME OVER", canvas.width/2 - 120, canvas.height/2);
                context.fillText("Final Score: " + Score, canvas.width/2 - 120, canvas.height/2 + 60);
                return;
            } 
            else 
            {
                ball.x = canvas.width / 2;
                ball.y = 150; 
                ball.vx = rand(-5, 5); 
                ball.vy = 0;
            }
        }
    }

    function doApplyFriction() 
    {
        player.vx *= 0.93;
        ball.vx *= 0.991;
        ball.vy *= 0.991;
    }

    ball.drawCircle();
    
    player.drawRect();
    player.drawDebug();

    player2.drawRect();
    player2.drawDebug();
    
    player3.drawRect();
    player3.drawDebug();

    for (var i = 0; i < pegs.length; i++) 
    {
        pegs[i].drawCircle(); 
    }
    
    context.fillStyle = "black"; 
    context.fillText("Score: " + Score, 40, 60);
    context.fillText("Lives: " + lives, 40, 110); 
}