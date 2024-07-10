import { Graph } from "./adjacency_list";

function BFS(graph, startVertex) {
    const visitedVertex = new Set(); // 存储已被访问过的顶点
    const result = []; // 存储遍历结果
    const queue = [startVertex]; // 借助队列实现
    visitedVertex.add(startVertex);

    while ( queue.length ) {
        let currentVertex = queue.shift();
        result.push(currentVertex);

        let neighbors = graph.vertices.get(currentVertex);
        for ( let neighbor of neighbors ) {
            if ( !visitedVertex.has(neighbor) ) {
                result.add(neighbor);
                queue.push(neighbor);
            }
        }
    }

    return result;
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

console.log(BFS(graph));