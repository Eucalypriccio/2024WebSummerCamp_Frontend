export class Graph {
    constructor() {
        this.vertices = new Map(); // 键：顶点 值：顶点的邻接表数组
    }

    // 添加顶点
    addVertex(vertex) {
        // 如果顶点中没有 vertex
        if ( !this.vertices.has(vertex) ) {
            this.vertices.set(vertex, []);
        }
    }

    // 添加边
    // fromVertex：弧尾 toVertex：弧头
    addEdge(fromVertex, toVertex) {
        if ( !this.vertices.has(fromVertex) ) {
            this.addVertex(fromVertex);
        }
        if ( !this.vertices.has(toVertex) ) {
            this.addVertex(toVertex);
        }

        this.vertices.get(fromVertex).push(toVertex);
    }

    // 打印图的邻接表表示
    printGraph() {
        for ( const [vertex, neighbors] of this.vertices.entries() ) {
            console.log(`${vertex} -> ${neighbors.join(' ')}`);
        }
    }
}

// test
const graph = new Graph();
graph.addEdge('A', 'C');
graph.addEdge('B', 'C');
graph.addEdge('B', 'D');
graph.addEdge('C', 'E');
graph.addEdge('D', 'F');
graph.addEdge('E', 'H');
graph.addEdge('E', 'F');
graph.addEdge('F', 'G');

graph.printGraph();