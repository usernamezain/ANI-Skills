---
name: dsa:knapsack-dp
description: Solves optimization problems with capacity/bounds constraints using dynamic programming (memoization). Triggered by knapsack, target sum, equal subset sum partition, subset sum.
---

# Dsa Knapsack Dynamic Programming

## Overview
Solves optimization problems with capacity/bounds constraints using dynamic programming (memoization). Triggered by knapsack, target sum, equal subset sum partition, subset sum.

## Algorithmic Complexity
- **Time: O(N * C) | Space: O(N * C)**

## JavaScript Template
```javascript
function solveKnapsack(profits, weights, capacity) {
  const dp = Array(profits.length).fill(0).map(() => Array(capacity + 1).fill(-1));
  function knapsackRecursive(profits, weights, capacity, currentIndex) {
    if (capacity <= 0 || currentIndex >= profits.length) return 0;
    if (dp[currentIndex][capacity] !== -1) return dp[currentIndex][capacity];
    let profit1 = 0;
    if (weights[currentIndex] <= capacity) {
      profit1 = profits[currentIndex] + knapsackRecursive(profits, weights, capacity - weights[currentIndex], currentIndex + 1);
    }
    const profit2 = knapsackRecursive(profits, weights, capacity, currentIndex + 1);
    dp[currentIndex][capacity] = Math.max(profit1, profit2);
    return dp[currentIndex][capacity];
  }
  return knapsackRecursive(profits, weights, capacity, 0);
}
```

## Python Template
```python
def solve_knapsack(profits, weights, capacity):
    dp = [[-1 for _ in range(capacity + 1)] for _ in range(len(profits))]
    def knapsack_recursive(capacity, idx):
        if capacity <= 0 or idx >= len(profits):
            return 0
        if dp[idx][capacity] != -1:
            return dp[idx][capacity]
        profit1 = 0
        if weights[idx] <= capacity:
            profit1 = profits[idx] + knapsack_recursive(capacity - weights[idx], idx + 1)
        profit2 = knapsack_recursive(capacity, idx + 1)
        dp[idx][capacity] = max(profit1, profit2)
        return dp[idx][capacity]
    return knapsack_recursive(capacity, 0)
```

## Execution Guidelines
1. Evaluate bounds and constraint invariants.
2. Confirm array/string boundary protections (null checks, length < 1 checks).
