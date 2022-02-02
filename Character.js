
class Character extends GameObject
{
    constructor(charImage, obstacle, speed, centreX, centreY, direction, startRow, startColumn, size) //obrazek,tlo,speed,pozycjaX,pozycjaY,kierunek
    {

        super(200 - speed);

        this.charImage = charImage;

        this.offscreenObstacles = document.createElement('canvas');
        this.offscreenObstaclesCtx = this.offscreenObstacles.getContext('2d');
        this.offscreenObstacles.width = canvas.width;
        this.offscreenObstacles.height = canvas.height;
        this.offscreenObstaclesCtx.drawImage(obstacle, 0, 0, canvas.width, canvas.height);

        this.centreX = centreX;
        this.centreY = centreY;
        this.size = size;  //wielkosc chara
        this.halfSize = this.size / 2;

        this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE = 1;
        this.NUMBER_OF_ROWS_IN_SPRITE_IMAGE = 1;	
        this.NUMBER_OF_SPRITES = 1;

        this.START_ROW = startRow;
        this.START_COLUMN = startColumn;

        this.currentSprite = 0; 
        this.row = this.START_ROW; 
        this.column = this.START_COLUMN; 
        this.SPRITE_INCREMENT = -1; 

        this.SPRITE_WIDTH = (this.charImage.width / this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE);
        this.SPRITE_HEIGHT = (this.charImage.height / this.NUMBER_OF_ROWS_IN_SPRITE_IMAGE);

        this.STEP_SIZE = 2; 
        this.setDirection(direction);

        this.isMoving = false; 

        this.x = 150;
    }

    updateState()
    {
        //jesli sie nie rusza to return
        if (!this.isMoving)
        {
            return;
        }

        //zmiana spritow
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

        //gdy wyjdzie poza mape pojawi na drugim koncu mapy
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

        ctx.drawImage(this.charImage, this.column * this.SPRITE_WIDTH, this.row * this.SPRITE_HEIGHT, this.SPRITE_WIDTH, this.SPRITE_HEIGHT, this.centreX - parseInt(this.size / 2), this.centreY - parseInt(this.size / 2), this.size, this.size);
        ctx.restore();
    }

    setSpeed(sp)
    {
        this.stop();
        this.updateStateMilliseconds = sp;
        this.start();
    }

    pointIsInsideChar(x, y)
    {
        //przekształca pocisk w układ współrzędnych czołgu wroga
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
                    return false; //po prawo od chara
                }
            }

            if (y > imageTopLeftY)
            {
                if ((y - imageTopLeftY) > this.size)
                {
                    return false; //poniezej char
                }
            }
        }
        else // powyzej lub po lewo
        {
            return false;
        }
        return true; //w srodku chara
    }

    collidedWithObstacle()
    {
        if ((this.pointCollisionWithObstacle(this.getFrontLeftCornerX(), this.getFrontLeftCornerY())) ||
                (this.pointCollisionWithObstacle(this.getFrontRightCornerX(), this.getFrontRightCornerY())))
        {
            return true;
        }
        return false;
    }

    pointCollisionWithObstacle(x, y)
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

        //restowanie sprite'a
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
        // odwracanie
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