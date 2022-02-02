class Goldbar extends GameObject
{
    constructor(x, y, width, height, colour)
    {
        super(null); 

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.colour = colour;

    }

    render()
    {
        ctx.fillStyle = this.colour;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.fillStyle = "white";
        ctx.font = 23 + "px " + "Brush Script MT";
        ctx.fillText(this.width, 760, 637);
    }

    addPoints()
    {
        this.width = this.width + 10;
    }

    deletePoints()
    {
        this.width = this.width - 10;
    }

    getPoints()
    {
        return this.width;
    }
}