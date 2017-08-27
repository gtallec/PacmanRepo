class ViewMovingActor extends ViewMessageSender
{
    constructor(origin,modelMovingActor)
    {
        super(origin,modelMovingActor);
    }
    firstDisplay()
    {
        var xMovingActor = this.model.getX();
        var yMovingActor = this.model.getY();
        var content = {x : xMovingActor, y : yMovingActor};
        console.log(content);
        this.sendMessage(content);
    }
}