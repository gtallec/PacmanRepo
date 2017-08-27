class ControllerMaze extends ControllerMessageSender
{
    constructor()
    {
        super('maze');
    }
    init(message)
    {
        var maze = message.maze;
        this.model = new ModelMaze(maze);
        this.view = new ViewMaze(this.model);
        this.sendMessage('init');
    }
}