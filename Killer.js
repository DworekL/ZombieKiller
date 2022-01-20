class Killer extends Character
{
    /* Each gameObject MUST have a constructor() and a render() method.        */
    /* If the object animates, then it must also have an updateState() method. */

    constructor(tankImage, riverImage, centreX, centreY, direction)
    {
        super(tankImage, riverImage, 150, centreX, centreY, direction, 0, 0, 50); /* as this class extends from GameObject, you must always call super() */  
    }  
}