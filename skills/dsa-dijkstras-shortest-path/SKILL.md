---
name: antigravity:dsa-dijkstras-shortest-path
description: Finds the shortest path between nodes in a weighted graph. Triggered by dijkstra, shortest path weighted, network delay time, path with maximum probability.
---

# Dsa Dijkstras Shortest Path

## Overview
Finds the shortest path between nodes in a weighted graph. Triggered by dijkstra, shortest path weighted, network delay time, path with maximum probability.

## Algorithmic Complexity
- **Time: O((V + E) log V) | Space: O(V + E)**

## JavaScript Template
```javascript
// Dijkstra implementation using MinHeap
```

## Python Template
```python
import heapq
def dijkstra(graph, start, n):
    distances = {i: float('inf') for i in range(n)}
    distances[start] = 0
    min_heap = [(0, start)]
    while min_heap:
        current_distance, current_vertex = heapq.heappop(min_heap)
        if current_distance > distances[current_vertex]:
            continue
        for neighbor, weight in graph[current_vertex]:
            distance = current_distance + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(min_heap, (distance, neighbor))
    return distances
```

## Execution Guidelines
1. Evaluate bounds and constraint invariants.
2. Confirm array/string boundary protections (null checks, length < 1 checks).
