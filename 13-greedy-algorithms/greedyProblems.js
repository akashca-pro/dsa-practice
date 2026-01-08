/**
 * ============================================
 * GREEDY ALGORITHM PROBLEMS - COMPREHENSIVE GUIDE
 * ============================================
 * 
 * LEARNING ORDER:
 * 1. Interval Problems
 * 2. Array Greedy
 * 3. String Greedy
 * 4. Task Scheduling
 */

// ============================================
// CATEGORY 1: INTERVAL PROBLEMS
// ============================================

/**
 * REAL-WORLD EXAMPLES:
 * - Meeting room scheduling
 * - Job scheduling
 * - Event planning
 * 
 * KEY INSIGHT: Usually sort by start or end time
 */

// ------------------------------------------
// 1.1 ACTIVITY SELECTION / NON-OVERLAPPING INTERVALS
// ------------------------------------------

/**
 * Problem: Maximum number of non-overlapping intervals
 * 
 * Greedy choice: Always pick interval that ends earliest
 */
function eraseOverlapIntervals(intervals) {
    if (intervals.length <= 1) return 0;
    
    // Sort by end time
    intervals.sort((a, b) => a[1] - b[1]);
    
    let count = 0;
    let prevEnd = intervals[0][1];
    
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < prevEnd) {
            count++; // Remove this interval
        } else {
            prevEnd = intervals[i][1];
        }
    }
    
    return count;
}

/**
 * RELATED QUESTIONS:
 * - Non-overlapping Intervals (LeetCode 435)
 * - Meeting Rooms (LeetCode 252)
 * - Meeting Rooms II (LeetCode 253)
 */

// ------------------------------------------
// 1.2 MERGE INTERVALS
// ------------------------------------------

function merge(intervals) {
    if (intervals.length <= 1) return intervals;
    
    intervals.sort((a, b) => a[0] - b[0]);
    
    const result = [intervals[0]];
    
    for (let i = 1; i < intervals.length; i++) {
        const last = result[result.length - 1];
        
        if (intervals[i][0] <= last[1]) {
            last[1] = Math.max(last[1], intervals[i][1]);
        } else {
            result.push(intervals[i]);
        }
    }
    
    return result;
}

// ------------------------------------------
// 1.3 MINIMUM ARROWS TO BURST BALLOONS
// ------------------------------------------

/**
 * Problem: Minimum arrows to burst all balloons
 * 
 * Same as finding maximum non-overlapping intervals
 */
function findMinArrowShots(points) {
    if (!points.length) return 0;
    
    points.sort((a, b) => a[1] - b[1]);
    
    let arrows = 1;
    let prevEnd = points[0][1];
    
    for (let i = 1; i < points.length; i++) {
        if (points[i][0] > prevEnd) {
            arrows++;
            prevEnd = points[i][1];
        }
    }
    
    return arrows;
}

// ============================================
// CATEGORY 2: ARRAY GREEDY
// ============================================

// ------------------------------------------
// 2.1 JUMP GAME
// ------------------------------------------

/**
 * Problem: Can you reach the last index?
 * 
 * Greedy: Track farthest reachable position
 */
function canJump(nums) {
    let farthest = 0;
    
    for (let i = 0; i < nums.length; i++) {
        if (i > farthest) return false;
        farthest = Math.max(farthest, i + nums[i]);
    }
    
    return true;
}

// ------------------------------------------
// 2.2 JUMP GAME II
// ------------------------------------------

/**
 * Problem: Minimum jumps to reach end
 */
function jump(nums) {
    let jumps = 0;
    let currentEnd = 0;
    let farthest = 0;
    
    for (let i = 0; i < nums.length - 1; i++) {
        farthest = Math.max(farthest, i + nums[i]);
        
        if (i === currentEnd) {
            jumps++;
            currentEnd = farthest;
        }
    }
    
    return jumps;
}

/**
 * RELATED QUESTIONS:
 * - Jump Game (LeetCode 55)
 * - Jump Game II (LeetCode 45)
 * - Jump Game III (LeetCode 1306)
 */

// ------------------------------------------
// 2.3 GAS STATION
// ------------------------------------------

/**
 * Problem: Can complete circuit starting from some station?
 * 
 * Greedy: If total gas >= total cost, solution exists
 * Start from the point after cumulative minimum
 */
function canCompleteCircuit(gas, cost) {
    let totalTank = 0;
    let currentTank = 0;
    let startStation = 0;
    
    for (let i = 0; i < gas.length; i++) {
        const diff = gas[i] - cost[i];
        totalTank += diff;
        currentTank += diff;
        
        if (currentTank < 0) {
            startStation = i + 1;
            currentTank = 0;
        }
    }
    
    return totalTank >= 0 ? startStation : -1;
}

// ------------------------------------------
// 2.4 CANDY
// ------------------------------------------

/**
 * Problem: Distribute candies with ratings constraint
 * 
 * Two passes: left-to-right, then right-to-left
 */
function candy(ratings) {
    const n = ratings.length;
    const candies = new Array(n).fill(1);
    
    // Left to right
    for (let i = 1; i < n; i++) {
        if (ratings[i] > ratings[i - 1]) {
            candies[i] = candies[i - 1] + 1;
        }
    }
    
    // Right to left
    for (let i = n - 2; i >= 0; i--) {
        if (ratings[i] > ratings[i + 1]) {
            candies[i] = Math.max(candies[i], candies[i + 1] + 1);
        }
    }
    
    return candies.reduce((a, b) => a + b);
}

// ============================================
// CATEGORY 3: STRING GREEDY
// ============================================

// ------------------------------------------
// 3.1 PARTITION LABELS
// ------------------------------------------

/**
 * Problem: Partition string so each letter appears in one part
 */
function partitionLabels(s) {
    // Find last occurrence of each character
    const lastIndex = {};
    for (let i = 0; i < s.length; i++) {
        lastIndex[s[i]] = i;
    }
    
    const result = [];
    let start = 0, end = 0;
    
    for (let i = 0; i < s.length; i++) {
        end = Math.max(end, lastIndex[s[i]]);
        
        if (i === end) {
            result.push(end - start + 1);
            start = end + 1;
        }
    }
    
    return result;
}

// ------------------------------------------
// 3.2 REMOVE K DIGITS
// ------------------------------------------

/**
 * Problem: Remove k digits to get smallest number
 * 
 * Greedy: Remove larger digits that come before smaller ones
 */
function removeKdigits(num, k) {
    const stack = [];
    
    for (const digit of num) {
        while (k > 0 && stack.length && stack[stack.length - 1] > digit) {
            stack.pop();
            k--;
        }
        stack.push(digit);
    }
    
    // Remove remaining k digits from end
    while (k > 0) {
        stack.pop();
        k--;
    }
    
    // Remove leading zeros
    const result = stack.join('').replace(/^0+/, '');
    return result || '0';
}

// ------------------------------------------
// 3.3 REORGANIZE STRING
// ------------------------------------------

/**
 * Problem: Rearrange so no adjacent chars are same
 */
function reorganizeString(s) {
    const freq = new Map();
    for (const char of s) {
        freq.set(char, (freq.get(char) || 0) + 1);
    }
    
    // Sort by frequency
    const sorted = [...freq.entries()].sort((a, b) => b[1] - a[1]);
    
    // Check if possible
    if (sorted[0][1] > Math.ceil(s.length / 2)) return '';
    
    // Fill even indices first, then odd
    const result = new Array(s.length);
    let idx = 0;
    
    for (const [char, count] of sorted) {
        for (let i = 0; i < count; i++) {
            if (idx >= s.length) idx = 1;
            result[idx] = char;
            idx += 2;
        }
    }
    
    return result.join('');
}

// ============================================
// CATEGORY 4: TASK SCHEDULING
// ============================================

// ------------------------------------------
// 4.1 TASK SCHEDULER
// ------------------------------------------

/**
 * Problem: Minimum time to execute all tasks with cooldown
 */
function leastInterval(tasks, n) {
    const freq = new Array(26).fill(0);
    for (const task of tasks) {
        freq[task.charCodeAt(0) - 65]++;
    }
    
    freq.sort((a, b) => b - a);
    
    const maxFreq = freq[0];
    let idleSlots = (maxFreq - 1) * n;
    
    for (let i = 1; i < 26 && freq[i] > 0; i++) {
        idleSlots -= Math.min(freq[i], maxFreq - 1);
    }
    
    return tasks.length + Math.max(0, idleSlots);
}

// ------------------------------------------
// 4.2 MAXIMUM NUMBER OF EVENTS
// ------------------------------------------

/**
 * Problem: Maximum events you can attend (one event per day)
 */
function maxEvents(events) {
    events.sort((a, b) => a[0] - b[0]);
    
    const minHeap = []; // end days
    let day = 0;
    let i = 0;
    let count = 0;
    
    while (i < events.length || minHeap.length) {
        if (minHeap.length === 0) {
            day = events[i][0];
        }
        
        // Add all events starting today
        while (i < events.length && events[i][0] <= day) {
            minHeap.push(events[i][1]);
            minHeap.sort((a, b) => a - b);
            i++;
        }
        
        // Remove expired events
        while (minHeap.length && minHeap[0] < day) {
            minHeap.shift();
        }
        
        // Attend event ending earliest
        if (minHeap.length) {
            minHeap.shift();
            count++;
        }
        
        day++;
    }
    
    return count;
}

// ============================================
// SUMMARY
// ============================================

/**
 * GREEDY CHEAT SHEET:
 * 
 * WHEN TO USE GREEDY:
 * - Optimal substructure exists
 * - Greedy choice property: local optimal → global optimal
 * - No backtracking needed
 * 
 * COMMON PATTERNS:
 * 1. INTERVALS: Sort by end time
 * 2. SCHEDULING: Priority by deadline or profit
 * 3. DIGITS: Build answer digit by digit
 * 4. ARRAY: Track running max/min
 * 
 * GREEDY vs DP:
 * - Greedy: Make one choice, never reconsider
 * - DP: Consider all choices, combine results
 * 
 * INTERVIEW TIP:
 * If greedy doesn't work, try DP!
 * Always verify greedy choice with small examples.
 */

module.exports = {
    eraseOverlapIntervals,
    merge,
    findMinArrowShots,
    canJump,
    jump,
    canCompleteCircuit,
    candy,
    partitionLabels,
    removeKdigits,
    reorganizeString,
    leastInterval,
    maxEvents
};
