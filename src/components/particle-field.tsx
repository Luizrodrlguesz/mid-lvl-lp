"use client"

import { useEffect, useRef } from "react"

/**
 * Versão leve do fundo de partículas do dark mode (`background-canvas.tsx`):
 * mesma nuvem, rotação, câmera e cores, mas em WebGL puro — sem three.js,
 * @react-three/fiber ou drei.
 *
 * O que deixa mais leve:
 * - rotação e projeção calculadas na GPU (o buffer de pontos é enviado uma vez);
 * - resolução limitada a MAX_DPR — os pontos são borrados, não precisam de retina;
 * - 30 fps em vez de 60 (a rotação é lenta, a diferença não aparece);
 * - o loop para quando a aba fica oculta (o rAF não roda) ou o canvas sai da tela;
 * - o scroll é lido dentro do frame, sem setState no React;
 * - com `prefers-reduced-motion`, desenha um quadro só.
 */

const COUNT = 5000
const SPREAD = 12
const MAX_DPR = 1.5
const FRAME_MS = 1000 / 30

// Mesma câmera do Canvas original: posição z = 6, fov 75°.
const CAMERA_Z = 6
const FOV = (75 * Math.PI) / 180
const NEAR = 0.1
const FAR = 100

// Tamanho e cor do PointMaterial original (size 0.05, #e7efff, opacidade 0.8).
const POINT_SIZE = 0.05

const VERTEX = `
attribute vec3 position;
uniform vec2 uRotation;
uniform float uAspect;
uniform float uScale;

void main() {
  float cx = cos(uRotation.x), sx = sin(uRotation.x);
  float cy = cos(uRotation.y), sy = sin(uRotation.y);
  vec3 p = position;
  // Euler XYZ do three.js: aplica Y e depois X.
  p = vec3(cy * p.x + sy * p.z, p.y, -sy * p.x + cy * p.z);
  p = vec3(p.x, cx * p.y - sx * p.z, sx * p.y + cx * p.z);
  p.z -= ${CAMERA_Z.toFixed(1)};

  float f = ${(1 / Math.tan(FOV / 2)).toFixed(6)};
  gl_Position = vec4(
    p.x * f / uAspect,
    p.y * f,
    p.z * ${((FAR + NEAR) / (NEAR - FAR)).toFixed(6)} + ${((2 * FAR * NEAR) / (NEAR - FAR)).toFixed(6)},
    -p.z
  );
  gl_PointSize = ${POINT_SIZE.toFixed(3)} * uScale / -p.z;
}
`

// Reproduz a textura radial do original (0.95 → 0.45 → 0) direto no shader.
const FRAGMENT = `
precision mediump float;

void main() {
  float r = length(gl_PointCoord - 0.5) * 2.0;
  if (r > 1.0) discard;
  float a = r < 0.45 ? mix(0.95, 0.45, r / 0.45) : mix(0.45, 0.0, (r - 0.45) / 0.55);
  gl_FragColor = vec4(0.906, 0.937, 1.0, a * 0.8);
}
`

const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function buildPositions() {
  const points = new Float32Array(COUNT * 3)
  for (let i = 0; i < COUNT; i++) {
    const i3 = i * 3
    points[i3] = (pseudoRandom(i * 0.37) - 0.5) * SPREAD
    points[i3 + 1] = (pseudoRandom(i * 1.13) - 0.5) * SPREAD
    points[i3 + 2] = (pseudoRandom(i * 2.77) - 0.5) * SPREAD
  }
  return points
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null
}

function Stars() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      powerPreference: "low-power",
    })
    if (!gl) return

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX)
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT)
    const program = gl.createProgram()
    if (!vs || !fs || !program) return
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, buildPositions(), gl.STATIC_DRAW)
    const position = gl.getAttribLocation(program, "position")
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 3, gl.FLOAT, false, 0, 0)

    const uRotation = gl.getUniformLocation(program, "uRotation")
    const uAspect = gl.getUniformLocation(program, "uAspect")
    const uScale = gl.getUniformLocation(program, "uScale")

    // AdditiveBlending do three.js.
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE)
    gl.clearColor(0, 0, 0, 0)

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const start = performance.now()

    const draw = (now: number) => {
      const t = reduceMotion ? 0 : (now - start) / 1000
      const max = document.documentElement.scrollHeight - window.innerHeight
      const scroll = max > 0 ? window.scrollY / max : 0
      gl.uniform2f(uRotation, scroll * 1.2 + t * 0.02, scroll * 0.9 + t * 0.015)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.POINTS, 0, COUNT)
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
      const width = Math.max(1, Math.round(canvas.clientWidth * dpr))
      const height = Math.max(1, Math.round(canvas.clientHeight * dpr))
      canvas.width = width
      canvas.height = height
      gl.viewport(0, 0, width, height)
      gl.uniform1f(uAspect, width / height)
      // Igual ao PointsMaterial com sizeAttenuation: escala = metade da altura do buffer.
      gl.uniform1f(uScale, height / 2)
      draw(performance.now())
    }

    let frame = 0
    let last = 0
    let visible = false

    const loop = (now: number) => {
      frame = requestAnimationFrame(loop)
      if (now - last < FRAME_MS) return
      last = now
      draw(now)
    }

    const play = () => {
      if (reduceMotion || frame || !visible) return
      frame = requestAnimationFrame(loop)
    }
    const pause = () => {
      cancelAnimationFrame(frame)
      frame = 0
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) play()
      else pause()
    })
    visibilityObserver.observe(canvas)

    return () => {
      pause()
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.getExtension("WEBGL_lose_context")?.loseContext()
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
}

const DARK_OVERLAY =
  "radial-gradient(circle at 20% 20%, rgba(49, 225, 142, 0.1), transparent 45%), radial-gradient(circle at 80% 10%, rgba(241, 84, 215, 0.07), transparent 35%), radial-gradient(circle at 50% 80%, rgba(39, 152, 238, 0.12), transparent 40%)"

/** Fundo de partículas do dark mode; preenche o contêiner pai. */
export function ParticleField() {
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: "radial-gradient(circle at center, rgba(255,255,255,0.06), transparent 65%)",
      }}
    >
      <Stars />
      <div className="absolute inset-0" style={{ backgroundImage: DARK_OVERLAY }} />
    </div>
  )
}
