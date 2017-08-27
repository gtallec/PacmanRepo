class ViewMaze extends ViewMessageSender
{
    constructor(modelMaze)
    {
        super('maze',modelMaze);
    }
    firstDisplay()
    {
        var maze = this.model.getMaze();
        var mazeForView = new Array(maze.length);
        var lineForView;
        for (var i = 0; i < maze.length ; i++)
        {
            lineForView = new Array(maze[i].length);
            for(var j = 0; j < maze[i].length ; j++)
            {
                if(maze[i][j])
                {
                    lineForView[j] = 'vide';
                }
                else
                {
                    lineForView[j] = 'mur';
                }
            }
            mazeForView[i] = lineForView;
        }
        console.log(mazeForView);
        this.sendMessage(mazeForView); 
    }
}