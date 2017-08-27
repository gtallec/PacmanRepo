class ViewGhost extends ViewMovingActor
{
    constructor(modelGhost,number)
    {
        super('ghost',modelGhost);
        this.number = number;       
    }
    sendMessage(content)
    {
        var message = {origin : this.origin, addressee : this.addressee, content : content,number : this.number};
        postMessage(message);
    }
}