"use client"

import { useRef } from "react"
import { useShaderCanvas } from "@/lib/use-shader-canvas"

/*
 * Sol em WebGL, par da lua do hero (mesma técnica: a esfera é resolvida por
 * pixel num fragment shader, sem geometria). Na superfície, granulação de
 * plasma animada (ruído 3D que ferve devagar), escurecimento nas bordas
 * (limb darkening), algumas manchas solares e fáculas claras perto da borda.
 * Em volta, uma coroa quente com raios que ondulam. Gira bem devagar (uma volta
 * a cada ROTATION_SECONDS). Alfa pré-multiplicado para compor sobre o off-white.
 */

const ROTATION_SECONDS = 600

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;

// Raio do disco (o resto do canvas é a coroa).
const float R = 0.58;

float hash13(vec3 p) {
  p = fract(p * 0.1031);
  p += dot(p, p.zyx + 31.32);
  return fract((p.x + p.y) * p.z);
}

float noise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash13(i), hash13(i + vec3(1, 0, 0)), f.x),
        mix(hash13(i + vec3(0, 1, 0)), hash13(i + vec3(1, 1, 0)), f.x), f.y),
    mix(mix(hash13(i + vec3(0, 0, 1)), hash13(i + vec3(1, 0, 1)), f.x),
        mix(hash13(i + vec3(0, 1, 1)), hash13(i + vec3(1, 1, 1)), f.x), f.y),
    f.z);
}

float fbm(vec3 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.07 + 7.3;
    a *= 0.5;
  }
  return v;
}

vec3 spin(vec3 n, float a) {
  float c = cos(a);
  float s = sin(a);
  return vec3(c * n.x + s * n.z, n.y, -s * n.x + c * n.z);
}

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / (0.5 * min(uRes.x, uRes.y));
  float d = length(p);
  float px = 2.0 / min(uRes.x, uRes.y);
  float t = uTime;

  // Coroa: brilho que cai com a distância, com raios que ondulam devagar.
  float ang = atan(p.y, p.x);
  float rays = fbm(vec3(cos(ang) * 2.2, sin(ang) * 2.2, t * 0.04));
  float fall = max(d - R, 0.0);
  float corona = exp(-fall * 9.0) * 0.6 + exp(-fall * 4.0) * 0.25 * (0.6 + rays);
  // Some antes da borda do canvas (sem corte reto).
  corona *= step(R - px, d) * (1.0 - smoothstep(0.78, 0.98, d));
  // Cor emitida (não multiplicada pela intensidade): o alfa já é a intensidade.
  vec3 col = mix(vec3(1.0, 0.6, 0.18), vec3(1.0, 0.82, 0.45), exp(-fall * 8.0));
  float alpha = corona;

  if (d < R + px) {
    float z = sqrt(max(R * R - d * d, 0.0)) / R;
    vec3 n = normalize(vec3(p / R, z));
    vec3 q = spin(n, 0.4 + t * 6.28318530718 / ${ROTATION_SECONDS.toFixed(1)});

    // Granulação: células que fervem (o tempo entra como terceira dimensão).
    float gran = fbm(q * 22.0 + vec3(0.0, 0.0, t * 0.08));
    float fine = noise(q * 60.0 + t * 0.15);
    // Manchas solares: poucas, numa faixa perto do equador.
    float band = smoothstep(0.55, 0.15, abs(q.y));
    float spots = smoothstep(0.74, 0.8, fbm(q * 3.2 + 20.0)) * band;
    // Limb darkening: as bordas ficam mais escuras e alaranjadas.
    float mu = z;
    float limb = pow(mu, 0.45);

    float heat = clamp(limb * (0.8 + (gran - 0.5) * 0.3 + fine * 0.06), 0.0, 1.2);
    vec3 surface = mix(vec3(0.9, 0.3, 0.05), vec3(1.0, 0.66, 0.16), smoothstep(0.2, 0.7, heat));
    surface = mix(surface, vec3(1.0, 0.86, 0.48), smoothstep(0.82, 1.05, heat));
    // Fáculas: pontos claros perto da borda.
    surface += vec3(1.0, 0.8, 0.5) * smoothstep(0.62, 0.75, gran) * (1.0 - mu) * 0.35;
    surface = mix(surface, vec3(0.45, 0.14, 0.04), spots * 0.75);

    float edge = smoothstep(R + px, R - px, d);
    col = mix(col, surface, edge);
    alpha = mix(alpha, 1.0, edge);
  }

  gl_FragColor = vec4(col * alpha, alpha);
}
`

export function SunGlobe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useShaderCanvas(canvasRef, FRAG, { label: "SunGlobe", wrap: ROTATION_SECONDS * 6, fps: 24 })
  return <canvas ref={canvasRef} aria-hidden className={className} />
}
