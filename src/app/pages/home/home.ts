import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../core/i18n/language.service';
import { Logo } from '../../shared/logo/logo';
import { Motif } from '../../shared/motif/motif';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Logo, Motif],
  template: `
    @let t = lang.copy();
    <section class="relative overflow-hidden">
      <div
        class="pointer-events-none absolute end-6 top-8 w-[min(42vw,11rem)] opacity-[0.16] md:end-12 md:top-10 md:w-[min(28vw,14rem)]"
        aria-hidden="true"
      >
        <app-logo [wordmark]="false" />
      </div>
      <div class="relative mx-auto flex min-h-[calc(100svh-5rem)] w-full max-w-[1440px] flex-col justify-end px-5 pt-16 pb-14 md:px-10">
        <p class="eyebrow">{{ t.home.eyebrow }}</p>
        <p lang="en" class="brand-hero mt-6 max-w-full text-[clamp(3.5rem,12vw,9.5rem)] text-forest" aria-hidden="true">
          Plaza Inn
        </p>
        <div class="mt-10 grid items-end gap-8 border-t border-line pt-8 lg:grid-cols-12">
          <h1 class="display text-[clamp(2.1rem,4vw,3.5rem)] lg:col-span-5">{{ t.home.title }}</h1>
          <p class="text-lg leading-relaxed text-moss lg:col-span-4">{{ t.home.lead }}</p>
          <div class="flex flex-wrap gap-6 lg:col-span-3 lg:justify-end">
            <a class="mark-link" routerLink="/about">{{ t.home.houseCta }}</a>
            <a class="mark-link" routerLink="/tours">{{ t.home.journeysCta }}</a>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-forest text-ivory">
      <div class="mx-auto w-full max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
        <p class="eyebrow text-gold-pale">{{ t.home.statementKicker }}</p>
        <p class="display mt-6 max-w-4xl text-[clamp(2.4rem,5vw,4.6rem)]">{{ t.home.statement }}</p>
        <ol class="mt-16 grid gap-10 md:grid-cols-3">
          @for (item of t.home.principles; track item.title; let i = $index) {
            <li class="border-t border-white/15 pt-6">
              <span class="index-num text-2xl text-gold-pale">0{{ i + 1 }}</span>
              <h2 class="display mt-4 text-4xl">{{ item.title }}</h2>
              <p class="mt-3 text-mist">{{ item.text }}</p>
            </li>
          }
        </ol>
      </div>
    </section>

    <section class="mx-auto w-full max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
      <div class="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p class="eyebrow">{{ t.home.journeysKicker }}</p>
          <h2 class="display mt-4 text-[clamp(2.6rem,5vw,4.5rem)]">{{ t.home.journeysTitle }}</h2>
        </div>
        <p class="max-w-sm text-moss">{{ t.home.journeysLead }}</p>
      </div>
      <div class="mt-12 grid gap-6 lg:grid-cols-2">
        @for (item of t.tours.items; track item.id) {
          <a
            class="group border border-line bg-paper/60 p-6 md:p-8"
            [class.lg:col-span-2]="item.layout === 'pillars'"
            [routerLink]="['/tours']"
            [fragment]="item.id"
          >
            <div [class]="item.layout === 'pillars' ? 'grid items-center gap-8 lg:grid-cols-2' : ''">
              <app-motif class="block max-w-xs" [name]="item.motif" />
              <div>
                <p class="eyebrow mt-6">{{ item.kicker }}</p>
                <h3 class="display mt-3 text-4xl md:text-5xl">{{ item.title }}</h3>
                <p class="mt-4 max-w-xl text-moss">{{ item.text }}</p>
              </div>
            </div>
          </a>
        }
      </div>
    </section>

    <section class="border-y border-line bg-paper">
      <div class="mx-auto w-full max-w-[1440px] px-5 py-20 md:px-10">
        <p class="eyebrow">{{ t.home.servicesKicker }}</p>
        <h2 class="display mt-4 text-[clamp(2.6rem,5vw,4.5rem)]">{{ t.home.servicesTitle }}</h2>
        <p class="mt-4 max-w-xl text-moss">{{ t.home.servicesLead }}</p>
        <ol class="mt-10">
          @for (item of t.services.items; track item.id) {
            <li class="border-t border-line">
              <a
                class="grid items-baseline gap-3 py-7 md:grid-cols-12"
                [routerLink]="['/services']"
                [fragment]="item.id"
              >
                <span class="index-num text-2xl md:col-span-1">{{ item.index }}</span>
                <span class="display text-4xl md:col-span-4">{{ item.title }}</span>
                <span class="text-moss md:col-span-7">{{ item.text }}</span>
              </a>
            </li>
          }
        </ol>
      </div>
    </section>

    <section class="mx-auto grid w-full max-w-[1440px] gap-12 px-5 py-20 md:px-10 lg:grid-cols-12">
      <div class="lg:col-span-5">
        <p class="eyebrow">{{ t.home.trainingKicker }}</p>
        <h2 class="display mt-4 text-[clamp(2.6rem,5vw,4.5rem)]">{{ t.home.trainingTitle }}</h2>
        <p class="mt-5 max-w-md text-lg text-moss">{{ t.home.trainingLead }}</p>
        <a class="mark-link mt-8" routerLink="/training">{{ t.home.trainingCta }}</a>
      </div>
      <div class="grid gap-6 lg:col-span-7">
        @for (item of t.events.programs; track item.id) {
          <a class="border border-line p-7" [routerLink]="['/training']" [fragment]="item.id">
            <p class="eyebrow">{{ item.audience }}</p>
            <h3 class="display mt-3 text-4xl">{{ item.title }}</h3>
            <p class="mt-3 text-moss">{{ item.text }}</p>
          </a>
        }
      </div>
    </section>

    <section class="bg-forest-deep text-ivory">
      <div class="mx-auto grid w-full max-w-[1440px] items-end gap-8 px-5 py-20 md:px-10 lg:grid-cols-12">
        <div class="lg:col-span-7">
          <p class="eyebrow text-gold-pale">{{ t.home.careersKicker }}</p>
          <h2 class="display mt-4 text-[clamp(2.6rem,5vw,4.5rem)]">{{ t.home.careersTitle }}</h2>
          <p class="mt-4 max-w-lg text-mist">{{ t.home.careersLead }}</p>
        </div>
        <div class="lg:col-span-5 lg:text-end">
          <a class="mark-link border-gold-pale text-ivory" routerLink="/roles">{{ t.home.careersCta }}</a>
        </div>
      </div>
    </section>

    <section class="mx-auto flex w-full max-w-[1440px] flex-wrap items-end justify-between gap-8 px-5 py-20 md:px-10">
      <div>
        <p class="eyebrow">{{ t.home.contactKicker }}</p>
        <h2 class="display mt-4 max-w-3xl text-[clamp(2.6rem,5vw,4.8rem)]">{{ t.home.contactTitle }}</h2>
        <p class="mt-4 max-w-xl text-moss">{{ t.home.contactLead }}</p>
      </div>
      <a class="mark-link" routerLink="/contact">{{ t.home.contactCta }}</a>
    </section>
  `,
})
export class Home {
  readonly lang = inject(LanguageService);
}
