importScripts('../MessageSender/MessageSender.js');
importScripts('../MessageSender/ControllerMessageSender.js');
importScripts('../MessageSender/ViewMessageSender.js');
importScripts('../MessageSender/ModelMessageSender.js');
importScripts('../View/ViewMovingActor/ViewMovingActor.js');
importScripts('../View/ViewMovingActor/ViewGhost.js');
importScripts('../Model/ModelMovingActor/ModelMovingActor.js');
importScripts('../Model/ModelMovingActor/ModelGhost.js');
importScripts('../Controller/ControllerMovingActor/ControllerMovingActor.js');
importScripts('../Controller/ControllerMovingActor/ControllerGhost.js');

var controllerGhost = new ControllerGhost();
onmessage = function(e)
{
    controllerGhost.handleMessage(e.data);
}
