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

function quickSort<T>(array: T[]): T[] {
    /** base case */
    if (array.length <= 2) {
        if (array.length < 2) return array;
        if (array[0] > array[1]) {
            [array[0], array[1]] = [array[1], array[0]];
            return array;
        }
        return array;
    }
    /** recursive case */
    let pivot = array[array.length - 1];
    let smallest = array.filter(x => x < pivot);
    let largest = array.filter(x => x > pivot);
    return [...quickSort(smallest), pivot, ...quickSort(largest)]
}

let array = [2, 40, 1, 7, 3, 9, 12, 0];
console.log(selectionSort([...array]))
console.log(quickSort([...array]))