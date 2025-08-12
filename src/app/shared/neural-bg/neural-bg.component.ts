import { AfterViewInit, Component, ElementRef, OnDestroy } from '@angular/core';
import * as THREE from 'three';

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

  // parametry
  private BOUNDS = 28;
  private LINK_DISTANCE = 4.5;
  private LINE_OPACITY = 0.25;
  private WIND = 0.0025;

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
    document.body.appendChild(this.containerEl);
  }

  private applyContainerStyles(el: HTMLElement) {
    el.style.position = 'fixed';
    el.style.left = '0';
    el.style.top = '0';
    el.style.width = '100vw';
    el.style.height = '100vh';
    el.style.pointerEvents = 'none';
    el.style.background = 'transparent';
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

    const nodeCount = this.computeNodeCount();
    const positions = new Float32Array(nodeCount * 3);
    for (let i = 0; i < nodeCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * this.BOUNDS;
      positions[i * 3 + 1] = (Math.random() - 0.5) * this.BOUNDS;
      positions[i * 3 + 2] = (Math.random() - 0.5) * this.BOUNDS;
    }
    this.nodeGeometry = new THREE.BufferGeometry();
    this.nodeGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    this.initLayersWithGlow(this.nodeGeometry);
    this.initLines();
  }

  private computeNodeCount(): number {
    const w = this.containerEl?.clientWidth || window.innerWidth;
    const h = this.containerEl?.clientHeight || window.innerHeight;
    const base = 260;
    const scale = Math.sqrt((w * h) / (1280 * 720));
    return Math.max(200, Math.min(650, Math.floor(base * scale)));
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

    const posAttr = this.nodeGeometry.attributes['position'] as THREE.BufferAttribute;
    const lpArray = (this.lines.geometry.attributes['position'] as THREE.BufferAttribute)?.array as Float32Array;

    for (let i = 0; i < posAttr.count; i++) {
      posAttr.array[i * 3] += (Math.random() - 0.5) * this.WIND;
      posAttr.array[i * 3 + 1] += (Math.random() - 0.5) * this.WIND;
      posAttr.array[i * 3 + 2] += (Math.random() - 0.5) * this.WIND;
    }
    posAttr.needsUpdate = true;

    const positions = posAttr.array as Float32Array;
    const links: number[] = [];
    for (let i = 0; i < posAttr.count; i++) {
      for (let j = i + 1; j < posAttr.count; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < this.LINK_DISTANCE) {
          links.push(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
          links.push(positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]);
        }
      }
    }
    this.lines.geometry.setAttribute('position', new THREE.Float32BufferAttribute(links, 3));
    this.lines.geometry.computeBoundingSphere();

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
