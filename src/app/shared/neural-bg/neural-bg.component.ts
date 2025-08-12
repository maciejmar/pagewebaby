import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  NgZone,
  OnDestroy,
  Renderer2,
  ViewChild
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-neural-bg',
  templateUrl: './neural-bg.component.html',
  styleUrls: ['./neural-bg.component.scss']
})
export class NeuralBgComponent implements AfterViewInit, OnDestroy {
  @ViewChild('bgContainer', { static: true }) containerRef!: ElementRef<HTMLDivElement>;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;

  private pointsLayers: THREE.Points[] = [];
  private lines!: THREE.LineSegments;
  private nodeGeometry!: THREE.BufferGeometry;
  private positions!: Float32Array;

  private resizeUnlisten?: () => void;
  private rafId?: number;

  // konfiguracja
  private NODE_COUNT = 180;
  private BOUNDS = 22;
  private LINK_DISTANCE = 3.2;
  private WIND = 0.0022;
  private LINE_OPACITY = 0.16;

  constructor(
    private renderer2: Renderer2,
    private ngZone: NgZone,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.initThree();
    this.initGeometry();
    this.initLayersWithGlow();
    this.initLines();

    this.onResize();
    this.resizeUnlisten = this.renderer2.listen('window', 'resize', () => this.onResize());

    this.ngZone.runOutsideAngular(() => {
      const loop = () => {
        this.animate();
        this.rafId = requestAnimationFrame(loop);
      };
      loop();
    });
  }

  ngOnDestroy(): void {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (this.resizeUnlisten) this.resizeUnlisten();
    this.dispose();
  }

  private initThree() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(70, 1, 0.1, 1000);
    this.camera.position.z = 34;

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    this.renderer2.appendChild(this.containerRef.nativeElement, this.renderer.domElement);

    this.scene.fog = new THREE.FogExp2(0x000000, 0.035);
  }

  private initGeometry() {
    this.nodeGeometry = new THREE.BufferGeometry();
    this.positions = new Float32Array(this.NODE_COUNT * 3);
    for (let i = 0; i < this.NODE_COUNT; i++) {
      const i3 = i * 3;
      this.positions[i3]     = (Math.random() - 0.5) * this.BOUNDS;
      this.positions[i3 + 1] = (Math.random() - 0.5) * this.BOUNDS;
      this.positions[i3 + 2] = (Math.random() - 0.5) * this.BOUNDS;
    }
    this.nodeGeometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
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

  private initLayersWithGlow() {
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
      const pts = new THREE.Points(this.nodeGeometry, mat);
      this.scene.add(pts);
      return pts;
    });
  }

  private initLines() {
    const lineMat = new THREE.LineBasicMaterial({
      color: new THREE.Color(0x00ffff),
      transparent: true,
      opacity: this.LINE_OPACITY,
      blending: THREE.AdditiveBlending,
    });

    const maxSegments = (this.NODE_COUNT * (this.NODE_COUNT - 1)) / 2;
    const linePositions = new Float32Array(maxSegments * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    this.lines = new THREE.LineSegments(lineGeo, lineMat);
    this.scene.add(this.lines);
  }

  private animate() {
    const t = performance.now() * 0.001;

    // poprawiony dostęp do atrybutów
    const pos = this.nodeGeometry.attributes['position'] as THREE.BufferAttribute;

    for (let i = 0; i < this.NODE_COUNT; i++) {
      const i3 = i * 3;
      pos.array[i3]     += Math.sin(t * 0.9 + i * 0.5) * this.WIND;
      pos.array[i3 + 1] += Math.cos(t * 1.1 + i * 0.37) * this.WIND;
      pos.array[i3 + 2] += Math.sin(t * 0.7 + i * 0.23) * (this.WIND * 0.6);
    }
    pos.needsUpdate = true;

    const lp = (this.lines.geometry.attributes['position'] as THREE.BufferAttribute).array as Float32Array;
    let cursor = 0;

    for (let i = 0; i < this.NODE_COUNT; i++) {
      const ax = pos.array[i * 3];
      const ay = pos.array[i * 3 + 1];
      const az = pos.array[i * 3 + 2];

      for (let j = i + 1; j < this.NODE_COUNT; j++) {
        const bx = pos.array[j * 3];
        const by = pos.array[j * 3 + 1];
        const bz = pos.array[j * 3 + 2];

        const dx = ax - bx;
        const dy = ay - by;
        const dz = az - bz;
        const dist = Math.hypot(dx, dy, dz);

        if (dist < this.LINK_DISTANCE) {
          lp[cursor++] = ax; lp[cursor++] = ay; lp[cursor++] = az;
          lp[cursor++] = bx; lp[cursor++] = by; lp[cursor++] = bz;
        }
      }
    }

    this.lines.geometry.setDrawRange(0, cursor / 3);
    (this.lines.geometry.attributes['position'] as THREE.BufferAttribute).needsUpdate = true;

    this.scene.rotation.y = Math.sin(t * 0.1) * 0.2;
    this.renderer.render(this.scene, this.camera);
  }

  private onResize() {
    const w = this.containerRef.nativeElement.clientWidth || window.innerWidth;
    const h = this.containerRef.nativeElement.clientHeight || window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h, false);
  }

  private dispose() {
    this.pointsLayers.forEach(p => {
      p.geometry.dispose();
      (p.material as THREE.Material).dispose();
      this.scene.remove(p);
    });
    if (this.lines) {
      this.lines.geometry.dispose();
      (this.lines.material as THREE.Material).dispose();
      this.scene.remove(this.lines);
    }
    if (this.renderer) {
      this.renderer.dispose();
      const canvas = this.renderer.domElement;
      if (canvas.parentElement) canvas.parentElement.removeChild(canvas);
    }
  }
}
