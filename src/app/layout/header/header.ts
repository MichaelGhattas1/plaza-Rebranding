import { Component, effect, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { languages, LanguageService } from '../../core/i18n/language.service';
import { Logo } from '../../shared/logo/logo';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, Logo],
  template: `
    @let t = lang.copy();
    <a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:start-3 focus:z-50 focus:rounded-full focus:bg-white focus:px-3 focus:py-2">
      {{ t.nav.skip }}
    </a>
    <header class="fixed inset-x-0 top-0 z-40">
      <div class="ribbon h-1"></div>
      <div class="border-b border-line bg-ivory/95 backdrop-blur-md">
        <div class="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
          <a routerLink="/" aria-label="Plaza Inn">
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
            <div class="hidden items-center gap-1 sm:flex" dir="ltr" [attr.aria-label]="t.nav.language">
              @for (item of languages; track item.code) {
                <button
                  type="button"
                  class="rounded-full px-2.5 py-1 text-xs font-bold"
                  [attr.lang]="item.code === 'zh' ? 'zh-Hans' : item.code"
                  [attr.aria-pressed]="lang.lang() === item.code"
                  [attr.aria-label]="item.name"
                  [class]="lang.lang() === item.code ? 'bg-coral text-white' : 'text-moss'"
                  (click)="lang.use(item.code)"
                >
                  {{ item.short }}
                </button>
              }
            </div>
            <button
              type="button"
              class="rounded-full bg-blush px-3 py-1.5 text-sm font-bold text-coral xl:hidden"
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
      <div id="site-menu" class="fixed inset-0 z-50 flex flex-col bg-ivory px-6 py-6 text-ink md:px-10">
        <div class="flex items-center justify-between">
          <app-logo />
          <button type="button" class="rounded-full bg-blush px-3 py-1.5 text-sm font-bold text-coral" (click)="open.set(false)" autofocus>
            {{ t.nav.close }}
          </button>
        </div>
        <nav class="mt-10 flex flex-col gap-2" [attr.aria-label]="t.nav.primary">
          @for (item of links; track item.path) {
            <a
              class="display text-4xl"
              [routerLink]="item.path"
              routerLinkActive="text-coral"
              [routerLinkActiveOptions]="{ exact: item.exact }"
              (click)="open.set(false)"
            >
              {{ label(item.key) }}
            </a>
          }
        </nav>
        <div class="mt-auto flex flex-wrap gap-2 pt-10" [attr.aria-label]="t.nav.language">
          @for (item of languages; track item.code) {
            <button
              type="button"
              class="rounded-full px-3 py-1.5 text-sm font-bold"
              [attr.lang]="item.code === 'zh' ? 'zh-Hans' : item.code"
              [attr.aria-pressed]="lang.lang() === item.code"
              [class]="lang.lang() === item.code ? 'bg-coral text-white' : 'bg-white text-moss'"
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
