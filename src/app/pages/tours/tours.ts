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
    <div class="mx-auto w-full max-w-[1440px] px-5 pb-20 md:px-10">
      @for (item of t.tours.items; track item.id; let odd = $odd) {
        <article [id]="item.id" class="grid items-center gap-10 border-t border-line py-16 lg:grid-cols-12">
          <div class="lg:col-span-5" [class.lg:order-2]="odd">
            <app-motif class="mx-auto block w-full max-w-sm" [name]="item.motif" />
          </div>
          <div class="lg:col-span-7">
            <p class="eyebrow">{{ item.kicker }}</p>
            <h2 class="display mt-3 text-[clamp(2.6rem,5vw,4.6rem)]">{{ item.title }}</h2>
            <p class="mt-5 max-w-xl text-lg text-moss">{{ item.text }}</p>
            @if (item.layout === 'pillars') {
              <ul class="mt-8 grid grid-cols-2 gap-px bg-line">
                @for (point of item.includes; track point) {
                  <li class="bg-ivory px-4 py-6">
                    <span class="display block text-3xl md:text-4xl">{{ point }}</span>
                  </li>
                }
              </ul>
            } @else {
              <p class="eyebrow mt-8">{{ t.tours.included }}</p>
              <ul class="mt-3">
                @for (point of item.includes; track point) {
                  <li class="border-t border-line py-3">{{ point }}</li>
                }
              </ul>
            }
          </div>
        </article>
      }
      <p class="max-w-2xl border-t border-line pt-8 text-moss">{{ t.tours.note }}</p>
    </div>
  `,
})
export class Tours {
  readonly lang = inject(LanguageService);
}
