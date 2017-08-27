class ModelMovingActor extends ModelMessageSender
{
    constructor(x, y, speed, tempo,origin)
    {
        super(origin);
        this.x = x;
        this.y = y;
        this.speed = speed; // en case par seconde ?
        this.tempo = tempo;
    }
    followDirection(direction)
    {
        var x = this.x;
        var y = this.y;
        var distance = this.speed * this.tempo;
        switch(direction)
        {
            case 'down':
            {
               var newX = Math.floor(x + distance);
               if(this.askModelForPermission(newX,y))
               {
                    this.x = newX;

               }
               break;
            }
            case 'up':
            {
                var newX = Math.floor(x-distance);
                if(this.askModelForPermission(newX,y))
                {
                    this.x = newX;
                }
                break;
            }
            case 'left':
            {
                var newY = Math.floor(y-distance);
                if(this.askModelForPermission(x,newY))
                {
                    this.y = newY;
                }
                break;
            }
            case 'right':
            {
                var newY = Math.floor(y+distance);
                if(this.askModelForPermission(x,newY))
                {
                    this.y = newY;
                }
                break;  
            }

        }
    }
    askModelForPermission(x,y)
    {
       return this.model.askModelMazeForPermission(x,y);
    }
    getX()
    {
        return this.x;
    }
    getY()
    {
        return this.y;
    }
    update()
    {
        this.sendMessage({x : this.x,y : this.y});
        console.log("genesis est skynet");
    }
}