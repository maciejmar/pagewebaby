import { AfterViewInit, Component, ElementRef, OnDestroy } from '@angular/core';
import * as THREE from 'three';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

@Component({
  selector: 'app-neural-bg',
  template: '',
})
export class NeuralBgComponent implements AfterViewInit, OnDestroy {
  private containerEl!: HTMLElement;
  private renderer!: THREE.WebGLRenderer;
  private camera!: THREE.PerspectiveCamera;
  private scene!: THREE.Scene;
  private nodeGeometry!: THREE.BufferGeometry;
  private pointsLayers: THREE.Points[] = [];
  private lines!: THREE.LineSegments;
  private animationId: any;

  private basePositions!: Float32Array;  // niezmienne anchor’y
  private phases!: Float32Array;         // losowa faza dla każdego punktu
  private speeds!: Float32Array;         // losowa prędkość „kołysania” dla każdego punktu

  // parametry
  // private BOUNDS = 28;
  // private LINK_DISTANCE = 4.5;
  // private LINE_OPACITY = 0.25;
  // private WIND = 0.0025;
  private BOUNDS = 28;          // i tak będzie nadpisywane przez recomputeBoundsToFill()
  
  
  private WIND = 0.018;         // było 0.0025 → realny ruch
  

  private LINK_DISTANCE = 10.0;      // było np. 6.0
  private MAX_LINKS_PER_NODE = 66;  // było 6
  private MIN_LINKS_PER_NODE = 5;   // nowość: gwarantujemy min. gęstość
  private LINE_OPACITY = 0.07;      // ciut mocniej, żeby linki były widoczne
  private TIME_SCALE = 0.55;   // ⬅️ mniejsza wartość = wolniej (np. 0.4–0.7)
  private _time = 0;
  private _last = 0;

  ngAfterViewInit() {
    this.createContainer();
    this.initScene();
    this.animate();
    window.addEventListener('resize', this.onResize);
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.onResize);
    if (this.animationId) cancelAnimationFrame(this.animationId);
  }

 private createContainer() {
  this.containerEl = document.createElement('div');
  this.applyContainerStyles(this.containerEl);

  // ZAMIAST appendChild:
  const first = document.body.firstChild;
  if (first) {
    document.body.insertBefore(this.containerEl, first); // ⬅️ pod całą appką
  } else {
    document.body.appendChild(this.containerEl);
  }
}

  private applyContainerStyles(el: HTMLElement) {
    el.style.position = 'fixed';
    el.style.left = '0';
    el.style.top = '0';
    el.style.width = '100vw';
    el.style.height = '100vh';
    el.style.pointerEvents = 'none';
    el.style.background = 'transparent';
    el.style.zIndex = '0'; 
  }

  private initScene() {
    this.scene = new THREE.Scene();

    const rect = this.containerEl.getBoundingClientRect();
    this.camera = new THREE.PerspectiveCamera(45, rect.width / rect.height, 1, 1000);
    this.camera.position.z = 40;

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    this.renderer.setSize(rect.width, rect.height, false);

    const canvas = this.renderer.domElement as HTMLCanvasElement;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    this.containerEl.appendChild(canvas);

    this.recomputeBoundsToFill();
//
    const nodeCount = this.computeNodeCount();
    const positions = new Float32Array(nodeCount * 3);
    for (let i = 0; i < nodeCount; i++) {
      const i3 = i * 3;
      positions[i3]     = (Math.random() - 0.5) * this.BOUNDS;
      positions[i3 + 1] = (Math.random() - 0.5) * this.BOUNDS;
      positions[i3 + 2] = (Math.random() - 0.5) * this.BOUNDS;
    }
    this.basePositions = positions.slice();                 // ⬅️ zapamiętujemy anchor’y
    this.phases  = new Float32Array(nodeCount).map(() => Math.random() * Math.PI * 2);
    this.speeds  = new Float32Array(nodeCount).map(() => 0.6 + Math.random() * 0.8); // 0.6–1.4

    this.nodeGeometry = new THREE.BufferGeometry();
    this.nodeGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
//

    // const nodeCount = this.computeNodeCount();
    // const positions = new Float32Array(nodeCount * 3);
    // for (let i = 0; i < nodeCount; i++) {
    //   positions[i * 3] = (Math.random() - 0.5) * this.BOUNDS;
    //   positions[i * 3 + 1] = (Math.random() - 0.5) * this.BOUNDS;
    //   positions[i * 3 + 2] = (Math.random() - 0.5) * this.BOUNDS;
    // }
    // this.nodeGeometry = new THREE.BufferGeometry();
    // this.nodeGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    this.initLayersWithGlow(this.nodeGeometry);
    this.initLines();
  }

  private computeNodeCount(): number {
  const w = this.containerEl?.clientWidth || window.innerWidth;
  const h = this.containerEl?.clientHeight || window.innerHeight;
  const base = 340; // było 260
  const scale = Math.sqrt((w * h) / (1280 * 720));
  return Math.max(260, Math.min(800, Math.floor(base * scale)));
}

  private recomputeBoundsToFill() {
    const halfH = Math.tan(THREE.MathUtils.degToRad(this.camera!.fov * 0.5)) * this.camera!.position.z;
    const halfW = halfH * this.camera!.aspect;
    const margin = 1.2;
    this.BOUNDS = Math.max(halfW, halfH) * 2 * margin;
  }

  private respreadGeometryToBounds() {
    if (!this.nodeGeometry) return;
    const posAttr = this.nodeGeometry.attributes['position'] as THREE.BufferAttribute;
    for (let i = 0; i < posAttr.count; i++) {
      const i3 = i * 3;
      posAttr.array[i3] = (Math.random() - 0.5) * this.BOUNDS;
      posAttr.array[i3 + 1] = (Math.random() - 0.5) * this.BOUNDS;
      posAttr.array[i3 + 2] = (Math.random() - 0.5) * this.BOUNDS;
    }
    posAttr.needsUpdate = true;
  }

  private initLayersWithGlow(geo: THREE.BufferGeometry) {
    const dotTexture = this.makeSoftDotTexture();
    const layerSettings = [
      { size: 0.22, opacity: 0.45 },
      { size: 0.30, opacity: 0.65 },
      { size: 0.40, opacity: 0.88 },
      { size: 0.56, opacity: 0.55 },
    ];
    const color = new THREE.Color(0x7ae7ff);
    this.pointsLayers = layerSettings.map(({ size, opacity }) => {
      const mat = new THREE.PointsMaterial({
        size,
        map: dotTexture,
        transparent: true,
        opacity,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        color,
        sizeAttenuation: true,
      });
      const pts = new THREE.Points(geo, mat);
      this.scene!.add(pts);
      return pts;
    });
  }

  private initLines() {
    const material = new THREE.LineBasicMaterial({ color: 0x7ae7ff, transparent: true, opacity: this.LINE_OPACITY });
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(0), 3));
    this.lines = new THREE.LineSegments(geometry, material);
    this.scene!.add(this.lines);
  }

  private makeSoftDotTexture(): THREE.Texture {
    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.2, 'rgba(255,255,255,0.6)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(canvas);
  }

 private animate = () => {
  this.animationId = requestAnimationFrame(this.animate);

  const now = performance.now();
  if (!this._last) this._last = now;
  const dt = (now - this._last) / 2000;  //time parameter 2000
  this._last = now;

  this._time += dt * this.TIME_SCALE;  // ⬅️ regulator prędkości
  const t = this._time;
  const posAttr = this.nodeGeometry.attributes['position'] as THREE.BufferAttribute;
  const posArr = posAttr.array as Float32Array;
  const base = this.basePositions;
  const n = posAttr.count;

  // amplitudy fal – proporcjonalne do rozmiaru sceny
  const ampX = this.BOUNDS * 0.018;
  const ampY = this.BOUNDS * 0.022;
  const ampZ = this.BOUNDS * 0.014;

  // płynny globalny dryf (bardzo delikatny)
  const driftX = Math.sin(t * 0.07) * this.BOUNDS * 0.0025;
  const driftY = Math.cos(t * 0.05) * this.BOUNDS * 0.0025;
  const driftZ = Math.sin(t * 0.06) * this.BOUNDS * 0.0020;

  for (let i = 0; i < n; i++) {
    const i3 = i * 3;
    const ph = this.phases[i];
    const sp = this.speeds[i];

    // 3 niezależne harmoniczne + dryf
    posArr[i3]     = base[i3]     + Math.sin(t * (0.9 * sp) + ph + i * 0.11) * ampX + driftX;
    posArr[i3 + 1] = base[i3 + 1] + Math.cos(t * (1.1 * sp) + ph + i * 0.07) * ampY + driftY;
    posArr[i3 + 2] = base[i3 + 2] + Math.sin(t * (0.7 * sp) + ph + i * 0.05) * ampZ + driftZ;
  }
  posAttr.needsUpdate = true;

  // —— połączenia: promień + limit na węzeł ——
  const links: number[] = [];
  const linkCount = new Uint16Array(n); // ile połączeń ma już dany węzeł
  const maxPerNode = this.MAX_LINKS_PER_NODE;
  const maxDist = this.LINK_DISTANCE;

  for (let i = 0; i < n; i++) {
    const ax = posArr[i * 3], ay = posArr[i * 3 + 1], az = posArr[i * 3 + 2];
    if (linkCount[i] >= maxPerNode) continue;

    for (let j = i + 1; j < n; j++) {
      if (linkCount[i] >= maxPerNode && linkCount[j] >= maxPerNode) continue;

      const bx = posArr[j * 3], by = posArr[j * 3 + 1], bz = posArr[j * 3 + 2];
      const dx = ax - bx, dy = ay - by, dz = az - bz;
      const dist = Math.hypot(dx, dy, dz);

      if (dist < maxDist) {
        // dodajemy krawędź, jeśli któryś z węzłów ma jeszcze „slot”
        if (linkCount[i] < maxPerNode || linkCount[j] < maxPerNode) {
          links.push(ax, ay, az, bx, by, bz);
          if (linkCount[i] < maxPerNode) linkCount[i]++;
          if (linkCount[j] < maxPerNode) linkCount[j]++;
        }
      }
    }
  }

  this.lines.geometry.setAttribute('position', new THREE.Float32BufferAttribute(links, 3));
  (this.lines.geometry.attributes['position'] as THREE.BufferAttribute).needsUpdate = true;

  // lekki oddech sceny, ale bardzo subtelny
  this.scene.rotation.y = Math.sin(t * 0.05) * 0.12;

  this.renderer.render(this.scene, this.camera);
};

  private onResize = () => {
    if (!this.renderer || !this.camera || !this.containerEl) return;
    const rect = this.containerEl.getBoundingClientRect();
    this.camera.aspect = rect.width / rect.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(rect.width, rect.height, false);
    this.recomputeBoundsToFill();
    this.respreadGeometryToBounds();
  };
}
