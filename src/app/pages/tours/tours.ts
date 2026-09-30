import { Component, inject } from '@angular/core';
import { LanguageService } from '../../core/i18n/language.service';
import { Motif } from '../../shared/motif/motif';
import { PageIntro } from '../../shared/page-intro/page-intro';
import { Reveal } from '../../shared/reveal/reveal';

@Component({
  selector: 'app-tours',
  imports: [PageIntro, Motif, Reveal],
  template: `
    @let t = lang.copy();
    <app-page-intro [kicker]="t.tours.kicker" [title]="t.tours.title" [lead]="t.tours.lead" />
    <div class="mx-auto grid w-full max-w-6xl gap-5 px-5 pb-10 md:px-8">
      @for (item of t.tours.items; track item.id; let i = $index) {
        <article appReveal [id]="item.id" class="panel grid items-center gap-6 overflow-hidden p-6 md:grid-cols-12">
          <div
            class="flex items-center justify-center rounded-3xl p-6 md:col-span-4"
            [class.bg-mint]="i === 0"
            [class.bg-butter]="i === 1"
            [class.bg-blush]="i === 2"
          >
            <app-motif class="float block w-full max-w-52" [name]="item.motif" />
          </div>
          <div class="md:col-span-8">
            <p class="text-sm font-bold" [class.text-teal]="i === 0" [class.text-gold]="i === 1" [class.text-coral]="i === 2">
              {{ item.kicker }}
            </p>
            <h2 class="display mt-1 text-4xl">{{ item.title }}</h2>
            <p class="mt-3 text-moss">{{ item.text }}</p>
            <p class="mt-5 text-sm font-bold">{{ t.tours.included }}</p>
            <ul class="mt-2 flex flex-wrap gap-2">
              @for (point of item.includes; track point) {
                <li
                  class="rounded-full px-3 py-1.5 text-sm font-semibold"
                  [class.bg-mint]="i === 0"
                  [class.bg-butter]="i === 1"
                  [class.bg-blush]="i === 2"
                >
                  {{ point }}
                </li>
              }
            </ul>
          </div>
        </article>
      }
      <p class="text-moss">{{ t.tours.note }}</p>
    </div>
  `,
})
export class Tours {
  readonly lang = inject(LanguageService);
}
