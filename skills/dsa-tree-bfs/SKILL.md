---
name: antigravity:dsa-tree-bfs
description: Traverses binary tree levels (breadth-first search). Triggered by tree BFS, level order traversal, zigzag traversal, level average, level order successor.
---

# Dsa Tree Bfs

## Overview
Traverses binary tree levels (breadth-first search). Triggered by tree BFS, level order traversal, zigzag traversal, level average, level order successor.

## Algorithmic Complexity
- **Time: O(N) | Space: O(N)**

## JavaScript Template
```javascript
function traverse(root) {
  const result = [];
  if (root === null) return result;
  const queue = [root];
  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];
    for (let i = 0; i < levelSize; i++) {
      const currentNode = queue.shift();
      currentLevel.push(currentNode.val);
      if (currentNode.left !== null) queue.push(currentNode.left);
      if (currentNode.right !== null) queue.push(currentNode.right);
    }
    result.push(currentLevel);
  }
  return result;
}
```

## Python Template
```python
from collections import deque
def traverse(root):
    result = []
    if root is None:
        return result
    queue = deque([root])
    while queue:
        level_size = len(queue)
        current_level = []
        for _ in range(level_size):
            current_node = queue.popleft()
            current_level.append(current_node.val)
            if current_node.left:
                queue.append(current_node.left)
            if current_node.right:
                queue.append(current_node.right)
        result.append(current_level)
    return result
```

## Execution Guidelines
1. Evaluate bounds and constraint invariants.
2. Confirm array/string boundary protections (null checks, length < 1 checks).
