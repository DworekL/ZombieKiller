/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland. */

class Zombie extends Character
{
    /* Each gameObject MUST have a constructor() and a render() method.        */
    /* If the object animates, then it must also have an updateState() method. */

    constructor(tankImage, riverImage, x, y, direction)
    {
        super(tankImage, riverImage, 130, x, y, direction, 0, 0, 40);
    }
}