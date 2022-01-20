
//pobranie zdjec//
let fieldImage = new Image();
fieldImage.src = "Photos/best.jpg";

let riverImage = new Image();
riverImage.src = "Photos/tankFieldRiver.png";

let tankImage = new Image();
tankImage.src = "Photos/tank.png";

let explosionImage = new Image();
explosionImage.src = "Photos/explosion.png";

let ballImage = new Image();
ballImage.src = "Photos/fireball.png";

let shooter = new Image();
shooter.src = "Photos/shooter33.png"

let fireball2 = new Image();
fireball2.src = "Photos/fireball2.png"

let shooter33 = new Image();
shooter33.src = "Photos/zombiee.png"

let ice = new Image();
ice.src = "Photos/lod.png"
/////////////////////////////////////////////

//zmienne do obiektow w grze
const BACKGROUND = 0; //tlo
const KILLER = 1; //nasza postac
const FIRE_SHELL = 2;  // animacja wylotu pocisku z lufy
const SHELL = 3; // pocisk
const EXPLOSION = 4; // eksplozja w razie trafienia w zombie 
const WIN_MESSAGE = 5; // wiadomosc o zwyciestwie
const BULLET = 6; // pocisk wystrzelony
const SCORE = 7; // wynik
const HEALTH = 8; // zdrowie 
const GOLDBAR = 9; // pasek z mana

//
let enemyZombies = [];
let numberOfZombies = 3;
let boolek = false;
/******************* END OF Declare game specific data and functions *****************/


function playGame()
{

    /* We need to initialise the game objects outside of the Game class */
    /* This function does this initialisation.                          */
    /* This function will:                                               */
    /* 1. create the various game game gameObjects                   */
    /* 2. store the game gameObjects in an array                     */
    /* 3. create a new Game to display the game gameObjects          */
    /* 4. start the Game                                                */
    /* Create the various gameObjects for this game. */
    /* This is game specific code. It will be different for each game, as each game will have it own gameObjects */

    //tworzenie tla oraz chara
    gameObjects[BACKGROUND] = new StaticImage(fieldImage, 0, 0, canvas.width, canvas.height);
    gameObjects[KILLER] = new Killer(shooter, ice, 1000, 00, 90);
    gameObjects[KILLER].startMoving();

    gameObjects[SCORE] = new Score("0", 760, 70, "Brush Script MT", 100, "blue", 0);
    gameObjects[SCORE].start();  

    gameObjects[GOLDBAR] = new Goldbar(580,620,0,20,"gold");
    gameObjects[GOLDBAR].start(); 

    gameObjects[HEALTH] = new HealthBar(580,590,400,20,"red");
    gameObjects[HEALTH].start(); 
   
    // stworzenie poczatkowych zombiakow
    for (let i = 0; i < numberOfZombies; i++)
    {        
        do
        {
            enemyZombies[i] = new Zombie(shooter33, ice, Math.random() * (canvas.width - 25) + 25, Math.random() * (canvas.height - 25) + 25, Math.random() * 360);
        }while (enemyZombies[i].collidedWithRiver()) // upewnienie ze nie stana na przeszkodzie
        enemyZombies[i].start();
        enemyZombies[i].startMoving();
    }

    //tworzenie zombie co 5 sekund
    setInterval(function() {
        do
        {
            enemyZombies[numberOfZombies] = new Zombie(shooter33, ice, Math.random() * (canvas.width - 25) + 25, Math.random() * (canvas.height - 25) + 25, Math.random() * 360);
            gameObjects[numberOfZombies+10] = new Bullet(explosionImage, enemyZombies[numberOfZombies].getX(), enemyZombies[numberOfZombies].getY(), enemyZombies[numberOfZombies].direction, fireball2);
        }while (enemyZombies[numberOfZombies].collidedWithRiver()) // upewnienie ze nie stana na przeszkodzie
        enemyZombies[numberOfZombies].start();
        enemyZombies[numberOfZombies].startMoving(); 
        numberOfZombies++;      
        console.log(numberOfZombies)    
    }, 5000);

    //strzelanie przez zombie kamieniami co 2 sekundy
    setInterval(function() { 
        for (let i = 10; i < numberOfZombies + 10; i++)
        {        
            if (enemyZombies[i-10].isDisplayed())
            {
            gameObjects[i] = new Bullet(explosionImage, enemyZombies[i-10].getX(), enemyZombies[i-10].getY(), enemyZombies[i-10].direction, fireball2);
            gameObjects[i].start();

            enemyZombies[i-10].reverse(3); 
            enemyZombies[i-10].setDirection(enemyZombies[i-10].getDirection() + 80);
            }
        }              
    }, 2000);

    /* END OF game specific code. */

    /* Always create a game that uses the gameObject array */
    let game = new ZombieCanvasGame();

    /* Always play the game */
    game.start();
 
    //let counter = 20;

    // gameObjects[SCORE] = new StaticText("0", 5, 270, "Times Roman", 100, "red");
    // gameObjects[SCORE].start(); 
    gameObjects[SHELL] = new Shell(explosionImage, gameObjects[KILLER].getX(), gameObjects[KILLER].getY(), gameObjects[KILLER].direction, ballImage);

    // for (let i = 0; i < numberOfZombies; i++)
    // {        
    //     gameObjects[i] = new Bullet(explosionImage, 100, 100, 100, fireball2);
    // }

    for (let i = 10; i < numberOfZombies + 10; i++)
    {        
        gameObjects[i] = new Bullet(explosionImage, enemyZombies[i-10].getX(), enemyZombies[i-10].getY(), enemyZombies[i-10].direction, fireball2);
    }  

    /* If they are needed, then include any game-specific mouse and keyboard listners */
    document.addEventListener("keydown", function (e)
    {
        const ANGLE_STEP_SIZE = 10;

        if (e.keyCode === 37)  // left
        {
            gameObjects[KILLER].setDirection(gameObjects[KILLER].getDirection() - ANGLE_STEP_SIZE);
        }
        else if (e.keyCode === 39) // right
        {
            gameObjects[KILLER].setDirection(gameObjects[KILLER].getDirection() + ANGLE_STEP_SIZE);
        }
        else if (e.keyCode === 32) // space
        {
            if(gameObjects[SHELL] === undefined || !gameObjects[SHELL].isFiring())
            {
                gameObjects[FIRE_SHELL] = new FireShellAnimation(tankImage, gameObjects[KILLER].getX(), gameObjects[KILLER].getY(), gameObjects[KILLER].getDirection());
                gameObjects[FIRE_SHELL].start();

                gameObjects[SHELL] = new Shell(explosionImage, gameObjects[KILLER].getX(), gameObjects[KILLER].getY(), gameObjects[KILLER].direction, ballImage);
                gameObjects[SHELL].start();
            }

            // gameObjects[COUNTER] = new Bullet(explosionImage, gameObjects[KILLER].getX(), gameObjects[KILLER].getY(), gameObjects[KILLER].direction, ballImage);
            // gameObjects[COUNTER].start();

            // gameObjects[counter] = new Shell(explosionImage, shellExplosionSound, gameObjects[TANK].getX(), gameObjects[TANK].getY(), gameObjects[TANK].direction, ballImage);
            // gameObjects[counter].start();
            //counter++;
        }
        //healowanie W
        else if (e.keyCode === 87)
        { 
            if ( !(gameObjects[HEALTH].getHealth() === 400) )
            {
                if (gameObjects[GOLDBAR].getPoints() > 0)
                {
                    gameObjects[HEALTH].addHealth();
                    gameObjects[GOLDBAR].deletePoints();
                }
            }
        }

        else if (e.keyCode === 69)
        { 
            if (!boolek)
            {
            if (gameObjects[GOLDBAR].getPoints() > 0)
                {
                    console.log("KLIK");
                    gameObjects[KILLER].setSpeed(20);
                    boolek = true;
                    gameObjects[GOLDBAR].deletePoints();
                    setTimeout(()=>{
                        gameObjects[KILLER].setSpeed(50);
                        boolek = false;
                    },1000)
                }
            }
        }
        
    });
}