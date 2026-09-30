import { Component, input } from '@angular/core';

@Component({
  selector: 'app-motif',
  template: `
    <svg viewBox="0 0 280 180" class="h-auto w-full" fill="none" aria-hidden="true">
      @switch (name()) {
        @case ('museum') {
          <path d="M28 158h224" stroke="#e39b08" stroke-width="3" stroke-linecap="round" />
          <path d="M52 158V86M92 158V86M132 158V86M172 158V86M212 158V86M252 158V86" stroke="#0f766e" stroke-width="3" stroke-linecap="round" />
          <path d="M40 86h232" stroke="#0f766e" stroke-width="3" stroke-linecap="round" />
          <path d="M40 86 156 36l116 50" stroke="#0f766e" stroke-width="3" stroke-linejoin="round" />
          <circle cx="156" cy="26" r="7" fill="#d14332" />
        }
        @case ('pyramid') {
          <path d="M24 158h232" stroke="#1d6fa8" stroke-width="3" stroke-linecap="round" />
          <path d="M48 158 128 46l80 112" stroke="#e39b08" stroke-width="3" stroke-linejoin="round" />
          <path d="M136 158 196 86l56 72" stroke="#d14332" stroke-width="3" stroke-linejoin="round" />
          <circle cx="220" cy="48" r="10" fill="#e39b08" />
        }
        @case ('flight') {
          <path d="M28 132c48-78 128-92 214-58" stroke="#1d6fa8" stroke-width="3" stroke-linecap="round" stroke-dasharray="2 10" />
          <path d="M36 118h28v22H36z" stroke="#0f766e" stroke-width="3" />
          <path d="M50 118V104" stroke="#0f766e" stroke-width="3" stroke-linecap="round" />
          <path d="M196 78l18 6-14 4 8 10-6 2-6-10-8 3z" fill="#d14332" />
          <circle cx="236" cy="72" r="6" fill="#e39b08" />
        }
      }
    </svg>
  `,
})
export class Motif {
  readonly name = input.required<'museum' | 'pyramid' | 'flight'>();
}
