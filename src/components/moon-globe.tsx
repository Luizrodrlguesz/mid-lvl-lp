"use client"

import { useRef } from "react"
import { useShaderCanvas } from "@/lib/use-shader-canvas"

/*
 * Lua em WebGL, na linha da Terra Dusk (Originkit): sem geometria 3D, um único
 * fragment shader resolve a normal da esfera a partir da posição de cada pixel.
 * A superfície é procedural (sem textura): mares escuros por ruído de baixa
 * frequência e crateras em três escalas (células 3D com bacia e borda), com
 * relevo que reage à luz. A luz vem de cima, levemente por trás, então só um
 * crescente fica aceso; o resto recebe um "earthshine" bem fraco.
 *
 * Cores: planaltos quase brancos, mares cinza-azulados e o lado da sombra
 * puxando para o azul. Gira devagar (uma volta a cada
 * ROTATION_SECONDS) e, como o movimento é lento, desenha a 20fps, com DPR
 * limitado, pausa fora da tela e quadro parado com movimento reduzido.
 */

const ROTATION_SECONDS = 420

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec3 uLight;

// Raio do disco no espaço do canvas (o resto é o halo).
const float R = 0.86;

float hash13(vec3 p) {
  p = fract(p * 0.1031);
  p += dot(p, p.zyx + 31.32);
  return fract((p.x + p.y) * p.z);
}

vec3 hash33(vec3 p) {
  p = fract(p * vec3(0.1031, 0.1030, 0.0973));
  p += dot(p, p.yxz + 33.33);
  return fract((p.xxy + p.yxx) * p.zyx);
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
    p = p * 2.03 + 11.7;
    a *= 0.5;
  }
  return v;
}

// Crateras numa grade 3D: cada célula pode ter uma, com bacia funda e borda alta.
float craters(vec3 p, float density) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  float h = 0.0;
  for (int x = -1; x <= 1; x++)
  for (int y = -1; y <= 1; y++)
  for (int z = -1; z <= 1; z++) {
    vec3 g = vec3(float(x), float(y), float(z));
    vec3 rnd = hash33(i + g);
    if (rnd.z > density) continue;
    vec3 r = g + rnd * 0.8 + 0.1 - f;
    float d = length(r);
    float rad = mix(0.18, 0.46, rnd.x);
    float t = d / rad;
    float bowl = -(1.0 - t * t) * step(t, 1.0);
    float rim = exp(-pow((t - 1.0) * 4.0, 2.0)) * 0.55;
    h += (bowl + rim) * rad;
  }
  return h;
}

// Mares: manchas grandes de ruído de baixa frequência (lisas e escuras).
float mariaAt(vec3 q) {
  return smoothstep(0.47, 0.6, fbm(q * 1.15 + 3.0));
}

// Os mares são mais lisos: menos crateras sobre eles.
float height(vec3 q, float maria) {
  float rough = mix(1.0, 0.35, maria);
  return (craters(q * 3.0, 0.32) * 0.9
        + craters(q * 7.0 + 4.1, 0.42) * 0.45
        + craters(q * 16.0 + 9.3, 0.55) * 0.22) * rough
       + (fbm(q * 24.0) - 0.5) * 0.05;
}

// Gira em torno do eixo Y (com o eixo levemente inclinado).
vec3 spin(vec3 n) {
  // Começa num ângulo qualquer para não abrir sempre na mesma face.
  float a = 1.7 + uTime * 6.28318530718 / ${ROTATION_SECONDS.toFixed(1)};
  float c = cos(a);
  float s = sin(a);
  vec3 r = vec3(c * n.x + s * n.z, n.y, -s * n.x + c * n.z);
  float ct = cos(0.12);
  float st = sin(0.12);
  return vec3(r.x, ct * r.y - st * r.z, st * r.y + ct * r.z);
}

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / (0.5 * min(uRes.x, uRes.y));
  float d = length(p);
  float px = 2.0 / min(uRes.x, uRes.y);
  vec3 L = normalize(uLight);

  // Halo branco-azulado bem fraco do lado aceso.
  vec2 dir = d > 0.0 ? p / d : vec2(0.0);
  float litSide = max(dot(dir, L.xy), 0.0);
  float halo = exp(-max(d - R, 0.0) * 14.0) * 0.18 * litSide * step(R, d);
  vec3 col = vec3(0.85, 0.9, 1.0) * halo;
  float alpha = halo;

  if (d < R + px) {
    float z = sqrt(max(R * R - d * d, 0.0)) / R;
    vec3 n = normalize(vec3(p / R, z));

    // Relevo: gradiente da altura nas tangentes da esfera.
    vec3 t1 = normalize(cross(n, vec3(0.0, 1.0, 0.0)));
    vec3 t2 = cross(n, t1);
    float e = 0.004;
    vec3 q = spin(n);
    float maria = mariaAt(q);
    float h0 = height(q, maria);
    float h1 = height(spin(normalize(n + t1 * e)), maria);
    float h2 = height(spin(normalize(n + t2 * e)), maria);
    vec3 nb = normalize(n - (t1 * (h1 - h0) + t2 * (h2 - h0)) / e * 0.035);

    // Albedo: mares (escuros, cinza-azulados) e planaltos (quase brancos).
    float grain = fbm(q * 9.0);
    vec3 highland = mix(vec3(0.76, 0.75, 0.72), vec3(0.97, 0.96, 0.93), grain);
    vec3 mare = mix(vec3(0.34, 0.36, 0.38), vec3(0.46, 0.47, 0.49), grain);
    vec3 albedo = mix(highland, mare, maria);
    // Bordas de cratera um pouco mais claras.
    albedo *= 1.0 + clamp(h0, 0.0, 0.3) * 0.8;

    // Luz: terminador suave (a lua não tem atmosfera, mas o relevo o quebra).
    float ndl = dot(nb, L);
    float diffuse = smoothstep(-0.04, 0.35, ndl) * max(ndl, 0.0) * 0.7 + smoothstep(-0.04, 0.2, ndl) * 0.3;
    vec3 lit = albedo * diffuse * 1.35;

    // Perto do terminador e no lado escuro, o tom puxa para o azul (como na foto).
    float shade = 1.0 - smoothstep(-0.1, 0.45, dot(n, L));
    lit = mix(lit, lit * vec3(0.5, 0.7, 1.0), shade * 0.7);
    vec3 earthshine = albedo * vec3(0.3, 0.42, 0.58) * 0.16;

    vec3 surface = lit + earthshine;
    float edge = smoothstep(R + px, R - px, d);
    col = mix(col, surface, edge);
    alpha = mix(alpha, 1.0, edge);
  }

  // Curva filmica suave e alfa pré-multiplicado.
  col = col / (1.0 + col * 0.35);
  gl_FragColor = vec4(col * alpha, alpha);
}
`

type MoonGlobeProps = {
  /** Direção da luz (x para a direita, y para cima, z para quem olha). */
  light?: [number, number, number]
  className?: string
}

export function MoonGlobe({ light = [0.62, 0.62, -0.38], className }: MoonGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [lx, ly, lz] = light

  useShaderCanvas(canvasRef, FRAG, {
    label: "MoonGlobe",
    wrap: ROTATION_SECONDS,
    onInit: (gl, program) => gl.uniform3f(gl.getUniformLocation(program, "uLight"), lx, ly, lz),
  })

  return <canvas ref={canvasRef} aria-hidden className={className} />
}
