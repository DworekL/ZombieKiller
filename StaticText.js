const STATIC_TEXT_CENTRE = -1;

class StaticText extends GameObject
{
 

    constructor(text, x, y, font, fontSize, colour, text2="", beat=false, score=0)
    {
        super(null); 

        this.text = text;
        this.x = x;
        this.y = y;
        this.font = font;
        this.fontSize = fontSize;
        this.colour = colour;
        this.text2 = text2;
        this.beat = beat;
        this.score = score;

        ctx.font = this.fontSize + "px " + this.font;
        this.width = ctx.measureText(this.text).width;
        if (this.x === STATIC_TEXT_CENTRE)
        {
            this.x = (canvas.width - this.width) / 2;
        }
    }

    render()
    {
        ctx.fillStyle = this.colour;
        ctx.font = this.fontSize + "px " + this.font;
        ctx.fillText(this.text, this.x, this.y);

        ctx.fillStyle = "yellow";
        ctx.font = this.fontSize + "px " + this.font;
        ctx.fillText(this.text2, this.x, this.y+50);

        if(this.beat)
        {
        ctx.fillStyle = "yellow";
        ctx.font = 30 + "px " + this.font;
        ctx.fillText("NEW BEST SCORE !", this.x, this.y-50);
        }
    }
}