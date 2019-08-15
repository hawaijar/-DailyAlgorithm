/** Selection Sort - Pick the first smallest, then the next and so on... */

function smallestFromArray<T>(array: T[]) {
    let smallest = array[0];
    for (let i = 1; i < array.length; i++) {
        if (array[i] <= smallest) {
            smallest = array[i];
            [array[0], array[i]] = [array[i], array[0]];
        }
    }
    return array;
}

function selectionSort<T>(array: T[]) {
    let size = array.length;
    let result = [];
    for (let i = 0; i < size; i++) {
        let small = smallestFromArray(array).shift()!;
        result.push(small);
    }
    return result;
}

let array = [2, 40, 1, 7, 3, 9, 12];
console.log(selectionSort(array))