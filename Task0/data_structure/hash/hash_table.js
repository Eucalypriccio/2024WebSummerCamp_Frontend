class HashTable {
    // 哈希表，表长为 size，存储所有键值对
    constructor( size ) {
        this.keyMap = new Array(size);
    }

    // 哈希函数，将 key 转换为 keyMap 中的哈希地址
    Hash(key) {
        return key % size;
    }

    // 添加键值对
    Add(key, value) {
        const index = this.Hash(key);

        // 使用链地址法解决冲突
        if ( !this.keyMap[index] ) {
            this.keyMap[index] = [];
        }
        this.keyMap[index].push([key, value]);
    }

    // 删除键值对
    Delete(key) {
        const index = this.Hash(key);

        if ( this.keyMap[index] ) {
            this.keyMap[index] = this.keyMap[index].filter(item => item[0] !== key);
        }
    }

    // 查找 key ，成功则返回其 value
    getValueByKey(key) {
        const index = this.Hash(key);

        if ( this.keyMap[index] ) {
            for ( let i = 0 ; i < this.keyMap[index].length ; i++ ) {
                if ( this.keyMap[index][i][0] === key ) {
                    return this.keyMap[index][i][1];
                }
            }
        }

        return undefined;
    }

    // 修改 key 的 value
    updateValueOfKey(key, newValue) {
        const index = this.Hash(key);

        for ( let i = 0 ; i < this.keyMap[index].length ; i++ ) {
            if ( this.keyMap[index][i][0] === key ) {
                this.keyMap[index][i][1] = newValue;
            }
        }
    }

    // 打印哈希表（只打印 key）
    printHashTable(size) {
        for ( let i = 0 ; i < size ; i++ ) {
            let keys = [];

            if ( this.keyMap[i] ) {
                for ( let j = 0 ; j < this.keyMap[i].length ; j++ ) {
                    keys.push(ht.keyMap[i][j][0]);
                }
                console.log(`${i}: [${keys.join(', ')}]`);
            }
            else {
                console.log(`${i}: ^`);
            }
        }
    }
}

// test
let size = 13;
let ht = new HashTable(size);
ht.Add(19, 19);
ht.Add(14, 14);
ht.Add(23, 23);
ht.Add(1, 1);
ht.Add(68, 68);
ht.Add(20, 20);
ht.Add(84, 84);
ht.Add(27, 27);
ht.Add(55, 55);
ht.Add(11, 11);
ht.Add(10, 10);
ht.Add(79, 79);

ht.printHashTable(size);