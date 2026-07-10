---
name: antigravity:dsa-segment-tree-range-queries
description: Performs fast range query calculations (sum/min/max) and updates on arrays. Triggered by segment tree, range queries, range sum query, range min query.
---

# Dsa Segment Tree Range Queries

## Overview
Performs fast range query calculations (sum/min/max) and updates on arrays. Triggered by segment tree, range queries, range sum query, range min query.

## Algorithmic Complexity
- **Time: O(log N) updates/queries | Space: O(N)**

## JavaScript Template
```javascript
class SegmentTree {
  constructor(arr) {
    this.n = arr.length;
    this.tree = Array(2 * this.n).fill(0);
    for (let i = 0; i < this.n; i++) this.tree[this.n + i] = arr[i];
    for (let i = this.n - 1; i > 0; --i) this.tree[i] = this.tree[i * 2] + this.tree[i * 2 + 1];
  }
  update(pos, value) {
    pos += this.n;
    this.tree[pos] = value;
    while (pos > 1) {
      pos = Math.floor(pos / 2);
      this.tree[pos] = this.tree[2 * pos] + this.tree[2 * pos + 1];
    }
  }
  sumRange(left, right) {
    left += this.n;
    right += this.n;
    let sum = 0;
    while (left <= right) {
      if ((left % 2) === 1) { sum += this.tree[left]; left++; }
      if ((right % 2) === 0) { sum += this.tree[right]; right--; }
      left = Math.floor(left / 2);
      right = Math.floor(right / 2);
    }
    return sum;
  }
}
```

## Python Template
```python
class SegmentTree:
    def __init__(self, arr):
        self.n = len(arr)
        self.tree = [0] * (2 * self.n)
        for i in range(self.n):
            self.tree[self.n + i] = arr[i]
        for i in range(self.n - 1, 0, -1):
            self.tree[i] = self.tree[2 * i] + self.tree[2 * i + 1]
    def update(self, pos, value):
        pos += self.n
        self.tree[pos] = value
        while pos > 1:
            pos //= 2
            self.tree[pos] = self.tree[2 * pos] + self.tree[2 * pos + 1]
    def sum_range(self, left, right):
        left += self.n
        right += self.n
        total_sum = 0
        while left <= right:
            if left % 2 == 1:
                total_sum += self.tree[left]
                left += 1
            if right % 2 == 0:
                total_sum += self.tree[right]
                right -= 1
            left //= 2
            right //= 2
        return total_sum
```

## Execution Guidelines
1. Evaluate bounds and constraint invariants.
2. Confirm array/string boundary protections (null checks, length < 1 checks).
