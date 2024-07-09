const array = [49, 38, 65, 97, 76, 13, 27, 49];

// 将 array[s...m] 调整为大顶堆
function heapAdjust(array, s, m) {
    let rc = array[s];
    for ( let j = 2*s + 1 ; j <= m ; j = 2*j + 1 ) {
        if ( j < m && array[j] < array[j + 1] ) {
            j++; // 找到更大的孩子结点
        }
        if ( rc >= array[j] ) {
            break; // 不用调整
        }
        array[s] = array[j];
        s = j;
    }
    array[s] = rc;
}

function heapSort(array) {
    for ( let i = Math.floor(array.length / 2) - 1 ; i >= 0 ; i-- ) {
        heapAdjust(array, i, array.length - 1);
    }
    for ( i = array.length - 1 ; i > 0 ; i-- ) {
        [array[0], array[i]] = [array[i], array[0]]; // 将堆中第一个元素与最后一个元素交换
        heapAdjust(array, 0, i - 1); // 重新调整
    }
    return array;
}

console.log(heapSort(array));