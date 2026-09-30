import { Component, inject } from '@angular/core';
import { LanguageService } from '../../core/i18n/language.service';
import { PageIntro } from '../../shared/page-intro/page-intro';

@Component({
  selector: 'app-about',
  imports: [PageIntro],
  template: `
    @let t = lang.copy();
    <app-page-intro [kicker]="t.about.kicker" [title]="t.about.title" [lead]="t.about.lead" />
    <section class="mx-auto grid w-full max-w-6xl gap-6 px-5 pb-10 md:px-8 lg:grid-cols-12">
      <div class="lg:col-span-4">
        <p class="text-sm font-bold text-teal">{{ t.about.holdsTitle }}</p>
        <ul class="mt-4 flex flex-wrap gap-2">
          @for (item of t.about.holds; track item; let i = $index) {
            <li
              class="rounded-full px-4 py-2 text-sm font-bold"
              [class.bg-mint]="i === 0"
              [class.text-teal]="i === 0"
              [class.bg-butter]="i === 1"
              [class.text-gold]="i === 1"
              [class.bg-blush]="i === 2"
              [class.text-coral]="i === 2"
            >
              {{ item }}
            </li>
          }
        </ul>
      </div>
      <div class="card space-y-5 p-6 text-lg leading-relaxed lg:col-span-8">
        @for (paragraph of t.about.essay; track paragraph) {
          <p>{{ paragraph }}</p>
        }
      </div>
    </section>
    <section class="mx-auto w-full max-w-6xl px-5 pb-16 md:px-8">
      <p class="chip bg-ice text-sky">{{ t.about.ownersKicker }}</p>
      <h2 class="display mt-3 max-w-2xl text-4xl">{{ t.about.ownersTitle }}</h2>
      <p class="mt-3 max-w-2xl text-moss">{{ t.about.ownersLead }}</p>
      <ol class="mt-6 grid gap-4 md:grid-cols-3">
        @for (item of t.about.charges; track item.title; let i = $index) {
          <li class="rounded-2xl p-5" [class.bg-mint]="i === 0" [class.bg-butter]="i === 1" [class.bg-ice]="i === 2">
            <p class="text-sm font-bold" [class.text-teal]="i === 0" [class.text-gold]="i === 1" [class.text-sky]="i === 2">
              0{{ i + 1 }}
            </p>
            <h3 class="display mt-2 text-3xl">{{ item.title }}</h3>
            <p class="mt-2 text-moss">{{ item.text }}</p>
          </li>
        }
      </ol>
      <p class="card mt-6 p-6 text-xl">{{ t.about.close }}</p>
    </section>
  `,
})
export class About {
  readonly lang = inject(LanguageService);
}
