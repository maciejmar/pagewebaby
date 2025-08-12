import {
  AfterViewInit,
  Component,
  Inject,
  NgZone,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-neural-bg',
  template: '',            // nic nie renderujemy w drzewie aplikacji
})
export class NeuralBgComponent implements AfterViewInit, OnDestroy {
  private containerEl!: HTMLElement;   // <div> w <body>, fixed, pointer-events:none
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;

  private nodeGeometry!: THREE.BufferGeometry;
  private pointsLayers: THREE.Points[] = [];
  private lines!: THREE.LineSegments;

  private resizeUnlisten?: () => void;
  private rafId?: number;

  // konfiguracja
  private LINK_DISTANCE = 3.2;
  private WIND = 0.0022;
  private LINE_OPACITY = 0.16;
  private BOUNDS = 24;                // chmura punktów

  constructor(
    private r2: Renderer2,
    private ngZone: NgZone,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // zabezpieczenie: nie twórz duplikatów
    if (this.document.body.querySelector('[data-neural-bg="1"]')) {
      return;
    }

    // 1) utwórz kontener W CIELE DOKUMENTU, jako pierwszy child (pod całą appką)
    const el = this.r2.createElement('div') as HTMLDivElement; // utwórz lokalnie
    el.setAttribute('data-neural-bg', '1');                    // używaj lokalnej stałej
    this.applyContainerStyles(el);
    this.containerEl = el;  

    const first = this.document.body.firstChild;
    if (first) {
      this.document.body.insertBefore(this.containerEl, first); // będzie POD app-root
    } else {
      this.document.body.appendChild(this.containerEl);
    }

    // 2) three.js
    const { scene, camera, renderer } = this.initThree(this.containerEl);
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;

    const nodeCount = this.computeNodeCount(); // gęstość zależna od rozdzielczości
    this.nodeGeometry = this.initGeometry(nodeCount, this.BOUNDS);
    this.initLayersWithGlow(this.nodeGeometry);
    this.lines = this.initLines(nodeCount);

    this.onResize();
    this.resizeUnlisten = this.r2.listen('window', 'resize', () => this.onResize());

    this.ngZone.runOutsideAngular(() => {
      const loop = () => {
        this.animate(nodeCount);
        this.rafId = requestAnimationFrame(loop);
      };
      loop();
    });
  }

  ngOnDestroy(): void {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (this.resizeUnlisten) this.resizeUnlisten();

    // cleanup three
    this.pointsLayers.forEach(p => {
      p.geometry.dispose();
      (p.material as THREE.Material).dispose();
      this.scene?.remove(p);
    });
    if (this.lines) {
      this.lines.geometry.dispose();
      (this.lines.material as THREE.Material).dispose();
      this.scene?.remove(this.lines);
    }
    if (this.renderer) {
      this.renderer.dispose();
      const canvas = this.renderer.domElement;
      canvas.parentElement?.removeChild(canvas);
    }
    // usuń kontener z <body>
    if (this.containerEl?.parentElement) {
      this.containerEl.parentElement.removeChild(this.containerEl);
    }
  }

  // ---------- helpers ----------

  private applyContainerStyles(el: HTMLElement) {
    // pełny ekran, pod aplikacją, bez przechwytywania klików
    el.style.position = 'fixed';
    el.style.inset = '0';
    el.style.pointerEvents = 'none';
    el.style.background = 'transparent';
    // z-index celowo nie ustawiamy: ponieważ kontener wstawiamy PRZED app-root,
    // cała aplikacja będzie nad nim bez dotykania Twoich z-indexów/layoutu.
  }

  private initThree(mount: HTMLElement) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, 1, 0.1, 1000);
    camera.position.z = 34;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    mount.appendChild(renderer.domElement);

    scene.fog = new THREE.FogExp2(0x000000, 0.035);
    return { scene, camera, renderer };
  }

  private computeNodeCount(): number {
    // skalujemy gęstość względem 1280x720
    const w = window.innerWidth;
    const h = window.innerHeight;
    const base = 180;
    const scale = Math.sqrt((w * h) / (1280 * 720));
    return Math.max(120, Math.min(420, Math.floor(base * scale)));
  }

  private initGeometry(count: number, bounds: number) {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3]     = (Math.random() - 0.5) * bounds;
      pos[i3 + 1] = (Math.random() - 0.5) * bounds;
      pos[i3 + 2] = (Math.random() - 0.5) * bounds;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return geo;
  }

  private makeSoftDotTexture(size = 64): THREE.Texture {
    const canvas = this.document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    const r = size / 2;
    const grad = ctx.createRadialGradient(r, r, 0, r, r, r);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.25, 'rgba(255,255,255,0.6)');
    grad.addColorStop(0.6, 'rgba(255,255,255,0.15)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    return texture;
  }

  private initLayersWithGlow(geo: THREE.BufferGeometry) {
    const dotTexture = this.makeSoftDotTexture();
    const layerSettings = [
      { size: 0.18, opacity: 0.35 },
      { size: 0.24, opacity: 0.5 },
      { size: 0.34, opacity: 0.75 },
    ];

    this.pointsLayers = layerSettings.map(({ size, opacity }) => {
      const mat = new THREE.PointsMaterial({
        size,
        map: dotTexture,
        transparent: true,
        opacity,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        color: new THREE.Color(0x00ffff),
        sizeAttenuation: true,
      });
      const pts = new THREE.Points(geo, mat);
      this.scene!.add(pts);
      return pts;
    });
  }

  private initLines(count: number) {
    const lineMat = new THREE.LineBasicMaterial({
      color: new THREE.Color(0x00ffff),
      transparent: true,
      opacity: this.LINE_OPACITY,
      blending: THREE.AdditiveBlending,
    });
    const maxSegments = (count * (count - 1)) / 2;
    const linePositions = new Float32Array(maxSegments * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    this.scene!.add(lines);
    return lines;
  }

  private animate(count: number) {
    const t = performance.now() * 0.001;
    const pos = this.nodeGeometry!.attributes['position'] as THREE.BufferAttribute;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos.array[i3]     += Math.sin(t * 0.9 + i * 0.5) * this.WIND;
      pos.array[i3 + 1] += Math.cos(t * 1.1 + i * 0.37) * this.WIND;
      pos.array[i3 + 2] += Math.sin(t * 0.7 + i * 0.23) * (this.WIND * 0.6);
    }
    pos.needsUpdate = true;

    const lp = (this.lines!.geometry.attributes['position'] as THREE.BufferAttribute).array as Float32Array;
    let cursor = 0;

    for (let i = 0; i < count; i++) {
      const ax = pos.array[i * 3];
      const ay = pos.array[i * 3 + 1];
      const az = pos.array[i * 3 + 2];

      for (let j = i + 1; j < count; j++) {
        const bx = pos.array[j * 3];
        const by = pos.array[j * 3 + 1];
        const bz = pos.array[j * 3 + 2];

        const dx = ax - bx, dy = ay - by, dz = az - bz;
        const dist = Math.hypot(dx, dy, dz);

        if (dist < this.LINK_DISTANCE) {
          lp[cursor++] = ax; lp[cursor++] = ay; lp[cursor++] = az;
          lp[cursor++] = bx; lp[cursor++] = by; lp[cursor++] = bz;
        }
      }
    }

    this.lines!.geometry.setDrawRange(0, cursor / 3);
    (this.lines!.geometry.attributes['position'] as THREE.BufferAttribute).needsUpdate = true;

    this.scene!.rotation.y = Math.sin(t * 0.1) * 0.2;
    this.renderer!.render(this.scene!, this.camera!);
  }

  private onResize() {
    if (!this.renderer || !this.camera || !this.containerEl) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h, false);
  }
}
