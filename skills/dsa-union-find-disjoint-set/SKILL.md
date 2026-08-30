---
name: dsa:union-find
description: Tracks dynamic connectivity and grouping in undirected graphs. Triggered by union find, disjoint set, redundancy connection, number of provinces.
---

# Dsa Union Find Disjoint Set

## Overview
Tracks dynamic connectivity and grouping in undirected graphs. Triggered by union find, disjoint set, redundancy connection, number of provinces.

## Algorithmic Complexity
- **Time: O(Alpha(N)) (Inverse Ackermann) | Space: O(N)**

## JavaScript Template
```javascript
class UnionFind {
  constructor(size) {
    this.parent = Array(size).fill(0).map((_, i) => i);
    this.rank = Array(size).fill(1);
  }
  find(x) {
    if (this.parent[x] === x) return x;
    return this.parent[x] = this.find(this.parent[x]); // path compression
  }
  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);
    if (rootX !== rootY) {
      if (this.rank[rootX] > this.rank[rootY]) {
        this.parent[rootY] = rootX;
      } else if (this.rank[rootX] < this.rank[rootY]) {
        this.parent[rootX] = rootY;
      } else {
        this.parent[rootY] = rootX;
        this.rank[rootX]++;
      }
      return true;
    }
    return false;
  }
}
```

## Python Template
```python
class UnionFind:
    def __init__(self, size):
        self.parent = [i for i in range(size)]
        self.rank = [1] * size
    def find(self, x):
        if self.parent[x] == x:
            return x
        self.parent[x] = self.find(self.parent[x]) # path compression
        return self.parent[x]
    def union(self, x, y):
        root_x = self.find(x)
        root_y = self.find(y)
        if root_x != root_y:
            if self.rank[root_x] > self.rank[root_y]:
                self.parent[root_y] = root_x
            elif self.rank[root_x] < self.rank[root_y]:
                self.parent[root_x] = root_y
            else:
                self.parent[root_y] = root_x
                self.rank[root_x] += 1
            return True
        return False
```

## Execution Guidelines
1. Evaluate bounds and constraint invariants.
2. Confirm array/string boundary protections (null checks, length < 1 checks).
