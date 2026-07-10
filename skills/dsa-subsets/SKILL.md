---
name: ani:dsa-subsets
description: Generates permutations, combinations, and subsets using BFS backtracking. Triggered by subsets, subsets with duplicates, permutations, string permutations, uppercase/lowercase letters permutation.
---

# Dsa Subsets

## Overview
Generates permutations, combinations, and subsets using BFS backtracking. Triggered by subsets, subsets with duplicates, permutations, string permutations, uppercase/lowercase letters permutation.

## Algorithmic Complexity
- **Time: O(2^N) | Space: O(2^N)**

## JavaScript Template
```javascript
function findSubsets(nums) {
  const subsets = [[]];
  for (let i = 0; i < nums.length; i++) {
    const currentNumber = nums[i];
    const n = subsets.length;
    for (let j = 0; j < n; j++) {
      const set = subsets[j].slice(0); // clone subset
      set.push(currentNumber);
      subsets.push(set);
    }
  }
  return subsets;
}
```

## Python Template
```python
def find_subsets(nums):
    subsets = [[]]
    for num in nums:
        n = len(subsets)
        for i in range(n):
            set_copy = list(subsets[i])
            set_copy.append(num)
            subsets.append(set_copy)
    return subsets
```

## Execution Guidelines
1. Evaluate bounds and constraint invariants.
2. Confirm array/string boundary protections (null checks, length < 1 checks).
