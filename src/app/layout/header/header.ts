import { Component, effect, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { languages, LanguageService } from '../../core/i18n/language.service';
import { Logo } from '../../shared/logo/logo';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, Logo],
  template: `
    @let t = lang.copy();
    <a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:start-3 focus:z-50 focus:bg-magenta focus:px-3 focus:py-2 focus:text-white">
      {{ t.nav.skip }}
    </a>
    <header class="fixed inset-x-0 top-0 z-40 bg-navy text-white">
      <div class="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
        <a routerLink="/" aria-label="Plaza Inn">
          <app-logo tone="ivory" />
        </a>
        <nav class="hidden items-center gap-5 xl:flex" [attr.aria-label]="t.nav.primary">
          @for (item of links; track item.path) {
            <a
              class="text-sm font-semibold text-white/75"
              [routerLink]="item.path"
              routerLinkActive="!text-magenta"
              [routerLinkActiveOptions]="{ exact: item.exact }"
            >
              {{ label(item.key) }}
            </a>
          }
        </nav>
        <div class="flex items-center gap-3">
          <div class="hidden items-center gap-1 sm:flex" dir="ltr" [attr.aria-label]="t.nav.language">
            @for (item of languages; track item.code) {
              <button
                type="button"
                class="px-2 py-1 text-xs font-bold"
                [attr.lang]="item.code === 'zh' ? 'zh-Hans' : item.code"
                [attr.aria-pressed]="lang.lang() === item.code"
                [attr.aria-label]="item.name"
                [class]="lang.lang() === item.code ? 'bg-magenta text-white' : 'text-white/70'"
                (click)="lang.use(item.code)"
              >
                {{ item.short }}
              </button>
            }
          </div>
          <button
            type="button"
            class="border border-white/40 px-3 py-1.5 text-sm font-semibold xl:hidden"
            [attr.aria-expanded]="open()"
            aria-controls="site-menu"
            (click)="open.set(true)"
          >
            {{ t.nav.menu }}
          </button>
        </div>
      </div>
    </header>

    @if (open()) {
      <div id="site-menu" class="fixed inset-0 z-50 flex flex-col bg-navy px-6 py-6 text-white md:px-10">
        <div class="flex items-center justify-between">
          <app-logo tone="ivory" />
          <button type="button" class="border border-white/40 px-3 py-1.5 text-sm font-semibold" (click)="open.set(false)" autofocus>
            {{ t.nav.close }}
          </button>
        </div>
        <nav class="mt-10 flex flex-col gap-1" [attr.aria-label]="t.nav.primary">
          @for (item of links; track item.path) {
            <a
              class="display text-4xl text-white"
              [routerLink]="item.path"
              routerLinkActive="!text-magenta"
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
              class="px-3 py-1.5 text-sm font-bold"
              [attr.lang]="item.code === 'zh' ? 'zh-Hans' : item.code"
              [attr.aria-pressed]="lang.lang() === item.code"
              [class]="lang.lang() === item.code ? 'bg-magenta text-white' : 'bg-white/10 text-white'"
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
