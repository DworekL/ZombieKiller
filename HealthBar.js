class HealthBar extends GameObject
{
    constructor(x, y, width, height, colour)
    {
        super(null); 

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.colour = colour;

        this.bestScore = 0;
    }

    render()
    {
        ctx.fillStyle = this.colour;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.fillStyle = "white";
        ctx.font = 23 + "px " + "Brush Script MT"; 
        ctx.fillText(this.width, 760, 607);
    }

    hit(val)
    {
        this.width = this.width - val;
        if (this.width <= 0)
        {
            for (let j = 0; j < gameObjects.length; j++) 
            {
                gameObjects[j].stopAndHide();
            }

            //pobranie najlepszego wyniku z bazy
            var http = new XMLHttpRequest();
            http.onreadystatechange = function() {
                if(this.readyState == 4 && this.status == 200)
                {
                    this.bestScore = this.responseText;

                    let beat = false;
                    if (this.bestScore < gameObjects[SCORE].getScore())
                    {
                        beat = true;
                        var http2 = new XMLHttpRequest();
                        http2.open("POST",'http://localhost:5100/score',true);
                        http2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                        http2.send(`score=${gameObjects[SCORE].getScore()}`);
                        this.bestScore = gameObjects[SCORE].getScore();
                    }

                    console.log("BEST SCORE = "+this.bestScore);
                    gameObjects[WIN_MESSAGE] = new StaticText("GAME OVER!    YOUR SCORE = "+gameObjects[SCORE].getScore(), 600, 270, "Brush Script MT", 30, "red", "BEST SCORE = "+this.bestScore,beat,gameObjects[SCORE].getScore());
                    gameObjects[WIN_MESSAGE].start(); 
                }
            }
            http.open("GET",'http://localhost:5100/score',true);
            http.send(null);

    
            console.log("WBIRUJE")
            navigator.vibrate(3000);
            gameObjects[KILLER].stopMoving(); 
            gameObjects[BACKGROUND].start();

            document.getElementById("reset").style.display = "block";

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