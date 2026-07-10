---
name: ani:dsa-backtracking-sudoku-solver
description: Solves constraint-satisfaction problems recursively by trying options and backtracking on failures. Triggered by backtracking, sudoku solver, n queens, solve constraint satisfaction.
---

# Dsa Backtracking Sudoku Solver

## Overview
Solves constraint-satisfaction problems recursively by trying options and backtracking on failures. Triggered by backtracking, sudoku solver, n queens, solve constraint satisfaction.

## Algorithmic Complexity
- **Time: O(9^(N)) where N is empty spots | Space: O(N) recursion stack**

## JavaScript Template
```javascript
function solveSudoku(board) {
  function isValid(board, row, col, c) {
    for (let i = 0; i < 9; i++) {
      if (board[i][col] === c) return false;
      if (board[row][i] === c) return false;
      if (board[3 * Math.floor(row / 3) + Math.floor(i / 3)][3 * Math.floor(col / 3) + i % 3] === c) return false;
    }
    return true;
  }
  function solve() {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === '.') {
          for (let c = 1; c <= 9; c++) {
            const charStr = c.toString();
            if (isValid(board, i, j, charStr)) {
              board[i][j] = charStr;
              if (solve()) return true;
              board[i][j] = '.'; // backtrack
            }
          }
          return false;
        }
      }
    }
    return true;
  }
  solve();
  return board;
}
```

## Python Template
```python
def solve_sudoku(board):
    def is_valid(row, col, c):
        for i in range(9):
            if board[i][col] == c: return False
            if board[row][i] == c: return False
            if board[3 * (row // 3) + i // 3][3 * (col // 3) + i % 3] == c: return False
        return True
    def solve():
        for i in range(9):
            for j in range(9):
                if board[i][j] == '.':
                    for c in map(str, range(1, 10)):
                        if is_valid(i, j, c):
                            board[i][j] = c
                            if solve():
                                return True
                            board[i][j] = '.' # backtrack
                    return False
        return True
    solve()
    return board
```

## Execution Guidelines
1. Evaluate bounds and constraint invariants.
2. Confirm array/string boundary protections (null checks, length < 1 checks).
