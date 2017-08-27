importScripts('../MessageSender/MessageSender.js');
importScripts('../MessageSender/ControllerMessageSender.js');
importScripts('../MessageSender/ViewMessageSender.js');
importScripts('../MessageSender/ModelMessageSender.js');
importScripts('../View/ViewMovingActor/ViewMovingActor.js');
importScripts('../View/ViewMovingActor/ViewPacman.js');
importScripts('../Model/ModelMovingActor/ModelMovingActor.js');
importScripts('../Model/ModelMovingActor/ModelPacman.js');
importScripts('../Controller/ControllerMovingActor/ControllerMovingActor.js');
importScripts('../Controller/ControllerMovingActor/ControllerPacman.js');

var controllerPacman = new ControllerPacman();
onmessage = function(e)
{
    controllerPacman.handleMessage(e.data);
}