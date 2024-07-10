import { Graph } from "./adjacency_list";

function topologicalSort(graph) {
    const inDegree = new Map(); // 存储每个顶点的入度
    const queue = []; // 存储没有前驱（入度为 0）的顶点
    const result = []; // 存储排序结果

    // 初始化入度
    for ( let vertex of graph.vertices.keys() ) {
        inDegree.set(vertex, 0);
    }

    // 计算每个顶点的入度
    for ( let neighbors of graph.vertices.values() ) {
        for ( let neighbor of neighbors ) {
            inDegree.set(neighbor, inDegree.get(neighbor) + 1);
        }
    }

    // 将入度为 0 的顶点加入队列
    for ( let [vertex, degree] of inDegree ) {
        if ( degree === 0 ) {
            queue.push(vertex);
        }
    }

    while ( queue.length ) {
        let currentVertex = queue.shift();
        result.push(currentVertex);

        // 让当前顶点的所有邻接点的入度 -1
        for ( let neighbor of graph.vertices.get(currentVertex) ) {
            inDegree.set(neighbor, inDegree.get(neighbor) - 1);

            // 如果入度变为 0，加入队列
            if ( inDegree.get(neighbor) === 0 ) {
                queue.push(neighbor);
            }
        } // end for-loop
    } // end while-loop
    
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

console.log(topologicalSort(graph));