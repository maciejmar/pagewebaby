import { Component, AfterViewInit, OnDestroy, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      state('out', style({ opacity: 0 })),
      transition('out => in', animate('600ms ease-in')),
      transition('in => out', animate('600ms ease-out'))
    ])
  ]
})
export class MainSectionComponent implements AfterViewInit, OnDestroy {

  @Output() introEnded = new EventEmitter<boolean>();

  showVideo = false;
  videoHasEnded = true;
  animationState = 'out';

  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  @ViewChild('contentAnchor') contentAnchor!: ElementRef;
  @ViewChild('logoWrap', { static: true }) wrapRef!: ElementRef<HTMLElement>;
  @ViewChild('logoFx', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private emitters: Emitter[] = [];
  private rafId = 0;
  private resizeObs?: ResizeObserver;
  private running = false;

  ngAfterViewInit() {
    this.videoPlayer?.nativeElement.play();

    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    this.ctx = ctx;
    this.ctx.globalCompositeOperation = 'lighter';

    const resize = () => this.resizeToWrap();
    resize();
    this.resizeObs = new ResizeObserver(resize);
    this.resizeObs.observe(this.wrapRef.nativeElement);

    this.setupEmitters();

    this.running = true;
    const loop = () => {
      if (!this.running) return;
      this.tick();
      this.rafId = requestAnimationFrame(loop);
    };
    loop();

    setInterval(() => this.createRandomBurst(), 700);
  }

  // --- Canvas resize ---
  private resizeToWrap() {
    const wrap = this.wrapRef.nativeElement;
    const rect = wrap.getBoundingClientRect();
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const canvas = this.canvasRef.nativeElement;

    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    canvas.width = Math.max(1, Math.floor(rect.width * DPR));
    canvas.height = Math.max(1, Math.floor(rect.height * DPR));

    this.ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  // --- Emitters setup ---
  private setupEmitters() {
    const rect = this.wrapRef.nativeElement.getBoundingClientRect();
    const W = rect.width;
    const H = rect.height;

    this.emitters = [
      new Emitter(W * 0.25, H * 0.35, 0.8, 0.4),
      new Emitter(W * 0.6, H * 0.45, -0.6, 0.3),
      new Emitter(W * 0.4, H * 0.65, 0.5, -0.5)
    ];
  }

  private createRandomBurst() {
    if (!this.emitters.length) return;
    const e = this.emitters[Math.floor(Math.random() * this.emitters.length)];
    this.spawnBurst(e.x, e.y, 16 + Math.floor(Math.random() * 10));
  }

  private spawnBurst(cx: number, cy: number, count: number) {
    for (let i = 0; i < count; i++) {
      const ang = Math.random() * Math.PI * 2;
      const spd = 0.8 + Math.random() * 2.2;
      const size = 1 + Math.random() * 2.5;

      this.particles.push(
      new Particle(
        cx + (Math.random() - 0.5) * 12,
        cy + (Math.random() - 0.5) * 12
      )
    );
    }
  }

  private tick() {
    const ctx = this.ctx;
    const canvas = this.canvasRef.nativeElement;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    // Fade background
    ctx.fillStyle = 'rgba(0,0,0,0.05)'; // mała alfa -> subtelne smugi
    ctx.fillRect(0, 0, w, h);

    // Update emitters
    for (const e of this.emitters) {
      e.update(w, h);
      this.spawnBurst(e.x, e.y, 2);
    }

    // Update particles
    this.particles = this.particles.filter(p => {
      p.update();
      p.draw(ctx);
      return !p.dead();
    });

    if (this.particles.length > 1200) {
      this.particles.splice(0, this.particles.length - 1200);
    }
  }

  // --- Video & scroll ---
  playVideo(): void {
    this.showVideo = true;
    this.videoHasEnded = false;
    setTimeout(() => this.videoPlayer?.nativeElement.play(), 0);
  }

  onVideoEnd(): void {
    this.animationState = 'out';
    this.showVideo = false;
    this.videoHasEnded = true;
  }

  scrollDown_t(): void {
    this.contentAnchor?.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  ngOnDestroy(): void {
    this.running = false;
    cancelAnimationFrame(this.rafId);
    this.resizeObs?.disconnect();
  }
}

// --- Particle class ---
class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;

    // losowe prędkości
    this.vx = (Math.random() - 0.5) * 2.5; // delikatniejsze ruchy
    this.vy = (Math.random() - 0.5) * 2.5;

    // losowy rozmiar cząstki (max 3 px)
    this.size = 0.5 + Math.random() * 2.5;   // rozmiar 0.5 - 3
    this.opacity = 0.2 + Math.random() * 0.8; // losowa przezroczystość

    this.life = 0;
    this.maxLife = 50 + Math.random() * 50; // życie w klatkach
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life++;
    this.opacity = Math.max(0, this.opacity - 0.01); // stopniowe zanikanie
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(10,10,100,${this.opacity})`;
    ctx.fill();
  }

  dead(): boolean {
    return this.life >= this.maxLife;
  }
}

// --- Emitter class ---
class Emitter {
  x: number;
  y: number;
  spreadX: number;
  spreadY: number;

  constructor(x: number, y: number, spreadX: number, spreadY: number) {
    this.x = x;
    this.y = y;
    this.spreadX = spreadX;
    this.spreadY = spreadY;
  }

  update(W: number, H: number) {
    this.x += this.spreadX;
    this.y += this.spreadY;

    // Bounce off edges
    if (this.x < 0 || this.x > W) this.spreadX *= -1;
    if (this.y < 0 || this.y > H) this.spreadY *= -1;
  }
}
