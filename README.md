# DSA Practice Repository

A comprehensive Data Structures and Algorithms learning resource in JavaScript, designed for interview preparation and mastering fundamental CS concepts.

## Contents

### 01. Complexity Analysis

| File                 | Topics Covered                                        |
| -------------------- | ----------------------------------------------------- |
| `bigONotation.js`    | Common complexities, analysis rules, comparison table |
| `timeComplexity.js`  | Loop patterns, recursion analysis, Master Theorem     |
| `spaceComplexity.js` | Auxiliary vs total space, space-time tradeoffs        |

### 02. Arrays and Strings

| File                    | Topics Covered                                |
| ----------------------- | --------------------------------------------- |
| `arrayFundamentals.js`  | Operations, traversals, prefix sum, 2D arrays |
| `stringManipulation.js` | String algorithms, pattern matching, KMP      |
| `arrayProblems.js`      | Two Sum, sliding window, Kadane's, intervals  |

### 03. Recursion

| File                   | Topics Covered                               |
| ---------------------- | -------------------------------------------- |
| `recursionBasics.js`   | Base/recursive cases, types of recursion     |
| `recursionPatterns.js` | Divide & conquer, accumulator pattern        |
| `backtracking.js`      | N-Queens, Sudoku, permutations, combinations |

### 04. Searching

| File                  | Topics Covered                            |
| --------------------- | ----------------------------------------- |
| `linearSearch.js`     | Linear search, optimizations, sentinel    |
| `binarySearch.js`     | Binary search, bounds, rotated arrays     |
| `searchVariations.js` | Jump, interpolation, exponential, ternary |

### 05. Sorting

| File                   | Topics Covered                                 |
| ---------------------- | ---------------------------------------------- |
| `bubbleSort.js`        | Basic and optimized bubble sort                |
| `selectionSort.js`     | Selection sort, stable variant                 |
| `insertionSort.js`     | Insertion sort, binary insertion               |
| `mergeSort.js`         | Recursive, iterative, hybrid, count inversions |
| `quickSort.js`         | Lomuto, Hoare, 3-way, median-of-three          |
| `heapSort.js`          | Heap sort with min/max variants                |
| `sortingComparison.js` | Counting, radix, bucket sort                   |

### 06. Linked Lists

| File                    | Topics Covered                             |
| ----------------------- | ------------------------------------------ |
| `singlyLinkedList.js`   | Operations, reversal, two-pointer patterns |
| `doublyLinkedList.js`   | DLL operations, LRU cache                  |
| `circularLinkedList.js` | Circular list, Josephus problem            |
| `linkedListProblems.js` | Merge lists, detect cycle, intersection    |

### 07. Stacks and Queues

| File                     | Topics Covered                         |
| ------------------------ | -------------------------------------- |
| `stackImplementation.js` | Stack, MinStack, monotonic stack       |
| `queueImplementation.js` | Queue, BFS, level order traversal      |
| `deque.js`               | Double-ended queue, sliding window max |
| `circularQueue.js`       | Circular queue implementation          |
| `stackQueueProblems.js`  | Valid parentheses, RPN, histogram      |

### 08. Hashing

| File                   | Topics Covered                            |
| ---------------------- | ----------------------------------------- |
| `hashTableBasics.js`   | Hash table with chaining, linear probing  |
| `hashFunctions.js`     | Hash functions, rolling hash (Rabin-Karp) |
| `collisionHandling.js` | Chaining, open addressing, double hashing |
| `hashingProblems.js`   | Two Sum, anagrams, frequency counting     |

### 09. Trees

| File                  | Topics Covered                                 |
| --------------------- | ---------------------------------------------- |
| `binaryTreeBasics.js` | Traversals, height, balance, symmetric         |
| `binarySearchTree.js` | BST operations, validation, LCA, kth element   |
| `treeTraversals.js`   | Iterative traversals, Morris traversal         |
| `balancedTrees.js`    | AVL tree rotations and balancing               |
| `treeProblems.js`     | Path sum, serialize, construct from traversals |

### 10. Heaps

| File               | Topics Covered                               |
| ------------------ | -------------------------------------------- |
| `heapBasics.js`    | Min/Max heap, bubble up/down, priority queue |
| `minMaxHeap.js`    | Build heap, heapify, kth element             |
| `priorityQueue.js` | Generic priority queue with comparator       |
| `heapProblems.js`  | Top K, merge K lists, median stream          |

### 11. Graphs

| File                     | Topics Covered                             |
| ------------------------ | ------------------------------------------ |
| `graphRepresentation.js` | Adjacency list vs matrix, when to use each |
| `bfsTraversal.js`        | BFS, shortest path, multi-source BFS       |
| `dfsTraversal.js`        | DFS, cycle detection, topological sort     |
| `shortestPath.js`        | Dijkstra, Bellman-Ford, Floyd-Warshall     |
| `graphProblems.js`       | Union-Find, connected components           |

### 12. Dynamic Programming

| File                   | Topics Covered                                |
| ---------------------- | --------------------------------------------- |
| `dpFundamentals.js`    | Memoization vs tabulation, space optimization |
| `memoization.js`       | Top-down patterns, state design               |
| `tabulation.js`        | Bottom-up, knapsack, LCS, edit distance       |
| `classicDPProblems.js` | House robber, coin change, LIS                |

### 13. Greedy Algorithms

| File                | Topics Covered                             |
| ------------------- | ------------------------------------------ |
| `greedyBasics.js`   | Greedy choice property, activity selection |
| `greedyProblems.js` | Jump game, gas station, meeting rooms      |

### 14. Advanced Techniques

| File                  | Topics Covered                            |
| --------------------- | ----------------------------------------- |
| `slidingWindow.js`    | Fixed/variable window, substring problems |
| `twoPointers.js`      | Opposite ends, fast/slow, 3-way partition |
| `bitManipulation.js`  | XOR tricks, bit counting, subsets         |
| `divideAndConquer.js` | Merge sort, quick select, closest pair    |

---

## File Structure

Each file follows a consistent structure:

```
1. CONCEPT          → Clear explanation of the topic
2. REAL-WORLD ANALOGY → Relatable everyday examples
3. INDUSTRY APPLICATIONS → Where it's used professionally
4. COMPLEXITY TABLE → Time and space analysis
5. CORE IMPLEMENTATION → Step-by-step code with comments
6. COMMON MISTAKES → Pitfalls to avoid
7. INTERVIEW PERSPECTIVE → What interviewers look for
8. PRACTICE PROBLEMS → Easy → Medium → Hard progression
9. SUMMARY → Quick reference cheat sheet
```

---

## How to Use

1. **Start with fundamentals** - Begin with complexity analysis
2. **Progress linearly** - Topics build upon each other
3. **Practice problems** - Each file includes problems with solutions
4. **Review patterns** - Focus on recognizing when to apply each technique
5. **Read the summaries** - Quick reference before interviews

---

## Quick Start

```bash
# Run any file to test the implementations
node 01-complexity-analysis/bigONotation.js

# Check syntax of all files
find . -name "*.js" -exec node --check {} \;

# Count total lines of code
find . -name "*.js" | xargs wc -l
```

---

## Recommended Study Order

| Phase  | Topics                       | Focus                                  |
| ------ | ---------------------------- | -------------------------------------- |
| **1**  | Complexity Analysis          | Understanding performance              |
| **2**  | Arrays & Strings             | Foundation of data manipulation        |
| **3**  | Recursion                    | Building block for advanced algorithms |
| **4**  | Searching & Sorting          | Classic algorithms                     |
| **5**  | Linked Lists, Stacks, Queues | Linear data structures                 |
| **6**  | Hashing                      | O(1) lookups                           |
| **7**  | Trees & Heaps                | Hierarchical structures                |
| **8**  | Graphs                       | Network problems                       |
| **9**  | Dynamic Programming          | Optimization problems                  |
| **10** | Greedy & Advanced            | Problem-solving techniques             |

---

## Pattern Recognition

| Keyword in Problem              | Likely Pattern                        |
| ------------------------------- | ------------------------------------- |
| "Sorted array"                  | Binary search, Two pointers           |
| "Contiguous subarray"           | Sliding window, Prefix sum            |
| "All permutations/combinations" | Backtracking                          |
| "Minimum/Maximum path"          | DP or Greedy                          |
| "Connected components"          | BFS/DFS, Union-Find                   |
| "Shortest path"                 | BFS (unweighted), Dijkstra (weighted) |
| "Top K elements"                | Heap                                  |
| "O(1) lookup"                   | Hash table                            |

---

## Interview Preparation Tips

- Master the **patterns**, not just individual problems
- Always discuss **trade-offs** between approaches
- Practice **explaining your thought process** aloud
- Start with a **brute force** solution, then optimize
- Consider **edge cases** before coding
- Know the **complexity** of your solution

---

## Statistics

- 14 topic folders
- 56 JavaScript files
- Comprehensive coverage from basics to advanced
- Practice problems at every difficulty level

---

Happy Learning!
