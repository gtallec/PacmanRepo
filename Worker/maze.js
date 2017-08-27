importScripts('../MessageSender/MessageSender.js');
importScripts('../MessageSender/ControllerMessageSender.js');
importScripts('../MessageSender/ViewMessageSender.js');
importScripts('../MessageSender/ModelMessageSender.js');
importScripts('../Graph/Edge.js');
importScripts('../Graph/Vertex.js');
importScripts('../Graph/Graph.js');
importScripts('../View/ViewMaze.js');
importScripts('../Model/ModelMaze.js');
importScripts('../Controller/ControllerMaze.js');
var controllerMaze = new ControllerMaze();
onmessage = function(e)
{
    controllerMaze.handleMessage(e.data);
}