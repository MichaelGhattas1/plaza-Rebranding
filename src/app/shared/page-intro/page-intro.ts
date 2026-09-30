import { Component, input } from '@angular/core';
import { Reveal } from '../reveal/reveal';

@Component({
  selector: 'app-page-intro',
  imports: [Reveal],
  template: `
    <header class="relative overflow-hidden">
      <div class="float pointer-events-none absolute -end-12 -top-16 size-52 rounded-full bg-blush/80" aria-hidden="true"></div>
      <div class="float float-late pointer-events-none absolute start-1/3 top-8 size-24 rounded-full bg-mint/90" aria-hidden="true"></div>
      <div appReveal class="relative mx-auto w-full max-w-6xl px-5 pt-12 pb-8 md:px-8 md:pt-16">
        <p class="chip">{{ kicker() }}</p>
        <h1 class="display mt-4 max-w-3xl text-[clamp(2.5rem,5.5vw,4.2rem)]">{{ title() }}</h1>
        @if (lead()) {
          <p class="mt-4 max-w-2xl text-lg text-moss">{{ lead() }}</p>
        }
      </div>
    </header>
  `,
})
export class PageIntro {
  readonly kicker = input.required<string>();
  readonly title = input.required<string>();
  readonly lead = input('');
}
