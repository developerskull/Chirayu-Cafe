'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const CUP_PALETTES = [
  { id: 'ivory', name: 'Porcelain Ivory', hex: '#faf7f2', label: 'Ivory White' },
  { id: 'black', name: 'Obsidian Black', hex: '#1c1b1f', label: 'Luxe Black' },
  { id: 'gold', name: 'Royal Gold', hex: '#d49520', label: 'Royal Gold' },
  { id: 'maroon', name: 'Cafe Maroon', hex: '#52182b', label: 'Wine Maroon' },
  { id: 'emerald', name: 'Emerald Jade', hex: '#163b2f', label: 'Jade Green' },
];

export default function CoffeeCup3D({ className = '' }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const ceramicMatRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const [activeColorId, setActiveColorId] = useState('ivory');
  const [isInteractive, setIsInteractive] = useState(false);
  const [celebrateBurst, setCelebrateBurst] = useState(false);

  const handleColorChange = (id: string, hex: string) => {
    setActiveColorId(id);
    if (ceramicMatRef.current) {
      ceramicMatRef.current.color.set(hex);
    }
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL support using dummy canvas
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) return;
    } catch {
      return;
    }

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.6, 6.4);

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
    const ambientLight = new THREE.AmbientLight(0xfff6e5, 1.4);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffeedd, 2.4);
    mainLight.position.set(4, 6, 5);
    scene.add(mainLight);

    const goldRimLight = new THREE.DirectionalLight(0xf5b232, 2.8);
    goldRimLight.position.set(-5, 3, -3);
    scene.add(goldRimLight);

    const frontFillLight = new THREE.DirectionalLight(0xfff8e7, 1.6);
    frontFillLight.position.set(0, 1, 6);
    scene.add(frontFillLight);

    const bottomWarmLight = new THREE.PointLight(0xe8891d, 1.8, 8);
    bottomWarmLight.position.set(0, -1, 2);
    scene.add(bottomWarmLight);

    // --- Group for the cup model ---
    const cupGroup = new THREE.Group();
    scene.add(cupGroup);

    // --- Materials ---
    // Fine Glazed Porcelain Ceramic (Default: Ivory White)
    const ceramicMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#faf7f2'),
      roughness: 0.12,
      metalness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 0.9,
    });
    ceramicMatRef.current = ceramicMaterial;

    // Gleaming 24K Gold Accent
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#f5b232'),
      metalness: 0.92,
      roughness: 0.18,
      emissive: new THREE.Color('#8a5a0c'),
      emissiveIntensity: 0.25,
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
    const saucerRimGeo = new THREE.TorusGeometry(2.38, 0.035, 16, 64);
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
    const cupRimGeo = new THREE.TorusGeometry(1.56, 0.045, 16, 64);
    cupRimGeo.rotateX(Math.PI / 2);
    const cupRim = new THREE.Mesh(cupRimGeo, goldMaterial);
    cupRim.position.y = 0.8;
    cupGroup.add(cupRim);

    // 4. Gold Band around cup base framing the logo
    const waistBandGeo = new THREE.TorusGeometry(1.24, 0.025, 16, 64);
    waistBandGeo.rotateX(Math.PI / 2);
    const waistBand = new THREE.Mesh(waistBandGeo, goldMaterial);
    waistBand.position.y = -0.48;
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

    // 6. High-Resolution "CHIRAYU CAFE" Front Branding Plaque
    const createFrontLogoTexture = () => {
      const c = document.createElement('canvas');
      c.width = 1024;
      c.height = 512;
      const cCtx = c.getContext('2d');
      if (!cCtx) return null;

      cCtx.clearRect(0, 0, 1024, 512);

      // Royal Burgundy Enamel Plaque Background
      cCtx.fillStyle = '#421422';
      cCtx.beginPath();
      cCtx.roundRect(140, 50, 744, 412, 38);
      cCtx.fill();

      // Metallic Gold Gradient
      const goldGrad = cCtx.createLinearGradient(0, 100, 0, 420);
      goldGrad.addColorStop(0, '#fff4cc');
      goldGrad.addColorStop(0.3, '#f5b232');
      goldGrad.addColorStop(0.7, '#d49520');
      goldGrad.addColorStop(1, '#a06a09');

      // Outer Ornate Frame
      cCtx.strokeStyle = goldGrad;
      cCtx.lineWidth = 4.5;
      cCtx.beginPath();
      cCtx.roundRect(140, 50, 744, 412, 38);
      cCtx.stroke();

      // Inner Frame
      cCtx.lineWidth = 1.5;
      cCtx.strokeStyle = 'rgba(245, 178, 50, 0.55)';
      cCtx.beginPath();
      cCtx.roundRect(156, 66, 712, 380, 28);
      cCtx.stroke();

      // Top Stars Crest
      cCtx.fillStyle = '#f5b232';
      cCtx.font = '30px serif';
      cCtx.textAlign = 'center';
      cCtx.textBaseline = 'middle';
      cCtx.fillText('★     ★     ★', 512, 115);

      // Main Brand Name: CHIRAYU CAFE
      cCtx.font = '900 86px "Playfair Display", Georgia, serif';
      cCtx.fillStyle = goldGrad;
      cCtx.shadowColor = 'rgba(0, 0, 0, 0.85)';
      cCtx.shadowBlur = 14;
      cCtx.shadowOffsetY = 4;
      cCtx.fillText('CHIRAYU CAFE', 512, 230);

      cCtx.shadowBlur = 0;
      cCtx.shadowOffsetY = 0;

      // Elegant divider with diamond
      cCtx.strokeStyle = 'rgba(245, 178, 50, 0.85)';
      cCtx.lineWidth = 2;
      cCtx.beginPath();
      cCtx.moveTo(270, 292);
      cCtx.lineTo(465, 292);
      cCtx.moveTo(559, 292);
      cCtx.lineTo(754, 292);
      cCtx.stroke();

      cCtx.font = '22px serif';
      cCtx.fillStyle = '#f5b232';
      cCtx.fillText('◆', 512, 292);

      // Subtitle
      cCtx.font = '700 28px "Poppins", sans-serif';
      cCtx.fillStyle = '#fff6e5';
      cCtx.fillText('REAL TIME TO CELEBRATE', 512, 348);

      // Est & Location
      cCtx.font = '600 22px "Poppins", sans-serif';
      cCtx.fillStyle = 'rgba(245, 178, 50, 0.95)';
      cCtx.fillText('☕ MHASRUL, NASHIK ☕', 512, 402);

      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    };

    // Back Side Branding in Marathi: "चिरायु कॅफे"
    const createBackLogoTexture = () => {
      const c = document.createElement('canvas');
      c.width = 1024;
      c.height = 512;
      const cCtx = c.getContext('2d');
      if (!cCtx) return null;

      cCtx.clearRect(0, 0, 1024, 512);

      // Royal Burgundy Enamel Plaque Background
      cCtx.fillStyle = '#421422';
      cCtx.beginPath();
      cCtx.roundRect(140, 50, 744, 412, 38);
      cCtx.fill();

      const goldGrad = cCtx.createLinearGradient(0, 100, 0, 420);
      goldGrad.addColorStop(0, '#fff4cc');
      goldGrad.addColorStop(0.3, '#f5b232');
      goldGrad.addColorStop(0.7, '#d49520');
      goldGrad.addColorStop(1, '#a06a09');

      cCtx.strokeStyle = goldGrad;
      cCtx.lineWidth = 4.5;
      cCtx.beginPath();
      cCtx.roundRect(140, 50, 744, 412, 38);
      cCtx.stroke();

      cCtx.lineWidth = 1.5;
      cCtx.strokeStyle = 'rgba(245, 178, 50, 0.55)';
      cCtx.beginPath();
      cCtx.roundRect(156, 66, 712, 380, 28);
      cCtx.stroke();

      // Top Icon
      cCtx.fillStyle = '#f5b232';
      cCtx.font = '32px sans-serif';
      cCtx.textAlign = 'center';
      cCtx.textBaseline = 'middle';
      cCtx.fillText('✨  ☕  ✨', 512, 115);

      // Brand Name in Marathi: चिरायु कॅफे
      cCtx.font = 'bold 96px "Noto Sans Devanagari", sans-serif';
      cCtx.fillStyle = goldGrad;
      cCtx.shadowColor = 'rgba(0, 0, 0, 0.85)';
      cCtx.shadowBlur = 14;
      cCtx.shadowOffsetY = 4;
      cCtx.fillText('चिरायु कॅफे', 512, 230);

      cCtx.shadowBlur = 0;
      cCtx.shadowOffsetY = 0;

      // Divider
      cCtx.strokeStyle = 'rgba(245, 178, 50, 0.85)';
      cCtx.lineWidth = 2;
      cCtx.beginPath();
      cCtx.moveTo(270, 292);
      cCtx.lineTo(465, 292);
      cCtx.moveTo(559, 292);
      cCtx.lineTo(754, 292);
      cCtx.stroke();

      cCtx.font = '22px serif';
      cCtx.fillStyle = '#f5b232';
      cCtx.fillText('◆', 512, 292);

      // Tagline Marathi
      cCtx.font = 'bold 30px "Noto Sans Devanagari", sans-serif';
      cCtx.fillStyle = '#fff6e5';
      cCtx.fillText('खऱ्या अर्थाने सेलिब्रेट करण्याची वेळ', 512, 348);

      // Subtitle Marathi
      cCtx.font = '600 24px "Noto Sans Devanagari", sans-serif';
      cCtx.fillStyle = 'rgba(245, 178, 50, 0.95)';
      cCtx.fillText('🌿 १००% शुद्ध शाकाहारी • म्हसरूळ, नाशिक', 512, 402);

      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    };

    const frontLogoTex = createFrontLogoTexture();
    const logoMat = new THREE.MeshStandardMaterial({
      map: frontLogoTex,
      transparent: true,
      metalness: 0.85,
      roughness: 0.22,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    const frontLogoGeo = new THREE.CylinderGeometry(
      1.52,
      1.38,
      0.82,
      48,
      1,
      true,
      -Math.PI * 0.38,
      Math.PI * 0.76
    );
    const frontLogoMesh = new THREE.Mesh(frontLogoGeo, logoMat);
    frontLogoMesh.position.y = 0.08;
    cupGroup.add(frontLogoMesh);

    // Back side logo
    const backLogoTex = createBackLogoTexture();
    const backLogoMat = new THREE.MeshStandardMaterial({
      map: backLogoTex,
      transparent: true,
      metalness: 0.85,
      roughness: 0.22,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    const backLogoGeo = new THREE.CylinderGeometry(
      1.52,
      1.38,
      0.82,
      48,
      1,
      true,
      Math.PI - Math.PI * 0.38,
      Math.PI * 0.76
    );
    const backLogoMesh = new THREE.Mesh(backLogoGeo, backLogoMat);
    backLogoMesh.position.y = 0.08;
    cupGroup.add(backLogoMesh);

    // 7. Coffee Liquid with procedural Latte Art
    const latteCanvas = document.createElement('canvas');
    latteCanvas.width = 512;
    latteCanvas.height = 512;
    const lCtx = latteCanvas.getContext('2d');
    if (lCtx) {
      // Dark Espresso base
      const grad = lCtx.createRadialGradient(256, 256, 10, 256, 256, 250);
      grad.addColorStop(0, '#532f1d');
      grad.addColorStop(0.7, '#32190d');
      grad.addColorStop(1, '#1b0d06');
      lCtx.fillStyle = grad;
      lCtx.fillRect(0, 0, 512, 512);

      // Golden Crema ring
      lCtx.strokeStyle = 'rgba(212, 149, 32, 0.45)';
      lCtx.lineWidth = 14;
      lCtx.beginPath();
      lCtx.arc(256, 256, 235, 0, Math.PI * 2);
      lCtx.stroke();

      // Elegant Latte Art Rosette / Heart
      lCtx.fillStyle = '#fff4e0';
      lCtx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      lCtx.shadowBlur = 6;

      // Heart center
      lCtx.beginPath();
      lCtx.moveTo(256, 320);
      lCtx.bezierCurveTo(256, 280, 160, 230, 160, 170);
      lCtx.bezierCurveTo(160, 120, 210, 120, 256, 170);
      lCtx.bezierCurveTo(302, 120, 352, 120, 352, 170);
      lCtx.bezierCurveTo(352, 230, 256, 280, 256, 320);
      lCtx.fill();

      // Outer delicate leaf loops
      for (let s = 0.75; s >= 0.4; s -= 0.18) {
        lCtx.beginPath();
        lCtx.arc(256, 240 - (1 - s) * 90, 80 * s, 0, Math.PI * 2);
        lCtx.fillStyle = 'rgba(255, 244, 224, 0.45)';
        lCtx.fill();
      }
    }

    const latteTexture = new THREE.CanvasTexture(latteCanvas);
    latteTexture.colorSpace = THREE.SRGBColorSpace;
    const coffeeGeo = new THREE.CircleGeometry(1.45, 48);
    coffeeGeo.rotateX(-Math.PI / 2);
    const coffeeMat = new THREE.MeshStandardMaterial({
      map: latteTexture,
      roughness: 0.25,
      metalness: 0.1,
    });
    const coffeeMesh = new THREE.Mesh(coffeeGeo, coffeeMat);
    coffeeMesh.position.y = 0.65;
    cupGroup.add(coffeeMesh);

    // 8. Rising 3D Steam Particles
    const steamCount = 35;
    const steamGeo = new THREE.SphereGeometry(0.09, 8, 8);
    const steamMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.28,
    });

    const steamParticles: {
      mesh: THREE.Mesh;
      baseX: number;
      baseZ: number;
      speedY: number;
      phase: number;
      wobbleSpeed: number;
    }[] = [];

    for (let i = 0; i < steamCount; i++) {
      const mesh = new THREE.Mesh(steamGeo, steamMat);
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 0.9;
      const bx = Math.cos(angle) * radius;
      const bz = Math.sin(angle) * radius;
      const yPos = 0.7 + Math.random() * 2.2;
      mesh.position.set(bx, yPos, bz);
      const scale = 0.6 + Math.random() * 1.6;
      mesh.scale.set(scale, scale, scale);
      cupGroup.add(mesh);

      steamParticles.push({
        mesh,
        baseX: bx,
        baseZ: bz,
        speedY: 0.012 + Math.random() * 0.015,
        phase: Math.random() * Math.PI * 2,
        wobbleSpeed: 1.5 + Math.random() * 2.0,
      });
    }

    // 9. Orbiting Celebration 3D Stars
    const starGroup = new THREE.Group();
    scene.add(starGroup);

    const starGeo = new THREE.OctahedronGeometry(0.08, 0);
    const stars: { mesh: THREE.Mesh; angle: number; radius: number; speed: number; y: number }[] = [];
    for (let i = 0; i < 14; i++) {
      const mesh = new THREE.Mesh(starGeo, goldMaterial);
      const angle = (i / 14) * Math.PI * 2;
      const radius = 2.8 + Math.random() * 0.6;
      const y = -0.5 + Math.random() * 2.2;
      mesh.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
      starGroup.add(mesh);
      stars.push({
        mesh,
        angle,
        radius,
        speed: 0.008 + (i % 2 === 0 ? 0.004 : -0.004),
        y,
      });
    }

    // --- Interactive Mouse/Touch Rotation ---
    let targetRotationX = 0.25;
    let targetRotationY = -0.4;
    let currentRotationX = 0.25;
    let currentRotationY = -0.4;
    let isDragging = false;
    let previousPointerX = 0;
    let previousPointerY = 0;
    let bounce = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      setIsInteractive(true);
      previousPointerX = e.clientX;
      previousPointerY = e.clientY;
      container.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) {
        const rect = container.getBoundingClientRect();
        const normX = (e.clientX - rect.left) / rect.width - 0.5;
        const normY = (e.clientY - rect.top) / rect.height - 0.5;
        targetRotationY = -0.4 + normX * 0.9;
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
    const startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startTime) * 0.001;

      // Gentle auto-rotation when idle
      if (!isDragging) {
        targetRotationY += 0.005;
      }

      // Smooth damping
      currentRotationX += (targetRotationX - currentRotationX) * 0.08;
      currentRotationY += (targetRotationY - currentRotationY) * 0.08;

      // Bounce decay
      bounce *= 0.92;

      // Apply rotation to cup
      cupGroup.rotation.y = currentRotationY;
      cupGroup.rotation.x = currentRotationX;
      cupGroup.position.y = Math.sin(elapsed * 1.5) * 0.08 + bounce;

      // Animate steam particles
      steamParticles.forEach((sp) => {
        sp.mesh.position.y += sp.speedY;
        const currentY = sp.mesh.position.y;
        const progress = (currentY - 0.7) / 2.3;

        // Disperse and fade as steam rises
        const wobble = Math.sin(elapsed * sp.wobbleSpeed + sp.phase) * (0.1 + progress * 0.35);
        sp.mesh.position.x = sp.baseX + wobble;
        sp.mesh.position.z = sp.baseZ + Math.cos(elapsed * sp.wobbleSpeed + sp.phase) * (0.08 + progress * 0.25);

        const currentScale = 0.6 + progress * 1.8;
        sp.mesh.scale.set(currentScale, currentScale * 1.2, currentScale);

        // Reset particle at top
        if (currentY > 3.0) {
          sp.mesh.position.y = 0.7 + Math.random() * 0.2;
          sp.baseX = (Math.random() - 0.5) * 1.4;
          sp.baseZ = (Math.random() - 0.5) * 1.4;
        }
      });

      // Orbiting stars animation
      stars.forEach((s) => {
        s.angle += s.speed;
        s.mesh.position.x = Math.cos(s.angle) * s.radius;
        s.mesh.position.z = Math.sin(s.angle) * s.radius;
        s.mesh.position.y = s.y + Math.sin(elapsed * 2 + s.angle) * 0.15;
        s.mesh.rotation.y += 0.03;
        s.mesh.rotation.x += 0.02;
      });

      starGroup.rotation.y = elapsed * 0.1;

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

      saucerGeo.dispose();
      cupGeo.dispose();
      cupRimGeo.dispose();
      waistBandGeo.dispose();
      saucerRimGeo.dispose();
      handleShape.dispose();
      handleTrimShape.dispose();
      frontLogoGeo.dispose();
      backLogoGeo.dispose();
      coffeeGeo.dispose();
      steamGeo.dispose();
      ceramicMaterial.dispose();
      goldMaterial.dispose();
      logoMat.dispose();
      backLogoMat.dispose();
      coffeeMat.dispose();
      frontLogoTex?.dispose();
      backLogoTex?.dispose();
      latteTexture.dispose();
      steamMat.dispose();

      renderer.dispose();
      ceramicMatRef.current = null;
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
        className="w-[290px] h-[290px] sm:w-[350px] sm:h-[350px] md:w-[410px] md:h-[410px] cursor-grab active:cursor-grabbing touch-none transition-transform hover:scale-105"
        title="Interactive 3D Coffee Cup — Drag to rotate, tap to celebrate!"
      />

      {/* Interactive Helper Badge */}
      <div className="flex items-center gap-2 bg-[#f5b232]/20 border border-[#f5b232]/40 text-[#f5b232] px-3.5 py-1 rounded-full text-[11px] font-semibold backdrop-blur-md shadow-sm -mt-2">
        <span className="animate-spin text-xs">✨</span>
        <span>{celebrateBurst ? '🎉 Celebrating!' : isInteractive ? '3D Active • Drag to Spin' : 'Interactive 3D • Tap / Drag Cup'}</span>
      </div>

      {/* Interactive Cup Color Switcher */}
      <div className="flex items-center gap-2.5 mt-3 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 shadow-md">
        <span className="text-[11px] text-[#f5b232] font-semibold tracking-wide">Cup Color:</span>
        <div className="flex items-center gap-2">
          {CUP_PALETTES.map((palette) => (
            <button
              key={palette.id}
              onClick={() => handleColorChange(palette.id, palette.hex)}
              className={`w-5 h-5 rounded-full transition-all duration-200 border-2 ${
                activeColorId === palette.id
                  ? 'scale-125 border-[#f5b232] shadow-sm shadow-[#f5b232]'
                  : 'border-white/50 hover:scale-110 opacity-70 hover:opacity-100'
              }`}
              style={{ backgroundColor: palette.hex }}
              title={`Switch cup color to ${palette.label}`}
              aria-label={`Switch cup color to ${palette.label}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
