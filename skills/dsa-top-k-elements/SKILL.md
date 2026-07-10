---
name: ani:dsa-top-k-elements
description: Finds or processes the largest/smallest K elements in a set using heaps. Triggered by top k elements, top k frequent numbers, Kth largest number in a stream, Kth smallest number.
---

# Dsa Top K Elements

## Overview
Finds or processes the largest/smallest K elements in a set using heaps. Triggered by top k elements, top k frequent numbers, Kth largest number in a stream, Kth smallest number.

## Algorithmic Complexity
- **Time: O(N log K) | Space: O(K)**

## JavaScript Template
```javascript
// standard JS Heap/PQ implementation to track top K numbers
```

## Python Template
```python
import heapq
def find_k_largest_numbers(nums, k):
    min_heap = []
    for i in range(k):
        heapq.heappush(min_heap, nums[i])
    for i in range(k, len(nums)):
        if nums[i] > min_heap[0]:
            heapq.heappop(min_heap)
            heapq.heappush(min_heap, nums[i])
    return min_heap
```

## Execution Guidelines
1. Evaluate bounds and constraint invariants.
2. Confirm array/string boundary protections (null checks, length < 1 checks).
