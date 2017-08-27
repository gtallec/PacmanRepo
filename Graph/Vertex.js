class Vertex
{
    constructor(x,y)
    {
        this.pi = null;
        this.pere = null;
        this.marked = false;
        this.x = x;
        this.y = y;
        this.listOfEdges = new Array();
    }
    getX()
    {
        return this.x;
    }
    getY()
    {
        return this.y;
    }
    addEdge(edge)
    {
        if (!this.listOfEdges.includes(edge))
        {
            this.listOfEdges.push(edge);
        }
    }
    getPi()
    {
        return this.pi;
    }
    setPi(pi)
    {
        this.pi = pi;
    }
    getPere()
    {
        return this.pere;
    }
    setPere(pere)
    {
        this.pere = pere;
    }
    isNotMarked()
    {
        return !this.marked;
    }
    getMark()
    {
        return this.marked;
    }
    mark()
    {
        this.marked = true;
    }
    isEqualVertex(vertex)
    {
        return (this.x === vertex.getX())&&(this.y === vertex.getY());
    }
    initialiseVertex()
    {
        this.pi = 100000;
        this.pere = null;
        this.marked = false;
    }
    getNeighbourHood()
    {
        var listOfEdges = this.listOfEdges;
        var listOfNeighbour = new Array();
        var neighbour;
        var edge;
        var oppositeVertex;
        for (var i = 0 ; i < listOfEdges.length ; i++)
        {
            edge = listOfEdges[i];
            oppositeVertex = edge.getOppositeVertex(this);
            neighbour = {vertex : oppositeVertex , edge : edge};
            listOfNeighbour.push(neighbour);
        }
        return listOfNeighbour;
    }

}