import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { ar } from './ar';
import { Dictionary, PageKey } from './dictionary';
import { en } from './en';
import { es } from './es';
import { fr } from './fr';
import { zh } from './zh';

const STORAGE_KEY = 'plaza-lang';

export const dictionaries = { en, ar, fr, es, zh } as const satisfies Record<string, Dictionary>;

export type Lang = keyof typeof dictionaries;

export const languages: { code: Lang; short: string; name: string }[] = [
  { code: 'en', short: 'EN', name: 'English' },
  { code: 'ar', short: 'ع', name: 'العربية' },
  { code: 'fr', short: 'FR', name: 'Français' },
  { code: 'es', short: 'ES', name: 'Español' },
  { code: 'zh', short: '中文', name: '简体中文' },
];

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly router = inject(Router);

  readonly lang = signal<Lang>(this.readInitial());
  readonly copy = computed(() => dictionaries[this.lang()]);
  private readonly page = signal<PageKey>('home');

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.syncPage());

    effect(() => {
      const copy = this.copy();
      const page = this.page();
      document.documentElement.lang = copy.htmlLang;
      document.documentElement.dir = copy.dir;
      this.title.setTitle(copy.titles[page]);
      this.meta.updateTag({ name: 'description', content: copy.metaDescription });
      try {
        localStorage.setItem(STORAGE_KEY, this.lang());
      } catch {
        /* Storage can be blocked. The choice still applies for this visit. */
      }
    });
  }

  use(lang: Lang): void {
    this.lang.set(lang);
  }

  private syncPage(): void {
    let route = this.router.routerState.snapshot.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    const page = route.data['page'] as PageKey | undefined;
    if (page) {
      this.page.set(page);
    }
  }

  private readInitial(): Lang {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && saved in dictionaries) {
        return saved as Lang;
      }
    } catch {
      /* Ignore and fall through to the browser language. */
    }

    const nav = (navigator.language || 'en').toLowerCase();
    if (nav.startsWith('ar')) return 'ar';
    if (nav.startsWith('fr')) return 'fr';
    if (nav.startsWith('es')) return 'es';
    if (nav.startsWith('zh')) return 'zh';
    return 'en';
  }
}
