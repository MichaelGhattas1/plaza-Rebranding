import { Component, inject } from '@angular/core';
import { LanguageService } from '../../core/i18n/language.service';
import { PageIntro } from '../../shared/page-intro/page-intro';

@Component({
  selector: 'app-about',
  imports: [PageIntro],
  template: `
    @let t = lang.copy();
    <app-page-intro [kicker]="t.about.kicker" [title]="t.about.title" [lead]="t.about.lead" />
    <section class="mx-auto grid w-full max-w-6xl gap-10 px-5 py-12 md:px-8 lg:grid-cols-12">
      <div class="lg:col-span-4">
        <p class="kicker">{{ t.about.holdsTitle }}</p>
        <ul class="mt-4 border-t border-line">
          @for (item of t.about.holds; track item; let i = $index) {
            <li class="flex items-center gap-3 border-b border-line py-4 text-2xl font-semibold">
              <span
                class="size-3 shrink-0"
                [class.bg-magenta]="i === 0"
                [class.bg-indigo]="i === 1"
                [class.bg-violet]="i === 2"
              ></span>
              {{ item }}
            </li>
          }
        </ul>
      </div>
      <div class="space-y-5 text-lg leading-relaxed lg:col-span-8">
        @for (paragraph of t.about.essay; track paragraph) {
          <p>{{ paragraph }}</p>
        }
      </div>
    </section>
    <section class="bg-white">
      <div class="mx-auto w-full max-w-6xl px-5 py-14 md:px-8">
        <p class="kicker">{{ t.about.ownersKicker }}</p>
        <h2 class="display mt-3 max-w-2xl text-4xl">{{ t.about.ownersTitle }}</h2>
        <p class="mt-3 max-w-2xl text-moss">{{ t.about.ownersLead }}</p>
        <ol class="mt-8 grid gap-8 md:grid-cols-3">
          @for (item of t.about.charges; track item.title; let i = $index) {
            <li class="border-t-4 pt-5" [class.border-magenta]="i === 0" [class.border-indigo]="i === 1" [class.border-violet]="i === 2">
              <p class="text-sm font-bold" [class.text-magenta]="i === 0" [class.text-indigo]="i === 1" [class.text-violet]="i === 2">
                0{{ i + 1 }}
              </p>
              <h3 class="display mt-2 text-3xl">{{ item.title }}</h3>
              <p class="mt-2 text-moss">{{ item.text }}</p>
            </li>
          }
        </ol>
        <p class="mt-10 max-w-3xl border-s-4 border-magenta ps-4 text-xl">{{ t.about.close }}</p>
      </div>
    </section>
  `,
})
export class About {
  readonly lang = inject(LanguageService);
}
