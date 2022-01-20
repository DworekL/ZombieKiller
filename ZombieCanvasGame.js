/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland.       */
/* A CanvasGame that implements collision detection.                       */


class ZombieCanvasGame extends CanvasGame
{
    constructor()
    {
        super();

        this.numberOfZombiesKilled = 0;
    }

    collisionDetection()
    {
        //gdy nasz killer zderzy sie z zombie
        for (let i = 0; i < enemyZombies.length; i++)
        {
            if ((enemyZombies[i].pointIsInsideTank(gameObjects[KILLER].getFrontLeftCornerX(), gameObjects[KILLER].getFrontLeftCornerY())) ||
                    (enemyZombies[i].pointIsInsideTank(gameObjects[KILLER].getFrontRightCornerX(), gameObjects[KILLER].getFrontRightCornerY())))
            {
                enemyZombies[i].reverse(5);
                enemyZombies[i].setDirection(enemyZombies[i].getDirection() + 10); // turn away from the river, so that the tank does not get stuck in one place
            
            }
        }


        //gdy zombie zderzy sie z innym zombie
        for (let i = 0; i < enemyZombies.length; i++)
        {
            //gdy nasz killer zderzy sie z zombie
            if ((gameObjects[KILLER].pointIsInsideTank(enemyZombies[i].getFrontLeftCornerX(), enemyZombies[i].getFrontLeftCornerY())) ||
                    (gameObjects[KILLER].pointIsInsideTank(enemyZombies[i].getFrontRightCornerX(), enemyZombies[i].getFrontRightCornerY())))
            {
                enemyZombies[i].reverse(5);
                enemyZombies[i].setDirection(enemyZombies[i].getDirection() + 10); // turn away from the river, so that the tank does not get stuck in one place
            }

             //gdy zombie zderzy sie z innym zombie
            for (let j = 0; j < enemyZombies.length; j++)
            {
                if (i !== j)
                {
                    if ((enemyZombies[i].pointIsInsideTank(enemyZombies[j].getFrontLeftCornerX(), enemyZombies[j].getFrontLeftCornerY())) ||
                            (enemyZombies[i].pointIsInsideTank(enemyZombies[j].getFrontRightCornerX(), enemyZombies[j].getFrontRightCornerY())))
                    {
                        enemyZombies[i].reverse(3);
                        enemyZombies[i].setDirection(enemyZombies[i].getDirection() + 10); // turn away from the river, so that the tank does not get stuck in one place
                    }
                }
            }
        }


        //gdy killer z obiektem
        if (gameObjects[KILLER].collidedWithRiver())
        {
            gameObjects[KILLER].reverse();
        }

        //gdy zombie z obiektem
        for (let i = 0; i < enemyZombies.length; i++)
        {
            if (enemyZombies[i].collidedWithRiver())
            {
                enemyZombies[i].reverse();
                enemyZombies[i].setDirection(enemyZombies[i].getDirection() + 10); // turn away from the river, so that the tank does not get stuck in one place
            }
        }

        /* Collision detection for a shell that is firing */
        if (gameObjects[SHELL] === undefined)
        {
            return;
        }
        for (let i = 0; i < enemyZombies.length; i++)
        {
            if (gameObjects[SHELL].isFiring())
            {
                if ((enemyZombies[i].isDisplayed()) && (enemyZombies[i].pointIsInsideTank(gameObjects[SHELL].getX(), gameObjects[SHELL].getY())))
                {
                    enemyZombies[i].stopAndHide();
                    gameObjects[EXPLOSION] = new Explosion(explosionImage, enemyZombies[i].getX(), enemyZombies[i].getY(), 100);
                    gameObjects[EXPLOSION].start();
                    gameObjects[SHELL].stopAndHide();
                    gameObjects[SCORE].increment();
                    gameObjects[GOLDBAR].addPoints();

                    this.numberOfZombiesKilled++;
                    if (this.numberOfZombiesKilled === numberOfZombies)
                    {
                        /* Player has won                                                                                             */
                        /* Have a two second delay to show the last enemy tank blowing up beofore displaying the 'Game Over!' message */
                        setInterval(function ()
                        {
                            for (let j = 0; j < gameObjects.length; j++) /* stop all gameObjects from animating */
                            {
                                gameObjects[j].stopAndHide();
                            }
                            gameObjects[KILLER].stopMoving(); // turn off tank moving sound
                            gameObjects[BACKGROUND].start();
                            gameObjects[WIN_MESSAGE] = new StaticText("Game Over!", 5, 270, "Times Roman", 100, "red");
                            gameObjects[WIN_MESSAGE].start(); /* render win message */
                        }, 2000);
                    }
                }
            }
        }


        for (let i = 10; i < enemyZombies.length + 10; i++)
        {
            if (gameObjects[i].isFiringZombie())
            {
                if ((gameObjects[KILLER].isDisplayed()) && (gameObjects[KILLER].pointIsInsideTank(gameObjects[i].getX(), gameObjects[i].getY())))
                {
                    console.log("DOSTALES HITA !!");
                    gameObjects[i].stopAndHide();
                    gameObjects[HEALTH].hit();
                }
            }
        }
    


    }

    render()
    {
        super.render();
        for (let i = 0; i < enemyZombies.length; i++)
        {
            if (enemyZombies[i].isDisplayed())
            {
                enemyZombies[i].render();
            }
        }
    }
}