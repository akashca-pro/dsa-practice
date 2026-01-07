/**
 * GREEDY PROBLEMS
 */

// Meeting rooms II - minimum rooms
function minMeetingRooms(intervals) {
    const starts = intervals.map(i => i[0]).sort((a, b) => a - b);
    const ends = intervals.map(i => i[1]).sort((a, b) => a - b);
    
    let rooms = 0, endPtr = 0;
    for (let i = 0; i < intervals.length; i++) {
        if (starts[i] < ends[endPtr]) rooms++;
        else endPtr++;
    }
    return rooms;
}

// Assign cookies
function findContentChildren(g, s) {
    g.sort((a, b) => a - b);
    s.sort((a, b) => a - b);
    
    let child = 0;
    for (let i = 0; i < s.length && child < g.length; i++) {
        if (s[i] >= g[child]) child++;
    }
    return child;
}

// Partition labels
function partitionLabels(s) {
    const last = {};
    for (let i = 0; i < s.length; i++) last[s[i]] = i;
    
    const result = [];
    let start = 0, end = 0;
    for (let i = 0; i < s.length; i++) {
        end = Math.max(end, last[s[i]]);
        if (i === end) { result.push(end - start + 1); start = i + 1; }
    }
    return result;
}

// Minimum arrows to burst balloons
function findMinArrowShots(points) {
    if (!points.length) return 0;
    points.sort((a, b) => a[1] - b[1]);
    
    let arrows = 1, end = points[0][1];
    for (let i = 1; i < points.length; i++) {
        if (points[i][0] > end) { arrows++; end = points[i][1]; }
    }
    return arrows;
}

// Task scheduler
function leastInterval(tasks, n) {
    const freq = new Array(26).fill(0);
    for (const t of tasks) freq[t.charCodeAt(0) - 65]++;
    freq.sort((a, b) => b - a);
    
    const maxFreq = freq[0];
    let idleSlots = (maxFreq - 1) * n;
    
    for (let i = 1; i < 26 && freq[i] > 0; i++) {
        idleSlots -= Math.min(freq[i], maxFreq - 1);
    }
    return tasks.length + Math.max(0, idleSlots);
}

// Candy distribution
function candy(ratings) {
    const n = ratings.length;
    const candies = new Array(n).fill(1);
    
    for (let i = 1; i < n; i++) {
        if (ratings[i] > ratings[i-1]) candies[i] = candies[i-1] + 1;
    }
    for (let i = n - 2; i >= 0; i--) {
        if (ratings[i] > ratings[i+1]) candies[i] = Math.max(candies[i], candies[i+1] + 1);
    }
    return candies.reduce((a, b) => a + b, 0);
}

module.exports = { minMeetingRooms, findContentChildren, partitionLabels, findMinArrowShots, leastInterval, candy };
