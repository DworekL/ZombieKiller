
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
            if ((enemyZombies[i].pointIsInsideChar(gameObjects[KILLER].getFrontLeftCornerX(), gameObjects[KILLER].getFrontLeftCornerY())) ||
                    (enemyZombies[i].pointIsInsideChar(gameObjects[KILLER].getFrontRightCornerX(), gameObjects[KILLER].getFrontRightCornerY())))
            {
                enemyZombies[i].reverse(5);
                enemyZombies[i].setDirection(enemyZombies[i].getDirection() + 10); // turn away from the river, so that the tank does not get stuck in one place
                if (enemyZombies[i].isDisplayed())
                {
                gameObjects[HEALTH].hit(5);
                }
            }
        }


        //gdy zombie zderzy sie z innym zombie
        for (let i = 0; i < enemyZombies.length; i++)
        {
            //gdy nasz killer zderzy sie z zombie
            if ((gameObjects[KILLER].pointIsInsideChar(enemyZombies[i].getFrontLeftCornerX(), enemyZombies[i].getFrontLeftCornerY())) ||
                    (gameObjects[KILLER].pointIsInsideChar(enemyZombies[i].getFrontRightCornerX(), enemyZombies[i].getFrontRightCornerY())))
            {
                enemyZombies[i].reverse(5);
                enemyZombies[i].setDirection(enemyZombies[i].getDirection() + 10); // turn away from the river, so that the tank does not get stuck in one place
            }

             //gdy zombie zderzy sie z innym zombie
            for (let j = 0; j < enemyZombies.length; j++)
            {
                if (i !== j)
                {
                    if ((enemyZombies[i].pointIsInsideChar(enemyZombies[j].getFrontLeftCornerX(), enemyZombies[j].getFrontLeftCornerY())) ||
                            (enemyZombies[i].pointIsInsideChar(enemyZombies[j].getFrontRightCornerX(), enemyZombies[j].getFrontRightCornerY())))
                    {
                        enemyZombies[i].reverse(3);
                        enemyZombies[i].setDirection(enemyZombies[i].getDirection() + 10); // turn away from the river, so that the tank does not get stuck in one place
                    }
                }
            }
        }


        //gdy killer z obiektem
        if (gameObjects[KILLER].collidedWithObstacle())
        {
            gameObjects[KILLER].reverse();
        }

        //gdy zombie z obiektem
        for (let i = 0; i < enemyZombies.length; i++)
        {
            if (enemyZombies[i].collidedWithObstacle())
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
                if ((enemyZombies[i].isDisplayed()) && (enemyZombies[i].pointIsInsideChar(gameObjects[SHELL].getX(), gameObjects[SHELL].getY())))
                {
                    enemyZombies[i].stopAndHide();
                    gameObjects[EXPLOSION] = new Explosion(explosionImage, enemyZombies[i].getX(), enemyZombies[i].getY(), 100);
                    gameObjects[EXPLOSION].start();
                    gameObjects[SHELL].stopAndHide();
                    gameObjects[SCORE].increment();
                    gameObjects[GOLDBAR].addPoints();

                    this.numberOfZombiesKilled++;
                }
            }
        }


        for (let i = 10; i < enemyZombies.length + 10; i++)
        {
            if (gameObjects[i].isFiringZombie())
            {
                if ((gameObjects[KILLER].isDisplayed()) && (gameObjects[KILLER].pointIsInsideChar(gameObjects[i].getX(), gameObjects[i].getY())))
                {
                    console.log("OBERWALES !!");
                    gameObjects[i].stopAndHide();
                    gameObjects[HEALTH].hit(100);
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