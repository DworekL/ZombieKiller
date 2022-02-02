
class Score extends GameObject
{

    constructor(text, x, y, font, fontSize, colour, value)
    {
        super(null); 

        this.text = text;
        this.x = x;
        this.y = y;
        this.font = font;
        this.fontSize = fontSize;
        this.colour = colour;
        this.value = value;

        ctx.font = this.fontSize + "px " + this.font;
        this.width = ctx.measureText(this.text).width;
    }

    render()
    {
        ctx.fillStyle = this.colour;
        ctx.font = this.fontSize + "px " + this.font;
        ctx.fillText(this.value, this.x, this.y);
    }

    increment()
    {
        this.value = this.value + 1;
        console.log(this.value)
        console.log("TRAFIONO!")
    }

    getScore()
    {
        return this.value;
    }
}