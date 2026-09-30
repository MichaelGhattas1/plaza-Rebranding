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
    <div class="mx-auto grid w-full max-w-6xl gap-4 px-5 pb-8 md:px-8 lg:grid-cols-2">
      @for (item of t.events.programs; track item.id; let i = $index) {
        <article [id]="item.id" class="panel overflow-hidden">
          <div class="relative overflow-hidden px-6 py-6 text-white" [class.bg-sky]="i === 0" [class.bg-teal]="i === 1">
            <div class="pointer-events-none absolute -end-6 -top-8 size-24 rounded-full bg-white/15" aria-hidden="true"></div>
            <p class="relative text-sm font-bold text-white/80">{{ item.audience }}</p>
            <h2 class="display relative mt-1 text-4xl">{{ item.title }}</h2>
          </div>
          <div class="p-6">
            <p class="text-moss">{{ item.text }}</p>
            <p class="mt-5 text-sm font-bold">{{ t.events.modulesLabel }}</p>
            <ol class="mt-2 space-y-2">
              @for (module of item.modules; track module; let n = $index) {
                <li class="flex gap-3">
                  <span class="font-bold text-sky">0{{ n + 1 }}</span>
                  <span>{{ module }}</span>
                </li>
              }
            </ol>
          </div>
        </article>
      }
    </div>
    <div class="mx-auto w-full max-w-6xl px-5 pb-16 md:px-8">
      <a class="btn btn-coral" routerLink="/contact" [queryParams]="{ topic: 'training' }">{{ t.events.request }}</a>
    </div>
  `,
})
export class Events {
  readonly lang = inject(LanguageService);
}
