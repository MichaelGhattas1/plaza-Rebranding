import { Component, inject } from '@angular/core';
import { LanguageService } from '../../core/i18n/language.service';
import { PageIntro } from '../../shared/page-intro/page-intro';

@Component({
  selector: 'app-services',
  imports: [PageIntro],
  template: `
    @let t = lang.copy();
    <app-page-intro [kicker]="t.services.kicker" [title]="t.services.title" [lead]="t.services.lead" />
    @for (item of t.services.items; track item.id; let odd = $odd) {
      <section [id]="item.id" [class]="odd ? 'bg-forest text-ivory' : 'bg-transparent'">
        <div class="mx-auto grid w-full max-w-[1440px] gap-8 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-12">
          <div class="lg:col-span-4">
            <span class="index-num text-3xl" [class.text-gold-pale]="odd">{{ item.index }}</span>
            <h2 class="display mt-4 text-[clamp(2.8rem,5vw,4.8rem)]">{{ item.title }}</h2>
          </div>
          <div class="lg:col-span-7 lg:col-start-6">
            <p class="text-lg leading-relaxed" [class.text-mist]="odd">{{ item.text }}</p>
            <ul class="mt-8">
              @for (point of item.points; track point) {
                <li class="border-t py-4" [class]="odd ? 'border-white/15' : 'border-line'">{{ point }}</li>
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
