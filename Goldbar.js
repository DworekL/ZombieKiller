class Goldbar extends GameObject
{
    /* Each gameObject MUST have a constructor() and a render() method.        */
    /* If the object animates, then it must also have an updateState() method. */

    constructor(x, y, width, height, colour)
    {
        super(null); /* as this class extends from GameObject, you must always call super() */

        /* These variables depend on the object */
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
        ctx.font = 23 + "px " + "Brush Script MT"; // need to set the font each time, as it might have been changed by other gameObjects.
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