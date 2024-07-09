const array = [49, 38, 65, 97, 76, 13, 27, 49];

// 将有序子表 leftArray 和 rightArray 合并为一个有序表
function Merge(leftArray, rightArray) {
    const result = [];
    let i = 0;
    let j = 0;

    while ( i < leftArray.length && j < rightArray.length ) {
        if ( leftArray[i] < rightArray[j] ) {
            result.push(leftArray[i++]);
        }
        else {
            result.push(rightArray[j++]);
        }
    }

    // 将其中一个子表的剩余部分添加到结果数组中
    while ( i < leftArray.length ) {
        result.push(leftArray[i++]);
    }
    while ( j < rightArray.length ) {
        result.push(rightArray[j++]);
    }

    return result;
}

function mergeSort(array) {
    if ( array.length <= 1 ) {
        return array;
    }

    const mid = Math.floor(array.length / 2); // 将数组分为两部分
    const leftArray = mergeSort(array.slice(0, mid)); // 对左半部分排序
    const rightArray = mergeSort(array.slice(mid)); // 对右半部分排序

    return(Merge(leftArray, rightArray));
}

console.log(mergeSort(array));