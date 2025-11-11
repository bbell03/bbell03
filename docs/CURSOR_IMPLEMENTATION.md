# Custom Cursor Implementation

## Overview

The custom cursor system has been centralized and implemented at the top level of the application to provide consistent cursor behavior across all pages and components.

## Architecture

### Core Components

1. **`contexts/CursorContext.tsx`** - React Context for cursor state management
2. **`components/CursorProvider.tsx`** - Visual cursor component that renders the cursor
3. **`hooks/useCursorInteraction.ts`** - Hooks for interactive elements
4. **`components/InteractiveButton.tsx`** - Example component using cursor interactions

### Implementation Structure

```
app/layout.tsx (Root Level)
├── CursorContextProvider (Context)
│   └── CursorProvider (Visual Component)
│       └── {children} (All app content)
```

## Key Features

### 1. Global Cursor State Management
- **Position tracking**: Real-time mouse position updates
- **Visibility control**: Shows/hides based on device type and mouse presence
- **Interaction states**: Hover, click, and desktop detection
- **Device detection**: Automatically disables on mobile/touch devices

### 2. Automatic Interaction Detection
- Detects interactive elements automatically (links, buttons, etc.)
- Uses CSS classes and DOM traversal for element detection
- Supports custom interactive classes (`.interactive`, `.group`)

### 3. Smooth Animations
- Uses Framer Motion for smooth cursor transitions
- Spring-based animations for natural movement
- Scale effects for hover and click states

## Usage

### Basic Implementation

The cursor is automatically available throughout the app. No additional setup required.

### For Interactive Elements

#### Option 1: Automatic Detection (Recommended)
Add CSS classes to make elements interactive:

```tsx
<a href="/about" className="interactive">
  About Me
</a>

<button className="group">
  Click Me
</button>
```

#### Option 2: Manual Hook Usage
Use the `useCursorInteraction` hook for custom behavior:

```tsx
import { useCursorInteraction } from '@/hooks/useCursorInteraction'

function MyButton() {
  const buttonRef = useCursorInteraction({
    hoverScale: 1.5,
    clickScale: 0.8,
    disabled: false
  })

  return (
    <button ref={buttonRef} className="interactive">
      Custom Button
    </button>
  )
}
```

#### Option 3: Using the InteractiveButton Component
Use the pre-built interactive button component:

```tsx
import InteractiveButton from '@/components/InteractiveButton'

function MyComponent() {
  return (
    <InteractiveButton 
      onClick={() => console.log('clicked')}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      Click Me
    </InteractiveButton>
  )
}
```

### Advanced Usage

#### Accessing Cursor State
```tsx
import { useCursor } from '@/contexts/CursorContext'

function MyComponent() {
  const { cursorState, setCursorHovering } = useCursor()
  
  return (
    <div>
      Cursor Position: {cursorState.x}, {cursorState.y}
      <br />
      Is Hovering: {cursorState.isHovering ? 'Yes' : 'No'}
    </div>
  )
}
```

#### Custom Cursor Behavior
```tsx
import { useCursor } from '@/contexts/CursorContext'

function CustomElement() {
  const { setCursorHovering, setCursorClicking } = useCursor()
  
  const handleMouseEnter = () => setCursorHovering(true)
  const handleMouseLeave = () => setCursorHovering(false)
  const handleMouseDown = () => setCursorClicking(true)
  const handleMouseUp = () => setCursorClicking(false)
  
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      Custom Interactive Element
    </div>
  )
}
```

## CSS Classes

### Interactive Elements
- `.interactive` - Makes element trigger cursor hover state
- `.group` - Makes element and children trigger cursor hover state

### Cursor States
The cursor automatically applies these states:
- **Default**: Normal cursor appearance
- **Hover**: Scaled up with accent color
- **Click**: Scaled down with accent color
- **Hidden**: Invisible on mobile devices

## Configuration

### Cursor Appearance
Customize cursor appearance in `components/CursorProvider.tsx`:

```tsx
// Outer ring size
w-6 h-6  // Change to w-8 h-8 for larger cursor

// Inner dot size  
w-2 h-2  // Change to w-3 h-3 for larger dot

// Colors
hsl(var(--accent, 214 85% 52%))  // Uses CSS custom property
```

### Animation Settings
Modify animation parameters in `components/CursorProvider.tsx`:

```tsx
// Outer ring animation
transition={{ 
  type: "spring", 
  damping: 20,    // Lower = more bouncy
  stiffness: 300, // Higher = faster
  mass: 0.5       // Higher = heavier
}}

// Inner dot animation
transition={{ 
  type: "spring", 
  damping: 30,    // Lower = more bouncy
  stiffness: 500, // Higher = faster
  mass: 0.2       // Higher = heavier
}}
```

## Migration from Old Implementation

### Removed Components
- ❌ `components/custom-cursor.tsx` (old implementation)
- ❌ `components/CustomCursor.tsx` (duplicate implementation)

### Removed Imports
All components that previously imported `CustomCursor` have been updated:
- ✅ `app/page.tsx`
- ✅ `components/GlowLayout.tsx`
- ✅ `components/ClientRootExtras.tsx`
- ✅ `app/work/[id]/page.tsx`

### Benefits of New Implementation
1. **Centralized**: Single source of truth for cursor state
2. **Performance**: Reduced duplicate event listeners
3. **Consistency**: Same cursor behavior across all pages
4. **Maintainability**: Easier to update and modify
5. **Flexibility**: Easy to add new cursor features

## Browser Support

- ✅ Desktop browsers with mouse support
- ✅ Automatically disabled on mobile/touch devices
- ✅ Graceful fallback to system cursor on unsupported browsers

## Performance Considerations

- Uses `requestAnimationFrame` for smooth animations
- Event listeners are properly cleaned up
- Context updates are optimized to prevent unnecessary re-renders
- Cursor is only rendered on desktop devices

## Troubleshooting

### Cursor Not Appearing
1. Check if device supports hover: `window.matchMedia("(hover: hover) and (pointer: fine)").matches`
2. Verify cursor context is properly wrapped in root layout
3. Check browser console for any JavaScript errors

### Cursor Not Responding to Interactions
1. Ensure elements have proper CSS classes (`.interactive`, `.group`)
2. Check if `useCursorInteraction` hook is properly implemented
3. Verify event listeners are not being prevented by other components

### Performance Issues
1. Check for multiple cursor implementations (should only be one)
2. Verify event listeners are properly cleaned up
3. Consider reducing animation complexity if needed

