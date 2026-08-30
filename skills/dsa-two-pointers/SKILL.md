---
name: dsa:two-pointers
description: Optimizes search in sorted arrays/lists by iterating from both ends or at different speeds. Triggered by two pointers, two sum sorted, remove duplicates, squarring sorted array, triplet sum to zero.
---

# Dsa Two Pointers

## Overview
Optimizes search in sorted arrays/lists by iterating from both ends or at different speeds. Triggered by two pointers, two sum sorted, remove duplicates, squarring sorted array, triplet sum to zero.

## Algorithmic Complexity
- **Time: O(N) | Space: O(1)**

## JavaScript Template
```javascript
function pairWithTargetSum(arr, targetSum) {
  let left = 0, right = arr.length - 1;
  while (left < right) {
    const currentSum = arr[left] + arr[right];
    if (currentSum === targetSum) {
      return [left, right];
    }
    if (targetSum > currentSum) {
      left++; // we need a pair with a bigger sum
    } else {
      right--; // we need a pair with a smaller sum
    }
  }
  return [-1, -1];
}
```

## Python Template
```python
def pair_with_targetsum(arr, target_sum):
    left, right = 0, len(arr) - 1
    while left < right:
        current_sum = arr[left] + arr[right]
        if current_sum == target_sum:
            return [left, right]
        if target_sum > current_sum:
            left += 1
        else:
            right -= 1
    return [-1, -1]
```

## Execution Guidelines
1. Evaluate bounds and constraint invariants.
2. Confirm array/string boundary protections (null checks, length < 1 checks).
