class ControllerGhost extends ControllerMovingActor
{
    constructor(number)
    {
        super('ghost');
        this.number = null;
    }
    init(message)
    {
        var ghost = message.ghost;
        var xGhost = ghost.x;
        var yGhost = ghost.y;
        var speedGhost = ghost.speed;
        var tempoGhost = ghost.tempo;
        var numberGhost = ghost.number;
        var trollingProbabilityGhost = ghost.trollingProbability;
        this.number = numberGhost;
        this.model = new ModelGhost(xGhost,yGhost,speedGhost,tempoGhost,this.number,trollingProbabilityGhost);
        this.view = new ViewGhost(this.model,this.number);
        this.sendMessage('init');
    }
    sendMessage(content)
    {
        var message = {origin : this.origin, addressee : this.addressee, content : content,number : this.number};
        postMessage(message);
    }

}