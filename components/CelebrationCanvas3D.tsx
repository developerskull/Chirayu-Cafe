'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CelebrationCanvas3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check WebGL support using dummy canvas (do not call getContext on ref canvas!)
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) return;
    } catch {
      return;
    }

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      55,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100
    );
    camera.position.z = 25;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: 'low-power',
      });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    // 1. Golden Star / Sparkle Point Cloud
    const particleCount = 120;
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);
    const speedArray = new Float32Array(particleCount);

    const goldColor = new THREE.Color('#f5b232');
    const warmColor = new THREE.Color('#e8891d');
    const creamColor = new THREE.Color('#fff6e5');

    for (let i = 0; i < particleCount; i++) {
      posArray[i * 3] = (Math.random() - 0.5) * 45;
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 35;
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 20;

      const pick = Math.random();
      const col = pick > 0.6 ? goldColor : pick > 0.3 ? warmColor : creamColor;
      colorArray[i * 3] = col.r;
      colorArray[i * 3 + 1] = col.g;
      colorArray[i * 3 + 2] = col.b;

      speedArray[i] = 0.008 + Math.random() * 0.015;
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeo.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    // Circle texture for smooth particles
    const pointCanvas = document.createElement('canvas');
    pointCanvas.width = 64;
    pointCanvas.height = 64;
    const pCtx = pointCanvas.getContext('2d');
    if (pCtx) {
      const grad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 30);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(245, 178, 50, 0.8)');
      grad.addColorStop(1, 'rgba(245, 178, 50, 0)');
      pCtx.fillStyle = grad;
      pCtx.beginPath();
      pCtx.arc(32, 32, 30, 0, Math.PI * 2);
      pCtx.fill();
    }
    const particleTex = new THREE.CanvasTexture(pointCanvas);

    const particlesMat = new THREE.PointsMaterial({
      size: 1.2,
      map: particleTex,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particlesMesh);

    // 2. Floating 3D Celebration Confetti Diamonds
    const confettiCount = 30;
    const confettiGroup = new THREE.Group();
    scene.add(confettiGroup);

    const diamondGeo = new THREE.OctahedronGeometry(0.35, 0);
    const confettiItems: {
      mesh: THREE.Mesh;
      rotSpeedX: number;
      rotSpeedY: number;
      driftSpeed: number;
      wobbleOffset: number;
    }[] = [];

    const palette = [
      new THREE.Color('#f5b232'),
      new THREE.Color('#d49520'),
      new THREE.Color('#8c3654'),
      new THREE.Color('#ffffff'),
    ];

    for (let i = 0; i < confettiCount; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: palette[i % palette.length],
        transparent: true,
        opacity: 0.45 + Math.random() * 0.35,
        wireframe: i % 3 === 0,
      });
      const mesh = new THREE.Mesh(diamondGeo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 15
      );
      const scale = 0.5 + Math.random() * 0.9;
      mesh.scale.set(scale, scale * 1.4, scale);
      confettiGroup.add(mesh);

      confettiItems.push({
        mesh,
        rotSpeedX: (Math.random() - 0.5) * 0.03,
        rotSpeedY: (Math.random() - 0.5) * 0.03,
        driftSpeed: 0.006 + Math.random() * 0.012,
        wobbleOffset: Math.random() * Math.PI * 2,
      });
    }

    // --- Mouse Parallax ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const normX = e.clientX / window.innerWidth - 0.5;
      const normY = e.clientY / window.innerHeight - 0.5;
      targetX = normX * 4;
      targetY = -normY * 4;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    // --- Resize ---
    const handleResize = () => {
      if (!canvas) return;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // --- Animation Loop ---
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth camera parallax
      mouseX += (targetX - mouseX) * 0.04;
      mouseY += (targetY - mouseY) * 0.04;
      camera.position.x = mouseX;
      camera.position.y = mouseY;
      camera.lookAt(0, 0, 0);

      // Float point cloud
      const positions = particlesGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        // Move upward gently
        positions[i * 3 + 1] += speedArray[i];
        if (positions[i * 3 + 1] > 18) {
          positions[i * 3 + 1] = -18;
          positions[i * 3] = (Math.random() - 0.5) * 45;
        }
      }
      particlesGeo.attributes.position.needsUpdate = true;
      particlesMesh.rotation.y = elapsed * 0.015;

      // Float 3D confetti diamonds
      confettiItems.forEach((c) => {
        c.mesh.position.y += c.driftSpeed;
        c.mesh.position.x += Math.sin(elapsed + c.wobbleOffset) * 0.005;
        c.mesh.rotation.x += c.rotSpeedX;
        c.mesh.rotation.y += c.rotSpeedY;

        if (c.mesh.position.y > 18) {
          c.mesh.position.y = -18;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      particleTex.dispose();
      diamondGeo.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.85 }}
      aria-hidden="true"
    />
  );
}
