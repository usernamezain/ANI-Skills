---
name: dsa:merge-intervals
description: Handles overlapping intervals, scheduling, and range queries. Triggered by merge intervals, insert interval, interval intersection, conflicting appointments, minimum meeting rooms.
---

# Dsa Merge Intervals

## Overview
Handles overlapping intervals, scheduling, and range queries. Triggered by merge intervals, insert interval, interval intersection, conflicting appointments, minimum meeting rooms.

## Algorithmic Complexity
- **Time: O(N log N) | Space: O(N) for sorting**

## JavaScript Template
```javascript
function merge(intervals) {
  if (intervals.length < 2) return intervals;
  intervals.sort((a, b) => a[0] - b[0]);
  const mergedIntervals = [];
  let start = intervals[0][0], end = intervals[0][1];
  for (let i = 1; i < intervals.length; i++) {
    const interval = intervals[i];
    if (interval[0] <= end) { // overlapping intervals, adjust the 'end'
      end = Math.max(interval[1], end);
    } else { // non-overlapping interval, add the previous and reset
      mergedIntervals.push([start, end]);
      start = interval[0];
      end = interval[1];
    }
  }
  mergedIntervals.push([start, end]); // add the last interval
  return mergedIntervals;
}
```

## Python Template
```python
def merge(intervals):
    if len(intervals) < 2:
        return intervals
    intervals.sort(key=lambda x: x[0])
    merged = []
    start = intervals[0][0]
    end = intervals[0][1]
    for i in range(1, len(intervals)):
        interval = intervals[i]
        if interval[0] <= end:
            end = max(interval[1], end)
        else:
            merged.append([start, end])
            start = interval[0]
            end = interval[1]
    merged.append([start, end])
    return merged
```

## Execution Guidelines
1. Evaluate bounds and constraint invariants.
2. Confirm array/string boundary protections (null checks, length < 1 checks).
