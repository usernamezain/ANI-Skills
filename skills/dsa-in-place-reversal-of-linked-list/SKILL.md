---
name: dsa:linked-list-reversal
description: Reverses a linked list or sub-list in-place without using extra memory nodes. Triggered by reverse linked list, reverse sub-list, reverse every k-element sub-list.
---

# Dsa In Place Reversal Of Linked List

## Overview
Reverses a linked list or sub-list in-place without using extra memory nodes. Triggered by reverse linked list, reverse sub-list, reverse every k-element sub-list.

## Algorithmic Complexity
- **Time: O(N) | Space: O(1)**

## JavaScript Template
```javascript
function reverse(head) {
  let current = head, previous = null, next = null;
  while (current !== null) {
    next = current.next; // temporarily store the next node
    current.next = previous; // reverse the current node
    previous = current; // point previous to current node
    current = next; // move current to next node
  }
  return previous;
}
```

## Python Template
```python
def reverse(head):
    current, previous, next_node = head, None, None
    while current is not None:
        next_node = current.next
        current.next = previous
        previous = current
        current = next_node
    return previous
```

## Execution Guidelines
1. Evaluate bounds and constraint invariants.
2. Confirm array/string boundary protections (null checks, length < 1 checks).
