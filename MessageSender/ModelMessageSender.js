class ModelMessageSender extends MessageSender
{
    constructor(origin)
    {
        super(origin,'model');
    }
    handleMessage(message)
    {
        var content = message.content;
        var origin = message.origin;
        switch(origin)
        {
            case 'main':
            {
                switch(content)
                {
                    case 'update':
                    {
                        this.update();
                        break;
                    }
                    case 'right':
                    case 'left' :
                    case 'up':
                    case 'down':
                    {
                        this.followDirection(content);
                        break;
                    }
                }
                if((content.pacman != null)&&(content.ghost != null))
                {
                    var xPacman = pacman.x;
                    var yPacman = pacman.y;
                    var vertexPacman = this.locateClosestVertex(xPacman,yPacman);
                    var xGhost
                }
                
                break;
            }
            case 'pacman':
            {
                this.registerPacmanPosition(content);
                break;
            }
            case 'ghost':
            {
                if(content === 'check')
                {
                    this.registerGhost();
                }
                else
                {
                    this.transmitGhostPositionToMaze(content,message.number);
                }
                break;
            }
            case 'maze':
            {
                this.transmitMessageToGhost(content);
                break;
            }
        }
    }
}