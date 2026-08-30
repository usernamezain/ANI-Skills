---
name: dsa:tree-dfs
description: Traverses binary trees recursively or with stack (depth-first search) to evaluate paths or sums. Triggered by tree DFS, binary tree path sum, all paths for a sum, sum of path numbers, path with given sequence.
---

# Dsa Tree Dfs

## Overview
Traverses binary trees recursively or with stack (depth-first search) to evaluate paths or sums. Triggered by tree DFS, binary tree path sum, all paths for a sum, sum of path numbers, path with given sequence.

## Algorithmic Complexity
- **Time: O(N) | Space: O(N) worst-case (skewed tree stack depth)**

## JavaScript Template
```javascript
function hasPath(root, sum) {
  if (root === null) return false;
  if (root.val === sum && root.left === null && root.right === null) {
    return true;
  }
  return hasPath(root.left, sum - root.val) || hasPath(root.right, sum - root.val);
}
```

## Python Template
```python
def has_path(root, sum_val):
    if root is None:
        return False
    if root.val == sum_val and root.left is None and root.right is None:
        return True
    return has_path(root.left, sum_val - root.val) or has_path(root.right, sum_val - root.val)
```

## Execution Guidelines
1. Evaluate bounds and constraint invariants.
2. Confirm array/string boundary protections (null checks, length < 1 checks).
