import { Component, input } from '@angular/core';

@Component({
  selector: 'app-page-intro',
  template: `
    <header class="mx-auto w-full max-w-[1440px] px-5 pt-16 pb-12 md:px-10 md:pt-24 md:pb-16">
      <p class="eyebrow">{{ kicker() }}</p>
      <h1 class="display mt-5 max-w-4xl text-[clamp(3rem,7vw,6.4rem)]">{{ title() }}</h1>
      @if (lead()) {
        <p class="mt-6 max-w-2xl text-lg leading-relaxed text-moss">{{ lead() }}</p>
      }
    </header>
  `,
})
export class PageIntro {
  readonly kicker = input.required<string>();
  readonly title = input.required<string>();
  readonly lead = input('');
}
