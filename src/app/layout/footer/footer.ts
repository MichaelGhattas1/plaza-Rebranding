import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../core/i18n/language.service';
import { Logo } from '../../shared/logo/logo';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, Logo],
  template: `
    @let t = lang.copy();
    <footer class="border-t border-line bg-paper">
      <div class="mx-auto grid w-full max-w-[1440px] gap-12 px-5 py-16 md:px-10 lg:grid-cols-12">
        <div class="lg:col-span-5">
          <a routerLink="/" class="text-forest" aria-label="Plaza Inn">
            <app-logo />
          </a>
          <p class="mt-6 max-w-sm text-moss">{{ t.footer.line }}</p>
        </div>
        <nav class="grid grid-cols-2 gap-x-6 gap-y-3 lg:col-span-4" [attr.aria-label]="t.nav.primary">
          @for (item of links; track item.path) {
            <a class="text-sm text-forest hover:text-gold" [routerLink]="item.path">{{ label(item.key) }}</a>
          }
        </nav>
        <div class="lg:col-span-3 lg:text-end">
          <p class="eyebrow">{{ t.footer.place }}</p>
          <p class="mt-6 text-sm text-moss">© {{ year }} Plaza Inn. {{ t.footer.rights }}</p>
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
