
class Graph
{
    constructor()
    {
        this.listOfVertices = new Array();
        this.numberOfVertices = 0;
    }
    //Renvoie la direction que le fantome doit prendre à l'intersection
    dijkstra(root, end)
    {
        //réinitialise tous les sommets avant d'appliquer dijkstra
        var root = this.findMatchingVertex(root);
        var end = this.findMatchingVertex(end);
        for(var i = 0 ; i < this.numberOfVertices ; i++)
        {
           this.listOfVertices[i].initialiseVertex();
        }
        var pivot = root;
        var piPivot = 0;
        pivot.setPi(piPivot);
        pivot.mark();
        while((pivot !== end)&&(this.firstUnmarkedVertex != null))
        {
            //Relache les voisins.
            var neighbourHood = pivot.getNeighbourHood();
            for(var i = 0 ; i < neighbourHood.length ; i++)
            {
                var neighbour = neighbourHood[i];
                var weight = neighbour.edge.getDistance();
                var pi = neighbour.vertex.getPi();
                if(piPivot + weight <= pi)
                {
                    neighbour.vertex.setPi(piPivot + weight);
                    neighbour.vertex.setPere(neighbour.edge);
                }   
            }
            //trouve le nouveau pivot.
            var vertex = this.firstUnmarkedVertex();
            pi = vertex.getPi();
            piPivot = pi;
            pivot = vertex;
            for(var i = 0 ; i < this.listOfVertices.length ; i++)
            {
                vertex = this.listOfVertices[i];
                if (vertex.isNotMarked())
                {
                    pi = vertex.getPi();
                    if (pi < piPivot)
                    {
                        piPivot = pi;
                        pivot = vertex;
                    }
                }
            }
            pivot.mark();
        }
        //depile le chemin de manière à faire choisir la bonne direction
        var father = pivot.getPere();
        while ((!father.isLinkedTo(root)))
        {
            pivot = father.getOppositeVertex(pivot);
            father = pivot.getPere()
        }
        return father.getDirection();      
    }  
    addVertex(vertex)
    {
        this.listOfVertices.push(vertex);
        this.numberOfVertices++;
    }
    findMatchingVertex(vertex)
    {
        var xVertex = vertex.getX();
        var yVertex = vertex.getY();
        var listOfVertices = this.listOfVertices;
        var i = 0;
        var found = false;
        var vertex;
        while((i<listOfVertices.length)&&(!found))
        {
            vertex = listOfVertices[i];   
            found = (xVertex === vertex.getX())&&(yVertex === vertex.getY());
            i++;
        }
        if(found)
        {
            return listOfVertices[i-1];
        }
        return null;
    }
    firstUnmarkedVertex()
    {
        var listOfVertices = this.listOfVertices;
        var found = false;
        var j = 0;
        while ((j < listOfVertices.length)&&(!found))
        {
            found = (found) || (!listOfVertices[j].getMark());
            j++;
        }
        if(found)
        {
            return listOfVertices[j-1];
        }
        return null;
    }
    

}