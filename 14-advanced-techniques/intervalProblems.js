/**
 * ============================================
 * INTERVAL PROBLEMS
 * ============================================
 * 
 * CONCEPT:
 * Interval problems involve ranges [start, end] and require:
 * - Merging overlapping intervals
 * - Finding intersections
 * - Scheduling/allocation
 * 
 * KEY TECHNIQUE:
 * Sort by start time, then process linearly
 * 
 * REAL-WORLD ANALOGY:
 * Meeting Room Scheduling:
 * - Each meeting has start and end time
 * - Can two meetings happen in one room?
 * - How many rooms do we need minimum?
 * 
 * INDUSTRY APPLICATIONS:
 * - Calendar systems
 * - Resource allocation
 * - Task scheduling
 * - Network bandwidth allocation
 */

// ============================================
// 1. MERGE INTERVALS
// ============================================

/**
 * Merge Overlapping Intervals
 * 
 * Two intervals overlap if: interval1.end >= interval2.start
 * 
 * Algorithm:
 * 1. Sort by start time
 * 2. Iterate and merge if overlap
 * 
 * Time: O(n log n) for sorting
 * Space: O(n) for result
 */
function merge(intervals) {
    if (!intervals.length) return [];
    
    // Sort by start time
    intervals.sort((a, b) => a[0] - b[0]);
    
    const result = [intervals[0]];
    
    for (let i = 1; i < intervals.length; i++) {
        const current = intervals[i];
        const lastMerged = result[result.length - 1];
        
        // Check for overlap
        if (current[0] <= lastMerged[1]) {
            // Merge: extend the end
            lastMerged[1] = Math.max(lastMerged[1], current[1]);
        } else {
            // No overlap: add new interval
            result.push(current);
        }
    }
    
    return result;
}

// ============================================
// 2. INSERT INTERVAL
// ============================================

/**
 * Insert a new interval into sorted non-overlapping intervals
 * 
 * Three parts:
 * 1. Intervals completely before new interval
 * 2. Overlapping intervals (merge them all)
 * 3. Intervals completely after new interval
 */
function insert(intervals, newInterval) {
    const result = [];
    let i = 0;
    const n = intervals.length;
    
    // Part 1: Add all intervals before newInterval
    while (i < n && intervals[i][1] < newInterval[0]) {
        result.push(intervals[i]);
        i++;
    }
    
    // Part 2: Merge overlapping intervals
    while (i < n && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }
    result.push(newInterval);
    
    // Part 3: Add remaining intervals
    while (i < n) {
        result.push(intervals[i]);
        i++;
    }
    
    return result;
}

// ============================================
// 3. INTERVAL INTERSECTION
// ============================================

/**
 * Find intersection of two lists of intervals
 * 
 * Two intervals intersect if:
 * max(start1, start2) <= min(end1, end2)
 */
function intervalIntersection(firstList, secondList) {
    const result = [];
    let i = 0, j = 0;
    
    while (i < firstList.length && j < secondList.length) {
        const [start1, end1] = firstList[i];
        const [start2, end2] = secondList[j];
        
        // Find intersection
        const start = Math.max(start1, start2);
        const end = Math.min(end1, end2);
        
        if (start <= end) {
            result.push([start, end]);
        }
        
        // Move the pointer with smaller end
        if (end1 < end2) {
            i++;
        } else {
            j++;
        }
    }
    
    return result;
}

// ============================================
// 4. MEETING ROOMS
// ============================================

/**
 * Can a person attend all meetings?
 * Check if any intervals overlap
 */
function canAttendMeetings(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < intervals[i - 1][1]) {
            return false; // Overlap found
        }
    }
    
    return true;
}

/**
 * Minimum number of meeting rooms required
 * 
 * Algorithm: Count concurrent meetings
 * - At any point, concurrent = started - ended
 * - Track when meetings start and end
 */
function minMeetingRooms(intervals) {
    if (!intervals.length) return 0;
    
    const starts = intervals.map(i => i[0]).sort((a, b) => a - b);
    const ends = intervals.map(i => i[1]).sort((a, b) => a - b);
    
    let rooms = 0;
    let maxRooms = 0;
    let s = 0, e = 0;
    
    while (s < starts.length) {
        if (starts[s] < ends[e]) {
            // Meeting starts before another ends
            rooms++;
            maxRooms = Math.max(maxRooms, rooms);
            s++;
        } else {
            // Meeting ends
            rooms--;
            e++;
        }
    }
    
    return maxRooms;
}

// Alternative using min-heap
function minMeetingRoomsHeap(intervals) {
    if (!intervals.length) return 0;
    
    intervals.sort((a, b) => a[0] - b[0]);
    
    // Min-heap of end times
    const heap = [intervals[0][1]];
    
    for (let i = 1; i < intervals.length; i++) {
        // If new meeting starts after earliest ends
        if (intervals[i][0] >= heap[0]) {
            heap.shift(); // Free up the room
        }
        
        // Add new meeting end time
        heap.push(intervals[i][1]);
        heap.sort((a, b) => a - b); // Maintain heap property
    }
    
    return heap.length;
}

// ============================================
// 5. NON-OVERLAPPING INTERVALS
// ============================================

/**
 * Minimum intervals to remove to make rest non-overlapping
 * 
 * Greedy: Sort by end time, keep intervals that end earliest
 * This leaves maximum room for future intervals
 */
function eraseOverlapIntervals(intervals) {
    if (intervals.length <= 1) return 0;
    
    // Sort by end time
    intervals.sort((a, b) => a[1] - b[1]);
    
    let count = 0;
    let prevEnd = intervals[0][1];
    
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < prevEnd) {
            // Overlap: remove current (it ends later)
            count++;
        } else {
            // No overlap: update end
            prevEnd = intervals[i][1];
        }
    }
    
    return count;
}

// ============================================
// 6. EMPLOYEE FREE TIME
// ============================================

/**
 * Find common free time for all employees
 * 
 * Algorithm:
 * 1. Flatten all schedules
 * 2. Merge all busy times
 * 3. Gaps between merged intervals = free time
 */
function employeeFreeTime(schedules) {
    // Flatten all intervals into one list
    const allIntervals = [];
    for (const schedule of schedules) {
        allIntervals.push(...schedule);
    }
    
    // Sort by start time
    allIntervals.sort((a, b) => a[0] - b[0]);
    
    // Merge busy times
    const merged = [allIntervals[0]];
    for (let i = 1; i < allIntervals.length; i++) {
        const last = merged[merged.length - 1];
        if (allIntervals[i][0] <= last[1]) {
            last[1] = Math.max(last[1], allIntervals[i][1]);
        } else {
            merged.push(allIntervals[i]);
        }
    }
    
    // Find gaps
    const freeTime = [];
    for (let i = 1; i < merged.length; i++) {
        freeTime.push([merged[i - 1][1], merged[i][0]]);
    }
    
    return freeTime;
}

// ============================================
// 7. PRACTICE PROBLEMS
// ============================================

/**
 * Problem 1: Remove Covered Intervals
 * Remove intervals completely covered by another
 */
function removeCoveredIntervals(intervals) {
    // Sort by start ascending, then by end descending
    intervals.sort((a, b) => a[0] !== b[0] ? a[0] - b[0] : b[1] - a[1]);
    
    let count = 0;
    let prevEnd = 0;
    
    for (const [start, end] of intervals) {
        if (end > prevEnd) {
            count++; // Not covered
            prevEnd = end;
        }
    }
    
    return count;
}

/**
 * Problem 2: Merge Intervals with Labels
 */
function mergeWithLabels(intervals) {
    // intervals: [{start, end, label}]
    const events = [];
    
    for (const { start, end, label } of intervals) {
        events.push({ time: start, type: 'start', label });
        events.push({ time: end, type: 'end', label });
    }
    
    events.sort((a, b) => a.time - b.time || (a.type === 'start' ? -1 : 1));
    
    const result = [];
    const active = new Set();
    let prevTime = null;
    
    for (const event of events) {
        if (prevTime !== null && prevTime < event.time && active.size > 0) {
            result.push({
                start: prevTime,
                end: event.time,
                labels: [...active]
            });
        }
        
        if (event.type === 'start') {
            active.add(event.label);
        } else {
            active.delete(event.label);
        }
        
        prevTime = event.time;
    }
    
    return result;
}

/**
 * Problem 3: My Calendar (Booking System)
 */
class MyCalendar {
    constructor() {
        this.bookings = [];
    }
    
    book(start, end) {
        for (const [s, e] of this.bookings) {
            // Check for overlap
            if (Math.max(start, s) < Math.min(end, e)) {
                return false;
            }
        }
        this.bookings.push([start, end]);
        return true;
    }
}

/**
 * Problem 4: My Calendar II (Allow double booking, not triple)
 */
class MyCalendarTwo {
    constructor() {
        this.bookings = [];
        this.overlaps = [];
    }
    
    book(start, end) {
        // Check if would cause triple booking
        for (const [s, e] of this.overlaps) {
            if (Math.max(start, s) < Math.min(end, e)) {
                return false;
            }
        }
        
        // Find new overlaps with existing bookings
        for (const [s, e] of this.bookings) {
            const overlapStart = Math.max(start, s);
            const overlapEnd = Math.min(end, e);
            if (overlapStart < overlapEnd) {
                this.overlaps.push([overlapStart, overlapEnd]);
            }
        }
        
        this.bookings.push([start, end]);
        return true;
    }
}

// -------------------------------------------------------------------------------------------
// SUMMARY & KEY TAKEAWAYS
// -------------------------------------------------------------------------------------------

/**
 * INTERVAL PROBLEMS CHEAT SHEET:
 * 
 * OVERLAP DETECTION:
 * Two intervals [s1,e1] and [s2,e2] overlap if:
 * max(s1, s2) < min(e1, e2)
 * 
 * COMMON PATTERNS:
 * 
 * 1. MERGE INTERVALS:
 *    - Sort by start
 *    - Extend end if overlap
 * 
 * 2. MEETING ROOMS:
 *    - Sort starts and ends separately
 *    - Count concurrent meetings
 * 
 * 3. NON-OVERLAPPING:
 *    - Sort by end time
 *    - Greedy: keep earliest ending
 * 
 * 4. INTERSECTION:
 *    - Two pointers
 *    - Move pointer with smaller end
 * 
 * SORTING STRATEGIES:
 * | Problem Type       | Sort By             |
 * |--------------------|---------------------|
 * | Merge              | Start time          |
 * | Non-overlapping    | End time            |
 * | Covered            | Start asc, End desc |
 * 
 * INTERVIEW TIP:
 * Draw the intervals on a timeline!
 * Most interval problems become clear with visualization.
 */

module.exports = { 
    merge,
    insert,
    intervalIntersection,
    canAttendMeetings,
    minMeetingRooms,
    minMeetingRoomsHeap,
    eraseOverlapIntervals,
    employeeFreeTime,
    removeCoveredIntervals,
    mergeWithLabels,
    MyCalendar,
    MyCalendarTwo
};
