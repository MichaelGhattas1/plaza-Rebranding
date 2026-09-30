import { Component, inject } from '@angular/core';
import { LanguageService } from '../../core/i18n/language.service';
import { PageIntro } from '../../shared/page-intro/page-intro';

@Component({
  selector: 'app-services',
  imports: [PageIntro],
  template: `
    @let t = lang.copy();
    <app-page-intro [kicker]="t.services.kicker" [title]="t.services.title" [lead]="t.services.lead" />
    <div class="mx-auto grid w-full max-w-6xl gap-4 px-5 pb-16 md:px-8">
      @for (item of t.services.items; track item.id; let i = $index) {
        <section [id]="item.id" class="card p-6 md:p-8">
          <div class="flex flex-wrap items-center gap-3">
            <span
              class="inline-flex size-10 items-center justify-center rounded-full text-sm font-bold"
              [class.bg-coral]="i === 0"
              [class.bg-butter]="i === 1"
              [class.bg-teal]="i === 2"
              [class.bg-sky]="i === 3"
              [class.text-white]="i !== 1"
              [class.text-ink]="i === 1"
            >
              {{ item.index }}
            </span>
            <h2 class="display text-4xl">{{ item.title }}</h2>
          </div>
          <p class="mt-4 max-w-3xl text-lg text-moss">{{ item.text }}</p>
          <ul class="mt-5 flex flex-wrap gap-2">
            @for (point of item.points; track point) {
              <li class="rounded-full bg-ivory px-3 py-1.5 text-sm">{{ point }}</li>
            }
          </ul>
        </section>
      }
    </div>
  `,
})
export class Services {
  readonly lang = inject(LanguageService);
}
