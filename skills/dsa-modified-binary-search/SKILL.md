---
name: ani:dsa-modified-binary-search
description: Searches sorted lists or arrays with rotational shifts or infinite boundaries. Triggered by modified binary search, order-agnostic binary search, ceiling of a number, next letter, search in a sorted infinite array.
---

# Dsa Modified Binary Search

## Overview
Searches sorted lists or arrays with rotational shifts or infinite boundaries. Triggered by modified binary search, order-agnostic binary search, ceiling of a number, next letter, search in a sorted infinite array.

## Algorithmic Complexity
- **Time: O(log N) | Space: O(1)**

## JavaScript Template
```javascript
function binarySearch(arr, key) {
  let start = 0, end = arr.length - 1;
  const isAscending = arr[start] < arr[end];
  while (start <= end) {
    const mid = Math.floor(start + (end - start) / 2);
    if (key === arr[mid]) return mid;
    if (isAscending) {
      if (key < arr[mid]) end = mid - 1;
      else start = mid + 1;
    } else {
      if (key > arr[mid]) end = mid - 1;
      else start = mid + 1;
    }
  }
  return -1;
}
```

## Python Template
```python
def binary_search(arr, key):
    start, end = 0, len(arr) - 1
    is_ascending = arr[start] < arr[end]
    while start <= end:
        mid = start + (end - start) // 2
        if key == arr[mid]:
            return mid
        if is_ascending:
            if key < arr[mid]:
                end = mid - 1
            else:
                start = mid + 1
        else:
            if key > arr[mid]:
                end = mid - 1
            else:
                start = mid + 1
    return -1
```

## Execution Guidelines
1. Evaluate bounds and constraint invariants.
2. Confirm array/string boundary protections (null checks, length < 1 checks).
