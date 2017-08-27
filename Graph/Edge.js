class Edge
{
    constructor(vertexInit,vertexEnd,direction)
    {
        this.vertexInit = vertexInit;
        this.vertexEnd = vertexEnd;
        var xInit = vertexInit.getX();
        var yInit = vertexInit.getY();
        var xEnd = vertexEnd.getX();
        var yEnd = vertexEnd.getY();
        this.distance = Math.abs(xEnd-xInit) + Math.abs(yEnd-yInit);
        this.direction = direction;
    }
    getDistance()
    {
        return this.distance;
    }
    getOppositeVertex(vertex)
    {
        if (this.vertexInit === vertex)
        {
            return this.vertexEnd;
        }
        else
        {
            return this.vertexInit;
        }
    }
    getInitVertex()
    {
        return this.vertexInit;
    }
    getEndVertex()
    {
        return this.vertexEnd;
    }
    isLinkedTo(vertex)
    {
        return (vertex === this.vertexInit)
    }
    getDirection()
    {
        return this.direction;
    }
}