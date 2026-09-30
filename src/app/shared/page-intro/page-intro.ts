import { Component, input } from '@angular/core';

@Component({
  selector: 'app-page-intro',
  template: `
    <header class="bg-navy text-white">
      <div class="mx-auto w-full max-w-6xl px-5 py-12 md:px-8 md:py-16">
        <p class="kicker">{{ kicker() }}</p>
        <h1 class="display mt-3 max-w-3xl text-[clamp(2.4rem,5vw,4rem)]">{{ title() }}</h1>
        @if (lead()) {
          <p class="mt-4 max-w-2xl text-lg text-white/75">{{ lead() }}</p>
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
