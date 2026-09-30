import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../core/i18n/language.service';
import { PageIntro } from '../../shared/page-intro/page-intro';

@Component({
  selector: 'app-events',
  imports: [PageIntro, RouterLink],
  template: `
    @let t = lang.copy();
    <app-page-intro [kicker]="t.events.kicker" [title]="t.events.title" [lead]="t.events.lead" />
    <div class="mx-auto grid w-full max-w-6xl gap-8 px-5 py-12 md:px-8 lg:grid-cols-2">
      @for (item of t.events.programs; track item.id; let i = $index) {
        <article [id]="item.id" class="border-t-4 bg-white p-6 md:p-8" [class.border-magenta]="i === 0" [class.border-indigo]="i === 1">
          <p class="text-sm font-bold" [class.text-magenta]="i === 0" [class.text-indigo]="i === 1">{{ item.audience }}</p>
          <h2 class="display mt-3 text-4xl">{{ item.title }}</h2>
          <p class="mt-4 text-moss">{{ item.text }}</p>
          <p class="mt-6 text-sm font-bold">{{ t.events.modulesLabel }}</p>
          <ol class="mt-2 border-t border-line">
            @for (module of item.modules; track module; let n = $index) {
              <li class="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-line py-3">
                <span class="font-bold text-magenta">0{{ n + 1 }}</span>
                <span>{{ module }}</span>
              </li>
            }
          </ol>
        </article>
      }
    </div>
    <div class="mx-auto w-full max-w-6xl px-5 pb-14 md:px-8">
      <a class="btn btn-magenta" routerLink="/contact" [queryParams]="{ topic: 'training' }">{{ t.events.request }}</a>
    </div>
  `,
})
export class Events {
  readonly lang = inject(LanguageService);
}
