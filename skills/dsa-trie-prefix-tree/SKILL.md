---
name: antigravity:dsa-trie-prefix-tree
description: Constructs character dictionary trees for fast lookup, prefixes, and auto-complete checks. Triggered by trie, prefix tree, search words, word dictionary.
---

# Dsa Trie Prefix Tree

## Overview
Constructs character dictionary trees for fast lookup, prefixes, and auto-complete checks. Triggered by trie, prefix tree, search words, word dictionary.

## Algorithmic Complexity
- **Time: O(L) where L is length | Space: O(Alphabet^L)**

## JavaScript Template
```javascript
class TrieNode {
  constructor() {
    this.children = {};
    this.isWord = false;
  }
}
class Trie {
  constructor() {
    this.root = new TrieNode();
  }
  insert(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) node.children[char] = new TrieNode();
      node = node.children[char];
    }
    node.isWord = true;
  }
  search(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) return false;
      node = node.children[char];
    }
    return node.isWord;
  }
}
```

## Python Template
```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_word = False
class Trie:
    def __init__(self):
        self.root = TrieNode()
    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_word = True
    def search(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_word
```

## Execution Guidelines
1. Evaluate bounds and constraint invariants.
2. Confirm array/string boundary protections (null checks, length < 1 checks).
