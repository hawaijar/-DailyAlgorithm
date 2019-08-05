// Given an integer n and a list of integers l, write a function that randomly generates a number
// from 0 to n-1 that isn't in l (uniform).

function randomNumber(n: number, l: Array<number>): number {
    let availableNumbers = [];
    // find the numbers in (0, n-1) that's not in the array 'l'
    for (let i = 0; i < n; i++) {
        if (!l.includes(i)) {
            availableNumbers.push(i);
        }
    }

    // generate the random number from 'availableNumbers'

    let index = Math.floor(Math.random() * availableNumbers.length);
    return availableNumbers[index];
}

console.log(randomNumber(15, [2, 6, 8, 9]))