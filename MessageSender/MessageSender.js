class MessageSender
{
    constructor(origin,addressee)
    {
        this.addressee = addressee;
        this.origin = origin;
    }
    sendMessage(content)
    {
        var message = {origin : this.origin, addressee : this.addressee, content : content};
        postMessage(message);
    }
    handleMessage(message)
    {
        
    }
}