class Model extends ModelMessageSender
{
    constructor(ghostNumber,controller)
    {

        super('main');
        this.controller = controller;
        this.ghostNumber = ghostNumber;
        this.pacmanPosition = null;
    }
    updateGhostModel()
    {
        var message = {content : 'update'};
        for(var i = 0 ; i < this.ghostNumber ; i++)
        {
            this.sendMessage('ghost',i,message);
        }
    }
    sendMessage(destination,numberGhost,message)
    {
        this.controller.sendMessage(destination,numberGhost,message,'model');
    }

    registerPacmanPosition(content)
    {
        this.pacmanPosition = content;
        this.updateGhostModel();
    }
    transmitMessageToMaze(message,intel)
    {

    }
    askPacmanPosition()
    {
        this.sendMessage('pacman',null,{content : 'update'});
    }

}