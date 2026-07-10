---
name: antigravity:dsa-two-heaps
description: Maintains values in a dataset split into min-heap and max-heap partitions (e.g. median search). Triggered by two heaps, find the median of a number stream, sliding window median, maximize capital.
---

# Dsa Two Heaps

## Overview
Maintains values in a dataset split into min-heap and max-heap partitions (e.g. median search). Triggered by two heaps, find the median of a number stream, sliding window median, maximize capital.

## Algorithmic Complexity
- **Time: O(log N) insert | Space: O(N)**

## JavaScript Template
```javascript
// Custom Heap Implementation or Priority Queue schema
class MedianFinder {
  constructor() {
    this.maxHeap = []; // MaxHeap for lower half of numbers
    this.minHeap = []; // MinHeap for upper half of numbers
  }
  // Standard Heap insert logic
}
```

## Python Template
```python
import heapq
class MedianFinder:
    def __init__(self):
        self.max_heap = [] # lower half, store negative values
        self.min_heap = [] # upper half
    def add_num(self, num):
        if not self.max_heap or num <= -self.max_heap[0]:
            heapq.heappush(self.max_heap, -num)
        else:
            heapq.heappush(self.min_heap, num)
        # rebalance
        if len(self.max_heap) > len(self.min_heap) + 1:
            heapq.heappush(self.min_heap, -heapq.heappop(self.max_heap))
        elif len(self.min_heap) > len(self.max_heap):
            heapq.heappush(self.max_heap, -heapq.heappop(self.min_heap))
```

## Execution Guidelines
1. Evaluate bounds and constraint invariants.
2. Confirm array/string boundary protections (null checks, length < 1 checks).
