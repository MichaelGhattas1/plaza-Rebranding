import { Component, input } from '@angular/core';

@Component({
  selector: 'app-logo',
  host: { class: 'inline-block max-w-full' },
  template: `
    <img
      [src]="src()"
      alt="Plaza Inn"
      [class]="wordmark() ? 'h-11 w-auto md:h-12' : 'h-auto w-full'"
    />
  `,
})
export class Logo {
  readonly wordmark = input(true);
  readonly tone = input<'forest' | 'ivory'>('forest');

  src(): string {
    const light = this.tone() === 'ivory';
    if (this.wordmark()) {
      return light ? 'brand/logo-lockup-light.png' : 'brand/logo-lockup.png';
    }
    return light ? 'brand/logo-mark-light.png' : 'brand/logo-mark.png';
  }
}
