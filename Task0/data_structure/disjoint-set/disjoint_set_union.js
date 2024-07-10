class DisjointSet {
    constructor(n) {
        this.parent = new Array(n);
        for ( let i = 0 ; i < this.parent.length ; i++ ) {
            this.parent[i] = i;
        }

        this.rank = new Array(n).fill(0);
    }

    // 路径压缩实现查找
    Search(node) {
        if ( this.parent[node] !== node ) {
            this.parent[node] = this.Search(this.parent[node]);
        }

        return this.parent[node];
    }

    // 按秩合并
    Union(node1, node2) {
        const root1 = this.Search(node1);
        const root2 = this.Search(node2);

        if ( root1 === root2 ) {
            return;
        }

        if ( this.rank[root1] < this.rank[root2] ) {
            this.parent[root1] = root2
        }
        else if ( this.rank[root1] > this.rank[root2] ) {
            this.parent[root2] = root1;
        }
        else {
            this.parent[root1] = root2;
            this.rank[root2]++;
        }
    }
}

// test
const ds = new DisjointSet(5);

console.log(ds.Search(0));

ds.Union(0, 1);
ds.Union(2, 3);

console.log(ds.Search(1));
console.log(ds.Search(3));

ds.Union(1, 3);

console.log(ds.Search(0));
console.log(ds.Search(2));