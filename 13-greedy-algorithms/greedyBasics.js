/**
 * GREEDY ALGORITHMS BASICS
 */

// Activity selection
function activitySelection(start, end) {
    const n = start.length;
    const activities = [];
    for (let i = 0; i < n; i++) activities.push([start[i], end[i], i]);
    activities.sort((a, b) => a[1] - b[1]);
    
    const selected = [activities[0][2]];
    let lastEnd = activities[0][1];
    
    for (let i = 1; i < n; i++) {
        if (activities[i][0] >= lastEnd) {
            selected.push(activities[i][2]);
            lastEnd = activities[i][1];
        }
    }
    return selected;
}

// Fractional knapsack
function fractionalKnapsack(weights, values, capacity) {
    const items = weights.map((w, i) => ({ weight: w, value: values[i], ratio: values[i] / w }));
    items.sort((a, b) => b.ratio - a.ratio);
    
    let totalValue = 0;
    for (const item of items) {
        if (capacity >= item.weight) {
            capacity -= item.weight;
            totalValue += item.value;
        } else {
            totalValue += item.ratio * capacity;
            break;
        }
    }
    return totalValue;
}

// Jump game
function canJump(nums) {
    let maxReach = 0;
    for (let i = 0; i <= maxReach && i < nums.length; i++) {
        maxReach = Math.max(maxReach, i + nums[i]);
        if (maxReach >= nums.length - 1) return true;
    }
    return false;
}

// Jump game II - minimum jumps
function jump(nums) {
    let jumps = 0, end = 0, farthest = 0;
    for (let i = 0; i < nums.length - 1; i++) {
        farthest = Math.max(farthest, i + nums[i]);
        if (i === end) { jumps++; end = farthest; }
    }
    return jumps;
}

// Gas station
function canCompleteCircuit(gas, cost) {
    let total = 0, tank = 0, start = 0;
    for (let i = 0; i < gas.length; i++) {
        const diff = gas[i] - cost[i];
        total += diff;
        tank += diff;
        if (tank < 0) { start = i + 1; tank = 0; }
    }
    return total >= 0 ? start : -1;
}

module.exports = { activitySelection, fractionalKnapsack, canJump, jump, canCompleteCircuit };
