---
name: ani:dsa-sliding-window
description: Solves subarray or substring problems requiring tracking a contiguous sequence of elements. Triggered by sliding window, longest substring, minimum size subarray sum, maximum sum subarray of size k.
---

# Dsa Sliding Window

## Overview
Solves subarray or substring problems requiring tracking a contiguous sequence of elements. Triggered by sliding window, longest substring, minimum size subarray sum, maximum sum subarray of size k.

## Algorithmic Complexity
- **Time: O(N) | Space: O(1)**

## JavaScript Template
```javascript
function slidingWindow(arr, k) {
  let windowSum = 0, maxSum = 0;
  let windowStart = 0;
  for (let windowEnd = 0; windowEnd < arr.length; windowEnd++) {
    windowSum += arr[windowEnd]; // add the next element
    // slide the window, we don't need to slide if we've not hit the required window size of 'k'
    if (windowEnd >= k - 1) {
      maxSum = Math.max(maxSum, windowSum);
      windowSum -= arr[windowStart]; // subtract the element going out
      windowStart++; // slide the window ahead
    }
  }
  return maxSum;
}
```

## Python Template
```python
def sliding_window(arr, k):
    window_sum, max_sum = 0, 0
    window_start = 0
    for window_end in range(len(arr)):
        window_sum += arr[window_end]
        if window_end >= k - 1:
            max_sum = max(max_sum, window_sum)
            window_sum -= arr[window_start]
            window_start += 1
    return max_sum
```

## Execution Guidelines
1. Evaluate bounds and constraint invariants.
2. Confirm array/string boundary protections (null checks, length < 1 checks).
