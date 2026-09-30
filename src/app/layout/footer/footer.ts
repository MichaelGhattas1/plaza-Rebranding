import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../core/i18n/language.service';
import { Logo } from '../../shared/logo/logo';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, Logo],
  template: `
    @let t = lang.copy();
    <footer class="mt-4">
      <div class="h-2 bg-gradient-to-r from-coral via-sun to-teal"></div>
      <div class="bg-white">
        <div class="mx-auto grid w-full max-w-6xl gap-8 px-5 py-12 md:px-8 lg:grid-cols-12">
          <div class="lg:col-span-5">
            <a routerLink="/" aria-label="Plaza Inn">
              <app-logo />
            </a>
            <p class="mt-4 max-w-sm text-moss">{{ t.footer.line }}</p>
          </div>
          <nav class="grid grid-cols-2 gap-x-6 gap-y-2 lg:col-span-4" [attr.aria-label]="t.nav.primary">
            @for (item of links; track item.path) {
              <a class="text-sm font-semibold text-ink hover:text-coral" [routerLink]="item.path">{{ label(item.key) }}</a>
            }
          </nav>
          <div class="lg:col-span-3">
            <p class="text-sm font-bold text-teal">{{ t.footer.place }}</p>
            <p class="mt-3 text-sm text-moss">© {{ year }} Plaza Inn. {{ t.footer.rights }}</p>
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class Footer {
  readonly lang = inject(LanguageService);
  readonly year = new Date().getFullYear();
  readonly links = [
    { path: '/about', key: 'about' },
    { path: '/tours', key: 'tours' },
    { path: '/services', key: 'services' },
    { path: '/training', key: 'events' },
    { path: '/roles', key: 'careers' },
    { path: '/contact', key: 'contact' },
  ] as const;

  label(key: (typeof this.links)[number]['key']): string {
    return this.lang.copy().nav[key];
  }
}
