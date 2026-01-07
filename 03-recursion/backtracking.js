/**
 * ============================================
 * BACKTRACKING
 * ============================================
 * 
 * CONCEPT:
 * Backtracking is a systematic way to explore all possible solutions
 * by building candidates incrementally and abandoning a candidate
 * ("backtracking") as soon as it's determined it cannot lead to a valid solution.
 * 
 * REAL-WORLD ANALOGY:
 * Like solving a maze:
 * - At each intersection, choose a path
 * - If you hit a dead end, go back (backtrack) and try another path
 * - Continue until you find the exit or exhaust all paths
 * 
 * INDUSTRY APPLICATIONS:
 * - Puzzle solving (Sudoku, N-Queens, crosswords)
 * - Constraint satisfaction problems
 * - Game AI (chess move exploration)
 * - Compiler optimization
 * - Network routing
 */

// ============================================
// 1. BACKTRACKING TEMPLATE
// ============================================

/**
 * General Backtracking Template:
 * 
 * function backtrack(candidate) {
 *     if (isValidSolution(candidate)) {
 *         output(candidate);
 *         return;
 *     }
 *     
 *     for (choice of availableChoices(candidate)) {
 *         if (isPromising(choice)) {
 *             makeChoice(choice);
 *             backtrack(newCandidate);
 *             undoChoice(choice);  // BACKTRACK
 *         }
 *     }
 * }
 */

// ============================================
// 2. CLASSIC PROBLEMS - N QUEENS
// ============================================

/**
 * N-Queens Problem
 * Place N queens on NxN chessboard so no two attack each other
 */
function solveNQueens(n) {
    const solutions = [];
    const board = Array(n).fill(null).map(() => Array(n).fill('.'));
    
    backtrackQueens(board, 0, solutions);
    return solutions;
}

function backtrackQueens(board, row, solutions) {
    const n = board.length;
    
    // Base case: all queens placed
    if (row === n) {
        solutions.push(board.map(r => r.join('')));
        return;
    }
    
    // Try placing queen in each column
    for (let col = 0; col < n; col++) {
        if (isSafeQueen(board, row, col)) {
            board[row][col] = 'Q';           // Make choice
            backtrackQueens(board, row + 1, solutions);
            board[row][col] = '.';           // Backtrack
        }
    }
}

function isSafeQueen(board, row, col) {
    const n = board.length;
    
    // Check column above
    for (let i = 0; i < row; i++) {
        if (board[i][col] === 'Q') return false;
    }
    
    // Check upper-left diagonal
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] === 'Q') return false;
    }
    
    // Check upper-right diagonal
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
        if (board[i][j] === 'Q') return false;
    }
    
    return true;
}

/**
 * Count N-Queens solutions only
 */
function countNQueens(n) {
    let count = 0;
    const columns = new Set();
    const diag1 = new Set(); // row - col
    const diag2 = new Set(); // row + col
    
    function backtrack(row) {
        if (row === n) {
            count++;
            return;
        }
        
        for (let col = 0; col < n; col++) {
            if (columns.has(col) || diag1.has(row - col) || diag2.has(row + col)) {
                continue;
            }
            
            columns.add(col);
            diag1.add(row - col);
            diag2.add(row + col);
            
            backtrack(row + 1);
            
            columns.delete(col);
            diag1.delete(row - col);
            diag2.delete(row + col);
        }
    }
    
    backtrack(0);
    return count;
}

// ============================================
// 3. SUDOKU SOLVER
// ============================================

/**
 * Sudoku Solver
 * Fill 9x9 grid so each row, column, and 3x3 box contains 1-9
 */
function solveSudoku(board) {
    backtrackSudoku(board);
    return board;
}

function backtrackSudoku(board) {
    const empty = findEmpty(board);
    if (!empty) return true; // Puzzle solved
    
    const [row, col] = empty;
    
    for (let num = 1; num <= 9; num++) {
        const char = String(num);
        
        if (isValidSudoku(board, row, col, char)) {
            board[row][col] = char;
            
            if (backtrackSudoku(board)) {
                return true;
            }
            
            board[row][col] = '.'; // Backtrack
        }
    }
    
    return false;
}

function findEmpty(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === '.') {
                return [i, j];
            }
        }
    }
    return null;
}

function isValidSudoku(board, row, col, char) {
    // Check row
    for (let j = 0; j < 9; j++) {
        if (board[row][j] === char) return false;
    }
    
    // Check column
    for (let i = 0; i < 9; i++) {
        if (board[i][col] === char) return false;
    }
    
    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    
    for (let i = boxRow; i < boxRow + 3; i++) {
        for (let j = boxCol; j < boxCol + 3; j++) {
            if (board[i][j] === char) return false;
        }
    }
    
    return true;
}

// ============================================
// 4. PERMUTATIONS AND COMBINATIONS
// ============================================

/**
 * Permutations with duplicates handling
 */
function permuteUnique(nums) {
    const result = [];
    nums.sort((a, b) => a - b);
    const used = new Array(nums.length).fill(false);
    
    function backtrack(current) {
        if (current.length === nums.length) {
            result.push([...current]);
            return;
        }
        
        for (let i = 0; i < nums.length; i++) {
            // Skip used or duplicate
            if (used[i] || (i > 0 && nums[i] === nums[i-1] && !used[i-1])) {
                continue;
            }
            
            used[i] = true;
            current.push(nums[i]);
            backtrack(current);
            current.pop();
            used[i] = false;
        }
    }
    
    backtrack([]);
    return result;
}

/**
 * Combinations with target sum (can reuse elements)
 */
function combinationSum(candidates, target) {
    const result = [];
    
    function backtrack(remaining, combo, start) {
        if (remaining === 0) {
            result.push([...combo]);
            return;
        }
        
        for (let i = start; i < candidates.length; i++) {
            if (candidates[i] > remaining) continue;
            
            combo.push(candidates[i]);
            backtrack(remaining - candidates[i], combo, i); // Same i = can reuse
            combo.pop();
        }
    }
    
    candidates.sort((a, b) => a - b);
    backtrack(target, [], 0);
    return result;
}

/**
 * Combinations with target sum (no reuse, duplicates in input)
 */
function combinationSum2(candidates, target) {
    const result = [];
    
    function backtrack(remaining, combo, start) {
        if (remaining === 0) {
            result.push([...combo]);
            return;
        }
        
        for (let i = start; i < candidates.length; i++) {
            // Skip duplicates at same level
            if (i > start && candidates[i] === candidates[i-1]) continue;
            if (candidates[i] > remaining) break;
            
            combo.push(candidates[i]);
            backtrack(remaining - candidates[i], combo, i + 1); // i+1 = no reuse
            combo.pop();
        }
    }
    
    candidates.sort((a, b) => a - b);
    backtrack(target, [], 0);
    return result;
}

// ============================================
// 5. SUBSET PROBLEMS
// ============================================

/**
 * Subsets with duplicates
 */
function subsetsWithDup(nums) {
    const result = [];
    nums.sort((a, b) => a - b);
    
    function backtrack(start, current) {
        result.push([...current]);
        
        for (let i = start; i < nums.length; i++) {
            // Skip duplicates
            if (i > start && nums[i] === nums[i-1]) continue;
            
            current.push(nums[i]);
            backtrack(i + 1, current);
            current.pop();
        }
    }
    
    backtrack(0, []);
    return result;
}

/**
 * Partition to K equal sum subsets
 */
function canPartitionKSubsets(nums, k) {
    const total = nums.reduce((a, b) => a + b, 0);
    if (total % k !== 0) return false;
    
    const target = total / k;
    nums.sort((a, b) => b - a); // Sort descending for pruning
    const used = new Array(nums.length).fill(false);
    
    function backtrack(index, count, currentSum) {
        if (count === k) return true;
        
        if (currentSum === target) {
            return backtrack(0, count + 1, 0);
        }
        
        for (let i = index; i < nums.length; i++) {
            if (used[i] || currentSum + nums[i] > target) continue;
            
            // Skip duplicates
            if (i > 0 && nums[i] === nums[i-1] && !used[i-1]) continue;
            
            used[i] = true;
            if (backtrack(i + 1, count, currentSum + nums[i])) {
                return true;
            }
            used[i] = false;
        }
        
        return false;
    }
    
    return backtrack(0, 0, 0);
}

// ============================================
// 6. PATH FINDING
// ============================================

/**
 * Find all paths from top-left to bottom-right
 */
function findAllPaths(grid) {
    const paths = [];
    const m = grid.length, n = grid[0].length;
    
    function backtrack(row, col, path) {
        if (row === m - 1 && col === n - 1) {
            paths.push([...path, grid[row][col]]);
            return;
        }
        
        path.push(grid[row][col]);
        
        // Move right
        if (col + 1 < n) {
            backtrack(row, col + 1, path);
        }
        
        // Move down
        if (row + 1 < m) {
            backtrack(row + 1, col, path);
        }
        
        path.pop();
    }
    
    backtrack(0, 0, []);
    return paths;
}

/**
 * Word Search in 2D grid
 */
function exist(board, word) {
    const m = board.length, n = board[0].length;
    
    function backtrack(row, col, index) {
        if (index === word.length) return true;
        
        if (row < 0 || row >= m || col < 0 || col >= n) return false;
        if (board[row][col] !== word[index]) return false;
        
        const temp = board[row][col];
        board[row][col] = '#'; // Mark visited
        
        const found = backtrack(row + 1, col, index + 1) ||
                      backtrack(row - 1, col, index + 1) ||
                      backtrack(row, col + 1, index + 1) ||
                      backtrack(row, col - 1, index + 1);
        
        board[row][col] = temp; // Backtrack
        return found;
    }
    
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (backtrack(i, j, 0)) return true;
        }
    }
    
    return false;
}

/**
 * Rat in a Maze - find all paths
 */
function ratInMaze(maze) {
    const n = maze.length;
    const paths = [];
    const visited = Array(n).fill(null).map(() => Array(n).fill(false));
    
    function backtrack(row, col, path) {
        if (row === n - 1 && col === n - 1) {
            paths.push(path);
            return;
        }
        
        // Directions: Down, Left, Right, Up
        const moves = [
            [1, 0, 'D'],
            [0, -1, 'L'],
            [0, 1, 'R'],
            [-1, 0, 'U']
        ];
        
        for (const [dr, dc, dir] of moves) {
            const newRow = row + dr;
            const newCol = col + dc;
            
            if (newRow >= 0 && newRow < n && 
                newCol >= 0 && newCol < n &&
                maze[newRow][newCol] === 1 && 
                !visited[newRow][newCol]) {
                
                visited[newRow][newCol] = true;
                backtrack(newRow, newCol, path + dir);
                visited[newRow][newCol] = false;
            }
        }
    }
    
    if (maze[0][0] === 1) {
        visited[0][0] = true;
        backtrack(0, 0, '');
    }
    
    return paths;
}

// ============================================
// 7. STRING PROBLEMS
// ============================================

/**
 * Palindrome Partitioning
 * Partition string so every substring is a palindrome
 */
function partition(s) {
    const result = [];
    
    function backtrack(start, current) {
        if (start === s.length) {
            result.push([...current]);
            return;
        }
        
        for (let end = start + 1; end <= s.length; end++) {
            const substring = s.slice(start, end);
            
            if (isPalindrome(substring)) {
                current.push(substring);
                backtrack(end, current);
                current.pop();
            }
        }
    }
    
    backtrack(0, []);
    return result;
}

function isPalindrome(str) {
    let left = 0, right = str.length - 1;
    while (left < right) {
        if (str[left++] !== str[right--]) return false;
    }
    return true;
}

/**
 * Generate all IP addresses from string
 */
function restoreIpAddresses(s) {
    const result = [];
    
    function backtrack(start, parts) {
        if (parts.length === 4) {
            if (start === s.length) {
                result.push(parts.join('.'));
            }
            return;
        }
        
        for (let len = 1; len <= 3; len++) {
            if (start + len > s.length) break;
            
            const segment = s.slice(start, start + len);
            
            // Validate segment
            if (segment.length > 1 && segment[0] === '0') break;
            if (parseInt(segment) > 255) break;
            
            parts.push(segment);
            backtrack(start + len, parts);
            parts.pop();
        }
    }
    
    backtrack(0, []);
    return result;
}

// ============================================
// 8. CONSTRAINT SATISFACTION
// ============================================

/**
 * Graph Coloring
 * Can we color graph with m colors so no adjacent vertices share color?
 */
function graphColoring(graph, m) {
    const n = graph.length;
    const colors = new Array(n).fill(0);
    
    function isSafe(vertex, color) {
        for (let i = 0; i < n; i++) {
            if (graph[vertex][i] && colors[i] === color) {
                return false;
            }
        }
        return true;
    }
    
    function backtrack(vertex) {
        if (vertex === n) return true;
        
        for (let color = 1; color <= m; color++) {
            if (isSafe(vertex, color)) {
                colors[vertex] = color;
                
                if (backtrack(vertex + 1)) return true;
                
                colors[vertex] = 0;
            }
        }
        
        return false;
    }
    
    return backtrack(0) ? colors : null;
}

/**
 * Knight's Tour
 * Find path for knight to visit every square exactly once
 */
function knightTour(n) {
    const board = Array(n).fill(null).map(() => Array(n).fill(-1));
    
    // Knight moves
    const moves = [
        [2, 1], [1, 2], [-1, 2], [-2, 1],
        [-2, -1], [-1, -2], [1, -2], [2, -1]
    ];
    
    function isSafe(row, col) {
        return row >= 0 && row < n && col >= 0 && col < n && board[row][col] === -1;
    }
    
    function backtrack(row, col, moveNum) {
        board[row][col] = moveNum;
        
        if (moveNum === n * n - 1) return true;
        
        for (const [dr, dc] of moves) {
            const newRow = row + dr;
            const newCol = col + dc;
            
            if (isSafe(newRow, newCol)) {
                if (backtrack(newRow, newCol, moveNum + 1)) {
                    return true;
                }
            }
        }
        
        board[row][col] = -1; // Backtrack
        return false;
    }
    
    if (backtrack(0, 0, 0)) {
        return board;
    }
    return null;
}

// ============================================
// 9. PRACTICE PROBLEMS
// ============================================

/**
 * Problem 1 (Medium): Generate all possible expressions
 * Insert +, -, or nothing between digits to reach target
 */
function addOperators(num, target) {
    const result = [];
    
    function backtrack(index, path, evaluated, prevOperand) {
        if (index === num.length) {
            if (evaluated === target) {
                result.push(path);
            }
            return;
        }
        
        for (let i = index; i < num.length; i++) {
            // No leading zeros
            if (i > index && num[index] === '0') break;
            
            const current = num.slice(index, i + 1);
            const currentNum = parseInt(current);
            
            if (index === 0) {
                backtrack(i + 1, current, currentNum, currentNum);
            } else {
                // Addition
                backtrack(i + 1, path + '+' + current, 
                         evaluated + currentNum, currentNum);
                
                // Subtraction
                backtrack(i + 1, path + '-' + current, 
                         evaluated - currentNum, -currentNum);
                
                // Multiplication (handle precedence)
                backtrack(i + 1, path + '*' + current,
                         evaluated - prevOperand + prevOperand * currentNum,
                         prevOperand * currentNum);
            }
        }
    }
    
    backtrack(0, '', 0, 0);
    return result;
}

/**
 * Problem 2 (Hard): Word Ladder with all shortest paths
 */
function findLadders(beginWord, endWord, wordList) {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return [];
    
    const result = [];
    const queue = [[beginWord]];
    const visited = new Set([beginWord]);
    let found = false;
    
    while (queue.length && !found) {
        const levelVisited = new Set();
        const levelSize = queue.length;
        
        for (let i = 0; i < levelSize; i++) {
            const path = queue.shift();
            const word = path[path.length - 1];
            
            for (let j = 0; j < word.length; j++) {
                for (let c = 97; c <= 122; c++) {
                    const newWord = word.slice(0, j) + String.fromCharCode(c) + word.slice(j + 1);
                    
                    if (newWord === endWord) {
                        result.push([...path, endWord]);
                        found = true;
                    } else if (wordSet.has(newWord) && !visited.has(newWord)) {
                        levelVisited.add(newWord);
                        queue.push([...path, newWord]);
                    }
                }
            }
        }
        
        for (const word of levelVisited) {
            visited.add(word);
        }
    }
    
    return result;
}

module.exports = {
    solveNQueens,
    countNQueens,
    solveSudoku,
    permuteUnique,
    combinationSum,
    combinationSum2,
    subsetsWithDup,
    canPartitionKSubsets,
    findAllPaths,
    exist,
    ratInMaze,
    partition,
    restoreIpAddresses,
    graphColoring,
    knightTour,
    addOperators,
    findLadders
};
