'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function CoffeeCup3D({ className = '' }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isInteractive, setIsInteractive] = useState(false);
  const [celebrateBurst, setCelebrateBurst] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) return;
    } catch {
      return;
    }

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 6.2);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = false;
    container.appendChild(renderer.domElement);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xfff6e5, 1.2);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffeedd, 2.2);
    mainLight.position.set(4, 6, 5);
    scene.add(mainLight);

    const goldRimLight = new THREE.DirectionalLight(0xf5b232, 2.5);
    goldRimLight.position.set(-5, 3, -3);
    scene.add(goldRimLight);

    const bottomWarmLight = new THREE.PointLight(0xe8891d, 1.5, 8);
    bottomWarmLight.position.set(0, -1, 2);
    scene.add(bottomWarmLight);

    // --- Group for the cup model ---
    const cupGroup = new THREE.Group();
    scene.add(cupGroup);

    // --- Materials ---
    // Luxurious Maroon Ceramic
    const ceramicMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#581d31'),
      roughness: 0.18,
      metalness: 0.08,
      clearcoat: 0.95,
      clearcoatRoughness: 0.1,
      reflectivity: 0.8,
    });

    // Gleaming 24K Gold Accent
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#f5b232'),
      metalness: 0.9,
      roughness: 0.2,
      emissive: new THREE.Color('#7a520a'),
      emissiveIntensity: 0.2,
    });

    // 1. Saucer Plate
    const saucerPoints: THREE.Vector2[] = [];
    saucerPoints.push(new THREE.Vector2(0, 0));
    saucerPoints.push(new THREE.Vector2(1.2, 0.02));
    saucerPoints.push(new THREE.Vector2(2.1, 0.15));
    saucerPoints.push(new THREE.Vector2(2.4, 0.35));
    saucerPoints.push(new THREE.Vector2(2.35, 0.38));
    saucerPoints.push(new THREE.Vector2(2.0, 0.2));
    saucerPoints.push(new THREE.Vector2(1.1, 0.05));
    saucerPoints.push(new THREE.Vector2(0, 0.03));
    const saucerGeo = new THREE.LatheGeometry(saucerPoints, 48);
    const saucer = new THREE.Mesh(saucerGeo, ceramicMaterial);
    saucer.position.y = -1.2;
    cupGroup.add(saucer);

    // Gold rim on saucer
    const saucerRimGeo = new THREE.TorusGeometry(2.38, 0.03, 16, 64);
    saucerRimGeo.rotateX(Math.PI / 2);
    const saucerRim = new THREE.Mesh(saucerRimGeo, goldMaterial);
    saucerRim.position.y = -1.2 + 0.36;
    cupGroup.add(saucerRim);

    // 2. Cup Body (Lathe for authentic ceramic curve)
    const cupPoints: THREE.Vector2[] = [];
    cupPoints.push(new THREE.Vector2(0.9, -1.15));
    cupPoints.push(new THREE.Vector2(1.05, -0.9));
    cupPoints.push(new THREE.Vector2(1.3, -0.4));
    cupPoints.push(new THREE.Vector2(1.48, 0.2));
    cupPoints.push(new THREE.Vector2(1.55, 0.7));
    cupPoints.push(new THREE.Vector2(1.58, 0.8));
    cupPoints.push(new THREE.Vector2(1.54, 0.8));
    cupPoints.push(new THREE.Vector2(1.48, 0.65));
    cupPoints.push(new THREE.Vector2(1.38, 0.1));
    cupPoints.push(new THREE.Vector2(1.18, -0.5));
    cupPoints.push(new THREE.Vector2(0.98, -1.0));
    cupPoints.push(new THREE.Vector2(0.85, -1.1));
    cupPoints.push(new THREE.Vector2(0, -1.1));
    const cupGeo = new THREE.LatheGeometry(cupPoints, 48);
    const cup = new THREE.Mesh(cupGeo, ceramicMaterial);
    cupGroup.add(cup);

    // 3. Gold Lip Rim around cup top
    const cupRimGeo = new THREE.TorusGeometry(1.56, 0.04, 16, 64);
    cupRimGeo.rotateX(Math.PI / 2);
    const cupRim = new THREE.Mesh(cupRimGeo, goldMaterial);
    cupRim.position.y = 0.8;
    cupGroup.add(cupRim);

    // 4. Gold Band around cup waist
    const waistBandGeo = new THREE.TorusGeometry(1.4, 0.025, 16, 64);
    waistBandGeo.rotateX(Math.PI / 2);
    const waistBand = new THREE.Mesh(waistBandGeo, goldMaterial);
    waistBand.position.y = 0.0;
    cupGroup.add(waistBand);

    // 5. Cup Handle
    const handleShape = new THREE.TorusGeometry(0.65, 0.14, 16, 40, Math.PI * 1.25);
    handleShape.rotateZ(Math.PI * 0.45);
    const handle = new THREE.Mesh(handleShape, ceramicMaterial);
    handle.position.set(1.45, -0.15, 0);
    handle.scale.set(1, 1.25, 1);
    cupGroup.add(handle);

    // Handle gold trim
    const handleTrimShape = new THREE.TorusGeometry(0.65, 0.03, 12, 40, Math.PI * 1.25);
    handleTrimShape.rotateZ(Math.PI * 0.45);
    const handleTrim = new THREE.Mesh(handleTrimShape, goldMaterial);
    handleTrim.position.set(1.58, -0.15, 0);
    handleTrim.scale.set(1, 1.25, 1);
    cupGroup.add(handleTrim);

    // 6. Coffee Liquid with procedural Latte Art
    const latteCanvas = document.createElement('canvas');
    latteCanvas.width = 512;
    latteCanvas.height = 512;
    const ctx = latteCanvas.getContext('2d');
    if (ctx) {
      // Dark rich coffee base
      const grad = ctx.createRadialGradient(256, 256, 40, 256, 256, 250);
      grad.addColorStop(0, '#5a2e1d');
      grad.addColorStop(0.65, '#3b1c0e');
      grad.addColorStop(1, '#231008');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 512);

      // Cream foam ring
      ctx.strokeStyle = '#fde8c0';
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.arc(256, 256, 210, 0, Math.PI * 2);
      ctx.stroke();

      // Golden crema swirl
      ctx.strokeStyle = 'rgba(245, 178, 50, 0.45)';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.arc(256, 256, 170, 0.3, Math.PI * 1.8);
      ctx.stroke();

      // Latte Art Heart in center
      ctx.fillStyle = '#fff6e5';
      ctx.shadowColor = 'rgba(0,0,0,0.3)';
      ctx.shadowBlur = 8;

      ctx.save();
      ctx.translate(256, 240);
      ctx.beginPath();
      ctx.moveTo(0, 40);
      ctx.bezierCurveTo(-70, -30, -70, -100, 0, -50);
      ctx.bezierCurveTo(70, -100, 70, -30, 0, 40);
      ctx.fill();

      // Inner heart accent
      ctx.fillStyle = '#edd2a4';
      ctx.beginPath();
      ctx.moveTo(0, 25);
      ctx.bezierCurveTo(-45, -20, -45, -70, 0, -35);
      ctx.bezierCurveTo(45, -70, 45, -20, 0, 25);
      ctx.fill();
      ctx.restore();
    }

    const latteTexture = new THREE.CanvasTexture(latteCanvas);
    const coffeeGeo = new THREE.CircleGeometry(1.45, 48);
    coffeeGeo.rotateX(-Math.PI / 2);
    const coffeeMat = new THREE.MeshStandardMaterial({
      map: latteTexture,
      roughness: 0.3,
      metalness: 0.1,
    });
    const coffeeMesh = new THREE.Mesh(coffeeGeo, coffeeMat);
    coffeeMesh.position.y = 0.65;
    cupGroup.add(coffeeMesh);

    // 7. Rising 3D Steam Particles
    const steamCount = 35;
    const steamGeo = new THREE.SphereGeometry(0.09, 8, 8);
    const steamMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.22,
    });

    const steamParticles: { mesh: THREE.Mesh; speed: number; angle: number; radius: number; initY: number }[] = [];
    const steamGroup = new THREE.Group();
    cupGroup.add(steamGroup);

    for (let i = 0; i < steamCount; i++) {
      const p = new THREE.Mesh(steamGeo, steamMat.clone());
      const initY = 0.7 + Math.random() * 1.8;
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 0.7;
      p.position.set(Math.cos(angle) * radius, initY, Math.sin(angle) * radius);
      const scale = 0.6 + Math.random() * 1.4;
      p.scale.set(scale, scale * 1.5, scale);
      steamGroup.add(p);
      steamParticles.push({
        mesh: p,
        speed: 0.012 + Math.random() * 0.015,
        angle,
        radius,
        initY,
      });
    }

    // 8. Orbiting Celebration 3D Stars
    const starGroup = new THREE.Group();
    scene.add(starGroup);

    const createStarGeo = () => {
      return new THREE.OctahedronGeometry(0.18, 0);
    };

    const stars: { mesh: THREE.Mesh; orbitRadius: number; speed: number; orbitY: number; angle: number }[] = [];
    for (let i = 0; i < 6; i++) {
      const star = new THREE.Mesh(createStarGeo(), goldMaterial);
      const angle = (i / 6) * Math.PI * 2;
      const orbitRadius = 2.4 + (i % 2) * 0.5;
      const orbitY = -0.3 + (i % 3) * 0.5;
      star.position.set(Math.cos(angle) * orbitRadius, orbitY, Math.sin(angle) * orbitRadius);
      starGroup.add(star);
      stars.push({ mesh: star, orbitRadius, speed: 0.01 + (i % 3) * 0.005, orbitY, angle });
    }

    // --- Interactive Mouse/Touch Rotation ---
    let targetRotationX = 0.25;
    let targetRotationY = -0.5;
    let currentRotationX = 0.25;
    let currentRotationY = -0.5;
    let isDragging = false;
    let previousPointerX = 0;
    let previousPointerY = 0;
    let bounce = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      previousPointerX = e.clientX;
      previousPointerY = e.clientY;
      setIsInteractive(true);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) {
        // Subtle tilt on hover
        const rect = container.getBoundingClientRect();
        const normX = (e.clientX - rect.left) / rect.width - 0.5;
        const normY = (e.clientY - rect.top) / rect.height - 0.5;
        targetRotationY = -0.5 + normX * 0.9;
        targetRotationX = 0.25 + normY * 0.5;
        return;
      }
      const deltaX = e.clientX - previousPointerX;
      const deltaY = e.clientY - previousPointerY;
      targetRotationY += deltaX * 0.01;
      targetRotationX += deltaY * 0.01;
      targetRotationX = Math.max(-0.2, Math.min(0.7, targetRotationX));
      previousPointerX = e.clientX;
      previousPointerY = e.clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const onClick = () => {
      bounce = 0.35;
      setCelebrateBurst(true);
      setTimeout(() => setCelebrateBurst(false), 800);
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    container.addEventListener('click', onClick);

    // --- Resize Handling ---
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // --- Animation Loop ---
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Gentle auto-rotation when idle
      if (!isDragging) {
        targetRotationY += 0.005;
      }

      // Smooth damping
      currentRotationX += (targetRotationX - currentRotationX) * 0.08;
      currentRotationY += (targetRotationY - currentRotationY) * 0.08;

      // Bounce decay
      bounce *= 0.92;

      // Position cup with floating bobbing
      cupGroup.rotation.x = currentRotationX;
      cupGroup.rotation.y = currentRotationY;
      cupGroup.position.y = Math.sin(elapsed * 2) * 0.08 + bounce * 0.6;

      // Animate Steam
      steamParticles.forEach((sp) => {
        sp.mesh.position.y += sp.speed;
        const heightRatio = (sp.mesh.position.y - 0.7) / 2.0;

        // Drift in gentle sine wave
        sp.mesh.position.x += Math.sin(elapsed * 3 + sp.initY) * 0.003;
        sp.mesh.position.z += Math.cos(elapsed * 2 + sp.initY) * 0.003;

        // Fade out as it rises
        const mat = sp.mesh.material as THREE.MeshBasicMaterial;
        mat.opacity = Math.max(0, (1 - heightRatio) * 0.28);

        // Reset
        if (sp.mesh.position.y > 2.6) {
          sp.mesh.position.y = 0.7;
          sp.mesh.position.x = (Math.random() - 0.5) * 0.8;
          sp.mesh.position.z = (Math.random() - 0.5) * 0.8;
        }
      });

      // Animate Orbiting Stars
      stars.forEach((st) => {
        st.angle += st.speed;
        st.mesh.position.x = Math.cos(st.angle) * st.orbitRadius;
        st.mesh.position.z = Math.sin(st.angle) * st.orbitRadius;
        st.mesh.position.y = st.orbitY + Math.sin(elapsed * 3 + st.angle) * 0.15;
        st.mesh.rotation.x += 0.03;
        st.mesh.rotation.y += 0.04;
      });

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      container.removeEventListener('click', onClick);

      // Dispose Three.js resources
      renderer.dispose();
      cupGeo.dispose();
      saucerGeo.dispose();
      cupRimGeo.dispose();
      waistBandGeo.dispose();
      saucerRimGeo.dispose();
      handleShape.dispose();
      handleTrimShape.dispose();
      coffeeGeo.dispose();
      steamGeo.dispose();
      ceramicMaterial.dispose();
      goldMaterial.dispose();
      coffeeMat.dispose();
      latteTexture.dispose();
      steamMat.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      {/* 3D Canvas Mount Point */}
      <div
        ref={mountRef}
        className="w-[280px] h-[280px] sm:w-[340px] h-[340px] md:w-[400px] md:h-[400px] cursor-grab active:cursor-grabbing touch-none transition-transform hover:scale-105"
        title="Interactive 3D Coffee Cup — Drag to rotate, tap to celebrate!"
      />

      {/* Interactive Helper Badge */}
      <div className="flex items-center gap-2 bg-[#f5b232]/20 border border-[#f5b232]/40 text-[#f5b232] px-3 py-1 rounded-full text-[11px] font-semibold backdrop-blur-md shadow-sm -mt-2">
        <span className="animate-spin text-xs">✨</span>
        <span>{celebrateBurst ? '🎉 Celebrating!' : isInteractive ? '3D Active • Drag to Spin' : 'Interactive 3D • Tap / Drag Cup'}</span>
      </div>
    </div>
  );
}
