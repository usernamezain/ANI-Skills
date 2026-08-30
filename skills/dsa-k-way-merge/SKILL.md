---
name: dsa:k-way-merge
description: Merges K sorted arrays, lists, or streams using a min-heap. Triggered by k way merge, merge k sorted lists, Kth smallest number in M sorted lists, Kth smallest number in a sorted matrix.
---

# Dsa K Way Merge

## Overview
Merges K sorted arrays, lists, or streams using a min-heap. Triggered by k way merge, merge k sorted lists, Kth smallest number in M sorted lists, Kth smallest number in a sorted matrix.

## Algorithmic Complexity
- **Time: O(N log K) where N is total elements | Space: O(K)**

## JavaScript Template
```javascript
// PQ logic to merge lists
```

## Python Template
```python
import heapq
def merge_lists(lists):
    min_heap = []
    for i, lst in enumerate(lists):
        if lst:
            heapq.heappush(min_heap, (lst[0], i, 0))
    result = []
    while min_heap:
        val, list_idx, element_idx = heapq.heappop(min_heap)
        result.append(val)
        if element_idx + 1 < len(lists[list_idx]):
            heapq.heappush(min_heap, (lists[list_idx][element_idx + 1], list_idx, element_idx + 1))
    return result
```

## Execution Guidelines
1. Evaluate bounds and constraint invariants.
2. Confirm array/string boundary protections (null checks, length < 1 checks).
