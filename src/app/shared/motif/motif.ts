import { Component, input } from '@angular/core';

@Component({
  selector: 'app-motif',
  template: `
    <svg viewBox="0 0 280 180" class="h-auto w-full" fill="none" aria-hidden="true">
      @switch (name()) {
        @case ('museum') {
          <path d="M28 158h224" stroke="#c2185b" stroke-width="4" stroke-linecap="square" />
          <path d="M52 158V86M92 158V86M132 158V86M172 158V86M212 158V86M252 158V86" stroke="currentColor" stroke-width="4" />
          <path d="M40 86h232" stroke="currentColor" stroke-width="4" />
          <path d="M40 86 156 36l116 50" stroke="currentColor" stroke-width="4" stroke-linejoin="miter" />
          <rect x="148" y="16" width="16" height="16" fill="#c2185b" />
        }
        @case ('pyramid') {
          <path d="M24 158h232" stroke="#c2185b" stroke-width="4" />
          <path d="M48 158 128 42l80 116" stroke="currentColor" stroke-width="4" stroke-linejoin="miter" />
          <path d="M136 158 196 82l56 76" stroke="currentColor" stroke-width="4" stroke-linejoin="miter" />
          <rect x="210" y="34" width="16" height="16" fill="#c2185b" />
        }
        @case ('flight') {
          <path d="M28 132c48-78 128-92 214-58" stroke="currentColor" stroke-width="4" stroke-dasharray="1 12" />
          <path d="M36 114h32v26H36z" stroke="currentColor" stroke-width="4" />
          <path d="M196 74l22 8-16 4 10 12-8 2-8-12-10 4z" fill="currentColor" />
          <rect x="228" y="62" width="14" height="14" fill="#c2185b" />
        }
      }
    </svg>
  `,
})
export class Motif {
  readonly name = input.required<'museum' | 'pyramid' | 'flight'>();
}
