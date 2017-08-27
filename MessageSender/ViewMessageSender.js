class ViewMessageSender extends MessageSender
{
    constructor(origin,model)
    {
        super(origin,'view');
        this.model = model;
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
                    case 'first':
                    {
                        this.firstDisplay();
                        break;
                    }
                    case 'update':
                    {
                        this.update();
                        break;
                    }  
                }
                break;
            }
            case 'pacman':
            {
                this.harvestView('pacman',null,content);
                break;
            }
            case 'ghost':
            {
                this.harvestView('ghost',message.number,content);
                break;
            }
            case 'maze':
            {
                this.harvestView('maze',null,content);
                break;
            }
        }
    }
    firstDisplay()
    {
        
    }
    update()
    {
        
    }
    harvestView(origin,number,content)
    {
        
    }
}