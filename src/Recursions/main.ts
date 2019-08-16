/** Divide the area into evenly square plots such that each plot is the largest possible */

function findLargestPlot(length: number, breadth: number): number {
    /** base case */
    if (length === breadth) {
        return length;
    }
    /** recursive case */
    if (length > breadth) {
        return findLargestPlot(length - breadth, breadth);
    }
    else {
        return findLargestPlot(length, breadth - length)
    }
}

console.log(findLargestPlot(640, 640))