# RuneFlow Animation System

## Overview

RuneFlow's redesigned interface features a comprehensive animation system designed to create an engaging, hyper-modern user experience. The animations are built on GSAP, CSS keyframes, and Canvas-based effects, creating smooth, accessible interactions throughout the site.

## Animation Layers

### 1. Canvas Background Animations

The hero section uses a sophisticated canvas-based animation system with multiple gradient layers:

- **Layer 1 (Cyan)**: Main animated radial gradient with oscillating position
  - Moves in circular patterns using sine/cosine waves
  - Opacity pulsates subtly for depth
  
- **Layer 2 (Fuchsia)**: Secondary radial gradient
  - Positioned at 25% x 75% with slower, offset waves
  - Creates secondary depth layer
  - Opacity varies independently
  
- **Layer 3 (Lime)**: Tertiary accent gradient
  - Positioned at 75% x 25%
  - Provides color balance and visual interest
  - Soft, oscillating effect at 50% opacity

- **Noise Texture**: Subtle grain overlay adds visual depth and prevents banding

### 2. CSS Keyframe Animations

#### Gradient Animations

- **`gradientShift`** (15s): Smooth gradient position flow
  - Used in hero section for primary background
  
- **`gradientWave`** (12s): Wave-like gradient movement
  - Applied to hero after-pseudo-element
  
- **`gradientOrbit`** (12s): Circular orbit motion
  - Creates orbital gradient movements
  
- **`backgroundBreathe`** (8-12s): Subtle size and position pulse
  - Applied to `.glass` elements and alternating sections
  - Breathing effect without distraction

#### Glow & Accent Animations

- **`glowShift`** (4s): Multi-color glow cycling
  - Transitions between cyan → lime → fuchsia → cyan
  - Used on hover states of cards
  - Creates pulsing halo effect

- **`borderGlow`** (3s): Inset border and box-shadow glow
  - Applied to `.btn-secondary` elements
  - Enhances interactive element visibility

- **`textGlow`** (4s): Text shadow glow effect
  - Applied to section headers (`h2`)
  - Creates luminous text appearance

- **`accentFlow`** (3s): Drop-shadow fade animation
  - Used for badge and accent element highlighting

#### Floating & Motion Animations

- **`float`** (4-14s): Gentle floating motion
  - Various timing delays for layered effect
  - Used in hero section pseudo-element

- **`softPulse`** (2-3s): Subtle opacity and scale pulse
  - Applied to all `.card` elements
  - Creates living, breathing interface feel

#### Shape & Shimmer

- **`shimmerWave`** (2s): Linear shimmer sweep
  - Creates light sweep effect for loading states

- **`ripple`** (0.6s): Button ripple effect on click
  - Radial expansion from click point
  - Used with `.btn-primary:active::after`

### 3. Section Background Patterns

Alternating sections have different gradient backgrounds:

- **Even sections**: Cyan → transparent → lime gradient with `backgroundBreathe`
- **Odd sections**: Fuchsia → transparent → cyan gradient (static)

These create visual rhythm while maintaining readability.

## Interactive Elements

### Buttons

#### Primary Button (`.btn-primary`)
- **Default**: Warm gradient (FFB700-E63946)
- **Hover**: Enhanced glow effect with dual-layer shadows
  - Box-shadow: 0 0 40px rgba(255, 181, 0, 0.5)
  - Additional accent shadow for depth
- **Active**: Ripple animation from click point
- **Visual Effect**: Slide animation on hover with `::before` pseudo-element

#### Secondary Button (`.btn-secondary`)
- **Default**: Cyan border with `borderGlow` animation
- **Hover**: Cyan glow effect with enhanced shadow
  - Box-shadow: 0 0 30px rgba(125, 249, 255, 0.4)
- **Visual Effect**: Animated border color shift

### Cards

#### Feature Cards (`.card`)
- **Default State**: `softPulse` animation (3s)
  - Continuous subtle opacity/scale change
- **Hover State**: 
  - Enhanced transparency background
  - Cyan border highlighting
  - `glowShift` animation for dynamic glow
  - Box-shadow: 0 0 40px rgba(125, 249, 255, 0.3)

#### Glass Containers (`.glass`)
- **Default State**: `backgroundBreathe` animation (8s)
  - Subtle background size fluctuation
- **Hover State**: 
  - Cyan border on interaction
  - Box-shadow: 0 0 40px rgba(125, 249, 255, 0.25)

## Performance Considerations

1. **Hardware Acceleration**: All animations use CSS transforms and opacity
   - `will-change` could be added for frequently animated elements

2. **Canvas Optimization**: 
   - Uses `requestAnimationFrame` for smooth 60fps animation
   - Noise texture reduces banding without excessive filtering

3. **Accessibility**: 
   - Respects `prefers-reduced-motion` media query
   - All animations have fallback states
   - Critical interactions (buttons) work without animation

4. **Timing**: 
   - Varied animation durations prevent visual monotony
   - Offset delays for staggered effects
   - Easy to adjust via CSS custom properties

## Customization

### Animation Speeds

Adjust animation durations in keyframe definitions:

```scss
@keyframes gradientShift {
  // Change 15s to desired duration
}

@keyframes glowShift {
  // Change 4s to desired duration
}
```

### Color Adjustments

Update RGBA values in animations:

```scss
gradient.addColorStop(0, `rgba(125, 249, 255, ${opacity})`); // Cyan
// or
gradient.addColorStop(0, `rgba(255, 102, 196, ${opacity})`); // Fuchsia
// or
gradient.addColorStop(0, `rgba(168, 255, 118, ${opacity})`); // Lime
```

### Intensity Adjustments

Modify max opacity values:
- Increase numbers for stronger effects
- Decrease for subtler animations

```scss
// Higher intensity
opacity: 1; // vs opacity: 0.7;
box-shadow: 0 0 40px rgba(...); // vs 0 0 20px
```

## Browser Compatibility

- **Chrome/Edge**: Full support
- **Firefox**: Full support
- **Safari**: Full support (tested on 13+)
- **Mobile**: Full support with appropriate viewport

## Advanced Effects

### Layered Animations

Multiple animations can be combined on single elements:

```scss
.element {
  animation: animation1 3s ease, animation2 4s ease 1s infinite;
}
```

### Staggered Delays

Use data attributes or nth-child selectors:

```scss
[data-reveal-delay-1] { animation-delay: 0.1s; }
[data-reveal-delay-2] { animation-delay: 0.2s; }
```

### Hover State Transitions

Smooth transitions between animation states:

```scss
&:hover {
  animation: newAnimation 3s ease-in-out infinite;
  transition: all 0.3s ease;
}
```

## Debugging

1. **Pause Animations**: Use browser DevTools
   - Right-click → Inspect → Animations panel
   
2. **Slow Motion**: 
   - DevTools → Rendering → Throttle animations

3. **Performance Profiling**:
   - Use Chrome DevTools Performance tab
   - Look for animation frame drops

## Future Enhancements

- [ ] Particle system for background
- [ ] Mouse-tracking gradient animations
- [ ] Scroll-triggered custom animations
- [ ] WebGL-based effects for advanced browsers
- [ ] Motion presets for different user preferences
