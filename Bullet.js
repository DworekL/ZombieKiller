
class Bullet extends GameObject
{
    constructor(explosionImage, x, y, direction, ballImage)
    {
        super(5);
        
        this.explosionImage = explosionImage;
        this.x = x;
        this.y = y;
        this.explosionTargetX = x;
        this.explosionTargetY = y;
        this.direction = direction;
        this.ballImage = ballImage;
    
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

    isFiringZombie()
    {
        return this.gameObjectIsDisplayed;
    }
}