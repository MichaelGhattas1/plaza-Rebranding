import { Component, inject } from '@angular/core';
import { LanguageService } from '../../core/i18n/language.service';
import { PageIntro } from '../../shared/page-intro/page-intro';

@Component({
  selector: 'app-about',
  imports: [PageIntro],
  template: `
    @let t = lang.copy();
    <app-page-intro [kicker]="t.about.kicker" [title]="t.about.title" [lead]="t.about.lead" />
    <section class="mx-auto grid w-full max-w-[1440px] gap-12 px-5 pb-20 md:px-10 lg:grid-cols-12">
      <div class="lg:col-span-4">
        <p class="eyebrow">{{ t.about.holdsTitle }}</p>
        <ul class="mt-6">
          @for (item of t.about.holds; track item) {
            <li class="border-t border-line py-4 display text-3xl">{{ item }}</li>
          }
        </ul>
      </div>
      
      <div class="space-y-6 text-lg leading-relaxed lg:col-span-7 lg:col-start-6">
        @for (paragraph of t.about.essay; track paragraph) {
          <p>{{ paragraph }}</p>
        }
      </div>
    </section>
    <section class="bg-forest text-ivory">
      <div class="mx-auto w-full max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
        <p class="eyebrow text-gold-pale">{{ t.about.ownersKicker }}</p>
        <h2 class="display mt-4 max-w-3xl text-[clamp(2.8rem,6vw,5rem)]">{{ t.about.ownersTitle }}</h2>
        <p class="mt-6 max-w-2xl text-lg text-mist">{{ t.about.ownersLead }}</p>
        <ol class="mt-14 grid gap-8 md:grid-cols-3">
          @for (item of t.about.charges; track item.title; let i = $index) {
            <li class="border-t border-white/15 pt-6">
              <span class="index-num text-2xl text-gold-pale">0{{ i + 1 }}</span>
              <h3 class="display mt-4 text-4xl">{{ item.title }}</h3>
              <p class="mt-3 text-mist">{{ item.text }}</p>
            </li>
          }
        </ol>
        <p class="display mt-16 max-w-3xl text-3xl md:text-4xl">{{ t.about.close }}</p>
      </div>
    </section>
  `,
})
export class About {
  readonly lang = inject(LanguageService);
}
