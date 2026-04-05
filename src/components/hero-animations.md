# Hero Animation Components

Production-ready React components for scroll-driven zoom effects and animated aurora backgrounds.

## Components

### 1. ScrollZoomHero

Scroll-based zoom animation using Framer Motion's `useScroll` and `useTransform` hooks.

```tsx
import { ScrollZoomHero } from "@/components/scroll-zoom-hero"

<ScrollZoomHero
  maxScale={1.5}
  minScale={1}
  zoomRange={1.2}
  fadeOnExit={true}
  springConfig={{ stiffness: 100, damping: 30, mass: 1 }}
>
  <YourHeroContent />
</ScrollZoomHero>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `maxScale` | `number` | `1.4` | Maximum zoom scale |
| `minScale` | `number` | `1` | Initial scale |
| `zoomRange` | `number` | `1.5` | Scroll distance (viewport heights) for full zoom |
| `fadeOnExit` | `boolean` | `true` | Fade out content at end of zoom |
| `springConfig` | `object` | `{ stiffness: 100, damping: 30 }` | Physics for smooth motion |
| `scrollContainerHeight` | `number` | `2` | Multiplier for container height |

---

### 2. AuroraBackground

CSS-based animated gradient background inspired by aurora borealis.

```tsx
import { AuroraBackground, auroraPresets } from "@/components/aurora-background"

<AuroraBackground
  colors={auroraPresets.ocean}
  glowIntensity={0.4}
  animationSpeed={1}
  blurAmount="blur-3xl"
  blendMode="mix-blend-screen"
>
  <YourContent />
</AuroraBackground>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `colors` | `object` | `auroraPresets.default` | Four-color gradient palette |
| `glowIntensity` | `number` | `0.4` | Intensity of center glow (0-1) |
| `animationSpeed` | `number` | `1` | Speed multiplier for animations |
| `blurAmount` | `string` | `"blur-3xl"` | Blur level for gradients |
| `blendMode` | `string` | `"mix-blend-screen"` | CSS blend mode |

#### Presets

- `auroraPresets.default` - Violet, Blue, Pink, Emerald
- `auroraPresets.ocean` - Sky, Cyan, Blue, Teal
- `auroraPresets.sunset` - Amber, Red, Pink, Violet
- `auroraPresets.forest` - Greens
- `auroraPresets.subtle` - Grays
- `auroraPresets.dark` - Dark theme optimized

---

## Premium Enhancement Components

### DepthLayer

Creates 3D-like depth with blur and parallax effects.

```tsx
import { DepthLayer } from "@/components/scroll-zoom-hero"

{/* Far background - heavy blur, slow parallax */}
<DepthLayer depth={-2}>
  <div className="bg-gradient-to-r from-violet-500/20" />
</DepthLayer>

{/* Foreground - slight scale, fast parallax */}
<DepthLayer depth={1}>
  <FloatingElements />
</DepthLayer>
```

### GrainOverlay

Subtle film grain texture for visual depth.

```tsx
import { GrainOverlay } from "@/components/scroll-zoom-hero"

<GrainOverlay 
  opacity={0.03} 
  scale={1.5} 
  animationSpeed={0.5} 
/>
```

### ParallaxLayer

Independent parallax scrolling at different speeds.

```tsx
import { ParallaxLayer } from "@/components/scroll-zoom-hero"

<ParallaxLayer speed={0.5} direction="up" maxOffset={100}>
  <BackgroundElements />
</ParallaxLayer>
```

---

## Architecture

```
<AuroraBackground>           {/* Animated gradient backdrop */}
  <ScrollZoomHero>           {/* Scroll-driven zoom container */}
    <DepthLayer depth={-2}>  {/* Far background */}
    <DepthLayer depth={-1}>  {/* Mid background */}
    
    <main>                   {/* Main content (sharp) */}
      <h1>Headline</h1>
    </main>
    
    <GrainOverlay />         {/* Texture overlay */}
  </ScrollZoomHero>
</AuroraBackground>
```

---

## Performance Optimization

### 1. GPU Acceleration

All animations use `transform3d` and `opacity` only:

```tsx
// ✅ GPU accelerated
style={{ transform: "translate3d(0, 0, 0) scale3d(1, 1, 1)" }}

// ❌ Avoid - triggers layout
style={{ width: "100px", height: "100px" }}
```

### 2. Will-Change Hints

Components automatically apply `will-change` hints:

```tsx
style={{ willChange: "transform, opacity" }}
```

### 3. CSS Containment

Add `contain: layout style paint` to parent containers:

```css
.hero-container {
  contain: layout style paint;
}
```

### 4. Virtualization

For complex scenes, consider virtualizing off-screen layers:

```tsx
import { useInView } from "framer-motion"

function Layer({ children }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })
  
  return (
    <div ref={ref}>
      {isInView ? children : null}
    </div>
  )
}
```

---

## Accessibility

### Reduced Motion Support

All components respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  .aurora-layer {
    animation: none !important;
  }
}
```

### Implementation

```tsx
// Automatically handled by components
<AuroraBackground>
  {/* Animations disabled when user prefers reduced motion */}
</AuroraBackground>
```

---

## Browser Support

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| CSS Custom Properties | 49+ | 31+ | 9.1+ | 15+ |
| CSS Blend Modes | 35+ | 30+ | 8+ | 15+ |
| CSS Filters | 53+ | 35+ | 9.1+ | 15+ |
| Framer Motion | All modern browsers | | | |

---

## Bundle Size

| Component | Size (gzipped) |
|-----------|----------------|
| ScrollZoomHero | ~2.1 KB |
| AuroraBackground | ~1.8 KB |
| DepthLayer | ~0.8 KB |
| GrainOverlay | ~0.6 KB |
| **Total** | **~5.3 KB** |

---

## Advanced Usage

### Custom Color Palette

```tsx
<AuroraBackground
  colors={{
    primary: "#ff6b6b",
    secondary: "#4ecdc4",
    tertiary: "#45b7d1",
    quaternary: "#96ceb4",
  }}
>
```

### Synced Animations

```tsx
function SyncedHero() {
  const [zoomProgress, setZoomProgress] = useState(0)
  
  return (
    <ScrollZoomHero onZoomProgress={setZoomProgress}>
      <motion.div
        style={{
          // Sync other elements to zoom
          opacity: 1 - zoomProgress * 0.5,
        }}
      />
    </ScrollZoomHero>
  )
}
```

### Dynamic Theme Switching

```tsx
function ThemedHero() {
  const { theme } = useTheme()
  
  return (
    <AuroraBackground
      colors={theme === "dark" 
        ? auroraPresets.dark 
        : auroraPresets.default
      }
    />
  )
}
```

---

## Common Issues

### Z-Index Conflicts

```tsx
{/* ✅ Correct - Aurora at base level */}
<AuroraBackground className="z-0">
  <ScrollZoomHero>
    <Content className="z-10" />
  </ScrollZoomHero>
</AuroraBackground>

{/* ❌ Avoid - Conflicting z-indexes */}
<AuroraBackground className="z-50">
```

### Performance on Low-End Devices

```tsx
{/* Detect low-end devices */}
const isLowEnd = navigator.hardwareConcurrency <= 4

<AuroraBackground
  animationSpeed={isLowEnd ? 0.5 : 1}
  blurAmount={isLowEnd ? "blur-xl" : "blur-3xl"}
/>
```

---

## License

MIT - Built from scratch using public APIs only.
