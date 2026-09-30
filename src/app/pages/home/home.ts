import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../core/i18n/language.service';
import { Motif } from '../../shared/motif/motif';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Motif],
  template: `
    @let t = lang.copy();
    <section class="bg-navy text-white">
      <div class="mx-auto w-full max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <p class="kicker">{{ t.home.eyebrow }}</p>
        <h1 class="display mt-4 max-w-3xl text-[clamp(2.6rem,6vw,4.6rem)]">{{ t.home.title }}</h1>
        <p class="mt-5 max-w-xl text-lg text-white/75">{{ t.home.lead }}</p>
        <div class="mt-8 flex flex-wrap gap-3">
          <a class="btn btn-magenta" routerLink="/tours">{{ t.home.journeysCta }}</a>
          <a class="btn btn-line" routerLink="/about">{{ t.home.houseCta }}</a>
        </div>
      </div>
    </section>

    <section class="grid bg-white md:grid-cols-3">
      @for (item of t.home.principles; track item.title; let i = $index) {
        <article class="border-t-4 px-5 py-8 md:px-8" [class.border-magenta]="i === 0" [class.border-indigo]="i === 1" [class.border-violet]="i === 2">
          <p class="text-sm font-bold" [class.text-magenta]="i === 0" [class.text-indigo]="i === 1" [class.text-violet]="i === 2">
            0{{ i + 1 }}
          </p>
          <h2 class="display mt-3 text-3xl">{{ item.title }}</h2>
          <p class="mt-3 text-moss">{{ item.text }}</p>
        </article>
      }
    </section>

    <section class="mx-auto w-full max-w-6xl px-5 py-14 md:px-8">
      <p class="kicker">{{ t.home.journeysKicker }}</p>
      <h2 class="display mt-3 max-w-xl text-4xl">{{ t.home.journeysTitle }}</h2>
      <p class="mt-3 max-w-xl text-moss">{{ t.home.journeysLead }}</p>
      <div class="mt-8 border-t border-line bg-white">
        @for (item of t.tours.items; track item.id) {
          <a class="grid items-center gap-6 border-b border-line px-5 py-7 md:grid-cols-12 md:px-8" [routerLink]="['/tours']" [fragment]="item.id">
            <app-motif class="block max-w-36 text-navy md:col-span-3" [name]="item.motif" />
            <div class="md:col-span-9">
              <p class="kicker">{{ item.kicker }}</p>
              <h3 class="display mt-1 text-3xl">{{ item.title }}</h3>
              <p class="mt-2 text-moss">{{ item.text }}</p>
            </div>
          </a>
        }
      </div>
    </section>

    <section>
      <div class="mx-auto w-full max-w-6xl px-5 pb-6 md:px-8">
        <p class="kicker">{{ t.home.servicesKicker }}</p>
        <h2 class="display mt-3 text-4xl">{{ t.home.servicesTitle }}</h2>
        <p class="mt-3 max-w-xl text-moss">{{ t.home.servicesLead }}</p>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4">
        @for (item of t.services.items; track item.id; let i = $index) {
          <a
            class="block min-h-56 p-6 text-white"
            [class.bg-navy]="i === 0"
            [class.bg-magenta]="i === 1"
            [class.bg-indigo]="i === 2"
            [class.bg-violet]="i === 3"
            [routerLink]="['/services']"
            [fragment]="item.id"
          >
            <span class="text-sm font-bold">{{ item.index }}</span>
            <h3 class="display mt-8 text-3xl">{{ item.title }}</h3>
            <p class="mt-3 text-sm opacity-80">{{ item.text }}</p>
          </a>
        }
      </div>
    </section>

    <section class="grid lg:grid-cols-2">
      <div class="bg-indigo px-5 py-12 text-white md:px-10">
        <p class="kicker">{{ t.home.trainingKicker }}</p>
        <h2 class="display mt-3 text-4xl">{{ t.home.trainingTitle }}</h2>
        <p class="mt-4 max-w-md text-white/80">{{ t.home.trainingLead }}</p>
        <a class="btn btn-magenta mt-6" routerLink="/training">{{ t.home.trainingCta }}</a>
      </div>
      <div class="bg-white">
        @for (item of t.events.programs; track item.id) {
          <a class="block border-b border-line px-5 py-7 md:px-8" [routerLink]="['/training']" [fragment]="item.id">
            <p class="text-sm font-bold text-indigo">{{ item.audience }}</p>
            <h3 class="display mt-2 text-3xl">{{ item.title }}</h3>
            <p class="mt-2 text-moss">{{ item.text }}</p>
          </a>
        }
      </div>
    </section>

    <section class="grid bg-navy text-white md:grid-cols-2">
      <div class="border-b border-white/15 px-5 py-12 md:border-e md:border-b-0 md:px-10">
        <p class="kicker">{{ t.home.careersKicker }}</p>
        <h2 class="display mt-3 text-4xl">{{ t.home.careersTitle }}</h2>
        <p class="mt-3 max-w-md text-white/75">{{ t.home.careersLead }}</p>
        <a class="btn btn-magenta mt-6" routerLink="/roles">{{ t.home.careersCta }}</a>
      </div>
      <div class="px-5 py-12 md:px-10">
        <p class="kicker">{{ t.home.contactKicker }}</p>
        <h2 class="display mt-3 text-4xl">{{ t.home.contactTitle }}</h2>
        <p class="mt-3 max-w-md text-white/75">{{ t.home.contactLead }}</p>
        <a class="btn btn-line mt-6" routerLink="/contact">{{ t.home.contactCta }}</a>
      </div>
    </section>
  `,
})
export class Home {
  readonly lang = inject(LanguageService);
}
