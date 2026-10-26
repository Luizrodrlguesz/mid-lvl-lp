"use client"

import { useEffect, type RefObject } from "react"

/*
 * Roda um fragment shader de tela cheia num <canvas> (WebGL puro), como a lua
 * e o sol do hero. O shader recebe `uRes` (tamanho em pixels) e `uTime`
 * (segundos, voltando a zero a cada `wrap`). DPR limitado, fps limitado,
 * pausa fora da tela, quadro parado com movimento reduzido e contexto liberado
 * ao desmontar.
 */

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`

type Options = {
  fps?: number
  dprCap?: number
  /** Período de `uTime` em segundos (use um múltiplo do ciclo da animação). */
  wrap?: number
  /** Uniforms fixos, definidos uma vez depois de compilar. */
  onInit?: (gl: WebGLRenderingContext, program: WebGLProgram) => void
  /** Rótulo nos avisos de compilação. */
  label?: string
}

function compile(gl: WebGLRenderingContext, type: number, source: string, label: string) {
  const shader = gl.createShader(type)!
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn(`[${label}]`, gl.getShaderInfoLog(shader))
  }
  return shader
}

export function useShaderCanvas(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  frag: string,
  { fps = 20, dprCap = 1.5, wrap = 3600, onInit, label = "shader" }: Options = {},
) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext("webgl", { premultipliedAlpha: true, alpha: true, antialias: false })
    if (!gl) return

    const program = gl.createProgram()!
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT, label))
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, frag, label))
    gl.linkProgram(program)
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(program, "aPos")
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(program, "uRes")
    const uTime = gl.getUniformLocation(program, "uTime")
    onInit?.(gl, program)

    const frameMs = 1000 / fps
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let time = 0
    let last = 0
    let lastDraw = 0
    let raf = 0

    const draw = () => {
      gl.uniform1f(uTime, time)
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, dprCap)
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr))
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
      }
      gl.viewport(0, 0, w, h)
      gl.uniform2f(uRes, w, h)
      draw()
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      if (now - lastDraw < frameMs) return
      lastDraw = now
      const dt = last === 0 ? 0 : Math.min(0.1, (now - last) / 1000)
      last = now
      time = (time + dt) % wrap
      draw()
    }

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !reduceMotion && !raf) {
        last = 0
        raf = requestAnimationFrame(frame)
      } else if (!entry.isIntersecting && raf) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    })
    io.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      gl.getExtension("WEBGL_lose_context")?.loseContext()
    }
    // onInit é lido só na montagem (uniforms fixos).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef, frag, fps, dprCap, wrap, label])
}
