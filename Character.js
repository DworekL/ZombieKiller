/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland. */

class Character extends GameObject
{
    /* Each gameObject MUST have a constructor() and a render() method.        */
    /* If the object animates, then it must also have an updateState() method. */

    constructor(tankImage, riverImage, speed, centreX, centreY, direction, startRow, startColumn, size) //obrazek,tlo,dzwiek,speed,pozycjaX,pozycjaY,kierunek,
    {

        super(200 - speed); /* as this class extends from GameObject, you must always call super() */

        this.tankImage = tankImage;
    
        /* this.offscreenObstaclesCtx will be used for collision detection with the river */
        this.offscreenObstacles = document.createElement('canvas');
        this.offscreenObstaclesCtx = this.offscreenObstacles.getContext('2d');
        this.offscreenObstacles.width = canvas.width;
        this.offscreenObstacles.height = canvas.height;
        this.offscreenObstaclesCtx.drawImage(riverImage, 0, 0, canvas.width, canvas.height);

        this.centreX = centreX;
        this.centreY = centreY;
        this.size = size;  // the width and height of the tank
        this.halfSize = this.size / 2;

        this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE = 1;//8 // the number of columns in the sprite image 
        this.NUMBER_OF_ROWS_IN_SPRITE_IMAGE = 1;//4 // the number of rows in the sprite image	
        this.NUMBER_OF_SPRITES = 1;//8 // the number of sprites in the sprite image

        this.START_ROW = startRow;
        this.START_COLUMN = startColumn;

        this.currentSprite = 0; // the current sprite to be displayed from the sprite image  
        this.row = this.START_ROW; // current row in sprite image
        this.column = this.START_COLUMN; // current column in sprite image
        this.SPRITE_INCREMENT = -1; // sub-images in the sprite image are ordered from bottom to top, right to left

        this.SPRITE_WIDTH = (this.tankImage.width / this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE);
        this.SPRITE_HEIGHT = (this.tankImage.height / this.NUMBER_OF_ROWS_IN_SPRITE_IMAGE);

        this.STEP_SIZE = 2; // the number of pixels to move forward
        this.setDirection(direction);

        this.isMoving = false; // the tank is initially stopped

        this.x = 150;
    }

    updateState()
    {
        if (!this.isMoving)
        {
            return;
        }

        this.currentSprite++;
        this.column += this.SPRITE_INCREMENT;
        if (this.currentSprite >= this.NUMBER_OF_SPRITES )
        {
            this.currentSprite = 0;
            this.row = this.START_ROW;
            this.column = this.START_COLUMN;
        }

        if (this.column < 0)
        {
            this.column = this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE - 1;
            this.row--;
        }

        this.centreX += this.stepSizeX;
        this.centreY += this.stepSizeY;

        /* if the tank goes off the canvas, then make it reappear at the opposite side of the canvas */
        if ((this.centreX - this.halfSize) > canvas.width)
        {
            this.centreX = -this.halfSize;
        }
        else if ((this.centreY - this.halfSize) > canvas.height)
        {
            this.centreY = -this.halfSize;
        }
        else if ((this.centreX + this.halfSize) < 0)
        {
            this.centreX = canvas.width + this.halfSize;
        }
        else if ((this.centreY + this.halfSize) < 0)
        {
            this.centreY = canvas.height + this.halfSize;
        }
    }

    render()
    {
        ctx.save();
        ctx.translate(this.centreX, this.centreY);
        ctx.rotate(Math.radians(this.direction));
        ctx.translate(-this.centreX, -this.centreY);

        ctx.drawImage(this.tankImage, this.column * this.SPRITE_WIDTH, this.row * this.SPRITE_HEIGHT, this.SPRITE_WIDTH, this.SPRITE_HEIGHT, this.centreX - parseInt(this.size / 2), this.centreY - parseInt(this.size / 2), this.size, this.size);
        ctx.restore();
    }

    setSpeed(sp)
    {
        this.stop();
        this.updateStateMilliseconds = sp;
        this.start();
    }

    pointIsInsideTank(x, y)
    {
        /* transform the shell into the enemy tank's coordinate system */
        let transformedX = x - this.centreX;
        let transformedY = y - this.centreY;
        x = transformedX * Math.cos(Math.radians((this.direction))) - transformedY * Math.sin(Math.radians(this.direction));
        y = transformedX * Math.sin(Math.radians((this.direction))) + transformedY * Math.cos(Math.radians(this.direction));
        x += this.centreX;
        y += this.centreY;

        let imageTopLeftX = this.centreX - parseInt(this.size / 2);
        let imageTopLeftY = this.centreY - parseInt(this.size / 2);
        if ((x > imageTopLeftX) && (y > imageTopLeftY))
        {
            if (x > imageTopLeftX)
            {
                if ((x - imageTopLeftX) > this.size)
                {
                    return false; // to the right of the tank image
                }
            }

            if (y > imageTopLeftY)
            {
                if ((y - imageTopLeftY) > this.size)
                {
                    return false; // below the tank image
                }
            }
        }
        else // above or to the left of the tank image
        {
            return false;
        }
        return true; // inside tank image
    }

    collidedWithRiver()
    {
        /* test the front-left corner and the front-right corner of the tank for collision with the river */
        /* we only need to test the front of the tank, as the tank can only move forward                                    */
        if ((this.pointCollisionWithRiver(this.getFrontLeftCornerX(), this.getFrontLeftCornerY())) ||
                (this.pointCollisionWithRiver(this.getFrontRightCornerX(), this.getFrontRightCornerY())))
        {
            return true;
        }
        return false;
    }

    pointCollisionWithRiver(x, y)
    {

        let transformedX = x - this.centreX;
        let transformedY = y - this.centreY;
        x = transformedX * Math.cos(Math.radians((this.direction))) - transformedY * Math.sin(Math.radians(this.direction));
        y = transformedX * Math.sin(Math.radians((this.direction))) + transformedY * Math.cos(Math.radians(this.direction));
        x += this.centreX;
        y += this.centreY;

        let imageData = this.offscreenObstaclesCtx.getImageData(x, y, 1, 1);
        let data = imageData.data;
        if (data[3] !== 0)
        {
            return true;
        }
        return false;
    }

    positionRandomly()
    {
        this.centreX = Math.random() * (canvas.width - (this.size * 2)) + this.size;
        this.centreY = Math.random() * (canvas.height - (this.size * 2)) + this.size;
        this.setDirection(Math.random() * 360);

        // reset the tank sprite
        this.currentSprite = 0;
        this.row = this.START_ROW;
        this.column = this.START_COLUMN;
    }

    startMoving()
    {
        this.isMoving = true;
    }

    stopMoving()
    {
        this.isMoving = false;
    }

    tankIsMoving()
    {
        return this.isMoving;
    }

    reverse(numberOfReverseSteps = 1)
    {
        // move in reverse direction
        for (let i = 0; i < numberOfReverseSteps; i++)
        {
            this.setX(this.getX() - this.getStepSizeX());
            this.setY(this.getY() - this.getStepSizeY());
        }
    }
    
    getDirection()
    {
        return this.direction;
    }

    setDirection(newDirection)
    {
        this.direction = newDirection;

        this.stepSizeX = this.STEP_SIZE * Math.sin(Math.radians(this.direction));
        this.stepSizeY = -this.STEP_SIZE * Math.cos(Math.radians(this.direction));
    }

    getX()
    {
        return this.centreX;
    }

    getY()
    {
        return this.centreY;
    }

    setX(x)
    {
        this.centreX = x;
    }

    setY(y)
    {
        this.centreY = y;
    }

    getStepSizeX()
    {
        return this.stepSizeX;
    }

    getStepSizeY()
    {
        return this.stepSizeY;
    }

    getSize()
    {
        return this.size;
    }

    getFrontLeftCornerX()
    {
        return this.centreX - this.getSize() / 2.8;
    }

    getFrontLeftCornerY()
    {
        return this.centreY - this.getSize() / 2.8;
    }

    getFrontRightCornerX()
    {
        return this.centreX + this.getSize() / 2.8;
    }

    getFrontRightCornerY()
    {
        return this.centreY - this.getSize() / 2.8;
    }

    getFrontCentreX()
    {
        return this.centreX;
    }

    getFrontCentreY()
    {
        return this.centreY - this.getSize() / 2.8;
    }
}