var renderer; // The game renderer
var stage; // The root container that holds the scene
var mainChar; // The main character sprite

function init() {
    // Initialize the renderer
    renderer = new PIXI.autoDetectRenderer(800, 600);
    renderer.backgroundColor = 0xFFFFFF;

    // The renderer will create a canvas element for you that you can then insert into the DOM.
    document.body.appendChild(renderer.view);

    // Initialize the stage
    stage = new PIXI.Container();

    // Create the main char texture and sprite
    var mainCharTexture = PIXI.Texture.fromImage('assets/person.png');
    mainChar = new PIXI.Sprite(mainCharTexture);

    // Setup the position and scale of the main char
    mainChar.position.x = 400;
    mainChar.position.y = 300;

    mainChar.anchor.x = 0.5;
    mainChar.anchor.y = 0.5;

    mainChar.scale.x = 1;
    mainChar.scale.y = 1;

    // Add the main char to the scene we are building.
    stage.addChild(mainChar);

    // Start the animation loop
    animate();
}

function animate() {
    // Start the timer for the next animation loop
    requestAnimationFrame(animate);

    // Each frame we spin the main char around a bit
    mainChar.rotation += 0.1;

    // The main render call that makes pixi draw the container and its children.
    renderer.render(stage);
}

init();