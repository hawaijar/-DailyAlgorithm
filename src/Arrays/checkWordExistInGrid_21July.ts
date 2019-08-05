/* Given a 2D board of characters and a word, find if the word exists in the grid.
 The word can be constructed from letters of sequentially adjacent cell, where "adjacent" cells are those horizontally or vertically neighboring. The same letter cell may not be used more than once.
 For example, given the following board:
 [
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
]
exists(board, "ABCCED") returns true, exists(board, "SEE") returns true, exists(board, "ABCB") returns false.*/
/*
 * Approach: The idea used here is described in the steps below:
   Check every cell, if the cell has first character, then recur one by one and try all 4 directions from that cell for a match.
   Mark the position in the grid as visited and recur in the 4 possible directions.
   After recurring, again mark the position as unvisited.
   Once all the letters in the word is matched, return true.
   Source: https://www.geeksforgeeks.org/check-if-a-word-exists-in-a-grid-or-not/
 */
/*
 * Solving non-recursively:
 * 1. At each step, we look at the last point in the list, and see if there's a conenction to the unvisited list
 * 2. If we find an univisited connection, we add the conenction point to the path list and visited set
 *
 */

function isExist(board: number[][], word: string): boolean{
    
    return false;
}

