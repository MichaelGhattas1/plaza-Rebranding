import { Component, effect, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { languages, LanguageService } from '../../core/i18n/language.service';
import { Logo } from '../../shared/logo/logo';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, Logo],
  template: `
    @let t = lang.copy();
    <a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:start-3 focus:z-50 focus:bg-ivory focus:px-3 focus:py-2">
      {{ t.nav.skip }}
    </a>
    <header class="fixed inset-x-0 top-0 z-40">
      <div class="h-[3px] bg-gold-line"></div>
      <div class="border-b border-line bg-ivory/90 backdrop-blur-md">
        <div class="mx-auto flex h-[4.75rem] w-full max-w-[1440px] items-center justify-between gap-4 px-5 md:px-10">
          <a routerLink="/" [attr.aria-label]="'Plaza Inn'" class="text-forest">
            <app-logo />
          </a>
          <nav class="hidden items-center gap-5 xl:flex" [attr.aria-label]="t.nav.primary">
            @for (item of links; track item.path) {
              <a
                class="nav-link"
                [routerLink]="item.path"
                routerLinkActive="is-active"
                [routerLinkActiveOptions]="{ exact: item.exact }"
              >
                {{ label(item.key) }}
              </a>
            }
          </nav>
          <div class="flex items-center gap-4">
            <div class="hidden items-center gap-3 sm:flex" dir="ltr" [attr.aria-label]="t.nav.language">
              @for (item of languages; track item.code) {
                <button
                  type="button"
                  class="text-[0.72rem] tracking-[0.14em]"
                  [attr.lang]="item.code === 'zh' ? 'zh-Hans' : item.code"
                  [attr.aria-pressed]="lang.lang() === item.code"
                  [attr.aria-label]="item.name"
                  [class]="lang.lang() === item.code ? 'text-forest' : 'text-moss'"
                  (click)="lang.use(item.code)"
                >
                  {{ item.short }}
                </button>
              }
            </div>
            <button
              type="button"
              class="nav-link xl:hidden"
              [attr.aria-expanded]="open()"
              aria-controls="site-menu"
              (click)="open.set(true)"
            >
              {{ t.nav.menu }}
            </button>
          </div>
        </div>
      </div>
    </header>

    @if (open()) {
      <div id="site-menu" class="fixed inset-0 z-50 flex flex-col bg-forest px-6 py-6 text-ivory md:px-10">
        <div class="flex items-center justify-between">
          <app-logo tone="ivory" />
          <button type="button" class="text-sm tracking-[0.14em] text-gold-pale" (click)="open.set(false)" autofocus>
            {{ t.nav.close }}
          </button>
        </div>
        <nav class="mt-14 flex flex-col gap-3" [attr.aria-label]="t.nav.primary">
          @for (item of links; track item.path) {
            <a
              class="display text-[clamp(2.6rem,8vw,4.2rem)]"
              [routerLink]="item.path"
              routerLinkActive="text-gold-pale"
              [routerLinkActiveOptions]="{ exact: item.exact }"
              (click)="open.set(false)"
            >
              {{ label(item.key) }}
            </a>
          }
        </nav>
        <div class="mt-auto flex flex-wrap gap-4 pt-10" [attr.aria-label]="t.nav.language">
          @for (item of languages; track item.code) {
            <button
              type="button"
              class="text-sm"
              [attr.lang]="item.code === 'zh' ? 'zh-Hans' : item.code"
              [attr.aria-pressed]="lang.lang() === item.code"
              [class]="lang.lang() === item.code ? 'text-gold-pale' : 'text-mist'"
              (click)="lang.use(item.code)"
            >
              {{ item.name }}
            </button>
          }
        </div>
      </div>
    }
  `,
})
export class Header {
  readonly lang = inject(LanguageService);
  readonly languages = languages;
  readonly open = signal(false);
  private readonly router = inject(Router);

  readonly links = [
    { path: '/', key: 'home', exact: true },
    { path: '/about', key: 'about', exact: false },
    { path: '/tours', key: 'tours', exact: false },
    { path: '/services', key: 'services', exact: false },
    { path: '/training', key: 'events', exact: false },
    { path: '/roles', key: 'careers', exact: false },
    { path: '/contact', key: 'contact', exact: false },
  ] as const;

  constructor() {
    this.router.events.subscribe(() => this.open.set(false));
    if (typeof window.matchMedia === 'function') {
      const desktop = window.matchMedia('(min-width: 1280px)');
      const closeIfDesktop = () => {
        if (desktop.matches) this.open.set(false);
      };
      desktop.addEventListener('change', closeIfDesktop);
      closeIfDesktop();
    }

    effect((onCleanup) => {
      if (!this.open()) {
        document.body.style.overflow = '';
        return;
      }
      document.body.style.overflow = 'hidden';
      const onKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          this.open.set(false);
        }
      };
      document.addEventListener('keydown', onKey);
      onCleanup(() => {
        document.removeEventListener('keydown', onKey);
        document.body.style.overflow = '';
      });
    });
  }

  label(key: (typeof this.links)[number]['key']): string {
    return this.lang.copy().nav[key];
  }
}
