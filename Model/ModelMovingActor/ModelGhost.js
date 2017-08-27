class ModelGhost extends ModelMovingActor
{
    // dans la pratique le fantome est soit relié à la view soit relié au game pour l'instant on le relie à a view
    constructor(x, y, speed, tempo,number,trollingProbability)
    {
        super(x,y,speed,tempo,'ghost');
        this.number = number;
        this.moving = false;
        this.direction = null;
        this.trollingProbability = trollingProbability;
    }
    generateRandomPath()
    {
        var random = Math.random();
        if (random < 0.25)
        {
            return 'right';
        }
        else if (random < 0.5)
        {
            return 'left';
        }
        else if (random < 0.75)
        {
            return 'up';
        }
        else
        {
            return 'down';
        }
    }
    takeDecision()
    {
        var random = Math.random();
        if(random < this.trollingProbability)
        {
            this.direction = this.generateRandomPath();
        }
        else
        {
            this.direction = this.askModelForDirection();
        }
        this.moving = this.followDirection(this.direction);
    }
    updateGhostPosition()
    {
        if(!this.moving)
        {
            this.takeDecision();
        }
        else
        {
            this.followDirection(this.direction);
        }
    }
    followDirection(direction)
    {
        var x = this.x;
        var y = this.y;
        var right = false;
        var left = false;
        var up = false;
        var down = false;
        var distance = this.speed * this.tempo;
        switch(direction)
        {
            case 'down':
            {
               var newX = Math.floor(x + distance);
                down = this.askModelForPermission(newX,y)
               if(down)
               {
                    this.x = newX;

               }
               break;
            }
            case 'up':
            {
                var newX = Math.floor(x-distance);
                up = this.askModelForPermission(newX,y);
                if(up)
                {
                    this.x = newX;
                }
                break;
            }
            case 'left':
            {
                var newY = Math.floor(y-distance);
                left = this.askModelForPermission(x,newY);
                if(left)
                {
                    this.y = newY;
                }
                break;
            }
            case 'right':
            {
                var newY = Math.floor(y+distance);
                right = this.askModelForPermission(x,newY);
                if(right)
                {
                    this.y = newY;
                }
                break;  
            }

        }
        return right||left||up||down;
    }
    askModelForDirection()
    {
        return this.model.getBestPath(this.x,this.y);
    }
    sendMessage(content)
    {
        var message = {origin : this.origin, addressee : this.addressee, content : content,number : this.number};
        postMessage(message);
    }
}