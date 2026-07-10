---
name: ani:dsa-cyclic-sort
description: Sorts arrays containing numbers in a given range (e.g. 1 to N) in-place without extra space. Triggered by cyclic sort, find missing number, find all duplicate numbers, find duplicate number.
---

# Dsa Cyclic Sort

## Overview
Sorts arrays containing numbers in a given range (e.g. 1 to N) in-place without extra space. Triggered by cyclic sort, find missing number, find all duplicate numbers, find duplicate number.

## Algorithmic Complexity
- **Time: O(N) | Space: O(1)**

## JavaScript Template
```javascript
function cyclicSort(nums) {
  let i = 0;
  while (i < nums.length) {
    const j = nums[i] - 1;
    if (nums[i] !== nums[j]) {
      [nums[i], nums[j]] = [nums[j], nums[i]]; // swap
    } else {
      i++;
    }
  }
  return nums;
}
```

## Python Template
```python
def cyclic_sort(nums):
    i = 0
    while i < len(nums):
        j = nums[i] - 1
        if nums[i] != nums[j]:
            nums[i], nums[j] = nums[j], nums[i]
        else:
            i += 1
    return nums
```

## Execution Guidelines
1. Evaluate bounds and constraint invariants.
2. Confirm array/string boundary protections (null checks, length < 1 checks).
