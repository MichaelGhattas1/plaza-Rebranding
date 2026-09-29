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
    <div class="mx-auto grid w-full max-w-[1440px] gap-8 px-5 pb-16 md:px-10 lg:grid-cols-2">
      @for (item of t.events.programs; track item.id) {
        <article [id]="item.id" class="border border-line bg-paper/50 p-7 md:p-10">
          <p class="eyebrow">{{ item.audience }}</p>
          <h2 class="display mt-4 text-5xl">{{ item.title }}</h2>
          <p class="mt-5 text-lg text-moss">{{ item.text }}</p>
          <p class="eyebrow mt-8">{{ t.events.modulesLabel }}</p>
          <ol class="mt-3">
            @for (module of item.modules; track module; let i = $index) {
              <li class="grid grid-cols-[2.5rem_1fr] gap-3 border-t border-line py-3">
                <span class="index-num">0{{ i + 1 }}</span>
                <span>{{ module }}</span>
              </li>
            }
          </ol>
        </article>
      }
    </div>
    <div class="mx-auto w-full max-w-[1440px] px-5 pb-20 md:px-10">
      <a class="mark-link" routerLink="/contact" [queryParams]="{ topic: 'training' }">{{ t.events.request }}</a>
    </div>
  `,
})
export class Events {
  readonly lang = inject(LanguageService);
}
