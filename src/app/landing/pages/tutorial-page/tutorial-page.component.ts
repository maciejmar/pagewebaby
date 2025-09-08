// src/app/pages/tutorial-page/tutorial-page.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HeroComponent } from '../../shared/hero/hero.component';
import { LandingModule } from '../../landing.module';

@Component({
  selector: 'app-tutorial-page',
  standalone: true,
  imports: [CommonModule, LandingModule],
  styles: [`
 :host { display:block; }
  .tutorial { margin-top: clamp(24px, 4vw, 56px); }

  /* page width + spacing */
  .tutorial.narrow { max-width: 980px; margin: 0 auto; }
  
  .section { padding: clamp(16px,2vw,24px) 0; }
  .section + .section { border-top: 1px solid var(--line); }
  .lead { opacity:.9; margin-top:.25rem; }

  /* steps */
  ol.steps { margin: .5rem 0 0; padding-left: 1.25rem; }
  ol.steps li { margin: .25rem 0; }

  /* gallery as neat cards */
  .media-grid {
    display:grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 14px;
    margin-top: 10px;
  }
  .media-grid figure {
    margin:0; border:1px solid var(--line);
    border-radius:12px; overflow:hidden; background:#0f1520;
    box-shadow: 0 8px 22px rgba(0,0,0,.25);
  }
  .media-grid img { display:block; width:100%; height:auto; }
  .media-grid figcaption { padding:8px 10px; font-size:.9rem; opacity:.8; }

  /* Responsive YouTube sizes */
  .yt { --w: 640px; width: min(100%, var(--w)); margin: 12px auto; }
  .yt iframe { width: 100%; aspect-ratio: 16 / 9; display:block; border:0; border-radius:12px; }

  /* size presets */
  .yt--sm { --w: 420px; }   /* smaller */
  .yt--md { --w: 640px; }   /* default */
  .yt--lg { --w: 820px; }   /* larger */
  `],
  template: `

    <div class="tutorial narrow">
    <app-hero
      [title]="productTitle + ' Tutorial'"
      subtitle="Step-by-step guide"
      ctaText="Back to Products"
      [ctaLink]="'/'"
      [ctaFragment]="'products'"
      [compact]="true">
    </app-hero>

   <section class="container tutorial narrow">

      <h1>{{ productTitle }}</h1>




      <ng-container [ngSwitch]="slug">
<!-- ========== ABC-land ========== -->
<div *ngSwitchCase="'abc-land'">
  <p class="lead">ABC-Land — quick guide to get started.</p>

  <section id="how" class="section">
    <h3>How to use</h3>
    <ol class="steps">
      <li>Open the app and choose a world.</li>
      <li>Tap items to explore letters and sounds.</li>
      <li>Complete mini-tasks to unlock badges.</li>
    </ol>
  </section>

  <section id="gallery" class="section">
    <h3>Screenshots</h3>
    <div class="media-grid">
      <figure>
        <picture>
          <source srcset="assets/tutorials/abc-land/scene1_800.webp" type="image/webp">
          <img src="assets/tutorials/abc-land/scene1_800.jpg" alt="Story scene #1" loading="lazy" decoding="async">
        </picture>
        <figcaption>Story scene #1</figcaption>
      </figure>

      <figure>
        <picture>
          <source srcset="assets/tutorials/abc-land/scene2_800.webp" type="image/webp">
          <img src="assets/tutorials/abc-land/scene2_800.jpg" alt="Story scene #2" loading="lazy" decoding="async">
        </picture>
        <figcaption>Story scene #2</figcaption>
      </figure>

      <figure>
        <picture>
          <source srcset="assets/tutorials/abc-land/scene3_800.webp" type="image/webp">
          <img src="assets/tutorials/abc-land/scene3_800.jpg" alt="Story scene #3" loading="lazy" decoding="async">
        </picture>
        <figcaption>Story scene #3</figcaption>
      </figure>
    </div>
  </section>

  <section id="video" class="section">
    <h3>Demo video</h3>
    <div class="video">
    
<figure class="yt yt--md"> <!-- yt--sm / yt--md / yt--lg -->
  <iframe
    src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1"
    title="ABC-Land demo"
    loading="lazy"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen>
  </iframe>
  <figcaption>Short walkthrough</figcaption>
</figure>   
      <small class="caption">Short walkthrough</small>
    </div>
  </section>
</div>

        <!-- ========== Abecadłowo content ========== -->
        <div *ngSwitchCase="'abecadlowo'">
          <p>Abecadłowo pomaga dzieciom poznawać litery i dźwięki. Poniżej krótka instrukcja.</p>

          <h3>Jak korzystać</h3>
          <ol>
            <li>Wybierz literę z planszy.</li>
            <li>Dotknij ikony głośnika, aby usłyszeć głoskę.</li>
            <li>Powtórz i spróbuj narysować literę.</li>
          </ol>

          <!-- (opcjonalnie) zrzuty ekranu -->
          <div class="gallery">
            <img src="assets/tutorials/abecadlowo/home.png" alt="Ekran główny" />
            <img src="assets/tutorials/abecadlowo/alphabet-grid.png" alt="Siatka liter" />
          </div>

          <!-- YouTube (zamień ID na swój) -->
          <h3>Krótka prezentacja</h3>
          <iframe
            src="https://www.youtube-nocookie.com/embed/kJQP7kiw5Fk?rel=0&modestbranding=1"
            title="Abecadłowo – prezentacja"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen>
          </iframe>
        </div>

        <!-- ========== Basketball-shots content ========== -->
        <div *ngSwitchCase="'basketball-shots'">
          <p>Opanuj <b>celowanie</b>, <b>moc</b> i <b>moment wypuszczenia</b>.</p>

          <h3>How to use</h3>
          <ol>
            <li><b>Aim:</b> przeciągnij, by ustawić łuk lotu.</li>
            <li><b>Power:</b> dłuższe przeciągnięcie = większa moc.</li>
            <li><b>Release:</b> puść na szczycie łuku.</li>
          </ol>

          <!-- przykładowe obrazy (wrzuć swoje pliki) -->
          <div class="gallery">
            <img src="assets/tutorials/basketball-shots/aim.png" alt="Celowanie" />
            <img src="assets/tutorials/basketball-shots/power.png" alt="Moc" />
            <img src="assets/tutorials/basketball-shots/release.png" alt="Wypuszczenie" />
          </div>

          <h3>Video tips</h3>
          <iframe
            src="https://www.youtube-nocookie.com/embed/QH2-TGUlwu4?rel=0&modestbranding=1"
            title="Basketball Shots – tips"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen>
          </iframe>
        </div>

        <!-- ========== Default (no content yet) ========== -->
        <div *ngSwitchDefault>
          No detailed tutorial yet for: {{ slug }}
        </div>

      </ng-container>
    </section>
  `
})
export class TutorialPageComponent {
  slug = '';
  productTitle = '';

  constructor(private route: ActivatedRoute) {
    // supports both /products/:slug and the lazy static routes with route.data.slug
    const fromParam = this.route.snapshot.paramMap.get('slug') ?? '';
    const fromData  = (this.route.snapshot.data['slug'] as string) ?? '';
    this.slug = fromParam || fromData;
    this.productTitle = this.prettyTitle(this.slug);
  }

  private prettyTitle(slug: string): string {
    const names: Record<string, string> = {
      abecadlowo: 'Abecadłowo',
      'basketball-shots': 'Basketball-shots',
      'system-of-equations-trainer': 'System-of-equations-trainer'
    };
    return names[slug] ?? this.capitalize(slug);
  }

  private capitalize(s: string) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
  }
}
