import { Graph } from "./adjacency_list";

function DFS(graph,startVertex) {
    const visitedVertex = new Set(); // 存储已被访问过的顶点
    const result = []; // 存储遍历结果

    function Traverse(vertex) {
        visitedVertex.add(vertex);
        result.push(vertex);

        let neighbors = graph.vertices.get(vertex); // 获取当前顶点的所有邻接点
        for ( let neighbor of neighbors ) {
            // 如果该邻接点没有被访问过
            if ( !visitedVertex.has(neighbor) ) {
                Traverse(neighbor); // 递归遍历
            }
        }
    }

    Traverse(startVertex);

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

console.log(DFS(graph, 'A'));