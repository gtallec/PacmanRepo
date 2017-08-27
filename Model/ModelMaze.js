class ModelMaze extends ModelMessageSender
{
    constructor(logicMaze)
    {
        super('maze');
        //this.logicMaze = logicMaze;
        this.logicMaze = logicMaze;
        this.graphOfIntersections = this.createIntersectionFromMaze();
        /*just for test
        var listOfVertices = this.graphOfIntersections.listOfVertices;
        console.log(this.locateClosestVertex(0,3));
        for (var i = 0 ; i < listOfVertices.length ; i++)
        {
            console.log(listOfVertices[i]);
        }
        var vertexRoot = new Vertex(0,0);
        var vertexEnd = new Vertex(0,5);
        console.log(this.graphOfIntersections.dijkstra(vertexRoot,vertexEnd));*/
    }
    getMaze()
    {
        return this.logicMaze;
    }
    //Crée le graph des intersections a partir du labyrinthe.Check.
    createIntersectionFromMaze()
    {
        var graphOfIntersections = new Graph();
        var alreadySeen = new Array();
        var toBeTreated = new Array();
        var maze = this.logicMaze;
        var size = maze.length;
        var index = 1;
        var intersectionX = 0;
        var intersectionY = 0;
        var firstintersection = false;
        var box = this.isIntersection(intersectionX,intersectionY);
        //on commence par chercher la première intersection.
        while((box === null)&&(index<maze.length * maze[0].length))
        {
            intersectionY = index%size;
            intersectionX = (index - index%size)/size;
            box = this.isIntersection(intersectionX,intersectionY);
            index++;
        }
        //si il n'y a pas 
        if (box === null)
        {
            return graphOfIntersections;
        }
        //box contient ainsi la première intersection et intersectionX et instersectionY contiennenent respectivement l'abscisse et l'ordonnée de la dite intersection.
        var vertex = new Vertex(intersectionX,intersectionY);
        toBeTreated.push(vertex);
        alreadySeen.push(vertex);
        while (!toBeTreated.length == 0)
        {
            vertex = toBeTreated.pop();
            intersectionX = vertex.getX();
            intersectionY = vertex.getY();
            box = this.isIntersection(intersectionX,intersectionY);
            var snitch = 1;
            var newBox = null;
            if (box.right)
            {
                while ((intersectionY + snitch < maze[intersectionX].length)&&(newBox === null))
                {
                    newBox = this.isIntersection(intersectionX, intersectionY + snitch)
                    snitch ++;
                }
                snitch = snitch - 1;
                if (intersectionY + snitch < maze[intersectionX].length)
                {
                    // intersectionY + snitch est alors les coordonnées du prochain sommet à droite
                    var rightVertex = new Vertex(intersectionX,intersectionY + snitch);
                    if (!this.vertexIsInArray(alreadySeen,rightVertex))
                    {
                        alreadySeen.push(rightVertex);
                        toBeTreated.push(rightVertex);
                    }
                    //On ajoute alors l'arête au sommet correspondant.
                    var rightEdge = new Edge(vertex,rightVertex,'right');
                    vertex.addEdge(rightEdge); 
                }
            }
            snitch = 1;
            newBox = null;
            if (box.left)
            {
                while ((intersectionY - snitch >= 0)&&(newBox === null))
                {
                    newBox = this.isIntersection(intersectionX, intersectionY - snitch);
                    snitch++;
                }
                snitch = snitch - 1;
                if (intersectionY - snitch >= 0)
                {
                    // intersectionY + snitch est alors les coordonnées du prochain sommet à gauche
                    var leftVertex = new Vertex(intersectionX,intersectionY - snitch);
                    if (!this.vertexIsInArray(alreadySeen,leftVertex))
                    {
                        alreadySeen.push(leftVertex);
                        toBeTreated.push(leftVertex);
                    }
                    //On ajoute alors l'arête au sommet correspondant.
                    var leftEdge = new Edge(vertex,leftVertex,'left');
                    vertex.addEdge(leftEdge); 
                }
            }
            snitch = 1;
            newBox = null;
            if (box.down)
            {
                while ((intersectionX + snitch < maze.length)&&(newBox === null))
                {
                    newBox = this.isIntersection(intersectionX + snitch, intersectionY);
                    snitch ++;
                }
                snitch = snitch - 1;
                if (intersectionX + snitch < maze.length)
                {
                    // intersectionY + snitch est alors les coordonnées du prochain sommet à gauche
                    var downVertex = new Vertex(intersectionX + snitch,intersectionY);
                    if (!this.vertexIsInArray(alreadySeen,downVertex))
                    {
                        alreadySeen.push(downVertex);
                        toBeTreated.push(downVertex);
                    }
                    //On ajoute alors l'arête au sommet correspondant.
                    var downEdge = new Edge(vertex,downVertex,'down');
                    vertex.addEdge(downEdge); 
                }
            }
            snitch = 1;
            newBox = null;
            if (box.up)
            {
                while ((intersectionX - snitch >= 0)&&(newBox === null))
                {
                    newBox = this.isIntersection(intersectionX - snitch, intersectionY);
                    snitch ++;
                }
                snitch = snitch - 1;
                if (intersectionX - snitch >= 0)
                {
                    // intersectionY + snitch est alors les coordonnées du prochain sommet à gauche
                    var upVertex = new Vertex(intersectionX - snitch,intersectionY);
                    if (!this.vertexIsInArray(alreadySeen,upVertex))
                    {
                        alreadySeen.push(upVertex);
                        toBeTreated.push(upVertex);
                    }
                    //On ajoute alors l'arête au sommet correspondant.
                    var upEdge = new Edge(vertex,upVertex,'up');
                    vertex.addEdge(upEdge); 
                }
            }
            
            graphOfIntersections.addVertex(vertex);   
        }
        return graphOfIntersections;
    }
    //vérifie si une case est une intersection ou non.Check
    isIntersection(x,y)
    {
        var maze = this.logicMaze;
        var up = false;
        var down = false;
        var left = false;
        var right = false;
        
        if (x-1>=0)
        {
            up = maze[x-1][y];
        }
        if (x+1<maze.length)
        {
            down = maze[x+1][y];
        }
        if (y-1>=0)
        {
            left = maze[x][y-1];
        }
        if (y+1<maze[x].length)
        {
            right = maze[x][y+1];
        }
        var numberOfIntersections = 0;
        if (right)
        {
            numberOfIntersections++;
        }
        if (up)
        {
            numberOfIntersections++;
        }
        if (left)
        {
            numberOfIntersections++;
        }
        if (down)
        {
            numberOfIntersections++;
        }
        if ((right&&down)||(down&&left)||(left&&up)||(up&&right)||(numberOfIntersections > 2)||(numberOfIntersections === 1))
        {
            var intersections = {right : right, left : left, up : up, down : down};
            return intersections;
        }
        else
        {
            return null;
        }
        
    }
    vertexIsInArray(arrayToBeTested, vertex)
    {
        var found = false;
        for(var i = 0 ; i < arrayToBeTested.length ; i++)
        {
            found = found || arrayToBeTested[i].isEqualVertex(vertex);
        }
        return found;
    }
    locateClosestVertex(x,y)
    {
        var maze = this.logicMaze;
        var box = {down : (x+1<maze.length)&&(maze[x+1][y]), up : (x-1>=0)&&(maze[x-1][y]), left : (y-1>=0)&&(maze[x][y-1]), right : (y+1<maze[x].length)&&(maze[x][y+1])};
        var newBox = null;
        var score = 10000000;
        var currentScore = 1;
        var closestVertex = null;
        var direction;
        if (this.isIntersection(x,y)!=null)
        {
            direction = null;
            closestVertex = new Vertex(x,y);
            score = 0;
            //console.log("dessus," + score);
        }
        if(box.down)
        {
            while((newBox === null)&&(x+currentScore<maze.length))
            {
                newBox = this.isIntersection(x+currentScore,y);
                currentScore++;
            }
            currentScore = currentScore-1;
            if (currentScore < score)
            {
                score = currentScore;
                direction = 'up';
                closestVertex = new Vertex(x+currentScore,y);
                //console.log("down," + score);
                
                
            }
        }
        newBox = null;
        currentScore = 1;
        if(box.up)
        {
            while((newBox === null)&&(x-currentScore>=0))
            {
                newBox = this.isIntersection(x-currentScore,y);
                currentScore++;
            }
            currentScore = currentScore-1;
            if (currentScore < score)
            {
                score = currentScore;
                direction = 'down';
                closestVertex = new Vertex(x-currentScore,y);
                //console.log("up," + score);
            }
        }
        newBox = null;
        currentScore = 1;
        if(box.right)
        {
            while((newBox === null)&&(y+currentScore<maze[x].length))
            {
                newBox = this.isIntersection(x,y+currentScore);
                currentScore++;
            }
            currentScore = currentScore-1;
            if (currentScore < score)
            {
                score = currentScore;
                direction = 'left';
                closestVertex = new Vertex(x,y+currentScore);
                //console.log("right," + score);
            }
        }
        newBox = null;
        currentScore = 1;
        if(box.left)
        {
            while((newBox === null)&&(y-currentScore>=0))
            {
                newBox = this.isIntersection(x,y-currentScore);
                currentScore++;
            }
            currentScore = currentScore-1;
            if (currentScore < score)
            {
                score = currentScore;
                direction = 'right';
                closestVertex = new Vertex(x,y-currentScore);
                //console.log("left," + score);
            }
        }
        return {vertex : closestVertex, direction : direction};
    }
    askPermission(x,y)
    {
        var logicMaze = this.logicMaze;
        return (x>=0)&&(x<logicMaze.length)&&(y>=0)&&(y<logicMaze[x].length)&&(logicMaze[x][y]);
    }
    findBestPath(xGhost,yGhost,xPacman,yPacman)
    {
        var vertexOfGhost = new Vertex(xGhost,yGhost);
        var path = this.locateClosestVertex(xPacman,yPacman);
        var vertexOfPacman = path.vertex;
        var direction;
        if (vertexOfGhost.isEqualVertex(vertexOfPacman))
        {
            direction = path.direction;
        }
        else
        {
            direction = this.graphOfIntersections.dijkstra(vertexOfGhost,vertexOfPacman);
        }
        return direction;
    }
}