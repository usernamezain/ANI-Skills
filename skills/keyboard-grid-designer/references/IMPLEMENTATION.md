# Keyboard Grid Designer Implementation Reference

This document contains detailed implementation code, structures, and specifications for building high-performance virtual keyboard interfaces with GSAP animations.

---

## 1. Complete ANSI Keyboard Layout Data Structure

Define the virtual layout structurally as a 2D array representing physical rows. Each key is an object:

```javascript
const KEYBOARD_LAYOUT = [
  // Row 0 (Function Row): ESC, F1-F12, PRTSC, DEL
  [
    { label: 'ESC', code: 'Escape', type: 'function', width: 1 },
    { label: 'F1', code: 'F1', type: 'function', width: 1 },
    // ...
  ],
  // Row 1 (Number Row): ` 1 2 3 ... 0 - = BACKSPACE
  [
    { label: '`', code: 'Backquote', type: 'normal', width: 1 },
    { label: '1', code: 'Digit1', type: 'normal', width: 1 },
    // ...
    { label: 'BACKSPACE', code: 'Backspace', type: 'modifier', width: 2 }
  ],
  // Row 2 (QWERTY Row): TAB Q W E R T Y U I O P [ ] \
  [
    { label: 'TAB', code: 'Tab', type: 'modifier', width: 1.5 },
    // ...
    { label: '\\', code: 'Backslash', type: 'normal', width: 1.5 }
  ],
  // Row 3 (Home Row): CAPS A S D F G H J K L ; ' ENTER
  [
    { label: 'CAPS', code: 'CapsLock', type: 'modifier', width: 1.75 },
    // ...
    { label: 'ENTER', code: 'Enter', type: 'modifier', width: 2.25 }
  ],
  // Row 4 (Shift Row): LSHIFT Z X C V B N M , . / RSHIFT
  [
    { label: 'SHIFT', code: 'ShiftLeft', type: 'modifier', width: 2.25, modifier: 'Shift' },
    // ...
    { label: 'SHIFT', code: 'ShiftRight', type: 'modifier', width: 2.75, modifier: 'Shift' }
  ],
  // Row 5 (Bottom Row): LCTRL, LWIN, LALT, SPACE, RALT, FN, RCTRL
  [
    { label: 'CTRL', code: 'ControlLeft', type: 'modifier', width: 1.25, modifier: 'Control' },
    { label: 'WIN', code: 'MetaLeft', type: 'modifier', width: 1.25, modifier: 'Meta' },
    { label: 'ALT', code: 'AltLeft', type: 'modifier', width: 1.25, modifier: 'Alt' },
    { label: 'SPACE', code: 'Space', type: 'normal', width: 6.25 },
    { label: 'ALT', code: 'AltRight', type: 'modifier', width: 1.25, modifier: 'Alt' },
    { label: 'FN', code: 'Fn', type: 'function', width: 1.25 },
    { label: 'CTRL', code: 'ControlRight', type: 'modifier', width: 1.25, modifier: 'Control' }
  ]
];
```

### Proportional Sizing Formula
To replicate keycap proportions precisely, apply this gap-aware width formula:
$$\text{actualWidth} = \text{width} \times (\text{baseWidth} + \text{gap}) - \text{gap}$$

*Recommended baseline:* `baseWidth = 56px`, `gap = 8px`.

---

## 2. Layout Structure & Styling

### HTML Markup
```html
<div class="keyboard-grid">
  <!-- Dynamic Accelerator Chips Display -->
  <div class="hotkey-display">
    <span>CURRENT HOTKEY</span>
    <div class="hotkey-chips">
      <span class="placeholder">Click keys to compose a shortcut...</span>
    </div>
  </div>

  <!-- Rows and Key Buttons -->
  <div class="keyboard-rows-container">
    <div class="keyboard-row" data-row="0">
      <button class="key function" data-code="Escape" data-label="ESC" style="width: 56px; height: 52px;">ESC</button>
    </div>
  </div>
</div>
```

### Base Stylesheet
```css
.keyboard-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: #0a0a0a;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #1f1f1f;
  user-select: none;
}

.keyboard-row {
  display: flex;
  gap: 8px;
}

.key {
  position: relative;
  overflow: hidden;
  height: 52px;
  background: #141414;
  border: 1px solid #1f1f1f;
  border-radius: 8px;
  color: #ffffff;
  font-family: inherit;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  transition: border-color 0.2s;
  -webkit-app-region: no-drag; /* Prevents Electron app region drag blocking clicks */
}

.key:hover {
  border-color: #3f3f3f;
}

.hotkey-chips span {
  padding: 4px 8px;
  background: #1e1e1e;
  border: 1px solid #2d2d2d;
  border-radius: 4px;
  font-size: 12px;
  color: #cccccc;
}

.hotkey-chips span.active-key {
  background: rgba(204, 255, 0, 0.15);
  border-color: #ccff00;
  color: #ccff00;
}
```

---

## 3. GSAP Animation Engine Setup

```javascript
import { gsap } from 'gsap';

gsap.config({
  nullTargetWarn: false,
  force3D: true
});

export const animationPresets = {
  // Staggered entrance transition
  gridEntrance: (elements) => gsap.from(elements, {
    y: 20,
    opacity: 0,
    scale: 0.95,
    duration: 0.4,
    stagger: {
      amount: 0.6,
      grid: 'auto',
      from: 'center'
    },
    ease: 'power2.out'
  }),

  // Click-bounce spring animation (Yoyo)
  keyPress: (element) => gsap.to(element, {
    scale: 0.92,
    duration: 0.08,
    ease: 'power2.in',
    yoyo: true,
    repeat: 1,
    onComplete: () => gsap.set(element, { scale: 1 })
  }),

  // Modifier toggles tint fade
  modifierToggle: (element, active) => gsap.to(element, {
    backgroundColor: active ? 'rgba(204, 255, 0, 0.1)' : '#141414',
    borderColor: active ? '#99cc00' : '#1f1f1f',
    duration: 0.2,
    ease: 'power2.out'
  }),

  // Target activation glow
  keyActivate: (element) => gsap.to(element, {
    borderColor: '#ccff00',
    boxShadow: '0 0 20px rgba(204, 255, 0, 0.3)',
    backgroundColor: '#1a1a1a',
    duration: 0.25,
    ease: 'power2.out'
  }),

  // Target deactivation
  keyDeactivate: (element) => gsap.to(element, {
    borderColor: '#1f1f1f',
    boxShadow: '0 0 0 rgba(204, 255, 0, 0)',
    backgroundColor: '#141414',
    duration: 0.2,
    ease: 'power2.in'
  })
};

// Material Ripple overlay
export function createRipple(element, clientX, clientY) {
  const rect = element.getBoundingClientRect();
  const x = clientX - rect.left;
  const y = clientY - rect.top;

  const ripple = document.createElement('div');
  ripple.style.cssText = `
    position: absolute;
    width: 10px;
    height: 10px;
    background: rgba(204, 255, 0, 0.3);
    border-radius: 50%;
    pointer-events: none;
    left: ${x}px;
    top: ${y}px;
    transform: translate(-50%, -50%);
  `;
  element.appendChild(ripple);

  gsap.to(ripple, {
    scale: 20,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
    onComplete: () => ripple.remove()
  });
}
```

---

## 4. KeyboardGrid Class Lifecycle Manager

```javascript
export class KeyboardGrid {
  constructor({ container, onKeySelect, onModifierToggle }) {
    this.container = container;
    this.onKeySelect = onKeySelect;
    this.onModifierToggle = onModifierToggle;
    this.activeModifiers = new Set();
    this.selectedKey = null;
    this.keyElements = new Map();
  }

  mount() {
    this.element = document.createElement('div');
    this.element.className = 'keyboard-grid';
    this.element.innerHTML = this.buildHTML();
    this.container.appendChild(this.element);

    this.cacheElements();
    this.attachListeners();

    const allKeys = Array.from(this.keyElements.values());
    animationPresets.gridEntrance(allKeys);
  }

  cacheElements() {
    const keys = this.element.querySelectorAll('.key');
    keys.forEach(btn => {
      this.keyElements.set(btn.dataset.code, btn);
    });
    this.hotkeyDisplay = this.element.querySelector('.hotkey-chips');
  }

  attachListeners() {
    this.keyElements.forEach((element, code) => {
      element.addEventListener('click', (e) => this.handleKeyClick(e, code));
    });
  }

  handleKeyClick(event, code) {
    const element = this.keyElements.get(code);
    const { type, modifier, label } = element.dataset;

    createRipple(element, event.clientX, event.clientY);
    animationPresets.keyPress(element);

    if (type === 'modifier' && modifier) {
      const isActive = this.activeModifiers.has(modifier);
      if (isActive) {
        this.activeModifiers.delete(modifier);
        animationPresets.modifierToggle(element, false);
      } else {
        this.activeModifiers.add(modifier);
        animationPresets.modifierToggle(element, true);
      }
      this.onModifierToggle(modifier, !isActive);
    } else {
      this.selectKey(code, label, element);
    }

    this.updateHotkeyDisplay();
  }

  selectKey(code, label, element) {
    if (this.selectedKey === code) {
      animationPresets.keyDeactivate(element);
      this.selectedKey = null;
      this.onKeySelect(null);
      return;
    }
    if (this.selectedKey) {
      const oldElement = this.keyElements.get(this.selectedKey);
      if (oldElement) animationPresets.keyDeactivate(oldElement);
    }
    this.selectedKey = code;
    animationPresets.keyActivate(element);
    this.onKeySelect(label);
  }

  updateHotkeyDisplay() {
    const ACCELERATOR_MAP = { 'Control': 'Ctrl', 'Meta': 'Win', 'Alt': 'Alt', 'Shift': 'Shift' };
    const modifiers = Array.from(this.activeModifiers).sort().map(m => ACCELERATOR_MAP[m] || m);
    const keyLabel = this.selectedKey ? this.keyElements.get(this.selectedKey).dataset.label : null;

    const parts = [...modifiers];
    if (keyLabel) parts.push(keyLabel);

    if (parts.length === 0) {
      this.hotkeyDisplay.innerHTML = `<span class="placeholder">Click keys to compose a shortcut...</span>`;
      return;
    }

    this.hotkeyDisplay.innerHTML = parts.map((part, index) => {
      const isLastKey = index === parts.length - 1 && keyLabel;
      const classAttr = isLastKey ? 'class="active-key"' : '';
      const separator = index < parts.length - 1 ? '<span class="separator">+</span>' : '';
      return `<span ${classAttr}>${part}</span>${separator}`;
    }).join('');
  }

  destroy() {
    this.keyElements.forEach(el => gsap.killTweensOf(el));
    this.element.remove();
    this.keyElements.clear();
  }
}
```
