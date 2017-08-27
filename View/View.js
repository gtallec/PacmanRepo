class View extends ViewMessageSender
{
    constructor(controller,model,ghostNumber)
    {
        super('main',model);
        this.ghostNumber = ghostNumber;
        this.viewPacman = null;
        this.viewMaze = null;
        this.listOfViewGhosts = new Array(ghostNumber);
        this.listOfHarvestedGhost = new Array(ghostNumber);
        for (var i = 0 ; i < this.listOfHarvestedGhost.length ; i++)
        {
            this.listOfHarvestedGhost[i] = false;
        }
        this.mazeIsHarvested = false;
        this.pacmanIsHarvested = false;
        this.controller = controller;
        this.state = 0;
    }
    firstUpdate()
    {
        
    }
    sendUpdateMessage()
    {
        var message;
        if(this.state === 0)
        {
            message = {content : 'first'};
            this.state++;
        }
        else
        {
            message = {content : 'update'};
        }
        this.sendMessage('maze',null,message);
        this.sendMessage('pacman',null,message);
        for(var i = 0; i < this.ghostNumber ; i++)
        {
            this.sendMessage('ghost',i,message);
        }
    }
    harvestView(origin,number,content)
    {
        console.log('A view is being harvested');
        switch(origin)
        {
            case 'maze':
            {
                this.viewMaze = content;
                this.mazeIsHarvested = true;
                break;
            }
            case 'ghost':
            {
                this.listOfViewGhosts[number] = content;
                this.listOfHarvestedGhost[number] = true;
                break;
            }
            case 'pacman':
            {
                this.viewPacman = content;
                this.pacmanIsHarvested = true;
                break;
            }
        }
        this.checkForDisplay();
    }
    checkForDisplay()
    {
        var everythingIsHarvested = this.allGhostAreHarvested()&&this.mazeIsHarvested&&this.pacmanIsHarvested;
        if(everythingIsHarvested)
        {
            this.display();
        }        
    }
    display()
    {
        var viewMaze = this.viewMaze;
        var listOfViewGhost = this.listOfViewGhosts;
        var viewPacman = this.viewPacman;
        var xGhost;
        var yGhost;
        var ghost;
        var matrixToDisplay = viewMaze;
        for (var i = 0 ; i < listOfViewGhost.length ; i++)
        {
            ghost = listOfViewGhost[i];
            xGhost = ghost.x;
            yGhost = ghost.y;
            matrixToDisplay[xGhost][yGhost] = 'ghost';
        }
        var pacman = viewPacman;
        var xPacman = pacman.x;
        var yPacman = pacman.y;
        matrixToDisplay[xPacman][yPacman] = 'pacman';
        //Maintenant on affiche carrément
        var stringforDisplay ='';
        var lineForDisplay;
        for (var i = 0; i < matrixToDisplay.length ; i++)
        {
            lineForDisplay = '';
            for(var j = 0; j < matrixToDisplay[i].length ; j++)
            {
                lineForDisplay = lineForDisplay + ' ' + matrixToDisplay[i][j];
            }
            stringforDisplay = stringforDisplay + '<br/>' + lineForDisplay;
        }
        document.getElementById('display').innerHTML = stringforDisplay;
        document.getElementById('instruction').innerHTML = 'Press any button to start';
        
        this.controller.setState(1);
    }
    allGhostAreHarvested()
    {
        var check = true;
        var listOfHarvestedGhost = this.listOfHarvestedGhost;
        for (var i = 0 ; i < listOfHarvestedGhost.length ; i++)
        {
            check = check&&listOfHarvestedGhost[i];
        }
        console.log(check);
        return check;
    }
    sendMessage(destination,numberGhost,message)
    {
        this.controller.sendMessage(destination,numberGhost,message,'view');
    }
    setState(state)
    {
        this.state = state;
    }
    
    
    
}