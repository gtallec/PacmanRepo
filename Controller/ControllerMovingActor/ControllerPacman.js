class ControllerPacman extends ControllerMovingActor
{
    constructor()
    {
        super('pacman');
        this.model = null;
        this.view = null;
    }
    init(message)
    {
        var pacman = message.pacman;
        var xPacman = pacman.x;
        var yPacman = pacman.y;
        var speedPacman = pacman.speed;
        var tempoPacman = pacman.tempo;
        this.model = new ModelPacman(xPacman,yPacman,speedPacman,tempoPacman);
        this.view = new ViewPacman(this.model);
        this.sendMessage('init');
    }
}