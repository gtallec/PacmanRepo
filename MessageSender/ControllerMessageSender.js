class ControllerMessageSender extends MessageSender
{
    constructor(origin)
    {
        super(origin,'controller');
        this.model = null;
        this.view = null;
    }
    handleMessage(message)
    {
        console.log('coucou');
        switch(message.addressee)
        {
            case 'controller':
            {
                console.log('message transmitted to controller');
                if(message.content === 'init')
                {
                    console.log('initialisation');
                    this.init(message);
                }             
                break;
            }
            case 'model':
            {
                console.log('message transmitted to model');
                this.transmitMessageToModel(message);
                break;
            }
            case 'view':
            {
                console.log('message transmitted to view');
                this.transmitMessageToView(message);
                break;
            }

        }
    }
    init(message)
    {
        
    }
    transmitMessageToModel(message)
    {
        this.model.handleMessage(message);
    }
    transmitMessageToView(message)
    {
        this.view.handleMessage(message);
    }
}