var renderer; // The game renderer
var stage; // The root container that holds the scene
var mainChar; // The main character sprite
var xScreenBound; // The x bound for the main char
var yScreenBound; // The y bound for the main char

// Initializes variables
function init() {
    // Initialize the renderer and the stage
    setupRendererAndStage();

    // Initialize the main char
    setupMainChar();

    // Start the game loop
    gameLoop();
}

// Sets up the renderer and the stage
function setupRendererAndStage() {
    // Initialize the renderer
    renderer = new PIXI.autoDetectRenderer(800, 600);
    renderer.backgroundColor = 0xFFFFFF;

    // The renderer will create a canvas element for you that you can then insert into the DOM.
    document.body.appendChild(renderer.view);

    // Initialize the stage
    stage = new PIXI.Container();
}

// Sets up the main char
function setupMainChar() {
    // Create the main char texture and sprite
    var mainCharTexture = PIXI.Texture.fromImage('assets/person.png');
    mainChar = new PIXI.Sprite(mainCharTexture);

    // Setup the screen bounds
    mainChar.texture.baseTexture.on('loaded', function(){
        xScreenBound = renderer.width - mainChar.width;
        yScreenBound = renderer.height - mainChar.height;
    });

    // Setup the position and velocity of the main char
    mainChar.x = 400;
    mainChar.y = 300;

    mainChar.vx = 0;
    mainChar.vy = 0;

    // Set up key press listeners
    var leftArrow = keyboard(37),
        upArrow = keyboard(38),
        rightArrow = keyboard(39),
        downArrow = keyboard(40);
    leftArrow.press = function() {
        mainChar.vx -= 5;
    };
    leftArrow.release = function() {
        mainChar.vx += 5;
    }
    upArrow.press = function() {
        mainChar.vy -= 5;
    };
    upArrow.release = function() {
        mainChar.vy += 5;
    }
    rightArrow.press = function() {
        mainChar.vx += 5;
    };
    rightArrow.release = function() {
        mainChar.vx -= 5;
    }
    downArrow.press = function() {
        mainChar.vy += 5;
    };
    downArrow.release = function() {
        mainChar.vy -= 5;
    }

    // Add the main char to the scene we are building.
    stage.addChild(mainChar);
}

// Game loop
function gameLoop() {
    // Start the timer for the next animation loop
    requestAnimationFrame(gameLoop);

    // Update the current game state
    updateState();

    // The main render call that makes pixi draw the container and its children.
    renderer.render(stage);
}

// Update the state
function updateState() {
    // Check to see if the character is within the width boundaries
    if (mainChar.x > 0 && mainChar.x < xScreenBound || mainChar.x <= 0 && mainChar.vx > 0
        || mainChar.x >= xScreenBound && mainChar.vx < 0) {
        mainChar.x += mainChar.vx;
    } else if (mainChar.x <= 0) {
        mainChar.x = 0;
    } else if (mainChar.x >= xScreenBound) {
        mainChar.x = xScreenBound;
    }

    // Check to see if the character is within the height boundaries
    if (mainChar.y > 0 && mainChar.y < yScreenBound || mainChar.y <= 0 && mainChar.vy > 0
        || mainChar.y >= yScreenBound && mainChar.vy < 0) {
        mainChar.y += mainChar.vy;
    } else if (mainChar.y <= 0) {
        mainChar.y = 0;
    } else if (mainChar.y >= yScreenBound) {
        mainChar.y = yScreenBound;
    }
}

function keyboard(keyCode) {
    var key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    
    //The `downHandler`
    key.downHandler = function(event) {
        if (event.keyCode === key.code) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
        }
        event.preventDefault();
    };

    //The `upHandler`
    key.upHandler = function(event) {
        if (event.keyCode === key.code) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
        }
        event.preventDefault();
    };

    //Attach event listeners
    window.addEventListener(
        "keydown", key.downHandler.bind(key), false
        );
    window.addEventListener(
        "keyup", key.upHandler.bind(key), false
        );

    return key;
}

init();