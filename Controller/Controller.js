class Controller extends ControllerMessageSender
{
    constructor(level)
    {
        super('main');
        this.state = 0;
        this.currentDirection = null;
        this.direction = null;
        //Les différents états possibles pour le controller
        this.initialized = 0;
        var controller = this;
        var intelFromDB = this.getIntelFromDB(level);
        //initializing maze
        var mazeIntel = intelFromDB.maze;
        this.mazeWorker = new Worker('./Worker/maze.js');
        this.mazeWorker.onmessage = function(e)
        {
            controller.handleMessage(e.data);
        }
        var messageToInitMaze = {content : 'init', maze : mazeIntel};
        this.sendMessage('maze',null,messageToInitMaze,'controller');
        //initializing pacman
        var pacmanIntel = intelFromDB.pacman;
        var messageToInitPacman = {content : 'init', pacman : pacmanIntel};
        this.pacmanWorker = new Worker('./Worker/pacman.js');
        this.pacmanWorker.onmessage = function(e)
        {
            controller.handleMessage(e.data);
        }
        this.sendMessage('pacman',null,messageToInitPacman,'controller');
        //initializing ghosts
        var listOfGhosts = intelFromDB.listOfGhosts;
        var numberOfGhosts = listOfGhosts.length;
        this.listOfGhostWorkers = new Array(numberOfGhosts);
        var ghost;
        var messageToInitGhost;
        for(var i = 0 ; i < numberOfGhosts ; i++)
        {
            ghost = listOfGhosts[i];
            messageToInitGhost = {content : 'init', ghost : ghost};
            this.listOfGhostWorkers[i] = new Worker('./Worker/ghost.js');
            this.listOfGhostWorkers[i].onmessage = function(e)
            {
                controller.handleMessage(e.data);
            }
            this.sendMessage('ghost',i,messageToInitGhost,'controller');    
        }   
    }
    tack(direction)
    {
        this.currentDirection = direction;
        if(this.state === 1)
        {
            this.state++;
            this.triggerNextUpdate();
        }
        console.log('yes le controller a bien changer de direction');
    }
    triggerNextUpdate()
    {
        document.getElementById('instruction').innerHTML = '';
        this.model.askPacmanPosition();
    }
    sendMessage(destination,numberGhost,message,addressee)
    {
        message.addressee = addressee;
        message.origin = this.origin;
        console.log(message);
        switch(destination)
        {
            case 'maze':
            {
                this.mazeWorker.postMessage(message);
                break;
            }
            case 'pacman':
            {
                this.pacmanWorker.postMessage(message);
                break;
            }
            case 'ghost':
            {
                this.listOfGhostWorkers[numberGhost].postMessage(message);
                break;
            }
            
        }
    }
    init(message)
    {
        this.initialized = this.initialized + 1;
        if (this.initialized === 1)
        {
            var ghostNumber = this.listOfGhostWorkers.length;
            this.model = new Model(ghostNumber,this);
            this.view = new View(this,this.model,ghostNumber);
        }
        if(this.initialized === 3)
        {
            this.firstGameView();
        }
    }
    firstGameView()
    {
        this.view.sendUpdateMessage();
    }
    update()
    {
        var message = this.view.sendFirstMessage();
        this.sendMessage('maze',null,message);
        this.sendMessage('pacman',null,message);
        for(var i = 0 ; i < this.listOfGhostWorkers.length ; i++)
        {
            this.sendMessage('ghost',i,message);
        }
    }
    getIntelFromDB(level)
    {
        //will get the level intel in the database, until the database is set, it just replies with a given result
        //data about maze
        var maze = [
                    [true,true,true,true],
                    [false,false,false,true],
                    [true,true,false,true],
                    [true,false,false,true],
                    [true,true,true,true]
                   ];
        //data about pacman
        var pacman = {x:0,y:0,speed:1,tempo:1};
        var listOfGhosts = new Array(1);
        var ghost = {x:2,y:1,speed:1,tempo:1,number:0,trollingProbability:0.1};
        listOfGhosts[0] = ghost;
        return {maze:maze,pacman:pacman,listOfGhosts:listOfGhosts};
    }
    setState(state)
    {
        this.state = state;
    }


}