import { Component, inject } from '@angular/core';
import { LanguageService } from '../../core/i18n/language.service';
import { PageIntro } from '../../shared/page-intro/page-intro';

@Component({
  selector: 'app-services',
  imports: [PageIntro],
  template: `
    @let t = lang.copy();
    <app-page-intro [kicker]="t.services.kicker" [title]="t.services.title" [lead]="t.services.lead" />
    @for (item of t.services.items; track item.id; let i = $index) {
      <section [id]="item.id" class="border-b border-line bg-white">
        <div class="mx-auto grid w-full max-w-6xl gap-6 px-5 py-12 md:px-8 lg:grid-cols-12">
          <div class="lg:col-span-4">
            <span
              class="inline-flex size-12 items-center justify-center text-sm font-bold text-white"
              [class.bg-navy]="i === 0"
              [class.bg-magenta]="i === 1"
              [class.bg-indigo]="i === 2"
              [class.bg-violet]="i === 3"
            >
              {{ item.index }}
            </span>
            <h2 class="display mt-4 text-4xl">{{ item.title }}</h2>
          </div>
          <div class="lg:col-span-8">
            <p class="text-lg text-moss">{{ item.text }}</p>
            <ul class="mt-6 border-t border-line">
              @for (point of item.points; track point) {
                <li class="border-b border-line py-3">{{ point }}</li>
              }
            </ul>
          </div>
        </div>
      </section>
    }
  `,
})
export class Services {
  readonly lang = inject(LanguageService);
}
