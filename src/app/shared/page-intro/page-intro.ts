import { Component, input } from '@angular/core';

@Component({
  selector: 'app-page-intro',
  template: `
    <header class="mx-auto w-full max-w-6xl px-5 pt-10 pb-8 md:px-8 md:pt-14">
      <p class="chip">{{ kicker() }}</p>
      <h1 class="display mt-4 max-w-3xl text-[clamp(2.3rem,5vw,3.6rem)]">{{ title() }}</h1>
      @if (lead()) {
        <p class="mt-4 max-w-2xl text-lg text-moss">{{ lead() }}</p>
      }
    </header>
  `,
})
export class PageIntro {
  readonly kicker = input.required<string>();
  readonly title = input.required<string>();
  readonly lead = input('');
}
