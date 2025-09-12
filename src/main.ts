// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app/app.routes.module';

// ✅ Tutorials token (so DI never fails even if a route doesn't provide it)
import { TUTORIALS } from './app/tutorials/tutorial.token';
// If you prefer a small global dataset instead of an empty default, import it:
// import { DEFAULT_TUTORIALS_DATA } from './tutorials/tutorials.data';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      })
    ),

    // 👇 Default provider so TutorialPageComponent can inject TUTORIALS.
    // Your per-tutorial lazy routes will OVERRIDE this with route-level providers.
    { provide: TUTORIALS, useValue: {} },
    // Or, if you want some global tutorials available everywhere:
    // { provide: TUTORIALS, useValue: DEFAULT_TUTORIALS_DATA },
  ],
}).catch(err => console.error(err));
