---
name: antigravity:dsa-topological-sort
description: Performs linear ordering of vertices in directed acyclic graphs (DAG). Triggered by topological sort, tasks scheduling, tasks scheduling order, alien dictionary, reconstructing a sequence.
---

# Dsa Topological Sort

## Overview
Performs linear ordering of vertices in directed acyclic graphs (DAG). Triggered by topological sort, tasks scheduling, tasks scheduling order, alien dictionary, reconstructing a sequence.

## Algorithmic Complexity
- **Time: O(V + E) | Space: O(V + E)**

## JavaScript Template
```javascript
function topologicalSort(vertices, edges) {
  const sortedOrder = [];
  if (vertices <= 0) return sortedOrder;
  // Initialize graph
  const inDegree = Array(vertices).fill(0);
  const graph = Array(vertices).fill(0).map(() => []);
  // Build graph
  edges.forEach((edge) => {
    const parent = edge[0], child = edge[1];
    graph[parent].push(child);
    inDegree[child]++;
  });
  // Find all sources (vertices with 0 in-degrees)
  const sources = [];
  for (let i = 0; i < inDegree.length; i++) {
    if (inDegree[i] === 0) sources.push(i);
  }
  // Process sources
  while (sources.length > 0) {
    const vertex = sources.shift();
    sortedOrder.push(vertex);
    graph[vertex].forEach((child) => {
      inDegree[child]--;
      if (inDegree[child] === 0) sources.push(child);
    });
  }
  if (sortedOrder.length !== vertices) return []; // graph has a cycle!
  return sortedOrder;
}
```

## Python Template
```python
from collections import deque
def topological_sort(vertices, edges):
    sorted_order = []
    if vertices <= 0:
        return sorted_order
    in_degree = {i: 0 for i in range(vertices)}
    graph = {i: [] for i in range(vertices)}
    for edge in edges:
        parent, child = edge[0], edge[1]
        graph[parent].append(child)
        in_degree[child] += 1
    sources = deque([i for i in in_degree if in_degree[i] == 0])
    while sources:
        vertex = sources.popleft()
        sorted_order.append(vertex)
        for child in graph[vertex]:
            in_degree[child] -= 1
            if in_degree[child] == 0:
                sources.append(child)
    if len(sorted_order) != vertices:
        return [] # cycle detected
    return sorted_order
```

## Execution Guidelines
1. Evaluate bounds and constraint invariants.
2. Confirm array/string boundary protections (null checks, length < 1 checks).
