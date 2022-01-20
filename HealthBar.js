class HealthBar extends GameObject
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
        ctx.fillText(this.width, 760, 607);
    }

    hit()
    {
        this.width = this.width - 100;
        if (this.width <= 0)
        {
            for (let j = 0; j < gameObjects.length; j++) /* stop all gameObjects from animating */
            {
                gameObjects[j].stopAndHide();
            }
            gameObjects[KILLER].stopMoving(); // turn off tank moving sound
            gameObjects[BACKGROUND].start();
            gameObjects[WIN_MESSAGE] = new StaticText("Game Over!", 5, 270, "Times Roman", 100, "red");
            gameObjects[WIN_MESSAGE].start(); 
        }
    }

    addHealth()
    {
        this.width = this.width + 10;
    }

    getHealth()
    {
        return this.width;
    }
}