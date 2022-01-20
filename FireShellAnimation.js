/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland. */

class FireShellAnimation extends GameObject
{
    /* Each gameObject MUST have a constructor() and a render() method.        */
    /* If the object animates, then it must also have an updateState() method. */

    constructor(tankImage, centreX, centreY, direction)
    {
        super(50); /* as this class extends from GameObject, you must always call super() */

        this.tankImage = tankImage;

        this.centreX = centreX;
        this.centreY = centreY;
        this.direction = direction;

        this.NUMBER_OF_SPRITES = 3; // the number of sprites in the sprite image
        this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE = 8; // the number of columns in the sprite image
        this.NUMBER_OF_ROWS_IN_SPRITE_IMAGE = 4; // the number of columns in the sprite image
        //    this.NUMBER_OF_SPRITES = 3; // the number of sprites in the sprite image
        this.START_ROW = 2;
        this.START_COLUMN = 1;

        this.currentSprite = 0; // the current sprite to be displayed from the sprite image  
        this.row = this.START_ROW; // current row in sprite image
        this.column = this.START_COLUMN; // current column in sprite image
        this.spriteIncrement = 1;
        this.SPRITE_WIDTH;
        this.SPRITE_HEIGHT;
        this.size = 50;

        this.SPRITE_WIDTH = (tankImage.width / this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE);
        this.SPRITE_HEIGHT = (tankImage.height / this.NUMBER_OF_ROWS_IN_SPRITE_IMAGE);
    }

    updateState()
    {
        this.currentSprite++;
        if (this.currentSprite >= this.NUMBER_OF_SPRITES)
        {
            this.stopAndHide();
        }

        this.column += this.spriteIncrement;
    }

    render()
    {
        ctx.save();
        ctx.translate(this.centreX, this.centreY);
        ctx.rotate(Math.radians(this.direction));
        ctx.translate(-this.centreX, -this.centreY);

        ctx.drawImage(this.tankImage, this.column * this.SPRITE_WIDTH, this.row * this.SPRITE_HEIGHT, this.SPRITE_WIDTH, this.SPRITE_HEIGHT, this.centreX - parseInt(this.size / 2), this.centreY - parseInt(this.size), this.size, this.size);
        ctx.restore();
    }
}