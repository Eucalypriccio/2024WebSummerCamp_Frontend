const array = [49, 38, 65, 97, 76, 13, 27, 49];

function Partition(array, low, high) {
    let pivot = array[low];
    while ( low < high ) {
        while ( low < high && array[high] >= pivot ) {
            high--;
        }
        array[low] = array[high];
        while ( low < high && array[low] <= pivot ) {
            low++;
        }
        array[high] = array[low];
    }
    array[low] = pivot;
    return low;
}

function quickSort(array, low, high) {
    if ( low < high ) {
        let pivotLoc = Partition(array, low, high);
        quickSort(array, low, pivotLoc - 1);
        quickSort(array, pivotLoc + 1, high);
    }
    return array;
}

console.log(quickSort(array, 0, array.length - 1));