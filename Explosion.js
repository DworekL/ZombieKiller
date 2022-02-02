
class Explosion extends GameObject
{

    constructor(explosionImage, centreX, centreY, size, delay = 0)
    {
        super(40, delay);

        this.explosionImage = explosionImage;
        this.centreX = centreX;
        this.centreY = centreY;
        this.size = size;
        this.delay = delay;
        this.NUMBER_OF_SPRITES = 74; 
        this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE = 9; 
        this.NUMBER_OF_ROWS_IN_SPRITE_IMAGE = 9; 	
        this.START_ROW = 0;
        this.START_COLUMN = 0;

        this.currentgameObject = 0; 
        this.row = this.START_ROW; 
        this.column = this.START_COLUMN; 

        this.SPRITE_WIDTH = (this.explosionImage.width / this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE);
        this.SPRITE_HEIGHT = (this.explosionImage.height / this.NUMBER_OF_ROWS_IN_SPRITE_IMAGE);

        this.isFirstCallOfUpdateState = true;
    }

    updateState()
    {
        if (this.isFirstCallOfUpdateState)
        {
            this.isFirstCallOfUpdateState = false;
        }

        if (this.currentgameObject === this.NUMBER_OF_SPRITES)
        {
            this.stopAndHide();
        }
        this.currentgameObject++;

        this.column++;
        if (this.column >= this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE)
        {
            this.column = 0;
            this.row++;
        }
    }

    render()
    {
        //rysuje po kolei sprite'y
        ctx.drawImage(this.explosionImage, this.column * this.SPRITE_WIDTH, this.row * this.SPRITE_WIDTH, this.SPRITE_WIDTH, this.SPRITE_HEIGHT, this.centreX - parseInt(this.size / 2), this.centreY - parseInt(this.size / 2), this.size, this.size);
    }
}