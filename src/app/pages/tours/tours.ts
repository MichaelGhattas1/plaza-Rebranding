import { Component, inject } from '@angular/core';
import { LanguageService } from '../../core/i18n/language.service';
import { Motif } from '../../shared/motif/motif';
import { PageIntro } from '../../shared/page-intro/page-intro';

@Component({
  selector: 'app-tours',
  imports: [PageIntro, Motif],
  template: `
    @let t = lang.copy();
    <app-page-intro [kicker]="t.tours.kicker" [title]="t.tours.title" [lead]="t.tours.lead" />
    @for (item of t.tours.items; track item.id; let i = $index) {
      <article [id]="item.id" class="grid bg-white md:grid-cols-12">
        <div
          class="flex items-center justify-center p-8 text-white md:col-span-4"
          [class.bg-navy]="i === 0"
          [class.bg-indigo]="i === 1"
          [class.bg-violet]="i === 2"
        >
          <app-motif class="block w-full max-w-56" [name]="item.motif" />
        </div>
        <div class="px-5 py-10 md:col-span-8 md:px-10">
          <p class="kicker">{{ item.kicker }}</p>
          <h2 class="display mt-2 text-4xl">{{ item.title }}</h2>
          <p class="mt-4 max-w-xl text-moss">{{ item.text }}</p>
          <p class="mt-6 text-sm font-bold">{{ t.tours.included }}</p>
          <ul class="mt-3 border-t border-line">
            @for (point of item.includes; track point) {
              <li class="border-b border-line py-3">{{ point }}</li>
            }
          </ul>
        </div>
      </article>
    }
    <p class="mx-auto w-full max-w-6xl px-5 py-10 text-moss md:px-8">{{ t.tours.note }}</p>
  `,
})
export class Tours {
  readonly lang = inject(LanguageService);
}
