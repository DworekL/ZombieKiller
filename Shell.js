/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland. */

class Shell extends GameObject
{
    /* Each gameObject MUST have a constructor() and a render() method.        */
    /* If the object animates, then it must also have an updateState() method. */

    constructor(explosionImage, x, y, direction, ballImage)
    {
        super(5); /* as this class extends from GameObject, you must always call super() */
        
        this.explosionImage = explosionImage;
        this.x = x;
        this.y = y;
        this.explosionTargetX = x;
        this.explosionTargetY = y;
        this.direction = direction;
        this.ballImage = ballImage;
     

        /* define the maximum range of the shell */
        /* the shell will explode here if it has not hit a target beforehand */
        this.shellRange = 500;
        this.distanceShellTravelled = gameObjects[KILLER].getSize() / 2;  // the shell starts from the front of the tank's turret
    }

    updateState()
    {
        if (this.distanceShellTravelled < this.shellRange)
        {
            this.distanceShellTravelled ++;
            this.explosionTargetX = this.x + (this.distanceShellTravelled * Math.sin(Math.radians(this.direction)));
            this.explosionTargetY = this.y - (this.distanceShellTravelled * Math.cos(Math.radians(this.direction)));
        }
        else
        {
            this.stopAndHide();
            gameObjects[EXPLOSION] = new Explosion(this.explosionImage, this.explosionTargetX, this.explosionTargetY, 50);
            gameObjects[EXPLOSION].start();
        }
    }
    
    render()
    {
         ctx.drawImage(this.ballImage,this.explosionTargetX-10,this.explosionTargetY-10,10,10);
    }

    getX()
    {
        return this.explosionTargetX;
    }

    getY()
    {
        return this.explosionTargetY;
    }

    getRange()
    {
        return this.shellRange;
    }

    isFiring()
    {
        return this.gameObjectIsDisplayed;
    }
}