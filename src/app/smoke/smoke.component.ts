import { Component, OnInit, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import * as THREE from 'three';


@Component({
    selector: 'app-smoke',
    templateUrl: './smoke.component.html',
    styleUrls: ['./smoke.component.scss'],
    standalone: false
})
export class SmokeComponent implements OnInit, AfterViewInit, OnDestroy {
  
  smokeParticles: THREE.Mesh[] = [];
  

  private camera!: THREE.PerspectiveCamera;
  private scene!: THREE.Scene;
  private renderer!: THREE.WebGLRenderer;
  private geometry!: THREE.BoxGeometry;
  private material!: THREE.MeshLambertMaterial;
  private mesh!: THREE.Mesh;
  private clock!: THREE.Clock;
  private delta: number=0;
  smokeGeo?: THREE.PlaneGeometry;
  smokeMaterial?: THREE.MeshLambertMaterial;
  // ... add other properties as needed

  constructor(private el: ElementRef) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.init();
    this.animate();
  }

  ngOnDestroy(): void {
    // Cleanup code here if necessary
  }

  init(): void {

    this.smokeGeo = new THREE.PlaneGeometry(300,300);
    const loader = new THREE.TextureLoader();
    const smokeTexture = loader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/Smoke-Element.png');

    this.smokeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff, map: smokeTexture, transparent: true});

    for (let p = 0; p < 150; p++) {
        const particle = new THREE.Mesh(this.smokeGeo, this.smokeMaterial);
        particle.position.set(Math.random()*500-250,Math.random()*500-250,Math.random()*1000-100);
        particle.rotation.z = Math.random() * 360;
        this.scene.add(particle);
        this.smokeParticles.push(particle);
    }


    this.clock = new THREE.Clock();
    
    this.renderer = new THREE.WebGLRenderer({
        canvas: this.el.nativeElement.querySelector('#myCanvas')
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize( window.innerWidth, window.innerHeight );

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    this.camera.position.z = 1000;
    this.scene.add(this.camera);

    this.geometry = new THREE.BoxGeometry( 200, 200, 200 );
    this.material = new THREE.MeshLambertMaterial( { color: 0xffffff, wireframe: false } );
    this.mesh = new THREE.Mesh( this.geometry, this.material );
    
    // ... continue with other initializations
  }

  animate(): void {
    this.delta = this.clock.getDelta();
    requestAnimationFrame(() => this.animate());
    this.evolveSmoke();
    this.render();
  }

  evolveSmoke() {
    let sp = this.smokeParticles.length;
    while(sp--) {
        this.smokeParticles[sp].rotation.z += (this.delta * 0.2);
    }
}

  render(): void {
    this.mesh.rotation.x += 0.005;
    this.mesh.rotation.y += 0.01;
    const cubeSineDriver = 0.01;  // Note: This was previously uninitialized, might want to fix this
    this.mesh.position.z = 100 + (Math.sin(cubeSineDriver) * 500);
    this.renderer.render(this.scene, this.camera);
    }
}