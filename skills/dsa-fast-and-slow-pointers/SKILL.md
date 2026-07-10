---
name: antigravity:dsa-fast-and-slow-pointers
description: Detects cycles or finds midpoints in linked lists or arrays using two pointers moving at different speeds. Triggered by fast and slow pointers, linked list cycle, happy number, middle of the linked list.
---

# Dsa Fast And Slow Pointers

## Overview
Detects cycles or finds midpoints in linked lists or arrays using two pointers moving at different speeds. Triggered by fast and slow pointers, linked list cycle, happy number, middle of the linked list.

## Algorithmic Complexity
- **Time: O(N) | Space: O(1)**

## JavaScript Template
```javascript
function hasCycle(head) {
  let slow = head, fast = head;
  while (fast !== null && fast.next !== null) {
    fast = fast.next.next;
    slow = slow.next;
    if (slow === fast) {
      return true; // found the cycle
    }
  }
  return false;
}
```

## Python Template
```python
def has_cycle(head):
    slow, fast = head, head
    while fast is not None and fast.next is not None:
        fast = fast.next.next
        slow = slow.next
        if slow == fast:
            return True
    return False
```

## Execution Guidelines
1. Evaluate bounds and constraint invariants.
2. Confirm array/string boundary protections (null checks, length < 1 checks).
