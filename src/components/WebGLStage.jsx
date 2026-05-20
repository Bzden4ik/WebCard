import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ═══════════════════════════════════════════════════════════════════
   WebGL Prologue — procedural wireframe object.

   Не «розовый кубик с cyan particles». Архитектурный wireframe-кристалл
   (icosahedron edges) с мягким амбер-ядром внутри. Дышит, медленно
   вращается, слабо реагирует на pointer.

   Цветовая палитра — ТОЛЬКО bone (paper-0) + amber. Никакого pink/cyan.
   ═══════════════════════════════════════════════════════════════════ */

const PAPER = new THREE.Color('#e8e4dc');
const AMBER = new THREE.Color('#fbbf24');

function Crystal() {
  const groupRef = useRef();
  const innerRef = useRef();
  const coreRef = useRef();

  // Pre-build geometries once — re-renders skip the cost.
  const geos = useMemo(() => {
    const outer = new THREE.IcosahedronGeometry(1.6, 1);
    const inner = new THREE.IcosahedronGeometry(1.6, 2);
    return {
      outerEdges: new THREE.EdgesGeometry(outer),
      innerEdges: new THREE.EdgesGeometry(inner),
      core: outer,
    };
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const g = groupRef.current;
    if (!g) return;

    // scroll progress (0..1) — set by Nav onScroll, fall back to 0
    const sp = (typeof window !== 'undefined' && window.__webcardScroll) || 0;

    // gentle continuous rotation + scroll-driven spin acceleration
    g.rotation.y = t * (0.07 + sp * 0.35) + state.pointer.x * 0.18;
    g.rotation.x = -0.12 + state.pointer.y * 0.10 - sp * 0.45;
    g.rotation.z = sp * 0.25;

    // breathing scale + scroll grows + slight compress
    const breath = Math.sin(t * 0.55) * 0.015;
    const s = (1 + breath) * (1 + sp * 0.18);
    g.scale.setScalar(s);

    // inner shell rotates opposite — gives parallax-of-depth
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * (0.13 + sp * 0.5);
      innerRef.current.rotation.z = t * 0.05 - sp * 0.6;
      innerRef.current.scale.setScalar(0.62 + sp * 0.18);
    }
    // core hum — brighter on scroll
    if (coreRef.current) {
      coreRef.current.material.opacity = 0.05 + Math.sin(t * 0.8) * 0.025 + sp * 0.12;
    }
  });

  return (
    <group ref={groupRef}>
      {/* outer wire-frame — primary structure */}
      <lineSegments geometry={geos.outerEdges}>
        <lineBasicMaterial
          color={PAPER}
          transparent
          opacity={0.55}
          depthWrite={false}
        />
      </lineSegments>

      {/* inner shell — denser, smaller, amber */}
      <lineSegments ref={innerRef} geometry={geos.innerEdges} scale={0.62}>
        <lineBasicMaterial
          color={AMBER}
          transparent
          opacity={0.22}
          depthWrite={false}
        />
      </lineSegments>

      {/* core — soft glow */}
      <mesh ref={coreRef} scale={0.34}>
        <icosahedronGeometry args={[1.6, 0]} />
        <meshBasicMaterial color={AMBER} transparent opacity={0.06} depthWrite={false} />
      </mesh>

      {/* central pin-light vertex */}
      <mesh>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color={AMBER} />
      </mesh>
    </group>
  );
}

/* Faint dust — VERY sparse, slow, no swirl. Just spatial reference. */
function DustField() {
  const ref = useRef();
  const count = 80;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3.5 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.012;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color={PAPER}
        transparent
        opacity={0.42}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function WebGLStage() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 4.6], fov: 42 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      style={{ background: 'transparent' }}
      flat
    >
      <Suspense fallback={null}>
        <Crystal />
        <DustField />
      </Suspense>
    </Canvas>
  );
}
