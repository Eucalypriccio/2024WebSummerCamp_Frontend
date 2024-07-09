const array = [49, 38, 65, 97, 76, 13, 27, 49];

function insertSort(array) {
    for ( let i = 1 ; i < array.length ; i++) {
        if ( array[i] < array[i - 1]) {
            let key = array[i];
            let j = i - 1;
            while ( j >= 0 && key < array[j] ) {
                array[j + 1] = array[j];
                j--;
            }
            array[j + 1] = key;
        }
    }
    return array;
}

console.log(insertSort(array));